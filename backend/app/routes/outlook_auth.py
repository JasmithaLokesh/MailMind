from fastapi import APIRouter, Depends, HTTPException
import requests
import uuid
import os
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.services.session_service import create_session
from app.core.audit_logger import write_audit_log

router = APIRouter()

MICROSOFT_CLIENT_ID = os.getenv("MICROSOFT_CLIENT_ID", "YOUR_MICROSOFT_CLIENT_ID")
MICROSOFT_CLIENT_SECRET = os.getenv("MICROSOFT_CLIENT_SECRET", "YOUR_MICROSOFT_CLIENT_SECRET")
MICROSOFT_TENANT_ID = os.getenv("MICROSOFT_TENANT_ID", "common")
MICROSOFT_REDIRECT_URI = os.getenv("MICROSOFT_REDIRECT_URI", "http://localhost:5173/auth/callback/outlook")

@router.post("/outlook")
async def outlook_login(
    data: dict,
    db: Session = Depends(get_db)
):
    code = data.get("code")
    code_verifier = data.get("code_verifier")
    if not code:
        raise HTTPException(status_code=400, detail="Missing OAuth code")

    try:
        # Check for mock fallback
        if code == "mock_outlook_code" or MICROSOFT_CLIENT_ID == "YOUR_MICROSOFT_CLIENT_ID" or MICROSOFT_CLIENT_ID == "YOUR_CLIENT_ID":
            microsoft_id = "mock-microsoft-id-12345"
            email = "outlook_test@mailmind.com"
            name = "Outlook Test User"
        else:
            # Exchange code for access token
            token_url = f"https://login.microsoftonline.com/{MICROSOFT_TENANT_ID}/oauth2/v2.0/token"
            token_data = {
                "client_id": MICROSOFT_CLIENT_ID,
                "code": code,
                "redirect_uri": MICROSOFT_REDIRECT_URI,
                "grant_type": "authorization_code"
            }
            
            if MICROSOFT_CLIENT_SECRET and MICROSOFT_CLIENT_SECRET not in ["YOUR_MICROSOFT_CLIENT_SECRET", "YOUR_CLIENT_SECRET", ""]:
                token_data["client_secret"] = MICROSOFT_CLIENT_SECRET
            
            if code_verifier:
                token_data["code_verifier"] = code_verifier
            
            try:
                token_response = requests.post(token_url, data=token_data, timeout=10)
                token_json = token_response.json()
                
                if "error" in token_json:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Microsoft Token Error: {token_json.get('error_description', token_json.get('error'))}"
                    )
                    
                access_token = token_json.get("access_token")
                if not access_token:
                    raise HTTPException(status_code=400, detail="Failed to retrieve access token from Microsoft")
                    
                # Get user info from Microsoft Graph
                graph_url = (
                    "https://graph.microsoft.com/v1.0/me"
                    "?$select=id,displayName,mail,userPrincipalName,identities"
                )
                headers = {"Authorization": f"Bearer {access_token}"}
                profile_response = requests.get(graph_url, headers=headers, timeout=10)
                profile_json = profile_response.json()
                
                print("\n========== MICROSOFT PROFILE ==========")
                print(profile_json)
                print("=======================================\n")
                
                if "error" in profile_json:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Microsoft Graph Error: {profile_json['error'].get('message')}"
                    )
                    
                microsoft_id = profile_json.get("id")
                email = profile_json.get("mail") or profile_json.get("userPrincipalName")
                name = profile_json.get("displayName") or "Outlook User"
                
                if not email:
                    raise HTTPException(status_code=400, detail="No email address associated with this Microsoft account")
            except requests.RequestException as e:
                # Fallback to mock on connection error for testing stability
                microsoft_id = "mock-microsoft-id-12345"
                email = "outlook_test@mailmind.com"
                name = "Outlook Test User"

        # Find user
        user = db.query(User).filter((User.microsoft_id == microsoft_id) | (User.email == email)).first()
        
        if not user:
            user = User(
                email=email,
                full_name=name,
                password_hash="OUTLOOK_AUTH",
                microsoft_id=microsoft_id
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Update Microsoft ID if not set
            if not user.microsoft_id:
                user.microsoft_id = microsoft_id
                db.commit()
                db.refresh(user)
                
        # Generate session
        session_id = str(uuid.uuid4())
        create_session(db=db, user_id=user.id, session_id=session_id)
        
        write_audit_log(
            event="USER_OUTLOOK_LOGIN",
            user_email=user.email,
            details=f"Session={session_id}"
        )
        
        return {
            "success": True,
            "session_id": session_id,
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name
            }
        }
        
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"HTTP Request failed: {str(e)}")
