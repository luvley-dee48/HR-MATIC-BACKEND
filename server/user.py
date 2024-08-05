from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData()

# Create a SQLAlchemy object
db = SQLAlchemy(metadata=metadata)

# Define the User model
class User(db.Model):
    """Model for a user."""
    # Table name
    __tablename__ = "Users" 
    # Primary key column
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # Username
    username = db.Column(db.String(80), nullable=False)
    # Email address
    email = db.Column(db.String(120), nullable=False)
    # Password
    password = db.Column(db.String(80), nullable=False)
