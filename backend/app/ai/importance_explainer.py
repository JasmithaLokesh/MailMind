def generate_importance_reason(
    category: str,
    deadline: str | None,
    actions: list
):

    if category == "Interview":

        return (
            f"This email contains an interview invitation."
            f" Deadline: {deadline}. "
            f"It also requires the following actions: "
            f"{', '.join(actions)}."
        )

    elif category == "Job Application":

        return (
            f"This email relates to a job application."
            f" Deadline: {deadline}."
        )

    elif category == "Meeting":

        return (
            f"This email contains meeting information."
            f" Deadline: {deadline}."
        )

    elif category == "Finance":

        return (
            "This email contains financial information "
            "that may require your attention."
        )

    elif category == "Promotion":

        return (
            "This is a promotional email and is less important."
        )

    else:

        return (
            "This email may contain useful information."
        )