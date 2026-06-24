from app.models.email_analysis import EmailAnalysis


def save_analysis(
    db,
    result
):

    analysis = EmailAnalysis(

        category=result["category"],

        priority=int(
            result["priority"]
        ),

        deadline=result["deadline"],

        summary=result["summary"],

        importance_reason=result[
            "importance_reason"
        ],

        sentiment=result["sentiment"],

        spam_label=result["spam_label"]
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis