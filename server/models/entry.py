from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
import re

class Entry(db.Model, SerializerMixin):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String, nullable=False)
    miles = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'), nullable=False)

    user = db.relationship('User', back_populates='entries')
    trip = db.relationship('Trip', back_populates='entries')

    def __repr__(self):
        return f'<Entry date={self.date}, miles={self.miles}, user_id={self.user_id}, trip_id={self.trip_id}>'

    @validates('date')
    def validate_date(self, key, date):
        if not re.fullmatch(r'\d{2}-\d{2}-\d{2}', date):
            raise ValueError('Invalid date format')
        else:
            return date
        
    @validates('miles')
    def validate_miles(self, key, miles):
        if miles <= 0:
            raise ValueError('Miles must be greater than 0')
        else:
            return miles