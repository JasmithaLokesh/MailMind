from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.services.ai_service import analyze_email
from app.services.email_analysis_service import save_analysis

router = APIRouter()


@router.get("/")
def test_ai():

    return {
        "message": "AI route working"
    }


@router.post("/classify")
def classify(
    data: dict,
    db: Session = Depends(get_db)
):

    email_text = data["email_text"]

    result = analyze_email(
        email_text
    )

    # Save only if an email_id is provided
    if "email_id" in data:

        save_analysis(
            db,
            data["email_id"],
            result
        )

    return result