import React, { useState, useEffect } from 'react';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    age: '',
    dateHired: '',
    salary: '',
    address: '',
    phoneNo: '',
    email: '',
    leaveRecords: '',
    jobTitle: ''
  });

  useEffect(() => {
    
    fetch('')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
    .then(response => response.json())
    .then(data => {
      setEmployees([...employees, data]);
      setNewEmployee({
        name: '',
        department: '',
        age: '',
        dateHired: '',
        salary: '',
        address: '',
        phoneNo: '',
        email: '',
        leaveRecords: '',
        jobTitle: ''
      });
      setShowForm(false);
    })
    .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <div className="employee-component">
      <h2>Employees</h2>
      <button onClick={() => setShowForm(!showForm)}>Add Employee</button>
      {showForm && (
        <form className="employee-form" onSubmit={handleAddEmployee}>
          <input name="name" placeholder="Name" value={newEmployee.name} onChange={handleInputChange} />
          <input name="department" placeholder="Department" value={newEmployee.department} onChange={handleInputChange} />
          <input name="age" placeholder="Age" value={newEmployee.age} onChange={handleInputChange} />
          <input name="dateHired" placeholder="Date Hired" value={newEmployee.dateHired} onChange={handleInputChange} />
          <input name="salary" placeholder="Salary" value={newEmployee.salary} onChange={handleInputChange} />
          <input name="address" placeholder="Address" value={newEmployee.address} onChange={handleInputChange} />
          <input name="phoneNo" placeholder="Phone No" value={newEmployee.phoneNo} onChange={handleInputChange} />
          <input name="email" placeholder="Email" value={newEmployee.email} onChange={handleInputChange} />
          <input name="leaveRecords" placeholder="Leave Records" value={newEmployee.leaveRecords} onChange={handleInputChange} />
          <input name="jobTitle" placeholder="Job Title" value={newEmployee.jobTitle} onChange={handleInputChange} />
          <button type="submit">Add Employee</button>
        </form>
      )}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Age</th>
            <th>Date Hired</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Phone No</th>
            <th>Email</th>
            <th>Leave Records</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.age}</td>
              <td>{employee.dateHired}</td>
              <td>{employee.salary}</td>
              <td>{employee.address}</td>
              <td>{employee.phoneNo}</td>
              <td>{employee.email}</td>
              <td>{employee.leaveRecords}</td>
              <td>{employee.jobTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
