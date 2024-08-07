/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";

import AdminNavBar from "../components/AdminNavBar";
import NormalNavBar from "../components/NormalNavBar";

import logo from "../assets/images/Logo.png";

export const AppLayout = ({ isLoggedIn, handleLogout }) => {
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
        {isLoggedIn ? (
          <AdminNavBar handleLogout={handleLogout} />
        ) : (
          <NormalNavBar />
        )}
      </nav>
      <Outlet />
    </div>
  );
};
