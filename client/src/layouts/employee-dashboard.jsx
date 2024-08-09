/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export const EmployeeDashboardLayout = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout logic passed as a prop
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white text-black p-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">HR Matic</h2>
        <ul>
          <li className="mb-2">
            <Link
              to="/employee/dashboard"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Dashboard
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/employee/employees"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Employees
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/employee/leave-requests"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Leave Requests
            </Link>
          </li>

          <li className="mt-4">
            <Link
              to="/employee/profile"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
            >
              Profile
            </Link>
          </li>

          <li className="mt-2">
            <a
              href="#"
              className="block p-2 hover:bg-[#A390FC] hover:text-white rounded-lg transition duration-300"
              onClick={handleLogoutClick}
            >
              Log Out
            </a>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

