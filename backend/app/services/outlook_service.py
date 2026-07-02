import requests

from app.models.oauth_account import OAuthAccount


def get_outlook_headers(
    db,
    user_id
):

    oauth = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.user_id == user_id,
            OAuthAccount.provider == "outlook"
        )
        .first()
    )

    print("=" * 60)
    print("TOKEN FROM DATABASE")
    print(oauth.access_token)
    print("Length:", len(oauth.access_token))
    print("=" * 60)

    if oauth is None:
        return None

    return {

        "Authorization":
            f"Bearer {oauth.access_token}",

        "Accept":
            "application/json"

    }


def get_outlook_messages(
    db,
    user_id,
    top=50
):

    headers = get_outlook_headers(
        db,
        user_id
    )

    if headers is None:
        return None

    url = (
        "https://graph.microsoft.com/v1.0/me/messages"
        f"?$top={top}"
        "&$orderby=receivedDateTime DESC"
    )

    response = requests.get(
        url,
        headers=headers,
        timeout=20
    )

    print("=" * 60)
    print("STATUS:", response.status_code)
    print(response.text)
    print("=" * 60)

    if response.status_code != 200:
        return {
            "error": response.text,
            "status": response.status_code
        }

    # response.raise_for_status()

    return response.json()