import re
import dateparser


def extract_deadline(
    email_text: str
):

    date_patterns = [

        r"\d{1,2}\s+[A-Za-z]+\s+\d{4}",
        r"\d{1,2}/\d{1,2}/\d{4}",
        r"\d{1,2}-\d{1,2}-\d{4}"

    ]

    time_patterns = [

        r"\d{1,2}:\d{2}\s?(AM|PM|am|pm)",
        r"\d{1,2}\s?(AM|PM|am|pm)",
        r"\d{1,2}:\d{2}"

    ]

    extracted_date = None
    extracted_time = None

    # DATE

    for pattern in date_patterns:

        match = re.search(
            pattern,
            email_text
        )

        if match:

            date_text = match.group()

            parsed = dateparser.parse(
                date_text
            )

            if parsed:

                extracted_date = parsed.strftime(
                    "%Y-%m-%d"
                )

                break

    # TIME

    for pattern in time_patterns:

        match = re.search(
            pattern,
            email_text
        )

        if match:

            extracted_time = match.group()

            break

    return {

        "deadline_date": extracted_date,

        "deadline_time": extracted_time,

        "deadline": (
            f"{extracted_date} {extracted_time}"
            if extracted_date and extracted_time
            else extracted_date
        )

    }