from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import os

from dotenv import load_dotenv

load_dotenv()

from app.models.oauth_account import OAuthAccount


def get_gmail_service(db, user_id):

    oauth = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.user_id == user_id,
            OAuthAccount.provider == "google"
        )
        .first()
    )

    if oauth is None:
        return None

    credentials = Credentials(
        token=oauth.access_token,
        refresh_token=oauth.refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        scopes=[
            "https://www.googleapis.com/auth/gmail.readonly"
        ]
    )

    gmail = build(
        "gmail",
        "v1",
        credentials=credentials
    )

    return gmail