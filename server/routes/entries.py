from flask import request, session, g
from config import app, api
from flask_restful import Resource
from models.user import User
from models.trip import Trip

class UserEntriesResource(Resource):
    def get(self, user_id, trip_id, entry_id):
        if user_id == session.get('user_id'):
            trips = User.query.filter(User.id == user_id).first().trips
            return [trip.to_dict(rules=['-entries',]) for trip in trips], 200
        else:
            return {'error': 'invalid user'}, 401
        
    # STRETCH GOAL: ADD CUSTOM TRIP
    
class UserTripResource(Resource):
     def get(self, user_id, trip_id):
        if user_id == session.get('user_id'):
            trips = User.query.filter(User.id == user_id).first().trips
            trip = [trip for trip in trips if trip.id == trip_id][0]
            return trip.to_dict(), 200
        else:
            return {'error': 'invalid user'}, 401

api.add_resource(AllTripsResource, '/api/trips', endpoint='trips')
api.add_resource(UserTripsResource, '/api/users/<int:user_id>/trips', endpoint='user_trips')
api.add_resource(UserTripResource, '/api/users/<int:user_id>/trips/<int:trip_id>', endpoint='user_trip')