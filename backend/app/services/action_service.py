import re


ACTION_WORDS = [

    "submit",
    "upload",
    "attend",
    "join",
    "bring",
    "review",
    "complete",
    "pay",
    "register",
    "reply",
    "confirm",
    "schedule"

]


def extract_actions(
    email_text: str
):

    actions = []

    sentences = re.split(
        r"[.!?\n]",
        email_text
    )

    for sentence in sentences:

        sentence = sentence.strip()

        for word in ACTION_WORDS:

            if word.lower() in sentence.lower():

                actions.append(
                    sentence
                )

                break

    return actions