import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm text-gray-700">
        {/* Left: Brand/Info */}
        <div>
          <h2 className="text-lg font-semibold text-green-600">Kenya Football</h2>
          <p className="mt-2">
            Building a future for Kenyan footballers through data, transparency, and opportunity.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-semibold">Quick Links</h3>
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/teams" className="hover:text-green-600">Teams</Link>
          <Link to="/players" className="hover:text-green-600">Players</Link>
          <Link to="/dashboard" className="hover:text-green-600">Dashboard</Link>
        </div>

        {/* Right: Social + Copyright */}
        <div>
          <h3 className="text-md font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-500"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram /></a>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Kenya Football Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
