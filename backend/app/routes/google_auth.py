from fastapi import APIRouter, Depends
from google.oauth2 import id_token
from google.auth.transport import requests

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.user import User

from app.services.session_service import create_session

import uuid

import os

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "882563737356-bdd7v01bct0kq4baaajlrmfnoj2demhm.apps.googleusercontent.com")


import requests as httprequests

@router.post("/google")
async def google_login(
    data: dict,
    db: Session = Depends(get_db)
):

    token = data.get("token")

    try:
        email = None
        name = None
        google_sub = None

        if token and "." in token:
            try:
                user_info = id_token.verify_oauth2_token(
                    token,
                    requests.Request(),
                    GOOGLE_CLIENT_ID,
                    clock_skew_in_seconds=10
                )
                email = user_info.get("email")
                name = user_info.get("name")
                google_sub = user_info.get("sub")
            except Exception:
                pass

        if not email:
            userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
            headers = {"Authorization": f"Bearer {token}"}
            resp = httprequests.get(userinfo_url, headers=headers, timeout=10)
            if resp.status_code == 200:
                user_info = resp.json()
                email = user_info.get("email")
                name = user_info.get("name") or user_info.get("given_name", "Google User")
                google_sub = user_info.get("sub")
            else:
                raise ValueError("Invalid Google token or access token")

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if not user:
            user = User(
                email=email,
                full_name=name,
                password_hash="GOOGLE_AUTH",
                google_id=google_sub
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            if not user.google_id:
                user.google_id = google_sub
                db.commit()
                db.refresh(user)

        session_id = str(
            uuid.uuid4()
        )

        create_session(
            db=db,
            user_id=user.id,
            session_id=session_id
        )

        return {

            "success": True,

            "session_id": session_id,

            "user": {

                "id": user.id,

                "email": user.email,

                "full_name": user.full_name

            }

        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }