import React from 'react';

const EmployeeDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">HR Matic</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700">Dashboard</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700">Leave Allocation</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700">Employees</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700">Leave Requests</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2 hover:bg-gray-700">Departments</a>
          </li>
          <li className="mt-4">
            <a href="#" className="block p-2 hover:bg-gray-700">Settings</a>
          </li>
          <li className="mt-2">
            <a href="#" className="block p-2 hover:bg-gray-700">Log Out</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Employee</button>
        </div>

        {/* Employees Table */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Date Hired</th>
                <th className="px-4 py-2">Salary</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Phone No</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Leave Records</th>
                <th className="px-4 py-2">Job Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Justin George</td>
                <td className="border px-4 py-2">Marketing</td>
                <td className="border px-4 py-2">22</td>
                <td className="border px-4 py-2">02-03-23</td>
                <td className="border px-4 py-2">$5,000</td>
                <td className="border px-4 py-2">Kisumu</td>
                <td className="border px-4 py-2">0712345678</td>
                <td className="border px-4 py-2">justin@gmail.com</td>
                <td className="border px-4 py-2">10 days left</td>
                <td className="border px-4 py-2">HR Assistant</td>
              </tr>
              {/* Repeat <tr> for more employees */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
