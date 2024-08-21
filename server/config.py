from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.schema import MetaData
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_cors import CORS
from dotenv import load_dotenv

import os
import stripe

load_dotenv()

naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metaData = MetaData(naming_convention=naming_convention)

app = Flask(__name__)

""" ,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
 """

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('FLASK_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('FLASK_SECRET_KEY')

db = SQLAlchemy(app=app, metadata=metaData)

api = Api(app)

migrate = Migrate(app=app, db=db, render_as_batch=True)

bcrypt = Bcrypt(app)

CORS(app)

stripe_keys = {
    'secret_key': os.getenv('STRIPE_SECRET_KEY'),
    'publishable_key': os.getenv('STRIPE_PUBLISHABLE_KEY')
}

stripe.api_key='sk_test_51PnQl0LUBQTMicjzgEeAk4dbJhPjXT8uAnrT1EKVXbqRDX1LnxxC0fKpcEsnjETiEZmQaJNP28B6kfrb5LWk6QCU00hSzwMtPU'