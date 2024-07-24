from flask import request, session, g
from config import app, api
from flask_restful import Resource
from models.user import User
from models.entry import Entry

class UserEntriesResource(Resource):
    def get(self, user_id, trip_id):
        entries = Entry.query.filter(Entry.user_id == user_id, Entry.trip_id == trip_id)
        return [entry.to_dict(rules=['-trip', '-user',]) for entry in entries]
    
class UserEntryResource(Resource):
     def get(self, user_id, trip_id, entry_id):
        entries = Entry.query.filter(Entry.user_id == user_id, Entry.trip_id == trip_id)
        entry = [entry for entry in entries if entry.id == entry_id][0]
        return entry.to_dict(rules=['-user', '-trip']), 200

api.add_resource(UserEntriesResource, '/api/users/<int:user_id>/trips/<int:trip_id>/entries')
api.add_resource(UserEntryResource, '/api/users/<int:user_id>/trips/<int:trip_id>/entries/<int:entry_id>')