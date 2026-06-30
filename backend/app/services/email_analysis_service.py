from app.models.email import Email


def save_analysis(
    db,
    email_id,
    result
):

    email = (
        db.query(Email)
        .filter(
            Email.id == email_id
        )
        .first()
    )

    if email is None:
        return

    email.classification = result["classification"]

    email.priority_score = result["priority_score"]

    email.summary = result["summary"]

    email.action_items = (
        "\n".join(result["action_items"])
        if isinstance(
            result["action_items"],
            list
        )
        else result["action_items"]
    )

    email.deadline = result["deadline"]

    email.suggested_reply = (
        result["suggested_reply"]
    )

    email.importance_reason = (
        result["importance_reason"]
    )

    email.confidence = str(
        result["confidence"]
    )

    email.sentiment = (
        result["sentiment"]
    )

    email.ai_processed = True

    db.commit()

    db.refresh(email)

    return email