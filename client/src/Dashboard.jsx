import React from 'react';
import AdminNavBar from './components/AdminNavBar';

const Dashboard = () => {
  return (
    <div>
      <AdminNavBar />
      <div className="dashboard-content">
        {/* Your dashboard content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
