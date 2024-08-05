from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from datetime import timedelta
from server.user import db

# Initializing Flask application
app = Flask(__name__)

# Configuring the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)  # Set the expiration time for access tokens

# Initialize the app with the db
db.init_app(app)

# Initializing the migrate
migrate = Migrate(app, db)

api = Api(app)

@app.route('/')
def index():
    """Route to welcome message"""
    return 'Hello, HR-MATIC-BACKEND!'

if __name__ == '__main__':
    app.run(debug=True)
