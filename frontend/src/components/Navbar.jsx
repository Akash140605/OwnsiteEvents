import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons
import { FaSign } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Site Name */}
        <h1 className="text-2xl font-bold"><span className="text-orange-100 ">Own</span><span className="text-red-500">Site</span></h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="  hover:text-gray-400">
             <span className="text-orange-100">Home</span> 
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-gray-400">
            <span className="text-orange-100">Events</span> 
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">
            <span className="text-orange-100">Contact</span> 
            </Link>
          </li>
          <li>
            <Link to="/create_event" className="hover:text-gray-400">
            <span className="text-orange-100">Admin</span> 
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none flex items-center"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          <FaSign size={20} className="text-red-500" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 mt-2 rounded-lg shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/create_event"
                className="hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
