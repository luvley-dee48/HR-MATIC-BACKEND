import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import HRMaticSolutions from "./pages/HRMaticSolutions";  // Import the updated component
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HRMaticSolutions />} />  {/* Update the path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
