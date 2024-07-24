from flask import request, session, g
from config import app, db, api
from flask_restful import Resource
from models.user import User
from models.trip import Trip

# check user before making trip routes

@app.before_request
def check_before_request():
    user_id = session.get('user_id')
    if user_id:
        g.user = User.query.filter(User.id == user_id).first() # store user in global variable if logged in
    if request.endpoint == 'trip':
        id = request.view_args.get('id')
        try:
            g.trip = [trip for trip in g.user.trips if trip.id == id][0] # query individual user trips for match
        except:
            return {'error': 'trip does not exist for this user'}, 422 

class TripsResource(Resource):
    def get(self):
        trips = g.user.trips
        return [trip.to_dict(rules=['-entries',]) for trip in trips], 200
    
class TripResource(Resource):
     def get(self, id):
          trip = [trip for trip in g.user.trips if trip.id == id][0]
          return trip.to_dict(), 200

api.add_resource(TripsResource, '/api/trips', endpoint='trips')
api.add_resource(TripResource, '/api/trips/<int:id>', endpoint='trip')