/* eslint-disable react/prop-types */
import { Link, Outlet } from "react-router-dom";
import {useState} from "react";

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
        <Link to="/users" className="text-black">
          Profile
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

// AdminDashboardLayout Component
export const AdminDashboardLayout = ({ handleLogout }) => {
  // eslint-disable-next-line no-undef
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement search functionality here
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-64 bg-white text-black p-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">HR Matic</h2>
        <form
          onSubmit={handleSearchSubmit}
          className="mb-4 flex justify-center"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
          <button
            type="submit"
            className="bg-[#A390FC] text-white p-2 ml-2 rounded"
          >
            Search
          </button>
        </form>
        <ul>
          <li className="mb-2">
            <Link
              to="/admin"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Admin Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/employees"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Employees
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/departments"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Departments
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/leave-requests"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Leave Requests
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/leave-allocation"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Leave Allocation
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin/users"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Users
            </Link>
          </li>
          <li className="mt-4">
            <Link
              to="/admin/profile"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Profile
            </Link>
          </li>
          <li className="mt-2">
            <Link
              to="/login"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-center mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNavBar;


