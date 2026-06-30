from app.ai.email_classifier import classify_email
from app.ai.email_summarizer import summarize_email
from app.ai.reply_generator import generate_reply
from app.ai.sentiment_analyzer import analyze_sentiment
from app.ai.ner_extractor import extract_entities
from app.ai.spam_detector import detect_spam

from app.services.deadline_service import extract_deadline
from app.services.action_service import extract_actions
from app.services.tag_service import generate_tags
from app.utils.text_preprocessor import preprocess_email

from app.ai.importance_explainer import (
    generate_importance_reason
)


def calculate_priority(
    category,
    confidence
):

    priority = confidence * 100

    if category == "Job interview invitation":
        priority += 50

    elif category == "Internship opportunity":
        priority += 45

    elif category == "Campus placement email":
        priority += 45

    elif category == "Recruiter communication":
        priority += 40

    elif category == "Meeting invitation":
        priority += 30

    elif category == "Assignment submission":
        priority += 25

    elif category == "Deadline reminder":
        priority += 25

    elif category == "Promotional email":
        priority -= 15

    elif category == "Newsletter":
        priority -= 10

    return int(min(max(priority, 0), 100))


def analyze_email(email_text: str):

    email_text = preprocess_email(email_text)

    print("1. CLASSIFIER")

    classification = classify_email(
        email_text
    )

    print("2. PRIORITY")

    priority = calculate_priority(
        classification["category"],
        classification["confidence"]
    )

    print("3. DEADLINE")

    deadline = extract_deadline(
        email_text
    )

    print("4. SUMMARY")

    summary = summarize_email(
        email_text
    )

    print("5. ACTIONS")

    actions = extract_actions(
        email_text
    )

    print("6. IMPORTANCE")

    reason = generate_importance_reason(
        classification["category"],
        deadline["deadline"],
        actions
    )

    print("7. TAGS")

    tags = generate_tags(
        classification["category"],
        priority,
        deadline["deadline"],
        actions
    )

    print("8. SENTIMENT")

    sentiment = analyze_sentiment(
        email_text
    )

    print("9. SPAM")

    try:

        spam = detect_spam(
            email_text
        )

    except Exception:

        spam = {
            "spam_label": "No spam",
            "spam_score": 1.0
        }

    print("10. ENTITIES")

    try:

        entities = extract_entities(
            email_text
        )

    except Exception:

        entities = {
            "people": [],
            "organizations": [],
            "locations": []
        }

    print("11. REPLY")

    reply = generate_reply(
        classification["category"],
        email_text
    )

    print("AI COMPLETE")

    return {

        "classification":
            classification["category"],

        "confidence":
            classification["confidence"],

        "priority_score":
            priority,

        "deadline":
            deadline["deadline"],

        "summary":
            summary,

        "action_items":
            actions,

        "importance_reason":
            reason,

        "tags":
            tags,

        "sentiment":
            sentiment["sentiment"],

        "spam_label":
            spam["spam_label"],

        "spam_score":
            spam["spam_score"],

        "entities":
            entities,

        "suggested_reply":
            reply

    }