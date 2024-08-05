from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

class Employee(db.Model):
    __tablename__ = 'employee'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)  
    last_name = db.Column(db.String(50), nullable=False)  
    email = db.Column(db.String(100), unique=True, nullable=False)  
    password = db.Column(db.String(100), nullable=False)  
    phone_number = db.Column(db.String(20))  
    address = db.Column(db.String(100))  
    department = db.Column(db.String(50))  
    date_hired = db.Column(db.Date, nullable=False) 
    salary = db.Column(db.Numeric(10, 2), nullable=False)  
    leave_records = db.relationship('LeaveRecord', back_populates='employee')  
    
    def __repr__(self):
        return (f"<{self.id}, {self.first_name}, {self.last_name},)" 
                f"{self.email}, {self.phone_number}, {self.address}, "
                {self.department}, {self.date_hired}, {self.salary}>)

