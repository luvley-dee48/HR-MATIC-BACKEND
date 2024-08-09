/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";
import NormalNavBar from "../components/NormalNavBar";

import logo from "../assets/images/Logo.png";

export const LandingLayout = ({ isLoggedIn }) => {
  return (
    <div>
      {!isLoggedIn ? (
        <nav className="navbar bg-mediumpurple-100-20 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-[50px] w-[50px] rounded-[30px] object-contain"
                loading="lazy"
                alt="Logo"
                src={logo}
              />
            </Link>
          </div>
          <NormalNavBar />
        </nav>
      ) : null}
      <Outlet />
    </div>
  );
};
