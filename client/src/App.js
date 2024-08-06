import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppStructure from './AppStructure';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AppStructure />} />
      </Routes>
    </Router>
  );
};

export default App;
