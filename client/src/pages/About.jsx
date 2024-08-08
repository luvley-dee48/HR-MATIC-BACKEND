const details = [
  {
    title: "Employee Details",
    description: "Manage employee information efficiently.",
  },
  {
    title: "HR Admin",
    description: "Administer HR processes and workflows.",
  },
  {
    title: "Leave Management",
    description: "Streamline leave requests and approvals.",
  },
  {
    title: "User Roles and Permissions",
    description: "Control access and roles within the system.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col px-8 my-10" id="about">
      <div className="inline-flex justify-center mw-[50%]">
        <h1 className="text-7xl text-center mb-12">
          Our Full-Service HR <span className="text-purple-600">Solution</span>{" "}
          Delivers
        </h1>
      </div>
      <div className="flex justify-around">
        {details.map((detail, index) => (
          <div
            key={index}
            className="block max-w-sm p-6 rounded-lg odd:bg-[#DFD8FF] even:bg-[#E0E7FF]"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900">
              {detail.title}
            </h5>
            <p className="font-normal dark:text-neutral-700">
              {detail.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
