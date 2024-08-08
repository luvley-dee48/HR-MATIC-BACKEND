import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import LeaveAllocation from './components/LeaveAllocation';
import LeaveRequests from './components/LeaveRequests';
import Departments from './components/Departments';
import Settings from './components/Settings';
import Employee from './components/Employee';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employee />} />
              <Route path="/leave-allocation" element={<LeaveAllocation />} />
              <Route path="/leave-requests" element={<LeaveRequests />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/settings" element={<Settings />} />
            
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;