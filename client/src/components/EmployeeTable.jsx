import React, { useState } from 'react';

const EmployeeTable = () => {
    return (
        <div className="employee-table">
            <h3>Employee Status</h3>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Age</th>
                        <th>Date Hired</th>
                        <th>Salary</th>
                        <th>Address</th>
                        <th>Phone No</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/* backend data*/}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
