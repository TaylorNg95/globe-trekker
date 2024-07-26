# from flask import request, session, g
from config import api
from flask_restful import Resource
from models.trip import Trip

class TripsResource(Resource):
    def get(self):
        trips = Trip.query.all()
        return [trip.to_dict() for trip in trips], 200

api.add_resource(TripsResource, '/api/trips')