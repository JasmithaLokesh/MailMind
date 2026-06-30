from app.ai.model_manager import get_summarizer

def summarize_email(text: str):

    model = get_summarizer()

    if len(text.split()) < 30:
        return text

    result = model(
        text,
        max_length=60,
        min_length=15,
        do_sample=False,
        truncation=True
    )

    return result[0]["summary_text"]