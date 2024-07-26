from flask import request, session, g
from config import app, api
from flask_restful import Resource
from models.user import User
from models.trip import Trip

class TripsResource(Resource):
    def get(self):
        trips = Trip.query.all()
        return [trip.to_dict() for trip in trips], 200

""" class UserTripsResource(Resource):
    def get(self, user_id):
        trips = {}
        for trip in User.query.filter(User.id == user_id).first().trips: # Avoids duplicate trips if multiple entries
            if not trips.get(trip):
                trips[trip] = True
        return [trip.to_dict(rules=['-entries',]) for trip in trips], 200 """
    
""" class TripResource(Resource):
     def get(self, user_id, trip_id):
        trips = User.query.filter(User.id == user_id).first().trips
        trip = [trip for trip in trips if trip.id == trip_id][0]
        return trip.to_dict(rules=['-entries',]), 200 """

api.add_resource(TripsResource, '/api/trips')
""" api.add_resource(TripResource, '/api/trips/<int:id>') """