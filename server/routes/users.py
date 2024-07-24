from flask import request, g
from config import app, db, api
from flask_restful import Resource
from models.user import User

# adjust this to account for admin privileges

class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict(rules=['-_password_hash', '-entries']) for user in users], 200

class UserResource(Resource):
    def get(self, id):
        user = g.user
        return user.to_dict(rules=['-_password_hash', '-entries', 'trips', '-trips.entries',]), 200

api.add_resource(UsersResource, '/api/users', endpoint='users')
api.add_resource(UserResource, '/api/users/<int:id>', endpoint='user')