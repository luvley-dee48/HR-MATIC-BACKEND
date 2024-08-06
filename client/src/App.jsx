import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import './App.css';
import logo from './assets/images/Logo.png';
import AdminNavBar from './components/AdminNavBar';
import AboutUs from './pages/AboutPage.jsx';
import WhoWeServe from './pages/ServicesPage.jsx';
import ContactUs from './pages/ContactPage.jsx';

const Dashboard = lazy(() => import('./Dashboard.jsx'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<HomePage isLoggedIn={isLoggedIn}><LoginPage onLogin={handleLogin} /></HomePage>} />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? 
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard /> 
              </Suspense> : 
              <Navigate to="/login" />} 
          />
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/about" element={<HomePage isLoggedIn={isLoggedIn}><AboutUs /></HomePage>} />
          <Route path="/services" element={<HomePage isLoggedIn={isLoggedIn}><WhoWeServe /></HomePage>} />
          <Route path="/contact" element={<HomePage isLoggedIn={isLoggedIn}><ContactUs /></HomePage>} />
        </Routes>
      </div>
    </Router>
  );
}

const HomePage = ({ isLoggedIn, children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isLogin = location.pathname === '/login';

  return (
    <div>
      <nav className="navbar bg-mediumpurple-100-20 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            className="h-[50px] w-[50px] rounded-[30px] object-contain"
            loading="lazy"
            alt="Logo"
            src={logo}
          />
        </div>
        <div className="nav-links flex space-x-4">
          <Link to="/" className="text-black">HR Matic Solutions</Link>
          <Link to="/about" className="text-black">About Us</Link>
          <Link to="/services" className="text-black">Who We Serve</Link>
          <Link to="/contact" className="text-black">Contact Us</Link>
        </div>
        {!isLoggedIn && !isDashboard && (
          <Link to="/login" className="bg-mediumpurple-100-90 text-white px-4 py-2 rounded">Login</Link>
        )}
      </nav>
      <div>
        {isDashboard ? <AdminNavBar /> : children}
      </div>
    </div>
  );
};

export default App;
