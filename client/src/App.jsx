import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

import "./App.css";

function Dashboard() {
  return <h1>Welcome to the DashBoard</h1>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("Logging in");
    setIsLoggedIn(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    console.log("Logging out");
    setIsLoggedIn(false);
  };

  return (
    
<Router>
  <div className="App">
    <Routes>
      <Route element={<LandingLayout isLoggedIn={isLoggedIn} />}>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/" element={<HomePage />} exact />
        <Route path="/admin" element={<AdminDashboardLayout handleLogout={handleLogout} />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/employees" element={<h1>Employees</h1>} />
          <Route path="/admin/departments" element={<h1>Departments</h1>} />
          <Route path="/admin/leave-requests" element={<h1>Leave Requests</h1>} />
          <Route path="/admin/leave-allocation" element={<h1>Leave Allocations</h1>} />
          <Route path="/admin/profile" element={<h1>profile</h1>} />

          
          <Route path="/admin/users" element={<h1>Users</h1>} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<WhoWeServe />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* <Route path="/employee" element={<EmployeeDashboardLayout />}>
          <Route path="/employee/" element={<EmployeeDashboard />} />
        </Route> */}
        {/* <Route path="/employee" element={<EmployeeDashboardLayout handleLogout={handleLogout} />}> */}
        <Route path="/employee" element={<EmployeeDashboardLayout handleLogout={handleLogout} />}>

        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/employees" element={<h1>Employees</h1>} />
        <Route path="/employee/leave-requests" element={<h1>Leave Requests</h1>} />
        <Route path="/employee/profile" element={<h1>Profile</h1>} />
      </Route>

      </Route>
    </Routes>
  </div>
</Router>
  );
}

export default App;


