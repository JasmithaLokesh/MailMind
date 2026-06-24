def generate_importance_reason(
    category: str,
    deadline: str | None,
    actions: list
):

    reasons = []

    if category == "Job interview invitation":

        reasons.append(
            "it contains an interview invitation"
        )

    elif category == "Internship opportunity":

        reasons.append(
            "it contains an internship opportunity"
        )

    elif category == "Campus placement email":

        reasons.append(
            "it relates to a campus placement opportunity"
        )

    elif category == "Recruiter communication":

        reasons.append(
            "it contains communication from a recruiter"
        )

    elif category == "Meeting invitation":

        reasons.append(
            "it contains meeting information"
        )

    elif category == "Assignment submission":

        reasons.append(
            "it involves an assignment submission"
        )

    elif category == "Deadline reminder":

        reasons.append(
            "it contains an important deadline"
        )

    elif category == "Finance and payment":

        reasons.append(
            "it contains financial information"
        )

    elif category == "Promotional email":

        return (
            "This is a promotional email and is generally less important."
        )

    if deadline:

        reasons.append(
            f"a deadline exists ({deadline})"
        )

    if actions:

        reasons.append(
            "it requires action from you"
        )

    if reasons:

        return (
            "This email is important because "
            + ", ".join(reasons)
            + "."
        )

    return (
        "This email may contain useful information."
    )