from pydantic import BaseModel
from typing import Any, Optional

class APIResponse(BaseModel):
    success: bool
    error_code: Optional[str] = None
    message: str
    details: Optional[Any] = None
    session_id: Optional[str] = None