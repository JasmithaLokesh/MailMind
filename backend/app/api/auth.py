from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from app.core.encryption import (
    decrypt_payload
)
import uuid

from app.models.session import UserSession

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

from app.core.response import (
    success_response
)

from app.services.audit_service import (
    create_audit_log
)

from app.services.session_service import (
    create_session,
    deactivate_session,
    validate_session
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

    create_audit_log(
    db=db,
    user_id=new_user.id,
    action="SIGNUP",
    status="SUCCESS"
    )

    return success_response(
        message="Account created successfully",
        details={
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name
        }
    )


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

    create_session(
    db=db,
    user_id=user.id,
    session_id=session_id
    )

    create_audit_log(
        db=db,
        user_id=user.id,
        action="LOGIN",
        status="SUCCESS",
        session_id=session_id
    )

    write_audit_log(
        event="USER_LOGIN",
        user_email=user.email,
        details=f"Session={session_id}"
    )

    return success_response(
        message="Login successful",
        session_id=session_id,
        details={
            "user_id": user.id,
            "email": user.email,
            "full_name": user.full_name
        }
    )

from app.models.session import UserSession


@router.post("/logout")
def logout(
    data: dict,
    db: Session = Depends(get_db)
):

    session_id = data.get("session_id")

    print("LOGOUT SESSION ID =", session_id)

    session = (
        db.query(UserSession)
        .filter(
            UserSession.session_id == session_id
        )
        .first()
    )

    deactivate_session(
        db,
        session_id
    )

    create_audit_log(
        db=db,
        user_id=session.user_id if session else None,
        action="LOGOUT",
        status="SUCCESS",
        session_id=session_id
    )

    return success_response(
        message="Logout successful"
    )

    deactivate_session(
        db,
        session_id
    )

    create_audit_log(
        db=db,
        user_id=None,
        action="LOGOUT",
        status="SUCCESS",
        session_id=session_id
    )

    return success_response(
    message="Logout successful"
    )

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

@router.get("/validate-session")
def validate_user_session(
    session_id: str,
    db: Session = Depends(get_db)
):
    session = validate_session(
        db,
        session_id
    )

    if not session:
        raise HTTPException(
            status_code=401,
            detail={
                "error_code": "AUTH_007",
                "message": "Session expired"
            }
        )

    return {
        "success": True,
        "error_code": "SUCCESS_001",
        "message": "Session valid",
        "details": {
            "session_id": session_id
        }
    }

import secrets
from datetime import datetime, timedelta, timezone

@router.post("/forgot-password")
def forgot_password(
    data: dict,
    db: Session = Depends(get_db)
):
    decrypted = decrypt_payload(data["payload"])
    email = decrypted.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    user = db.query(User).filter(User.email == email).first()
    token = secrets.token_urlsafe(32)

    if user:
        user.reset_password_token = token
        user.reset_password_expires = datetime.now(timezone.utc) + timedelta(hours=1)
        db.commit()

        reset_link = f"http://localhost:5173/reset-password?token={token}"
        write_audit_log(
            event="PASSWORD_RESET_REQUESTED",
            user_email=email,
            details=f"Reset token created. Link: {reset_link}"
        )
        print(f"\n========================================\n"
              f"MOCK EMAIL SENT TO: {email}\n"
              f"Subject: Reset Your MailMind Password\n"
              f"Reset Link: {reset_link}\n"
              f"========================================\n")

    return success_response(
        message="If the email is registered, a password reset link has been sent.",
        details={"token": token}
    )

@router.post("/reset-password")
def reset_password(
    data: dict,
    db: Session = Depends(get_db)
):
    decrypted = decrypt_payload(data["payload"])
    token = decrypted.get("token")
    password = decrypted.get("password")

    if not token or not password:
        raise HTTPException(status_code=400, detail="Token and password are required")

    user = db.query(User).filter(User.reset_password_token == token).first()

    if not user:
        raise HTTPException(
            status_code=400,
            detail={
                "error_code": "AUTH_008",
                "message": "Invalid password reset token"
            }
        )

    expires = user.reset_password_expires
    if expires:
        if expires.tzinfo is None:
            expires = expires.replace(tzinfo=timezone.utc)

        if datetime.now(timezone.utc) > expires:
            raise HTTPException(
                status_code=400,
                detail={
                    "error_code": "AUTH_009",
                    "message": "Password reset token has expired"
                }
            )

    user.password_hash = hash_password(password)
    user.reset_password_token = None
    user.reset_password_expires = None
    db.commit()

    write_audit_log(
        event="PASSWORD_RESET_SUCCESS",
        user_email=user.email,
        details="Password reset successful"
    )

    create_audit_log(
        db=db,
        user_id=user.id,
        action="RESET_PASSWORD",
        status="SUCCESS"
    )

    return success_response(
        message="Password has been reset successfully"
    )