# Import the SQLAlchemy instance that will be used to define models and interact with the database
from app import db


#importing the  UserMixin (install this in your laptop pip install flask-login )
from flask_login import UserMixin

# User class inherits from SQLAlchemy's Model and Flask-Login's UserMixin
class User(UserMixin, db.Model):
      # Define the name of the table in the database

       # Set the name of the table in the database to 'users'
    __tablename__ = 'users'

     # Define the columns for the User table
     
      # 'id' column: integer type, primary key, auto-incremented
    id = db.Column(db.Integer, primary_key=True)
    