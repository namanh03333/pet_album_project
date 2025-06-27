from uuid import UUID
from pydantic import BaseModel, Field, EmailStr
from typing import List


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserSchema(BaseModel):
    email: EmailStr
    password: str
    phone: str
    username: str

    class Config:
        orm_mode = True


class GetUserSchema(BaseModel):
    id: UUID
    email: EmailStr
    phone: str
    username: str

    class Config:
        orm_mode = True


class GetUsersSchema(BaseModel):
    users: List[GetUserSchema]

    class Config:
        orm_mode = True
