from fastapi import APIRouter, HTTPException, Response, Request
from pydantic import BaseModel
import hashlib
import secrets

router = APIRouter()

# Simple in-memory stores for demo purposes
users = {}
sessions = {}


class UserCredentials(BaseModel):
    username: str
    password: str


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


@router.post("/register")
async def register(creds: UserCredentials):
    if creds.username in users:
        raise HTTPException(status_code=400, detail="User already exists")
    users[creds.username] = hash_password(creds.password)
    return {"status": "registered"}


@router.post("/login")
async def login(creds: UserCredentials, response: Response):
    stored = users.get(creds.username)
    if not stored or stored != hash_password(creds.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = secrets.token_hex(16)
    sessions[token] = creds.username
    response.set_cookie("session_token", token, httponly=True)
    return {"status": "logged_in"}


def get_current_user(request: Request) -> str:
    token = request.cookies.get("session_token")
    user = sessions.get(token)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user
