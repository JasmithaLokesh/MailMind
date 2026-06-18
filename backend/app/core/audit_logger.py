from datetime import datetime

LOG_FILE = "audit.log"

def write_audit_log(
    event: str,
    user_email: str = "",
    details: str = ""
):
    with open(LOG_FILE, "a") as f:
        f.write(
            f"[{datetime.utcnow()}] "
            f"EVENT={event} | "
            f"USER={user_email} | "
            f"DETAILS={details}\n"
        )