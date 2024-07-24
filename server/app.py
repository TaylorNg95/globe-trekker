from config import app
from models.user import User
from models.trip import Trip
from models.entry import Entry
from routes.sessions import *
from routes.users import *
from routes.trips import *
from routes.entries import *

if __name__ == "__main__":
    app.run(port=5555, debug=True)