import React from "react";

const StatCard = ({ title, value, description, bgColor }) => {
  return (
    <div className={`rounded-lg p-6 ${bgColor} text-black shadow-md`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl mt-2">{value}</p>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  );
};

export default StatCard;
