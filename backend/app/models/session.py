from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from sqlalchemy.sql import func

from app.core.database import Base


class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(Integer)

    session_id = Column(
        String,
        unique=True
    )

    status = Column(String)

    login_time = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )