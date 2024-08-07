import os
from datetime import datetime
from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api

from models import LeaveRequest, LeaveAllocation, User, db

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)

# Get the base directory of the project
base_dir = os.path.abspath(os.path.dirname(__file__))

# Ensure the instance directory exists
instance_dir = os.path.join(base_dir, 'instance')
os.makedirs(instance_dir, exist_ok=True)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', f'sqlite:///{os.path.join(instance_dir, "app.db")}')
print(app.config['SQLALCHEMY_DATABASE_URI'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')

# Initialize extensions
# db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
mail = Mail(app)
CORS(app)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

api = Api(app)

# Import models

# Import utility functions
from utils.helpers import hash_password, verify_password, validate_request_json, response_with_error
from utils.validators import validate_registration_data, validate_login_data, validate_leave_request_data

@app.route('/register', methods=['POST'])
@validate_request_json(['email', 'password'])
def register():
    try:
        data = request.get_json()
        app.logger.info("Received registration data: %s", data)

        validation_error = validate_registration_data(data)
        if validation_error:
            app.logger.error("Validation error: %s", validation_error)
            return validation_error

        email = data['email']
        password = data['password']
        
        if User.query.filter_by(email=email).first():
            app.logger.error("Email already exists: %s", email)
            return response_with_error("Email already exists", 400)

        user = User(email=email, password=hash_password(password), roles="admin")
        db.session.add(user)
        db.session.commit()
        app.logger.info("User registered successfully: %s", user.email)
        return jsonify(user.to_dict()), 201
    except Exception as e:
        app.logger.error("Error during registration: %s", e)
        return jsonify({"msg": "Internal Server Error"}), 500


@app.route("/login", methods=["POST"])
@validate_request_json(['email', 'password'])
def login():
    try:
        data = request.get_json()
        app.logger.info("Received login data: %s", data)

        validation_error = validate_login_data()
        if validation_error:
            app.logger.error("Validation error: %s", validation_error)
            return validation_error

        email = data['email']
        password = data['password']
        user = User.query.filter_by(email=email).first()

        if not user or not verify_password(user.password, password):
            app.logger.error("Incorrect email or password for user: %s", email)
            return jsonify({"msg": "Incorrect email or password"}), 401
        
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    except Exception as e:
        app.logger.error("Error during login: %s", e)
        return jsonify({"msg": "Internal Server Error"}), 500


# Define routes for leave requests and leave allocations

class LeaveRequestsResource(Resource):
    @jwt_required()
    def get(self):
        leave_requests = LeaveRequest.query.all()
        return jsonify([lr.to_dict() for lr in leave_requests]), 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        
        try:
            start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
            end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"msg": "Invalid date format, should be YYYY-MM-DD"}), 400

        new_leave_request = LeaveRequest(
            employee_id=data['employee_id'],
            leave_type=data['leave_type'],
            start_date=start_date,
            end_date=end_date,
            reason=data.get('reason'),
            approver_name=data.get('approver_name')
        )
        db.session.add(new_leave_request)
        db.session.commit()
        return jsonify(new_leave_request.to_dict()), 201

class LeaveRequestByIdResource(Resource):
    @jwt_required()
    def get(self, id):
        leave_request = LeaveRequest.query.get_or_404(id)
        return jsonify(leave_request.to_dict()), 200

    @jwt_required()
    def put(self, id):
        data = request.get_json()
        leave_request = LeaveRequest.query.get_or_404(id)
        
        if 'start_date' in data:
            try:
                leave_request.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"msg": "Invalid date format, should be YYYY-MM-DD"}), 400
        
        if 'end_date' in data:
            try:
                leave_request.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"msg": "Invalid date format, should be YYYY-MM-DD"}), 400
        
        for key, value in data.items():
            if key not in ['start_date', 'end_date']:
                setattr(leave_request, key, value)
        
        db.session.commit()
        return jsonify(leave_request.to_dict()), 200

    @jwt_required()
    def delete(self, id):
        leave_request = LeaveRequest.query.get_or_404(id)
        db.session.delete(leave_request)
        db.session.commit()
        return jsonify({"msg": "Leave request deleted"}), 200

api.add_resource(LeaveRequestsResource, '/leave-requests')
api.add_resource(LeaveRequestByIdResource, '/leave-requests/<int:id>')


class LeaveAllocations(Resource):
    @jwt_required()
    def get(self):
        leave_allocations = LeaveAllocation.query.all()
        return jsonify([la.to_dict() for la in leave_allocations]), 200

    @jwt_required()
    @validate_request_json(['employee_id', 'leave_type', 'total_days'])
    def post(self):
        data = request.get_json()
        new_leave_allocation = LeaveAllocation(
            employee_id=data['employee_id'],
            leave_type=data['leave_type'],
            total_days=data['total_days'],
            used_days=data.get('used_days', 0)
        )
        db.session.add(new_leave_allocation)
        db.session.commit()
        return jsonify(new_leave_allocation.to_dict()), 201

class LeaveAllocationById(Resource):
    @jwt_required()
    def get(self, id):
        leave_allocation = LeaveAllocation.query.get_or_404(id)
        return jsonify(leave_allocation.to_dict()), 200

    @jwt_required()
    @validate_request_json(['employee_id', 'leave_type', 'total_days'])
    def put(self, id):
        data = request.get_json()
        leave_allocation = LeaveAllocation.query.get_or_404(id)
        for key, value in data.items():
            setattr(leave_allocation, key, value)
        db.session.commit()
        return jsonify(leave_allocation.to_dict()), 200

    @jwt_required()
    def delete(self, id):
        leave_allocation = LeaveAllocation.query.get_or_404(id)
        db.session.delete(leave_allocation)
        db.session.commit()
        return jsonify({"msg": "Leave allocation deleted"}), 200

api.add_resource(LeaveAllocations, '/leave-allocations')
api.add_resource(LeaveAllocationById, '/leave-allocations/<int:id>')

if __name__ == "__main__":
    db.init_app(app)
    app.run(host="0.0.0.0", port=5000, debug=True)
