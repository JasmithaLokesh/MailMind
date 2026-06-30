from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.gmail_service import get_gmail_service
from app.models.session import UserSession

from app.models.email import Email
from email.utils import parsedate_to_datetime

from app.models.user import User
from app.services.ai_service import analyze_email
from app.services.email_analysis_service import save_analysis
from app.utils.text_preprocessor import preprocess_email

import base64

router = APIRouter()

def extract_body(payload):

    if payload.get("body", {}).get("data"):

        return base64.urlsafe_b64decode(
            payload["body"]["data"]
        ).decode(
            "utf-8",
            errors="ignore"
        )

    if "parts" in payload:

        for part in payload["parts"]:

            mime = part.get("mimeType")

            if mime == "text/plain":

                data = part.get("body", {}).get("data")

                if data:

                    return base64.urlsafe_b64decode(
                        data
                    ).decode(
                        "utf-8",
                        errors="ignore"
                    )

        for part in payload["parts"]:

            text = extract_body(part)

            if text:

                return text

    return ""

@router.get("/sync")
def sync_gmail(
    session_id: str,
    db: Session = Depends(get_db)
):

    session = (
        db.query(UserSession)
        .filter(UserSession.session_id == session_id)
        .first()
    )

    if session is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid session"
        )

    gmail = get_gmail_service(
        db,
        session.user_id
    )

    profile = gmail.users().getProfile(
        userId="me"
    ).execute()

    current_history_id = profile["historyId"]

    user = (
        db.query(User)
        .filter(User.id == session.user_id)
        .first()
    )

    first_sync = (
        user.last_history_id is None
    )

    if gmail is None:
        raise HTTPException(
            status_code=400,
            detail="Google account not linked"
        )

    email_list = []

    if first_sync:

        page_token = None

        while True:

            response = gmail.users().messages().list(
                userId="me",
                maxResults=100,
                pageToken=page_token
            ).execute()

            email_list.extend(
                response.get("messages", [])
            )

            page_token = response.get("nextPageToken")

            if not page_token:
                break

    else:

        history = gmail.users().history().list(
            userId="me",
            startHistoryId=user.last_history_id,
            historyTypes=["messageAdded"]
        ).execute()

        histories = history.get("history", [])

        seen = set()

        for h in histories:

            for msg in h.get("messagesAdded", []):

                message = msg["message"]

                if message["id"] not in seen:

                    seen.add(message["id"])

                    email_list.append(message)

    new_emails = 0

    for item in email_list:

        print("=" * 70)
        print("Processing Gmail ID:", item["id"])

        try:

            email = gmail.users().messages().get(
                userId="me",
                id=item["id"],
                format="full"
            ).execute()

        except Exception as e:

            print("Failed to fetch Gmail message:", e)
            continue

        headers = {}

        # body = extract_body(
        #     email["payload"]
        # )

        # print("=" * 50)
        # print(body[:500])

        for h in email["payload"]["headers"]:
            headers[h["name"]] = h["value"]

        body = preprocess_email(
            extract_body(email["payload"])
        )

        print("=" * 50)
        print(body[:500])

        existing = (
            db.query(Email)
            .filter(
                Email.gmail_id == email["id"]
            )
            .first()
        )

        if existing:
            continue

        received = None

        try:
            received = parsedate_to_datetime(
                headers.get("Date")
            )
        except Exception as e:
            print("Date parsing failed:", e)


        category = "PRIMARY"

        labels = email.get("labelIds", [])

        if "CATEGORY_PROMOTIONS" in labels:
            category = "PROMOTIONS"

        elif "CATEGORY_UPDATES" in labels:
            category = "UPDATES"

        elif "CATEGORY_SOCIAL" in labels:
            category = "SOCIAL"

        elif "CATEGORY_FORUMS" in labels:
            category = "FORUMS"


        db_email = Email(

            user_id=session.user_id,

            gmail_id=email["id"],

            thread_id=email["threadId"],

            sender=headers.get("From"),

            subject=headers.get("Subject"),

            body=body,

            received_at=received,

            category=category,

            is_read="UNREAD" not in labels,

            is_starred="STARRED" in labels,

            priority_score=None,

            summary=None,

            action_items=None

        )
        
        db.add(db_email)
        db.commit()

        print("Inserted into emails table")

        db.refresh(db_email)

        new_emails += 1

        email_text = f"""
        Subject:
        {db_email.subject}

        From:
        {db_email.sender}

        Body:
        {db_email.body}
        """

        try:

            print("AI START")

            result = analyze_email(
                email_text
            )

            print("AI FINISHED")

            save_analysis(
                db,
                db_email.id,
                result
            )

            print("DB UPDATED")

        except Exception as e:

            print("=" * 60)
            print("AI ERROR while processing Gmail ID:", db_email.gmail_id)
            print("Subject:", db_email.subject)
            print("Error:", str(e))
            print("=" * 60)

            # Continue to the next email instead of stopping the sync
            continue

        print("Finished email")

    # Save latest Gmail historyId
    user = (
        db.query(User)
        .filter(User.id == session.user_id)
        .first()
    )

    if user:
        user.last_history_id = current_history_id
        db.commit()

    count = (
        db.query(Email)
        .filter(
            Email.user_id == session.user_id
        )
        .count()
    )

    return {
        "success": True,
        "new_emails_synced": new_emails,
        "emails_synced": count
    }