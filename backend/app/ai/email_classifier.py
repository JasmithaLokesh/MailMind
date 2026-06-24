from transformers import pipeline

classifier = None


def get_classifier():

    global classifier

    if classifier is None:

        classifier = pipeline(
            "zero-shot-classification",
            model="facebook/bart-large-mnli"
        )

    return classifier


CATEGORIES = [
    "Job interview invitation",
    "Internship opportunity",
    "Campus placement email",
    "Recruiter communication",
    "Meeting invitation",
    "Assignment submission",
    "Deadline reminder",
    "Finance and payment",
    "Invoice",
    "Academic communication",
    "Promotional email",
    "Newsletter",
    "Social message",
    "Personal email",
    "Spam email"
]


def classify_email(text: str):

    classifier = get_classifier()

    result = classifier(
        text,
        CATEGORIES
    )

    confidence = float(
        result["scores"][0]
    )

    category = result["labels"][0]

    if confidence < 0.25:

        return {
            "category": "General",
            "confidence": confidence
        }

    return {
        "category": category,
        "confidence": confidence
    }