import os

from fastapi_mail import (
    FastMail,
    MessageSchema,
    ConnectionConfig
)

from dotenv import load_dotenv

from pathlib import Path

load_dotenv()


conf = ConnectionConfig(

    MAIL_USERNAME=os.getenv(
        "MAIL_USERNAME"
    ),

    MAIL_PASSWORD=os.getenv(
        "MAIL_PASSWORD"
    ),

    MAIL_FROM=os.getenv(
        "MAIL_FROM"
    ),

    MAIL_PORT=int(
        os.getenv("MAIL_PORT")
    ),

    MAIL_SERVER=os.getenv(
        "MAIL_SERVER"
    ),

    MAIL_STARTTLS=True,

    MAIL_SSL_TLS=False,

    USE_CREDENTIALS=True,

    VALIDATE_CERTS=True
)

async def send_password_reset_email(
    recipient: str,
    reset_link: str
):

    template_path = (
        Path(__file__).parent.parent
        / "templates"
        / "password_reset.html"
    )

    html = template_path.read_text(
        encoding="utf-8"
    )

    html = html.replace(
        "{{RESET_LINK}}",
        reset_link
    )

    message = MessageSchema(
        subject="Reset your MailMind password",
        recipients=[recipient],
        body=html,
        subtype="html"
    )

    fm = FastMail(conf)

    await fm.send_message(message)

    print(f"✅ Password reset email sent to {recipient}")