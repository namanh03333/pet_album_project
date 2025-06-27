import uuid
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from db.db import Base


def generate_uuid():
    return str(uuid.uuid4())


class UserModel(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, default=generate_uuid)
    pets = relationship("PetDetailModel", backref="owner")
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    username = Column(String, nullable=False, unique=True)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow())

    def dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "phone": self.phone,
            "username": self.username,
            "created_at": self.created_at,
        }


class PetTypeModel(Base):
    __tablename__ = "pet_type"

    id = Column(String, primary_key=True, default=generate_uuid)
    type_name = Column(String, nullable=False, unique=True)
    pets = relationship("PetDetailModel", backref="type")

    def dict(self):
        return {"id": self.id, "type_name": self.type_name}


class PetDetailModel(Base):
    __tablename__ = "pet_details"

    id = Column(String, primary_key=True, default=generate_uuid)
    pet_name = Column(String, nullable=False)
    pet_age = Column(Integer, nullable=False)
    pet_image = Column(String, nullable=False)
    comment = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow())
    user_id = Column(String, ForeignKey("user.id"))
    pet_type_id = Column(String, ForeignKey("pet_type.id"))

    def dict(self):
        return {
            "id": self.id,
            "pet_name": self.pet_name,
            "pet_age": self.pet_age,
            "pet_image": self.pet_image,
            "comment": self.comment,
            "created_at": self.created_at,
        }
