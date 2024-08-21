from flask import request
from config import api, db
from flask_restful import Resource
from models.user import User

class UserResource(Resource):
    def patch(self, id):
        premium = request.get_json().get('premium')
        user = User.query.filter(User.id == id).first()
        
        user.premium = premium
        db.session.add(user)
        db.session.commit()
        return user.to_dict(rules=['trips',]), 200
         
api.add_resource(UserResource, '/api/users/<int:id>')