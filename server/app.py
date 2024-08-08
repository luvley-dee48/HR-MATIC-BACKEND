import sys
import os
import logging
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from models import db, Department,Employee

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(os.path.dirname(os.path.abspath(__file__)), "instance")}/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.init_app(app)
migrate = Migrate(app, db)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def validate_department_data(data, allow_empty_name=False):
    """Validate department data."""
    if not isinstance(data, dict):
        return {"error": "Invalid data format"}, 400
    if not allow_empty_name and 'name' not in data:
        return {"error": "Missing 'name' field"}, 400
    if 'name' in data and not isinstance(data['name'], str):
        return {"error": "'name' must be a string"}, 400
    if 'description' in data and not isinstance(data['description'], str):
        return {"error": "'description' must be a string"}, 400
    return None, None

@app.route('/departments', methods=['GET'])
def get_departments():
    try:
        departments = Department.query.all()
        return jsonify({"departments": [dept.to_dict() for dept in departments]}), 200
    except Exception as e:
        logger.error(f"Error fetching departments: {e}")
        return jsonify({"error": "An error occurred while fetching departments"}), 500

@app.route('/departments', methods=['POST'])
def create_department():
    data = request.get_json()
    validation_error, status_code = validate_department_data(data)
    if validation_error:
        return jsonify(validation_error), status_code

    try:
        if Department.query.filter_by(name=data['name']).first():
            return jsonify({"error": "Department name already exists"}), 400

        department = Department(name=data['name'])
        if 'description' in data:
            department.description = data['description']
        db.session.add(department)
        db.session.commit()
        return jsonify(department.to_dict()), 201
    except Exception as e:
        logger.error(f"Error creating department: {e}")
        db.session.rollback()
        return jsonify({"error": "An error occurred while creating the department"}), 500

@app.route('/departments/<int:id>', methods=['GET'])
def get_department(id):
    try:
        department = Department.query.get_or_404(id)
        return jsonify(department.to_dict()), 200
    except Exception as e:
        logger.error(f"Error fetching department with id {id}: {e}")
        return jsonify({"error": "An error occurred while fetching the department"}), 500

@app.route('/departments/<int:id>', methods=['PATCH'])
def patch_update_department(id):
    data = request.get_json()
    validation_error, status_code = validate_department_data(data, allow_empty_name=True)
    if validation_error:
        return jsonify(validation_error), status_code

    try:
        department = Department.query.get_or_404(id)

        if 'name' in data and Department.query.filter(Department.name == data['name'], Department.id != id).first():
            return jsonify({"error": "Department name already exists"}), 400

        if 'name' in data:
            department.name = data['name']
        if 'description' in data:
            department.description = data['description']

        db.session.commit()
        return jsonify(department.to_dict()), 200
    except Exception as e:
        logger.error(f"Error updating department with id {id}: {e}")
        db.session.rollback()
        return jsonify({"error": "An error occurred while updating the department"}), 500

@app.route('/departments/<int:id>', methods=['PUT'])
def put_update_department(id):
    data = request.get_json()
    validation_error, status_code = validate_department_data(data)
    if validation_error:
        return jsonify(validation_error), status_code

    try:
        department = Department.query.get_or_404(id)

        if 'name' in data and Department.query.filter(Department.name == data['name'], Department.id != id).first():
            return jsonify({"error": "Department name already exists"}), 400

        if 'name' in data:
            department.name = data['name']
        if 'description' in data:
            department.description = data['description']

        db.session.commit()
        return jsonify(department.to_dict()), 200
    except Exception as e:
        logger.error(f"Error updating department with id {id}: {e}")
        db.session.rollback()
        return jsonify({"error": "An error occurred while updating the department"}), 500

@app.route('/departments/<int:id>', methods=['DELETE'])
def delete_department(id):
    try:
        department = Department.query.get_or_404(id)
        
        # Update department_id for all associated employees to a default value (e.g., -1)
        Employee.query.filter_by(department_id=id).update({'department_id': -1})
        
        # Now delete the department
        db.session.delete(department)
        db.session.commit()
        return jsonify({"message": "Department deleted, employees updated"}), 200
    except Exception as e:
        logger.error(f"Error deleting department with id {id}: {e}")
        db.session.rollback()
        return jsonify({"error": "An error occurred while deleting the department"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
