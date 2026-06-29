from fastapi import APIRouter, Depends
from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import datetime, timedelta, timezone
from app.models.oauth_account import OAuthAccount

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

    code = data.get("code")

    try:
        email = None
        name = None
        google_sub = None

        token_response = httprequests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": os.getenv("GOOGLE_CLIENT_ID"),
                "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
                "redirect_uri": os.getenv("GOOGLE_REDIRECT_URI"),
                "grant_type": "authorization_code",
            },
            timeout=10
        )

        if token_response.status_code != 200:
            raise ValueError(token_response.text)

        tokens = token_response.json()

        access_token = tokens["access_token"]

        refresh_token = tokens.get("refresh_token")

        expires_in = tokens.get("expires_in", 3600)

        userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"

        headers = {
            "Authorization": f"Bearer {access_token}"
        }

        resp = httprequests.get(
            userinfo_url,
            headers=headers,
            timeout=10
        )

        if resp.status_code != 200:
            raise ValueError(resp.text)

        user_info = resp.json()

        email = user_info["email"]

        name = user_info["name"]

        google_sub = user_info["sub"]

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

        expiry = datetime.now(timezone.utc) + timedelta(seconds=expires_in)

        oauth = (
            db.query(OAuthAccount)
            .filter(
                OAuthAccount.user_id == user.id,
                OAuthAccount.provider == "google"
            )
            .first()
        )

        if oauth:

            oauth.provider_email = email
            oauth.provider_user_id = google_sub
            oauth.access_token = access_token
            oauth.refresh_token = refresh_token or oauth.refresh_token
            oauth.token_expiry = expiry

        else:

            oauth = OAuthAccount(
                user_id=user.id,
                provider="google",
                provider_email=email,
                provider_user_id=google_sub,
                access_token=access_token,
                refresh_token=refresh_token,
                token_expiry=expiry
            )

            db.add(oauth)

        db.commit()

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