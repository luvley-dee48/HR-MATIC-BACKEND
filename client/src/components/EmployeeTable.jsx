// eslint-disable-next-line react/prop-types
const EmployeeTable = ({ employees }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-[#A390FC]">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase">First Name</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase">Last Name</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase">Email</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase">Phone No</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase">Address</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase">Job Title</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="even:bg-[#F3E8FF] odd:bg-[#E9DFFF]">
              <td className="py-3 px-4 text-sm text-gray-700">{employee.firstName}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{employee.lastName}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{employee.email}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{employee.phoneNo}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{employee.address}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{employee.jobTitle}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
