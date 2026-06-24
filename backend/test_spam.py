from app.ai.spam_detector import (
    detect_spam
)

email = """
Dear Candidate,

Your interview is scheduled on 28 June 2026.

Regards,
HR Team
"""

print(
    detect_spam(email)
)