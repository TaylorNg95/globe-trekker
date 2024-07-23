from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<User id={self.id}, name={self.name}, username={self.username}>'

    @validates('name', 'username')
    def validate_name(self, key, input):
        if input == '':
            raise ValueError(f'{key} required')
        else:
            return input
        
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Cannot be accessed')
    
    @password_hash.setter
    def password_hash(self, password):
        if not password:
            raise ValueError('Password required')
        pw_hash = bcrypt.generate_password_hash(password)
        self._password_hash = pw_hash.decode()

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)