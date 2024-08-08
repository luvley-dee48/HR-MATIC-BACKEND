import React, { useState, useEffect } from 'react';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    text: '',
    employee: ''
  });

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment({
      ...newDepartment,
      [name]: value
    });
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDepartment)
    })
    .then(response => response.json())
    .then(data => {
      setDepartments([...departments, data]);
      setNewDepartment({
        name: '',
        text: '',
        employee: ''
      });
      setShowForm(false);
    })
    .catch(error => console.error('Error adding department:', error));
  };

  return (
    <div className="departments">
      <h2>Departments</h2>
      <button onClick={() => setShowForm(!showForm)}>Add Department</button>
      {showForm && (
        <div id="addDepartmentForm">
          <form onSubmit={handleAddDepartment}>
            <input name="name" placeholder="Name" value={newDepartment.name} onChange={handleInputChange} />
            <input name="text" placeholder="Text" value={newDepartment.text} onChange={handleInputChange} />
            <input name="employee" placeholder="Employee" value={newDepartment.employee} onChange={handleInputChange} />
            <button type="submit">Add Department</button>
          </form>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Text</th>
            <th>Employee</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              <td>{department.name}</td>
              <td>{department.text}</td>
              <td>{department.employee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departments;
