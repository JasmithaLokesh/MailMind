from sqlalchemy.orm import Session

from app.models.session import UserSession


def create_session(
    db: Session,
    user_id: int,
    session_id: str
):
    session = UserSession(
        user_id=user_id,
        session_id=session_id,
        status="ACTIVE"
    )

    db.add(session)
    db.commit()

    return session


def deactivate_session(
    db: Session,
    session_id: str
):
    session = (
        db.query(UserSession)
        .filter(
            UserSession.session_id == session_id
        )
        .first()
    )

    if session:
        session.status = "INACTIVE"
        db.commit()

    return session


def validate_session(
    db: Session,
    session_id: str
):
    return (
        db.query(UserSession)
        .filter(
            UserSession.session_id == session_id,
            UserSession.status == "ACTIVE"
        )
        .first()
    )