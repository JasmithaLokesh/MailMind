def success_response(
    message: str,
    details=None,
    session_id=None
):

    return {
        "success": True,
        "error_code": "SUCCESS_001",
        "message": message,
        "session_id": session_id,
        "details": details
    }


def error_response(
    error_code: str,
    message: str
):

    return {
        "success": False,
        "error_code": error_code,
        "message": message
    }