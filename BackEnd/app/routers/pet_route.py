from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from schemas.pet_schema import PetDetailSchema, GetPetsTypeSchema, GetPetsDetailSchema
from db.db import get_db
from crud.crud_user import create_pet_in_db, delete_pet
from utils.authentication import get_current_user
from models.model import UserModel, PetTypeModel, PetDetailModel
from uuid import UUID

router = APIRouter(prefix="/pet", tags=["pet"])


@router.get(
    "/pet-details", response_model=GetPetsDetailSchema, status_code=status.HTTP_200_OK
)
def get_pet_details(
    db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)
):
    pet_details = (
        db.query(PetDetailModel).filter(PetDetailModel.user_id == current_user.id).all()
    )
    return {"pets": pet_details}


@router.get(
    "/pet-types", response_model=GetPetsTypeSchema, status_code=status.HTTP_200_OK
)
def get_pet_type(db: Session = Depends(get_db)):
    pet_types = db.query(PetTypeModel).all()
    return {"pettypes": pet_types}


@router.post("/add-pet", status_code=status.HTTP_201_CREATED)
def create_pet(
    data: PetDetailSchema,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    pet = create_pet_in_db(data, current_user.id, db)
    return {"msg": "Pet created successfully"}


@router.delete("/delete/{pet_id}")
def delete(
    pet_id: str,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    delete_pet(pet_id, current_user.id, db)
    return {"msg": "Pet deleted successfully"}
