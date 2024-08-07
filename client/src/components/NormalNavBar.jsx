import { Link } from "react-router-dom";

export default function NormalNavBar() {
  return (
    <>
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
        className="bg-mediumpurple-100-90 text-white px-4 py-2 rounded"
      >
        Login
      </Link>
    </>
  );
}
