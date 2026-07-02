from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.core.database import get_db

from app.models.session import UserSession
from app.models.email import Email

from app.services.outlook_service import (
    get_outlook_messages
)

from app.services.ai_service import analyze_email
from app.services.email_analysis_service import save_analysis

from app.utils.text_preprocessor import preprocess_email

router = APIRouter()


@router.get("/sync")
def sync_outlook(
    session_id: str,
    db: Session = Depends(get_db)
):

    session = (
        db.query(UserSession)
        .filter(
            UserSession.session_id == session_id
        )
        .first()
    )

    if session is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid session"
        )

    response = get_outlook_messages(
        db,
        session.user_id
    )

    print(response)

    if response is None:

        raise HTTPException(
            status_code=400,
            detail="Outlook account not linked"
        )

    messages = response.get("value", [])

    new_emails = 0

    for message in messages:

        print("=" * 70)
        print("Processing Outlook ID:", message["id"])

        subject = message.get(
            "subject",
            ""
        )

        sender = (
            message.get("from", {})
            .get("emailAddress", {})
            .get("address", "")
        )

        body = preprocess_email(
            message.get("body", {})
            .get("content", "")
        )

        received = None

        try:

            received = datetime.fromisoformat(
                message["receivedDateTime"].replace(
                    "Z",
                    "+00:00"
                )
            )

        except Exception:

            pass

        existing = (
            db.query(Email)
            .filter(
                Email.gmail_id == message["id"]
            )
            .first()
        )

        if existing:
            print("Already exists:", message["id"])
            continue

        category = "PRIMARY"

        db_email = Email(

            user_id=session.user_id,

            gmail_id=message["id"],

            thread_id=message.get(
                "conversationId"
            ),

            sender=sender,

            subject=subject,

            body=body,

            received_at=received,

            category=category,

            is_read=message.get(
                "isRead",
                False
            ),

            is_starred=False,

            priority_score=None,

            summary=None,

            action_items=None

        )

        db.add(db_email)

        db.commit()

        db.refresh(db_email)

        print("Inserted into emails table")

        new_emails += 1

        email_text = f"""
        Subject:
        {db_email.subject}

        From:
        {db_email.sender}

        Body:
        {db_email.body}
        """

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
            print("AI ERROR while processing Outlook ID:", message["id"])
            print("Subject:", db_email.subject)
            print("Error:", str(e))
            print("=" * 60)

            continue

        print("Finished email")

    return {
        "success": True,
        "new_emails_synced": new_emails
    }