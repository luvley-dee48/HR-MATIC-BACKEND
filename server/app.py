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

if __name__ == '__main__':
    app.run(host="0.0.0", port=5001, debug=True),


