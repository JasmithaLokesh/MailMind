from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.models.email_analysis import EmailAnalysis

router = APIRouter()


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db)
):

    total_emails = (
        db.query(EmailAnalysis)
        .count()
    )

    high_priority = (
        db.query(EmailAnalysis)
        .filter(
            EmailAnalysis.priority >= 80
        )
        .count()
    )

    spam_emails = (
        db.query(EmailAnalysis)
        .filter(
            EmailAnalysis.spam_label == "Spam"
        )
        .count()
    )

    return {
        "total_emails": total_emails,
        "high_priority": high_priority,
        "spam_emails": spam_emails
    }

@router.get("/categories")
def get_categories(
    db: Session = Depends(get_db)
):

    results = (
        db.query(
            EmailAnalysis.category,
            func.count(EmailAnalysis.id)
        )
        .group_by(
            EmailAnalysis.category
        )
        .all()
    )

    return {
        category: count
        for category, count in results
    }

@router.get("/recent")
def recent_emails(
    db: Session = Depends(get_db)
):

    emails = (
        db.query(EmailAnalysis)
        .order_by(
            EmailAnalysis.created_at.desc()
        )
        .limit(5)
        .all()
    )

    return emails

    