from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.core.database import Base


class OAuthAccount(Base):
    __tablename__ = "oauth_accounts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    provider = Column(
        String,
        nullable=False
    )

    provider_email = Column(
        String,
        nullable=False
    )

    provider_user_id = Column(
        String,
        nullable=False
    )

    access_token = Column(
        String,
        nullable=False
    )

    refresh_token = Column(
        String,
        nullable=True
    )

    token_expiry = Column(
        DateTime(timezone=True),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )