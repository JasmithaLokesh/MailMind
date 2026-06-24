def generate_tags(
    category,
    priority,
    deadline,
    actions
):

    tags = []

    tags.append(category)

    if priority >= 80:

        tags.append(
            "High Priority"
        )

    elif priority >= 50:

        tags.append(
            "Medium Priority"
        )

    else:

        tags.append(
            "Low Priority"
        )

    if deadline:

        tags.append(
            "Deadline"
        )

    if actions:

        tags.append(
            "Action Required"
        )

    return tags