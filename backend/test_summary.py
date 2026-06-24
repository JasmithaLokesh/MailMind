from app.ai.email_summarizer import summarize_email

text = """
Dear Candidate,

We are pleased to inform you that you have been shortlisted
for the next round of interviews.

The interview is scheduled for 28 June 2026 at 10:00 AM.

Please bring your ID proof and updated resume.
"""

print(
    summarize_email(text)
)