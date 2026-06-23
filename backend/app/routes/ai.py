from fastapi import APIRouter
from app.ai.email_classifier import classify_email

router = APIRouter()


@router.get("/")
def test_ai():

    return {
        "message": "AI route working"
    }


@router.post("/classify")
def classify(data: dict):

    email_text = data["email_text"]

    result = classify_email(
        email_text
    )

    return result