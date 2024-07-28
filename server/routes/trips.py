from flask import request, session, g
from config import api, db
from flask_restful import Resource
from models.trip import Trip
from sqlalchemy.exc import IntegrityError

class TripsResource(Resource):
    def get(self):
        trips = Trip.query.all()
        return [trip.to_dict() for trip in trips], 200
    
    def post(self):
        data = request.get_json()
        name = data.get('name')
        country = data.get('country')
        total_miles = data.get('total_miles')
        custom = data.get('custom')
        try:
            trip = Trip(name=name, country=country, total_miles=total_miles, custom=custom)
            db.session.add(trip)
            db.session.commit()
            return trip.to_dict(), 201
        except IntegrityError as e:
            return {'error': e.orig.args[0]}, 422
        except ValueError as e:
            return {'error': str(e)}, 422

api.add_resource(TripsResource, '/api/trips')