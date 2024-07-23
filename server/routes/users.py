from flask import request, g
from config import app, db, api
from flask_restful import Resource
from models.user import User

@app.before_request
def check_before_request():
    if request.endpoint == 'user':
        id = request.view_args.get('id')
        print(id)

class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict(rules=['-_password_hash', '-entries']) for user in users], 200

api.add_resource(UsersResource, '/api/users', endpoint='users')

class UserResource(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        return user.to_dict(rules=['-_password_hash', '-entries', 'trips', '-trips.entries',]), 200

api.add_resource(UserResource, '/api/users/<int:id>', endpoint='user')