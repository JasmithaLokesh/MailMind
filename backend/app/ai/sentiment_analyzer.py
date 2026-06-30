from app.ai.model_manager import get_sentiment

def analyze_sentiment(text: str):

    model = get_sentiment()

    result = model(text[:512])[0]

    return {
        "sentiment": result["label"],
        "sentiment_score": round(float(result["score"]), 2)
    }