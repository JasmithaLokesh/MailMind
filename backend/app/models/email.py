from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    Boolean,
    ForeignKey
)

from sqlalchemy.sql import func
from app.core.database import Base


class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    gmail_id = Column(
        String,
        unique=True,
        nullable=False
    )

    thread_id = Column(String)

    sender = Column(Text)

    subject = Column(Text)

    body = Column(Text)

    received_at = Column(DateTime(timezone=True))

    category = Column(String)

    is_read = Column(Boolean)

    is_starred = Column(Boolean)

    priority_score = Column(Integer)

    summary = Column(Text)

    action_items = Column(Text)

    classification = Column(String)

    deadline = Column(DateTime(timezone=True))

    suggested_reply = Column(Text)

    importance_reason = Column(Text)

    ai_processed = Column(
        Boolean,
        default=False
    )

    confidence = Column(String)

    sentiment = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )