import sys
import os
from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api,Resource


sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import db, Employee

app = Flask(__name__)

base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance')

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{base_dir}/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.init_app(app)

api = Api(app)

migrate = Migrate(app, db)

#routes
class Employees(Resource):
    def get(self):
        employees = Employee.query.all()
        employees_list = []

        for employee in employees:
            employees_list.append(employee.to_dict())

        body = {
            "count": len(employees_list),
            "employees": employees_list
        }

        return make_response(body, 200)
    
    def post(self):
        new_employee =Employee(
            
        first_name=request.json.get("first_name"),
        last_name=request.json.get("last_name"),
        email=request.json.get("email"),
        password=request.json.get("password"),
        phonenumber=request.json.get("phonenumber"),
        address=request.json.get("address"),
        job_title=request.json.get("job_title"),
        department_id=request.json.get("department_id"),
        date_hired=request.json.get("date_hired"),
        salary=request.json.get("salary"),
        leave_records=request.json.get("leave_records"),
        )

    
        db.session.add(new_employee)
        db.session.commit()

        response = make_response(new_employee.to_dict(), 201)

        return response


class EmployeesByID(Resource):
    def get(self, id):
        employee = Employee.query.filter_by(id=id).first()

        if employee == None:
            body = {
                "message": "This record does not exist. Please try again."
            }
            response = make_response(body, 404)

            return response
        else:
            employee_dict = employee.to_dict()
            print(employee_dict)

            response = make_response(employee.to_dict(), 200)

            return response
        
    def patch(self, id):
        employee = Employee.query.filter_by(id=id).first()

        for attr in request.json:
            setattr(employee, attr, request.json.get(attr))

        db.session.add(employee)
        db.session.commit()

        employee_dict = employee.to_dict()

        response = make_response(employee_dict, 200)

        return response
    

    def delete(self, id):
        employee = Employee.query.filter_by(id=id).first()

        db.session.delete(employee)
        db.session.commit()

        body = {
            "delete_successful": True,
            "message": "Employee deleted."
        }

        response = make_response(body, 200)

        return response
    
api.add_resource(Employees, '/employees')
api.add_resource(EmployeesByID, '/employees/<int:id>')

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


