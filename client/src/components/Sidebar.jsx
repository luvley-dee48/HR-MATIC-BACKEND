import React, { useState } from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="profile">
                <img src="profile-pic-url" alt="profile" />
                <div>
                    <h4>Steven</h4>
                    <p>HR Manager</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li>Dashboard</li>
                    <li>Leave Allocation</li>
                    <li>Employees</li>
                    <li>Leave Requests</li>
                    <li>Departments</li>
                    <li>Settings</li>
                    <li>Log Out</li>

                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
