from transformers import pipeline

spam_model = None


def get_spam_detector():

    global spam_model

    if spam_model is None:

        spam_model = pipeline(
            "text-classification",
            model="dima806/email-spam-detection-roberta"
        )

    return spam_model


def detect_spam(text: str):

    model = get_spam_detector()

    result = model(text)

    label = result[0]["label"]

    score = float(
        result[0]["score"]
    )

    return {
        "spam_label": label,
        "spam_score": round(score, 2)
    }