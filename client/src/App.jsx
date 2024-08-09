import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LeaveAllocation from './components/LeaveAllocation';
import LeaveRequests from './components/LeaveRequests';
import Departments from './components/Departments';
import Profile from './components/Profile';
import Employee from './components/Employee';

import {
  LandingLayout,
  AdminDashboardLayout,
  EmployeeDashboardLayout,
} from "./layouts/index";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";

import ContactUs from "./pages/ContactPage.jsx";
import AboutUs from "./pages/AboutPage.jsx";
import WhoWeServe from "./pages/ServicesPage.jsx";
import EmployeeDashboard from "./components/EmployeeDahboard.jsx";
import AdminDashboardPage from './components/AdminDashboardPage';

import "./App.css";

function App() {
  // Persist login state using localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  // Check login state on component mount
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    console.log("Logging in");
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true); // Store login state
  };

  const handleLogout = () => {
    console.log("Logging out");
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Clear login state
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Sidebar />}
        <div className={isLoggedIn ? "main-content" : ""}>
          {isLoggedIn && <Header />}
          <div className="content">
            <Routes>
              <Route element={<LandingLayout isLoggedIn={isLoggedIn} />}>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/" element={<HomePage />} exact />

                {/* Protected Routes */}
                <Route
                  path="/admin"
                  element={
                    isLoggedIn ? (
                      <AdminDashboardLayout handleLogout={handleLogout} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                >
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/employees" element={<Employee />} />
                  <Route path="/admin/departments" element={<Departments />} />
                  <Route path="/admin/leave-requests" element={<LeaveRequests />} />
                  <Route path="/admin/leave-allocation" element={<LeaveAllocation />} />
                  <Route path="/admin/profile" element={<Profile />} />
                  <Route path="/admin/users" element={<h1>Users</h1>} />
                </Route>

                <Route path="/about" element={<AboutUs />} />
                <Route path="/services" element={<WhoWeServe />} />
                <Route path="/contact" element={<ContactUs />} />

                {/* Employee Dashboard Layout */}
                <Route
                  path="/employee"
                  element={
                    isLoggedIn ? (
                      <EmployeeDashboardLayout handleLogout={handleLogout} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                >
                  <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                  <Route path="/employee/employees" element={<Employee />} />
                  <Route path="/employee/leave-requests" element={<LeaveRequests />} />
                  <Route path="/employee/profile" element={<Profile />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
