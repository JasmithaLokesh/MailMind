from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def create_audit_log(
    db: Session,
    user_id: int,
    action: str,
    status: str,
    session_id: str = None
):

    log = AuditLog(
        user_id=user_id,
        action=action,
        status=status,
        session_id=session_id
    )

    db.add(log)

    db.commit()