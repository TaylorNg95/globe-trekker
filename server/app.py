from config import app
from models.user import User
from models.trip import Trip
from models.entry import Entry

if __name__ == "__main__":
    app.run(port=5555, debug=True)