import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import logo from './assets/images/Logo.png';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-mediumpurple-100-20 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">

            
            <img
        className="h-[50px] w-[50px] rounded-[30px] object-contain"
        loading="lazy"
        alt="Logo"
        src={logo}
      />
            <Link to="/" className="text-black">HR Matic Solutions</Link>
            <Link to="/about" className="text-black">About Us</Link>
            <Link to="/services" className="text-black">Who We Serve</Link>
            <Link to="/contact" className="text-black">Contact Us</Link>
          </div>
          <Link to="/login" className="bg-mediumpurple-100-90 text-white px-4 py-2 rounded">Login</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
