def calculate_priority(
    category,
    confidence
):

    category_scores = {

        "Interview": 95,
        "Job Application": 90,
        "Meeting": 85,
        "Finance": 80,
        "Personal": 60,
        "Promotion": 20

    }

    base_score = category_scores.get(
        category,
        50
    )

    adjusted_score = (
        base_score * 0.8 +
        confidence * 20
    )

    return round(
        adjusted_score,
        2
    )