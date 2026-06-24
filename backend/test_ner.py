from app.ai.ner_extractor import (
    extract_entities
)

email = """
Dear Candidate,

Your interview with Google is scheduled on 28 June 2026.

Please contact Sarah Johnson.

Location: Bangalore Office
"""

print(
    extract_entities(email)
)