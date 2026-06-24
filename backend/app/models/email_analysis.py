from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.core.database import Base


class EmailAnalysis(Base):

    __tablename__ = "email_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    category = Column(String)

    priority = Column(Integer)

    deadline = Column(String)

    summary = Column(Text)

    importance_reason = Column(Text)

    sentiment = Column(String)

    spam_label = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )