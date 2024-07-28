from flask import request, session
from config import db, api
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
            return user.to_dict(rules=['trips',]), 201
        except IntegrityError as e:
            return {'error': 'Username taken'}, 422 
        except ValueError as e:
            return {'error': str(e)}, 422

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(rules=['trips',]), 200
        else:
            return {'error': 'Invalid credentials'}, 422

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(rules=['trips',]), 200
        else:
            return {'error': 'User not logged in'}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        else:
            return {'error': 'User not logged in'}, 401

api.add_resource(Signup, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Logout, '/api/logout')