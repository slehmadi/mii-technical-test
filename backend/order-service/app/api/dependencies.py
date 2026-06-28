from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

from app.core.config import settings

security = HTTPBearer()

def get_current_use(
        token: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        payload = jwt.decode(
            token=token.credentials,
            key=settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        return {
            "id": int(payload["sub"]),
            "email": payload["email"]
        }
    
    except JWTError:
        HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token",
            headers={"WWW-Authenticate": "Bearer"}
        )