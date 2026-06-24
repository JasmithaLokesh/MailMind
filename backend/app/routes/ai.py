from fastapi import APIRouter

from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.ai.email_classifier import classify_email

from app.services.ai_service import (
    calculate_priority
)

from app.services.deadline_service import (
    extract_deadline
)

from app.ai.email_summarizer import (
    summarize_email
)

from app.services.action_service import (
    extract_actions
)

from app.ai.importance_explainer import (
    generate_importance_reason
)

from app.services.tag_service import (
    generate_tags
)

from app.ai.sentiment_analyzer import (
    analyze_sentiment
)

from app.ai.ner_extractor import (
    extract_entities
)

from app.ai.spam_detector import (
    detect_spam
)

from app.ai.reply_generator import (
    generate_reply
)

from app.services.email_analysis_service import (
    save_analysis
)

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

    print("STEP 1")

    email_text = data["email_text"]

    result = classify_email(
        email_text
    )

    print("STEP 2")

    priority = calculate_priority(
        result["category"],
        result["confidence"]
    )

    print("STEP 3")

    deadline_data = extract_deadline(
        email_text
    )

    print("STEP 4")

    summary = summarize_email(
        email_text
    )

    print("STEP 5")

    actions = extract_actions(
        email_text
    )

    print("STEP 6")

    importance_reason = (
        generate_importance_reason(
            result["category"],
            deadline_data["deadline"],
            actions
        )
    )

    print("STEP 7")
    tags = generate_tags(
    result["category"],
    priority,
    deadline_data["deadline"],
    actions
    )

    print("STEP 8")
    sentiment = analyze_sentiment(
    email_text
    )

    print("STEP 9")
    spam_result = detect_spam(
    email_text
    )

    print("STEP 10")
    entities = extract_entities(
    email_text
    )

    print("STEP 11")
    reply = generate_reply(
    result["category"],
    email_text
    )

    print("DONE")

    result.update(deadline_data)

    result["priority"] = priority

    result["summary"] = summary

    result["actions"] = actions

    result["importance_reason"] = (
        importance_reason
    )

    result["tags"] = tags

    result.update(sentiment)

    result.update(
    spam_result
    )

    result["entities"] = entities

    result["suggested_reply"] = reply

    save_analysis(
    db,
    result
    )

    return result