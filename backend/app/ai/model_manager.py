from transformers import pipeline

_classifier = None
_summarizer = None
_sentiment = None
_spam = None
_ner = None


def get_classifier():
    global _classifier

    if _classifier is None:
        print("Loading classifier...")
        _classifier = pipeline(
            "text-classification",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )
        print("Classifier loaded.")

    return _classifier


def get_summarizer():
    global _summarizer

    if _summarizer is None:
        print("Loading summarizer...")
        _summarizer = pipeline(
            "summarization",
            model="sshleifer/distilbart-cnn-12-6"
        )
        print("Summarizer loaded.")

    return _summarizer


def get_sentiment():
    global _sentiment

    if _sentiment is None:
        print("Loading sentiment...")
        _sentiment = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )
        print("Sentiment loaded.")

    return _sentiment


def get_spam():
    global _spam

    if _spam is None:
        print("Loading spam detector...")
        _spam = pipeline(
            "text-classification",
            model="dima806/email-spam-detection-roberta"
        )
        print("Spam detector loaded.")

    return _spam


def get_ner():
    global _ner

    if _ner is None:
        print("Loading NER...")
        _ner = pipeline(
            "ner",
            model="dslim/bert-base-NER",
            aggregation_strategy="simple"
        )
        print("NER loaded.")

    return _ner