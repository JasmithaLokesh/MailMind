from bs4 import BeautifulSoup
import re


MAX_TEXT_LENGTH = 1000


def preprocess_email(text: str) -> str:

    if not text:
        return ""

    # Remove HTML tags
    text = BeautifulSoup(
        text,
        "html.parser"
    ).get_text(
        separator=" "
    )

    # Remove URLs
    text = re.sub(
        r"http\S+",
        " ",
        text
    )

    # Remove extra spaces
    text = re.sub(
        r"\s+",
        " ",
        text
    ).strip()

    # Limit length
    return text[:MAX_TEXT_LENGTH]