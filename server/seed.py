from datetime import datetime, timedelta
from faker import Faker
from app import app
from models import db, User, Department, Employee, LeaveAllocation, LeaveRequest

# Initialize Faker
fake = Faker()

def seed_users():
    with app.app_context():
        db.create_all()

        User.query.delete()

        users = []
        for _ in range(10):
            user = User(
                roles=fake.word(),
                email=fake.unique.email(),
                password=fake.password(length=12)
            )
            users.append(user)

        print("Sample of generated users:")
        for user in users[:3]:
            print(f"Roles: {user.roles}, Email: {user.email}")

        confirm = input("Do you want to add these users to the database? (yes/no): ")
        if confirm.lower() == 'yes':
            for user in users:
                db.session.add(user)
            db.session.commit()
            print("Users added to the database.")
            print(f"Number of users in the database: {User.query.count()}")
        else:
            print("Users not added to the database.")
            exit()

def seed_departments():
    with app.app_context():
        db.create_all()

        Department.query.delete()

        departments = []
        for _ in range(5):
            department = Department(
                name=fake.company(),
                description=fake.sentence()
            )
            departments.append(department)

        print("Sample of generated departments:")
        for department in departments[:3]:
            print(f"Department Name: {department.name}, Description: {department.description}")

        confirm = input("Do you want to add these departments to the database? (yes/no): ")
        if confirm.lower() == 'yes':
            for department in departments:
                db.session.add(department)
            db.session.commit()
            print("Departments added to the database.")
            print(f"Number of departments in the database: {Department.query.count()}")
        else:
            print("Departments not added to the database.")
            exit()

def seed_employees():
    with app.app_context():
        db.create_all()

        Employee.query.delete()

        departments = Department.query.all()
        employees = []
        for _ in range(20):
            department = fake.random_element(elements=departments)
            employee = Employee(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                password=fake.password(length=12),
                phonenumber=fake.phone_number(),
                address=fake.address(),
                job_title=fake.job(),
                department_id=department.id,
                date_hired=fake.date_this_decade(),
                salary=fake.random_int(min=30000, max=100000),
                leave_records=fake.sentence()
            )
            employees.append(employee)

        print("Sample of generated employees:")
        for employee in employees[:3]:
            print(f"Name: {employee.first_name} {employee.last_name}, Email: {employee.email}")

        confirm = input("Do you want to add these employees to the database? (yes/no): ")
        if confirm.lower() == 'yes':
            for employee in employees:
                db.session.add(employee)
            db.session.commit()
            print("Employees added to the database.")
            print(f"Number of employees in the database: {Employee.query.count()}")
        else:
            print("Employees not added to the database.")
            exit()

def seed_leave_allocations():
    with app.app_context():
        db.create_all()

        LeaveAllocation.query.delete()

        employees = Employee.query.all()
        leave_allocations = []
        for employee in employees:
            allocation = LeaveAllocation(
                employee_id=employee.id,
                year=datetime.now().year,
                total_days_allocated=20,
                days_remaining=20
            )
            leave_allocations.append(allocation)

        print("Sample of generated leave allocations:")
        for allocation in leave_allocations[:3]:
            print(f"Employee ID: {allocation.employee_id}, Total Days Allocated: {allocation.total_days_allocated}")

        confirm = input("Do you want to add these leave allocations to the database? (yes/no): ")
        if confirm.lower() == 'yes':
            for allocation in leave_allocations:
                db.session.add(allocation)
            db.session.commit()
            print("Leave allocations added to the database.")
            print(f"Number of leave allocations in the database: {LeaveAllocation.query.count()}")
        else:
            print("Leave allocations not added to the database.")
            exit()

def seed_leave_requests():
    with app.app_context():
        db.create_all()

        LeaveRequest.query.delete()

        employees = Employee.query.all()
        leave_requests = []
        for _ in range(10):
            employee = fake.random_element(elements=employees)
            start_date = fake.date_this_year()
            end_date = fake.date_between(start_date=start_date, end_date='+10d')
            request = LeaveRequest(
                employee_id=employee.id,
                start_date=start_date,
                end_date=end_date,
                leave_type=fake.word(),
                reason=fake.sentence(),
                approver_name=fake.name(),
                status=fake.random_element(elements=['Pending', 'Approved', 'Rejected'])
            )
            leave_requests.append(request)

        print("Sample of generated leave requests:")
        for request in leave_requests[:3]:
            print(f"Employee ID: {request.employee_id}, Start Date: {request.start_date}, End Date: {request.end_date}")

        confirm = input("Do you want to add these leave requests to the database? (yes/no): ")
        if confirm.lower() == 'yes':
            for request in leave_requests:
                db.session.add(request)
            db.session.commit()
            print("Leave requests added to the database.")
            print(f"Number of leave requests in the database: {LeaveRequest.query.count()}")
        else:
            print("Leave requests not added to the database.")
            exit()

if __name__ == "__main__":
    seed_users()
    seed_departments()
    seed_employees()
    seed_leave_allocations()
    seed_leave_requests()
