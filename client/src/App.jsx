import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1>THE HR MATIC WEB APPLICATION.</h1> */}
        <nav>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
