from transformers import pipeline

sentiment_model = None


def get_sentiment_model():

    global sentiment_model

    if sentiment_model is None:

        sentiment_model = pipeline(
            "sentiment-analysis"
        )

    return sentiment_model


def analyze_sentiment(
    text: str
):

    model = get_sentiment_model()

    result = model(text)[0]

    return {
        "sentiment": result["label"],
        "sentiment_score": round(
            result["score"],
            2
        )
    }