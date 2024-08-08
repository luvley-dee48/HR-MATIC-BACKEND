/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const AdminNavBar = ({ handleLogout }) => {
  return (
    <>
   
      <div className="nav-links flex space-x-4">
        <Link to="/dashboard" className="text-black">
          Admin Dashboard
        </Link>
        <Link to="/employees" className="text-black">
          Employees
        </Link>
        <Link to="/departments" className="text-black">
          Departments
        </Link>
        <Link to="/leave-requests" className="text-black">
          Leave Requests
        </Link>
        <Link to="/leave-allocation" className="text-black">
          Leave Allocation
        </Link>
        <Link to="/users" className="text-black">
          Users
        </Link>
      </div>
      <button
        className="bg-mediumpurple-100-90 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  
  );
};

export default AdminNavBar;





