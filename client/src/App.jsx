import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'; 
import Dashboard from './components/Dashboard';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Sidebar />
       <div className="main-content">
        <Header />
      <div className="content">
        <Dashboard />
      </div>
    </div>
    </div>
  );
}

export default App;