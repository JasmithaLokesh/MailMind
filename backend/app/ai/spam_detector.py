# from transformers import pipeline

# spam_model = None


# def get_spam_detector():

#     global spam_model

#     if spam_model is None:

#         spam_model = pipeline(
#             "text-classification",
#             model="dima806/email-spam-detection-roberta"
#         )

#     return spam_model


# def detect_spam(text: str):

#     model = get_spam_detector()

#     result = model(text)

#     label = result[0]["label"]

#     score = float(
#         result[0]["score"]
#     )

#     return {
#         "spam_label": label,
#         "spam_score": round(score, 2)
#     }

from transformers import pipeline

spam_model = None

def get_spam_detector():

    print("GET SPAM 1")

    global spam_model

    print("GET SPAM 2")

    if spam_model is None:

        print("GET SPAM 3")

        spam_model = pipeline(
            "text-classification",
            model="dima806/email-spam-detection-roberta"
        )

        print("GET SPAM 4")

    return spam_model


def detect_spam(text: str):

    print("SPAM 1")

    model = get_spam_detector()

    print("SPAM 2")

    result = model(text)

    print("SPAM 3")

    return result