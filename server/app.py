from config import app
from models.user import User

if __name__ == "__main__":
    app.run(port=5555, debug=True)