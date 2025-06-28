from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from schemas.user_schema import UserLoginSchema, UserSchema
from db.db import get_db
from crud.crud_user import create_user, authenticate_user


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: UserSchema, db: Session = Depends(get_db)):
    user = create_user(data, db)
    return {"msg": "User registered successfully", "user_id": user.id}


@router.post("/login", status_code=status.HTTP_200_OK)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):

    data = {"email": form_data.username, "password": form_data.password}
    token, user = authenticate_user(data, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserSchema.from_orm(user),
    }
