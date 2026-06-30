from app.ai.model_manager import get_spam

def detect_spam(text: str):

    model = get_spam()

    result = model(
        text[:1800]
    )

    label = result["label"]
    score = float(result["score"])

    if label.upper() in ["LABEL_1", "SPAM"]:
        spam_label = "Spam"
    else:
        spam_label = "No spam"

    return {
        "spam_label": spam_label,
        "spam_score": round(score, 2)
    }