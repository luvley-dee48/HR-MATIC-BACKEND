import { Link, Outlet } from "react-router-dom";
 


// eslint-disable-next-line react/prop-types
export const AdminDashboardLayout = ({ handleLogout }) => {
  
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white text-black p-4 shadow-lg">  
       <img src="/src/assets/images/Logo2.png" alt="HR Matic Logo" className="mb-4 w-full object-contain" />

        
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
      <div className="flex justify-center w-full mt-8">
        <Outlet />
      </div>
    </div>  
  );
};

