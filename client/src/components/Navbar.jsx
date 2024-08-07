import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";

export default function Navbar() {
  return (
    <nav className="navbar bg-mediumpurple-100-20">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <img
            className="h-[50px] w-[50px] rounded-[30px] object-contain px-2 py-2"
            loading="lazy"
            alt="Logo"
            src={logo}
          />
        </div>
        <div className="nav-links flex space-x-4">
          <Link to="/" className="text-black">
            HR Matic Solutions
          </Link>
          <Link to="/about" className="text-black">
            About Us
          </Link>
          <Link to="/services" className="text-black">
            Who We Serve
          </Link>
          <Link to="/contact" className="text-black">
            Contact Us
          </Link>
        </div>

        <Link
          to="/login"
          className="bg-mediumpurple-100-90 text-white px-6 py-3 rounded"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
