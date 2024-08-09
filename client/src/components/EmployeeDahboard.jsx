import StatCard from "./StatCard";

const EmployeeDashboard = () => {
  return (
    <div className="flex-1 bg-white p-6">
      <h1 className="text-2xl font-semibold text-black mb-4">Welcome Back,</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Days Available"
          value="7 days"
          description="To book time off"
          bgColor="bg-[#A390FC]"
        />
        <StatCard
          title="Pending Requests"
          value="4 days"
          description="Tracking Manager's Requests"
          bgColor="bg-[#E0E7FF]"
        />
        <StatCard
          title="Days Used"
          value="0 days"
          description="12 Days Decision Taken"
          bgColor="bg-[#A390FC]"
        />
        <StatCard
          title="Days Off"
          value="12 days"
          description="To book time off"
          bgColor="bg-[#E0E7FF]"
        />
        <StatCard
          title="Days Available"
          value="0 days"
          description="Shows Total Days Used"
          bgColor="bg-[#A390FC]"
        />
        <StatCard
          title="Days Available for Use"
          value="21 days"
          description="Show Total days"
          bgColor="bg-[#E0E7FF]"
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;

