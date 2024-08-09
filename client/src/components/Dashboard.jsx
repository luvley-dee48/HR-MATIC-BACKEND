import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="overview">
                <div className="card">
                    <h2>Total Employees</h2>
                    <p>856 Employees</p>
                </div>
                <div className="card">
                    <h3>Job Applicants</h3>
                    <p>77 Applicants</p>
                </div>
                <div className="card">
                    <h3>Resigned Employees</h3>
                    <p>17 Employees</p>
                </div>
            </div>
            <EmployeeTable />
        </div>
    );
};

export default Dashboard;
