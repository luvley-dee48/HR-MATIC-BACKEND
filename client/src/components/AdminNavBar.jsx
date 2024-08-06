import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png'; 

const AdminNavBar = () => {
  return (
    <nav className="navbar bg-mediumpurple-100-20 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img
          className="h-[50px] w-[50px] rounded-[30px] object-contain"
          loading="lazy"
          alt="Logo"
          src={logo}
        />
      </div>
      <div className="nav-links flex space-x-4">
        <Link to="/dashboard" className="text-black">Admin Dashboard</Link>
        <Link to="/employees" className="text-black">Employees</Link>
        <Link to="/departments" className="text-black">Departments</Link>
        <Link to="/leave-requests" className="text-black">Leave Requests</Link>
        <Link to="/leave-allocation" className="text-black">Leave Allocation</Link>
        <Link to="/users" className="text-black">Users</Link>
      </div>
      <button className="bg-mediumpurple-100-90 text-white px-4 py-2 rounded" onClick={() => {/* Handle logout logic */}}>
        Logout
      </button>
    </nav>
  );
};

export default AdminNavBar;
