from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.gmail_service import get_gmail_service
from app.models.session import UserSession

from app.models.email import Email
from email.utils import parsedate_to_datetime

router = APIRouter()


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

    if gmail is None:
        raise HTTPException(
            status_code=400,
            detail="Google account not linked"
        )

    email_list = []
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

    for item in email_list:

        email = gmail.users().messages().get(
            userId="me",
            id=item["id"],
            format="metadata",
            metadataHeaders=[
                "From",
                "Subject",
                "Date"
            ]
        ).execute()

        headers = {}

        for h in email["payload"]["headers"]:
            headers[h["name"]] = h["value"]

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
        except:
            pass


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

            body="",

            received_at=received,

            category=category,

            is_read="UNREAD" not in labels,

            is_starred="STARRED" in labels,

            priority_score=None,

            summary=None,

            action_items=None

        )
        db.add(db_email)

    count = (
        db.query(Email)
        .filter(
            Email.user_id == session.user_id
        )
        .count()
    )

    return {

        "success": True,

        "emails_synced": count

    }