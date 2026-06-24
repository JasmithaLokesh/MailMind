def generate_reply(
    category: str,
    email_text: str
):

    category = category.lower()

    if "interview" in category:

        return """
Dear Hiring Team,

Thank you for the interview invitation.

I confirm my availability for the scheduled interview and look forward to speaking with you.

Regards,
Jasmitha
"""

    elif "internship" in category:

        return """
Dear Team,

Thank you for considering my application.

I am excited about this opportunity and confirm my interest in proceeding further.

Regards,
Jasmitha
"""

    elif "meeting" in category:

        return """
Hello,

Thank you for the invitation.

I confirm my attendance for the meeting.

Regards,
Jasmitha
"""

    elif "assignment" in category:

        return """
Hello,

Thank you for the reminder.

I will complete and submit the assignment before the deadline.

Regards,
Jasmitha
"""

    else:

        return """
Hello,

Thank you for your email.

I have received your message and will respond if any action is required.

Regards,
Jasmitha
"""