from flask import request, session, g
from config import api, db
from flask_restful import Resource
from models.entry import Entry
from sqlalchemy.exc import IntegrityError

class EntriesResource(Resource):
    def get(self):
        entries = Entry.query.all()
        return [entry.to_dict(rules=['-user', '-trip',]) for entry in entries]
    
    def post(self):
        data = request.get_json()
        date = data.get('date')
        miles = data.get('miles')
        user_id = data.get('user_id')
        trip_id = data.get('trip_id')
        try:
            entry = Entry(date=date, miles=float(miles), user_id=int(user_id), trip_id=int(trip_id))
            db.session.add(entry)
            db.session.commit()
            return entry.to_dict(rules=['-user', '-trip']), 201
        except:
            return {'error': 'Invalid input'}, 422
    
class EntryResource(Resource):
    def get(self, id):
        entry = Entry.query.filter(Entry.id == id).first()
        return entry.to_dict(rules=['-user', '-trip']), 200
     
    def patch(self, id):
         data = request.get_json()
         date = data.get('date')
         miles = data.get('miles')
         entry = Entry.query.filter(Entry.id == id).first()
         try:
             entry.date = date
             entry.miles = miles
             db.session.add(entry)
             db.session.commit()
             return entry.to_dict(rules=['-trip', '-user']), 200
         except:
             return {'error': 'Invalid input'}, 422

    def delete(self, id):
        entry = Entry.query.filter(Entry.id == id).first()
        try:
            db.session.delete(entry)
            db.session.commit()
            return {}, 204
        except:
            return {'error': 'Invalid user id'}

api.add_resource(EntriesResource, '/api/entries')
api.add_resource(EntryResource, '/api/entries/<int:id>')