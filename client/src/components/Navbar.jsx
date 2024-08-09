import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";

export default function Navbar() {
  return (
    <nav className="bg-purple-100 p-4">
      <div className="max-w-6xl mx-auhref flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            className="h-12 w-12 rounded-full object-contain"
            loading="lazy"
            alt="Logo"
            src={logo}
          />
        </div>
        <div className="flex space-x-4">
          <a href="#home" className="text-[#646cff] hover:text-[#535bf2]">
            HR Matic Solutions
          </a>
          <a href="#about" className="text-black">
            About Us
          </a>
          <a href="#services" className="text-black">
            Who We Serve
          </a>
          <a href="#contact" className="text-black">
            Contact Us
          </a>
        </div>
        <Link
          to="/login"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
