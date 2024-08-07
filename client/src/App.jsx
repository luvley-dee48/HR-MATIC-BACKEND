import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import { AppLayout } from "./layouts/index.jsx";

import ContactUs from "./pages/ContactPage.jsx";
import AboutUs from "./pages/AboutPage.jsx";
import WhoWeServe from "./pages/ServicesPage.jsx";

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

  const handleLogout = () => {
    console.log("Logging out");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            element={
              <AppLayout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            }
          >
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            {/* <Route path="/" element={<HomePage />} exact={true} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<WhoWeServe />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/employees" element={<h1>Employees</h1>} />
            <Route path="/departments" element={<h1>Departments</h1>} />
            <Route path="/leave-requests" element={<h1>Leave Requests</h1>} />
            <Route
              path="/leave-allocation"
              element={<h1>Leave Allocations</h1>}
            />
            <Route path="/users" element={<h1>Users</h1>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
