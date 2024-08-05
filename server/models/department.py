from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)


class Department(db.Model):
    __tablename__ = 'department'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey("employee.id"))
    name = db.Column(db.String, nullable=False)
    decription = db.Column(db.String, nullable = False)
    
    def __repr__(self):
        return f"<User {self.id}, {self.employee_id}, {self.name}, {self.description}>"


