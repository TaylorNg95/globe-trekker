from config import app
from models.user import User
from models.trip import Trip
from models.entry import Entry
from routes.users import *
from routes.sessions import *
from routes.trips import *
from routes.entries import *
from routes.stripe import *
from flask import render_template

""" @app.errorhandler(404)
def not_found(e):
    return render_template("index.html") """

if __name__ == "__main__":
    app.run(port=5555, debug=True)