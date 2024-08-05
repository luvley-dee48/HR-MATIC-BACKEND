# server/app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS
from dotenv import load_dotenv
import os

from server.models import LeaveAllocation, LeaveRequest, User

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
cors = CORS(app)

# Routes
@app.route('/')
def index():
    return "Welcome to the HR-MATIC system"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Missing username or password"}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists"}), 400

    new_user = User(username=data['username'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Missing username or password"}), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"msg": "Incorrect username or password"}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify(access_token=access_token), 200

@app.route('/leave-requests', methods=['GET', 'POST'])
@jwt_required()
def manage_leave_requests():
    if request.method == 'POST':
        data = request.get_json()
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

    leave_requests = LeaveRequest.query.all()
    return jsonify([lr.to_dict() for lr in leave_requests]), 200

@app.route('/leave-requests/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_leave_request(id):
    leave_request = LeaveRequest.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify(leave_request.to_dict()), 200

    if request.method == 'PUT':
        data = request.get_json()
        for key, value in data.items():
            setattr(leave_request, key, value)
        db.session.commit()
        return jsonify(leave_request.to_dict()), 200

    if request.method == 'DELETE':
        db.session.delete(leave_request)
        db.session.commit()
        return jsonify({"msg": "Leave request deleted"}), 200

@app.route('/leave-allocations', methods=['GET', 'POST'])
@jwt_required()
def manage_leave_allocations():
    if request.method == 'POST':
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

    leave_allocations = LeaveAllocation.query.all()
    return jsonify([la.to_dict() for la in leave_allocations]), 200

@app.route('/leave-allocations/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_leave_allocation(id):
    leave_allocation = LeaveAllocation.query.get_or_404(id)

    if request.method == 'GET':
        return jsonify(leave_allocation.to_dict()), 200

    if request.method == 'PUT':
        data = request.get_json()
        for key, value in data.items():
            setattr(leave_allocation, key, value)
        db.session.commit()
        return jsonify(leave_allocation.to_dict()), 200

    if request.method == 'DELETE':
        db.session.delete(leave_allocation)
        db.session.commit()
        return jsonify({"msg": "Leave allocation deleted"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5555)
