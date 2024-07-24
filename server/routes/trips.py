from flask import request, session, g
from config import app, db, api
from flask_restful import Resource
from models.user import User

# check user before making trip routes

@app.before_request
def check_before_request():
    user_id = session.get('user_id')
    if user_id:
            g.user = User.query.filter(User.id == user_id).first()

class TripsResource(Resource):
    def get(self):
        trips = g.user.trips
        return [trip.to_dict(rules=['-entries',]) for trip in trips], 200

""" class TripResource(Resource):
    def get(self, id):
        trip 
        return user.to_dict(rules=['-_password_hash', '-entries', 'trips', '-trips.entries',]), 200 """

api.add_resource(TripsResource, '/api/trips', endpoint='trips')
""" api.add_resource(UserResource, '/api/users/<int:id>', endpoint='user') """