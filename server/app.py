import sys
import os
from flask import Flask
from flask_migrate import Migrate

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.init_app(app)
migrate = Migrate(app, db)
