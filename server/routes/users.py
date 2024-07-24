from flask import g, session
from config import app, db, api
from flask_restful import Resource
from models.user import User

@app.before_request
def check_before_request():
    user_id = session.get('user_id')
    if user_id:
        g.user = User.query.filter(User.id == user_id).first()

# DEVELOPMENT PURPOSES ONLY
class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict(rules=['-_password_hash', '-entries']) for user in users], 200

class UserResource(Resource):
    def get(self, id):
        user = g.user
        return user.to_dict(rules=['-_password_hash', '-entries', 'trips', '-trips.entries',]), 200

# api.add_resource(UsersResource, '/api/users', endpoint='users')
api.add_resource(UserResource, '/api/users/<int:id>')