import { Link } from "react-router-dom";

export default function NormalNavBar() {
  return (
    <>
      <div className="nav-links flex space-x-4">
        <a href="#" className="text-black">
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
        className="bg-mediumpurple-100-90 text-white px-4 py-2 rounded"
      >
        Login
      </Link>
    </>
  );
}
