# Import necessary libraries and modules

# Import the SQLAlchemy instance from the app package
from app import db

# Import datetime for handling date and time
from datetime import datetime

# Import UserMixin for user session management
# Install this package using: pip install flask-login
from flask_login import UserMixin

# Import time for handling time-related functions
from time import time

# Import jwt for JSON Web Token operations
import jwt

# Import functions for hashing passwords
from werkzeug.security import generate_password_hash, check_password_hash

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
    
    # One-to-one relationship with LeaveRequest
    leave_request = db.relationship('LeaveRequest', uselist=False, backref='user', lazy=True)

    # Methods for setting and checking password hashes
    def set_password(self, password):
        # Set the hashed password for the user
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        # Check if the provided password matches the hashed password
        return check_password_hash(self.password_hash, password)
    
    # Generate JWT token for the user
    def get_reset_password_token(self, expires_in=600):
        # Create a JWT token for password reset with an expiration time
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256')
    
    @staticmethod
    def verify_reset_password_token(token):
        # Verify the JWT token and return the corresponding user
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])['reset_password']
        except:
            return None
        return User.query.get(id)
    
    # String representation of the User object
    def __repr__(self):
        # Provide a string representation for debugging and logging
        return f'<User {self.username}>'
