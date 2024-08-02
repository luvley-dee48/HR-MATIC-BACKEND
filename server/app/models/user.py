# Importing the necessary libraries and modules

# Import the SQLAlchemy instance from the app package
from app import db

# Import datetime for handling date and time
from datetime import datetime

# Import UserMixin for user session management
# Install this package using: pip install flask-login
from flask_login import UserMixin

# Import time for handling time-related functions
from time import time

# User class inherits from SQLAlchemy's Model and Flask-Login's UserMixin
class User(UserMixin, db.Model):
    
    # Define the name of the table in the database
    # Set the name of the table in the database to 'users'
    __tablename__ = 'users'
    
    # Define the columns for the User table

    # 'id' column: integer type, primary key, auto-incremented
    id = db.Column(db.Integer, primary_key=True)
    
    # Unique username, indexed for fast lookups
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    
    # Unique email, indexed for fast lookups
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    
    # Hashed password, length sufficient for hashed passwords
    password_hash = db.Column(db.String(128), nullable=False)
    
    # Timestamp when the record was created
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Timestamp when the record was last updated
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    