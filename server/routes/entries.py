from flask import request, session, g
from config import api, db
from flask_restful import Resource
from models.entry import Entry
from sqlalchemy.exc import IntegrityError

class UserEntriesResource(Resource):
    def get(self, user_id, trip_id):
        entries = Entry.query.filter(Entry.user_id == user_id, Entry.trip_id == trip_id)
        return [entry.to_dict(rules=['-trip', '-user',]) for entry in entries]
    
    def post(self, user_id, trip_id):
        data = request.get_json()
        date = data.get('date')
        miles = data.get('miles')
        user_id = user_id
        trip_id = trip_id
        try:
            entry = Entry(date=date, miles=miles, user_id=user_id, trip_id=trip_id)
            db.session.add(entry)
            db.session.commit()
            return entry.to_dict(rules=['-user', '-trip']), 201
        except IntegrityError:
            return {'error': 'Invalid input'}, 422
    
class UserEntryResource(Resource):
    def get(self, user_id, trip_id, entry_id):
        entries = Entry.query.filter(Entry.user_id == user_id, Entry.trip_id == trip_id)
        entry = [entry for entry in entries if entry.id == entry_id][0]
        return entry.to_dict(rules=['-user', '-trip']), 200
     
    def patch(self, user_id, trip_id, entry_id):
         data = request.get_json()
         date = data.get('date')
         miles = data.get('miles')
         entry = Entry.query.filter(Entry.id == entry_id).first()
         try:
             entry.date = date
             entry.miles = miles
             db.session.add(entry)
             db.session.commit()
             return entry.to_dict(rules=['-trip', '-user']), 200
         except:
             {'error': 'Invalid input'}, 422

    def delete(self, user_id, trip_id, entry_id):
        entry = Entry.query.filter(Entry.id == entry_id).first()
        try:
            db.session.delete(entry)
            db.session.commit()
            return {}, 204
        except:
            return {'error': 'Invalid user id'}

api.add_resource(UserEntriesResource, '/api/users/<int:user_id>/trips/<int:trip_id>/entries')
api.add_resource(UserEntryResource, '/api/users/<int:user_id>/trips/<int:trip_id>/entries/<int:entry_id>')