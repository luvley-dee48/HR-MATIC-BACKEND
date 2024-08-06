import os
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create instance folder if it does not exist
os.makedirs(os.path.join(os.getcwd(), 'instance'), exist_ok=True)

# Initialize the Flask app
app = Flask(__name__, instance_relative_config=True)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'hr-matic.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)



api = Api(app)

# Import models
from models import LeaveRequest, LeaveAllocation, User

# Import utility functions
from utils.helpers import hash_password, verify_password, validate_request_json, response_with_error
from utils.validators import validate_registration_data, validate_login_data, validate_leave_request_data

@app.route('/register', methods=['POST'])
@validate_request_json(['username', 'password'])
def register():
    try:
        data = request.get_json()
        app.logger.info("Received registration data: %s", data)

        validation_error = validate_registration_data(data)
        if validation_error:
            app.logger.error("Validation error: %s", validation_error)
            return validation_error

        username = data['username']
        password = data['password']
        
        if User.query.filter_by(username=username).first():
            app.logger.error("Username already exists: %s", username)
            return response_with_error("Username already exists", 400)

        user = User(username=username, password=hash_password(password))
        db.session.add(user)
        db.session.commit()
        app.logger.info("User registered successfully: %s", user.username)
        return jsonify(user.to_dict()), 201
    except Exception as e:
        app.logger.error("Error during registration: %s", e)
        return jsonify({"msg": "Internal Server Error"}), 500

@app.route("/login", methods=["POST"])
@validate_request_json(['username', 'password'])
def login():
    try:
        data = request.get_json()
        app.logger.info("Received login data: %s", data)

        validation_error = validate_login_data(data)
        if validation_error:
            app.logger.error("Validation error: %s", validation_error)
            return validation_error

        username = data['username']
        password = data['password']
        user = User.query.filter_by(username=username).first()

        if not user or not verify_password(user.password, password):
            app.logger.error("Incorrect username or password for user: %s", username)
            return jsonify({"msg": "Incorrect username or password"}), 401
        
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    except Exception as e:
        app.logger.error("Error during login: %s", e)
        return jsonify({"msg": "Internal Server Error"}), 500

# Define routes for leave requests and leave allocations

class LeaveRequests(Resource):
    @jwt_required()
    def get(self):
        leave_requests = LeaveRequest.query.all()
        return jsonify([lr.to_dict() for lr in leave_requests]), 200

    @jwt_required()
    @validate_request_json(['employee_id', 'leave_type', 'start_date', 'end_date'])
    def post(self):
        data = request.get_json()
        validation_error = validate_leave_request_data(data)
        if validation_error:
            return validation_error

        new_leave_request = LeaveRequest(
            employee_id=data['employee_id'],
            leave_type=data['leave_type'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            reason=data.get('reason'),
            approver_name=data.get('approver_name')
        )
        db.session.add(new_leave_request)
        db.session.commit()
        return jsonify(new_leave_request.to_dict()), 201

class LeaveRequestById(Resource):
    @jwt_required()
    def get(self, id):
        leave_request = LeaveRequest.query.get_or_404(id)
        return jsonify(leave_request.to_dict()), 200

    @jwt_required()
    @validate_request_json(['employee_id', 'leave_type', 'start_date', 'end_date'])
    def put(self, id):
        data = request.get_json()
        leave_request = LeaveRequest.query.get_or_404(id)
        validation_error = validate_leave_request_data(data)
        if validation_error:
            return validation_error
        for key, value in data.items():
            setattr(leave_request, key, value)
        db.session.commit()
        return jsonify(leave_request.to_dict()), 200

    @jwt_required()
    def delete(self, id):
        leave_request = LeaveRequest.query.get_or_404(id)
        db.session.delete(leave_request)
        db.session.commit()
        return jsonify({"msg": "Leave request deleted"}), 200

api.add_resource(LeaveRequests, '/leave-requests')
api.add_resource(LeaveRequestById, '/leave-requests/<int:id>')

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
    app.run(host="0.0.0.0", port=5000, debug=True)
