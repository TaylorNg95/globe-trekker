from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    total_miles = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<User id={self.id}, name={self.name}, username={self.username}>'

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Name required')
        else:
            return name