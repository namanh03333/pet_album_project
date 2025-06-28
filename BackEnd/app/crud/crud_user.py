from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.model import UserModel, PetDetailModel
from schemas.user_schema import UserSchema, UserLoginSchema
from schemas.pet_schema import PetDetailSchema
from utils.authentication import hash_password, verify_passwword, create_access_token


def create_user(data: UserSchema, db: Session):
    if db.query(UserModel).filter(UserModel.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = UserModel(
        email=data.email,
        username=data.username,
        password=hash_password(data.password),
        phone=data.phone,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def create_pet_in_db(data: PetDetailSchema, user_id: str, db=Session):

    pet = PetDetailModel(
        pet_name=data.pet_name,
        pet_age=data.pet_age,
        pet_image=data.pet_image,
        comment=data.comment,
        user_id=user_id,
        pet_type_id=data.pet_type_id,
    )
    db.add(pet)
    db.commit()
    db.refresh(pet)
    return pet


def delete_pet(pet_id: str, user_id: str, db=Session):
    pet = (
        db.query(PetDetailModel)
        .filter(PetDetailModel.id == pet_id, PetDetailModel.user_id == user_id)
        .first()
    )
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    db.delete(pet)
    db.commit()
    return {"msg": "Pet deleted successfully"}


def authenticate_user(data: UserLoginSchema, db: Session):
    user = db.query(UserModel).filter(UserModel.email == data["email"]).first()
    if not user or not verify_passwword(data["password"], user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(user.id)})
    return access_token, user
