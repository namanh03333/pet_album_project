from uuid import UUID
from pydantic import BaseModel, Field, EmailStr
from typing import List


class PetDetailSchema(BaseModel):
    pet_name: str
    pet_age: int
    pet_image: str
    comment: str
    pet_type_id: str

    class Config:
        orm_mode = True


class GetPetDetailSchema(BaseModel):
    id: UUID
    pet_name: str
    pet_age: int
    pet_image: str
    comment: str
    user_id: str
    pet_type_id: str

    class Config:
        orm_mode = True


class GetPetsDetailSchema(BaseModel):
    pets: List[GetPetDetailSchema]

    class Config:
        orm_mode = True


class GetPetTypeSchema(BaseModel):
    id: UUID
    type_name: str

    class Config:
        orm_mode = True


class GetPetsTypeSchema(BaseModel):
    pettypes: List[GetPetTypeSchema]

    class Config:
        orm_mode = True
