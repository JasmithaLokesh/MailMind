from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from app.core.encryption import (
    decrypt_payload
)
import uuid

from sqlalchemy.orm import Session

from app.schemas.user import (
    UserResponse,
    UserUpdate
)

from app.models.user import User

from app.core.database import get_db

from app.core.security import (
    hash_password,
    verify_password
)

from app.core.error_codes import (
    SUCCESS,
    INVALID_CREDENTIALS,
    EMAIL_EXISTS
)

from app.core.audit_logger import (
    write_audit_log
)

router = APIRouter()


@router.get("/")
def test_auth():
    return {
        "message": "Auth route working"
    }

@router.post(
    "/signup",
)
def signup(
    data: dict,
    db: Session = Depends(get_db)
):

    decrypted = decrypt_payload(
        data["payload"]
    )

    email = decrypted["email"]

    full_name = decrypted["full_name"]

    password = decrypted["password"]

    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail={
                "error_code": "AUTH_003",
                "message": "Email already registered"
            }
        )

    new_user = User(
        email=email,
        full_name=full_name,
        password_hash=hash_password(
            password
        )
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    write_audit_log(
        event="USER_SIGNUP",
        user_email=new_user.email,
        details="New account created"
    )

    return {
        "success": True,
        "error_code": "SUCCESS_001",
        "message": "Account created successfully",
        "details": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name
        }
    }


@router.post("/login")
def login(
    data: dict,
    db: Session = Depends(get_db)
):

    decrypted = decrypt_payload(
        data["payload"]
    )

    email = decrypted["email"]

    password = decrypted["password"]

    user = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail={
                "error_code": "AUTH_001",
                "message": "Invalid email or password"
            }
        )

    if not verify_password(
        password,
        user.password_hash
    ):
        write_audit_log(
            event="FAILED_LOGIN",
            user_email=email,
            details="Invalid password"
        )
        raise HTTPException(
            status_code=401,
            detail={
                "error_code": "AUTH_001",
                "message": "Invalid email or password"
            }
        )

    session_id = str(
        uuid.uuid4()
    )

    write_audit_log(
        event="USER_LOGIN",
        user_email=user.email,
        details=f"Session={session_id}"
    )

    return {
        "success": True,
        "error_code": SUCCESS,
        "message": "Login successful",
        "session_id": session_id,
        "details": {
            "user_id": user.id,
            "email": user.email,
            "full_name": user.full_name
        }
    }

@router.put(
    "/users/{user_id}",
    response_model=UserResponse
)
def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
        write_audit_log(
            event="FAILED_LOGIN",
            user_email=email,
            details="User not found"
        )

    user.full_name = user_data.full_name

    db.commit()

    db.refresh(user)

    return user

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)

    db.commit()

    return {
        "message": f"User {user_id} deleted successfully"
    }