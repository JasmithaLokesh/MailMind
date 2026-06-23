from transformers import pipeline

classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

CATEGORIES = [
    "Recruiter",
    "Interview",
    "Internship",
    "Placement",
    "Meeting",
    "Assignment",
    "Deadline",
    "Finance",
    "Invoice",
    "Academic",
    "Promotion",
    "Newsletter",
    "Social",
    "Personal",
    "Spam"
]

def classify_email(text: str):

    result = classifier(
        text,
        CATEGORIES
    )

    return {
        "category": result["labels"][0],
        "confidence": float(result["scores"][0])
    }