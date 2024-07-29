from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from models.entry import Entry

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    total_miles = db.Column(db.Integer, nullable=False)
    image_path = db.Column(db.String)
    custom = db.Column(db.Boolean, default=False)

    entries = db.relationship('Entry', back_populates='trip', cascade='all, delete-orphan')
    users = association_proxy('entries', 'user', creator=lambda user_obj: Entry(user=user_obj))

    serialize_rules = ('-entries.trip',)

    def __repr__(self):
        return f'<Trip id={self.id}, name={self.name}, location={self.location}, miles={self.total_miles}>'

    @validates('name', 'location')
    def validate_inputs(self, key, input):
        if input == '':
            raise ValueError(f'{key} required')
        else:
            return input
        
    @validates('total_miles')
    def validate_total_miles(self, key, total_miles):
        if float(total_miles) <= 0:
            raise ValueError('Total miles cannot be negative')
        else:
            return total_miles