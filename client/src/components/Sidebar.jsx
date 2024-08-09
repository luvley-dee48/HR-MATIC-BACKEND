import React from 'react';
import { Link } from 'react-router-dom';

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
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/leave-allocation">Leave Allocation</Link></li>
                    <li><Link to="/employees">Employees</Link></li>
                    <li><Link to="/leave-requests">Leave Requests</Link></li>
                    <li><Link to="/departments">Departments</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/logout">Log Out</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
