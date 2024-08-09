
import EmployeeTable from "./EmployeeTable";

const EmployeePage = () => {
  // Sample employee data
  const employees = [
    {
      firstName: "John",
      lastName: "Williams",
      email: "johnwilliams@gmail.com",
      phoneNo: "0712345678",
      address: "64th Smith Street",
      jobTitle: "Software Developer",
      department: "Tech",
    },
    // Add more employee data as needed
  ];

  return (
    <div className="p-6">
      {/* Employees Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Employees</h2>
          <button className="bg-[#A390FC] text-white py-2 px-4 rounded-lg hover:bg-[#8664F6] transition duration-300">
            + Add Employee
          </button>
        </div>
        <EmployeeTable employees={employees} />
      </div>

      {/* Update and Delete buttons */}
      <div className="flex justify-between">
        <button className="bg-purple-200 text-purple-700 py-2 px-4 rounded-lg flex items-center space-x-2">
          <span>🔄</span>
          <span>Update</span>
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
          <span>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeePage;
