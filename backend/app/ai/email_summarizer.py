from transformers import pipeline

summarizer = None


def get_summarizer():

    global summarizer

    if summarizer is None:

        summarizer = pipeline(
            "summarization",
            model="sshleifer/distilbart-cnn-12-6"
        )

    return summarizer


def summarize_email(
    text: str
):

    model = get_summarizer()

    if len(text.split()) < 30:
        return text

    result = model(
        text,
        max_length=60,
        min_length=15,
        do_sample=False
    )

    return result[0]["summary_text"]