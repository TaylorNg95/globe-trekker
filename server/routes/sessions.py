from flask import request, session # do we need g
from config import app, db, api
from flask_restful import Resource
from models.user import User
from sqlalchemy.exc import IntegrityError

class Signup(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        username = data.get('username')
        password = data.get('password')
        try:
            user = User(name=name, username=username)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except ValueError as e:
            return {'error': 'Name, username and password required'}, 422
        except IntegrityError as e:
            return {'error': 'Username must be unique'}, 422

api.add_resource(Signup, '/api/signup')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {'error': 'not logged in'}, 401
        
api.add_resource(CheckSession, 'api/check_session')
