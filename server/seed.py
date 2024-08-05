from datetime import datetime
from app import db  # Import db from app.py
from models import Employee, Department, LeaveRequest, LeaveAllocation, User, EmployeeDepartment

def seed_employees():
    """Seed the EMPLOYEES table with sample data."""
    employees = [
        {'first_name': 'John', 'last_name': 'Doe', 'email': 'john.doe@example.com', 'password': 'password123', 'phonenumber': '1234567890', 'address': '123 Elm St', 'job_title': 'Software Engineer', 'department': 'Engineering', 'date_hired': datetime(2022, 1, 10), 'salary': 80000, 'leave_records': 'None'},
        {'first_name': 'Jane', 'last_name': 'Smith', 'email': 'jane.smith@example.com', 'password': 'password123', 'phonenumber': '1234567891', 'address': '456 Oak St', 'job_title': 'Data Scientist', 'department': 'Data Science', 'date_hired': datetime(2021, 3, 15), 'salary': 90000, 'leave_records': 'None'},
        # Add 8 more employee records
    ]

    for emp in employees:
        employee = Employee(**emp)
        db.session.add(employee)
    db.session.commit()

def seed_departments():
    """Seed the DEPARTMENTS table with sample data."""
    departments = [
        {'name': 'Engineering', 'description': 'Handles all engineering tasks', 'employee': 'John Doe'},
        {'name': 'Data Science', 'description': 'Focuses on data analysis and model building', 'employee': 'Jane Smith'},
        # Add 8 more department records
    ]

    for dept in departments:
        department = Department(**dept)
        db.session.add(department)
    db.session.commit()

def seed_leave_requests():
    """Seed the LEAVE_REQUESTS table with sample data."""
    leave_requests = [
        {'employee_name': 'John Doe', 'start_date': datetime(2024, 8, 5), 'end_date': datetime(2024, 8, 10), 'type': 'Vacation', 'status': 'Approved', 'days_requested': 5, 'approver_name': 'Jane Smith'},
        {'employee_name': 'Jane Smith', 'start_date': datetime(2024, 7, 20), 'end_date': datetime(2024, 7, 25), 'type': 'Sick Leave', 'status': 'Approved', 'days_requested': 5, 'approver_name': 'John Doe'},
        # Add 8 more leave request records
    ]

    for leave in leave_requests:
        leave_request = LeaveRequest(**leave)
        db.session.add(leave_request)
    db.session.commit()

def seed_leave_allocations():
    """Seed the LEAVE_ALLOCATION table with sample data."""
    leave_allocations = [
        {'employee_id': 1, 'year': 2024, 'total_days_allocated': 20, 'days_used': 5, 'days_remaining': 15},
        {'employee_id': 2, 'year': 2024, 'total_days_allocated': 20, 'days_used': 10, 'days_remaining': 10},
        # Add 8 more leave allocation records
    ]

    for allocation in leave_allocations:
        leave_allocation = LeaveAllocation(**allocation)
        db.session.add(leave_allocation)
    db.session.commit()

def seed_users():
    """Seed the USERS table with sample data."""
    users = [
        {'roles': 'Admin', 'email': 'admin@example.com', 'password': 'admin123'},
        {'roles': 'Employee', 'email': 'employee@example.com', 'password': 'employee123'},
        # Add 8 more user records
    ]

    for user in users:
        user_record = User(**user)
        db.session.add(user_record)
    db.session.commit()

def seed_employee_departments():
    """Seed the EMPLOYEEDEPARTMENTS table with sample data."""
    employee_departments = [
        {'employee_id': 1, 'department_id': 1},
        {'employee_id': 2, 'department_id': 2},
        # Add 8 more employee-department relationships
    ]

    for emp_dept in employee_departments:
        emp_dept_record = EmployeeDepartment(**emp_dept)
        db.session.add(emp_dept_record)
    db.session.commit()

def seed_all():
    """Call all seed functions."""
    seed_employees()
    seed_departments()
    seed_leave_requests()
    seed_leave_allocations()
    seed_users()
    seed_employee_departments()

if __name__ == '__main__':
    from app import app  # Import app from app.py
    with app.app_context():
        seed_all()
    print("Database seeded successfully.")
