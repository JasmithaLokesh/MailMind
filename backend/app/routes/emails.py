from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta, timezone
from typing import Optional
from sqlalchemy import func, or_

from app.core.database import get_db
from app.models.session import UserSession
from app.models.email import Email

router = APIRouter()

def get_current_user_id(session_id: str, db: Session):
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
    return session.user_id

@router.get("/stats")
def get_dashboard_stats(
    session_id: str,
    db: Session = Depends(get_db)
):
    user_id = get_current_user_id(session_id, db)
    
    # Base query for user's emails
    base_query = db.query(Email).filter(Email.user_id == user_id)
    
    total_emails = base_query.count()
    unread_emails = base_query.filter(Email.is_read == False).count()
    high_priority_emails = base_query.filter(Email.priority_score >= 80).count()
    
    # Depending on how the AI pipeline classifies recruiters, it could be in category or classification
    recruiter_emails = base_query.filter(Email.classification == "Recruiter").count()
    
    now = datetime.now(timezone.utc)
    upcoming_deadlines = base_query.filter(
        Email.deadline != None,
        Email.deadline >= now
    ).count()
    
    spam_emails = base_query.filter(Email.classification == "Spam").count()
    
    pending_action_items = base_query.filter(
        Email.action_items != None,
        Email.action_items != ""
    ).count()
    
    avg_priority = db.query(func.avg(Email.priority_score)).filter(Email.user_id == user_id).scalar()
    
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    emails_today = base_query.filter(Email.received_at >= today_start).count()
    
    week_start = today_start - timedelta(days=today_start.weekday())
    emails_this_week = base_query.filter(Email.received_at >= week_start).count()

    return {
        "total_emails": total_emails,
        "unread_emails": unread_emails,
        "high_priority": high_priority_emails,
        "recruiter_emails": recruiter_emails,
        "upcoming_deadlines": upcoming_deadlines,
        "spam_emails": spam_emails,
        "pending_action_items": pending_action_items,
        "average_priority": float(avg_priority) if avg_priority else 0.0,
        "emails_today": emails_today,
        "emails_this_week": emails_this_week
    }

@router.get("/")
def get_emails(
    session_id: str,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    search: Optional[str] = None,
    category: Optional[str] = None,
    classification: Optional[str] = None,
    is_read: Optional[bool] = None,
    has_deadline: Optional[bool] = None,
    priority: Optional[str] = None,
    sort_by: Optional[str] = "priority", # "priority" or "date"
    db: Session = Depends(get_db)
):
    user_id = get_current_user_id(session_id, db)
    
    query = db.query(Email).filter(Email.user_id == user_id)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Email.subject.ilike(search_term),
                Email.sender.ilike(search_term),
                Email.summary.ilike(search_term),
                Email.classification.ilike(search_term),
                Email.category.ilike(search_term)
            )
        )
        
    if category:
        query = query.filter(Email.category.ilike(f"%{category}%"))
        
    if classification:
        query = query.filter(Email.classification.ilike(f"%{classification}%"))
        
    if is_read is not None:
        query = query.filter(Email.is_read == is_read)
        
    if has_deadline:
        query = query.filter(Email.deadline != None)
        
    if priority:
        if priority.lower() == "high":
            query = query.filter(Email.priority_score >= 80)
        elif priority.lower() == "medium":
            query = query.filter(Email.priority_score >= 50, Email.priority_score < 80)
        elif priority.lower() == "low":
            query = query.filter(Email.priority_score < 50)
            
    if sort_by == "date":
        query = query.order_by(Email.received_at.desc())
    else:
        query = query.order_by(Email.priority_score.desc().nullslast(), Email.received_at.desc())
    
    # Get total count for pagination
    total_count = query.count()
    
    emails = query.limit(limit).offset(offset).all()
    
    return {
        "total": total_count,
        "emails": emails
    }

@router.get("/{email_id}")
def get_email(
    email_id: int,
    session_id: str,
    db: Session = Depends(get_db)
):
    user_id = get_current_user_id(session_id, db)
    
    email = (
        db.query(Email)
        .filter(Email.id == email_id, Email.user_id == user_id)
        .first()
    )
    
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
        
    return email
