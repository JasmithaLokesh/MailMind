from app.ai.model_manager import get_classifier

def classify_email(text: str):

    classifier = get_classifier()

    result = classifier(text[:1800])[0]

    confidence = float(result["score"])

    prediction = result["label"]

    text_lower = text.lower()

    category = "General"

    if "interview" in text_lower:
        category = "Job interview invitation"

    elif "internship" in text_lower:
        category = "Internship opportunity"

    elif "campus placement" in text_lower:
        category = "Campus placement email"

    elif "recruiter" in text_lower:
        category = "Recruiter communication"

    elif "meeting" in text_lower:
        category = "Meeting invitation"

    elif "assignment" in text_lower:
        category = "Assignment submission"

    elif "deadline" in text_lower:
        category = "Deadline reminder"

    elif "invoice" in text_lower:
        category = "Invoice"

    elif "payment" in text_lower:
        category = "Finance and payment"

    elif "newsletter" in text_lower:
        category = "Newsletter"

    elif "promotion" in text_lower:
        category = "Promotional email"

    elif "amazon" in text_lower:
        category = "Recruiter communication"

    elif "google" in text_lower:
        category = "Recruiter communication"

    elif "microsoft" in text_lower:
        category = "Recruiter communication"

    elif prediction == "NEGATIVE":
        category = "Spam email"

    return {
        "category": category,
        "confidence": confidence
    }