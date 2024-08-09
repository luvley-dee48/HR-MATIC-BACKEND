

// eslint-disable-next-line react/prop-types
const DashboardHeader = ({ George }) => {
  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-md rounded-lg">
      <div>
        <h1 className="text-2xl font-bold">Hello {George}!</h1>
        <p className="text-lg text-purple-500">Good Morning</p>
      </div>
      <div className="flex space-x-8">
        <div className="text-center">
          <p>Total Employees</p>
          <p className="text-2xl font-bold">50/50</p>
        </div>
        <div className="text-center">
          <p>On Leave</p>
          <p className="text-2xl font-bold">10/50</p>
        </div>
        <div className="text-center">
          <p>Happiness Rate</p>
          <p className="text-2xl font-bold text-purple-500">90%</p>
        </div>
      </div>
    </div>
  );
};

const LeaveRequestTable = () => {
  const leaveRequests = [
    {
      type: "Sick Leave",
      reason: "Emergency",
      status: "Approved",
      approver: "Arnold",
      startDate: "16/08/2024",
      endDate: "20/08/2024",
      duration: "11 hours",
    },
    {
      type: "Annual Leave",
      reason: "Burial",
      status: "Approved",
      approver: "Fatma",
      startDate: "16/09/2024",
      endDate: "20/09/2024",
      duration: "48 hours",
    },
    {
      type: "Annual Leave",
      reason: "Ceremony",
      status: "Declined",
      approver: "Johnson",
      startDate: "12/09/2024",
      endDate: "13/09/2024",
      duration: "Nil",
    },
    {
      type: "Study Leave",
      reason: "Studying",
      status: "Pending",
      approver: "Lornah",
      startDate: "14/09/2024",
      endDate: "18/09/2024",
      duration: "Nil",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-purple-500 text-white">
          <tr>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Reason</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Approver</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">End Date</th>
            <th className="py-2 px-4">Duration</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request, index) => (
            <tr
              key={index}
              className="border-b hover:bg-purple-100 transition duration-200"
            >
              <td className="py-2 px-4">{request.type}</td>
              <td className="py-2 px-4">{request.reason}</td>
              <td
                className={`py-2 px-4 font-semibold ${
                  request.status === "Approved"
                    ? "text-green-500"
                    : request.status === "Declined"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {request.status}
              </td>
              <td className="py-2 px-4">{request.approver}</td>
              <td className="py-2 px-4">{request.startDate}</td>
              <td className="py-2 px-4">{request.endDate}</td>
              <td className="py-2 px-4">{request.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboardPage = () => {
  const adminName = "George";

  return (
    <div className="p-6">
      <DashboardHeader adminName={adminName} />
      <LeaveRequestTable />
    </div>
  );
};

export default AdminDashboardPage;
