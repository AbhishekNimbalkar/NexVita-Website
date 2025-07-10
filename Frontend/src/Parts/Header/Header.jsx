import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  X,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  PlusCircle, // For the "Start a New Project" button icon
} from "lucide-react"; // Removed Menu as we'll use custom SVG

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu after navigation
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Custom SVG for the three-line menu icon
  const CustomMenuIcon = () => (
    <svg
      width="36" // Adjusted width based on screenshot info (36px)
      height="32" // Adjusted height based on screenshot info (32px)
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-800" // Apply text color via Tailwind
    >
      <rect x="0" y="0" width="36" height="4" rx="2" fill="currentColor" />{" "}
      {/* Top line */}
      <rect
        x="0"
        y="14"
        width="36"
        height="4"
        rx="2"
        fill="currentColor"
      />{" "}
      {/* Middle line */}
      <rect
        x="0"
        y="28"
        width="36"
        height="4"
        rx="2"
        fill="currentColor"
      />{" "}
      {/* Bottom line */}
    </svg>
  );

  return (
    // Header Section: bg-white for the main header background
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center relative z-20">
      {/* Logo - Left aligned */}
      <div className="flex items-center">
        <Link to="/" onClick={closeMenu}>
          <img
            src="/Company_logo.webp" // Path to your logo in the public folder
            alt="Company Logo"
            className="h-10 w-auto" // Adjust height as needed, w-auto maintains aspect ratio
          />
        </Link>
      </div>

      {/* Center-Right: Connect Button and Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        {/* Connect Button - Always visible */}
        <Link
          to="/contact"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex-shrink-0"
        >
          Connect with us
        </Link>

        {/* Mobile Menu Button (Custom Hamburger Icon) - Always visible */}
        <button
          onClick={toggleMenu}
          className="focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          {isMenuOpen ? (
            <X size={32} className="text-gray-800" />
          ) : (
            <CustomMenuIcon />
          )}
        </button>
      </div>

      {/* Mobile Menu Sidebar - Appears from the right when open */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          {/* Close button inside sidebar for better UX */}
          <div className="flex justify-end mb-6">
            <button
              onClick={closeMenu}
              className="text-gray-400 bg-gray-100 focus:outline-none p-2 rounded-full hover:bg-white-700 transition-colors duration-200"
            >
              <X size={32} />
            </button>
          </div>

          {/* New "Start a New Project" button */}
          <Link
            to="/contact" // Assuming this button also leads to contact
            onClick={closeMenu}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out mb-6 w-full"
          >
            <PlusCircle size={20} />
            <span>Start a New Project</span>
          </Link>

          <nav className="flex flex-col space-y-4 text-lg font-medium text-black">
            <Link
              to="/"
              onClick={closeMenu}
              className="hover:text-blue-400 transition duration-200" // Changed hover color
            >
              Home
            </Link>
            <Link
              to="/works"
              onClick={closeMenu}
              className="hover:text-blue-400 transition duration-200" // Changed hover color
            >
              Works
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-blue-400 transition duration-200" // Changed hover color
            >
              About us
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="hover:text-blue-400 transition duration-200" // Changed hover color
            >
              Contact us
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="hover:text-blue-400 transition duration-200" // Changed hover color
            >
              Service
            </Link>
            <Link
              to="/blogs"
              onClick={closeMenu}
              className="hover:text-blue-400 transition duration-200" // Changed hover color
            >
              Blogs
            </Link>
            <Link
              to="/terms"
              onClick={closeMenu}
              className="hover:text-blue-400 transition duration-200" // Changed hover color
            >
              Terms & Conditions
            </Link>
          </nav>

          {/* Social Media Links */}
          <div className="mt-8">
            <p className="text-gray-400 text-sm mb-3">Follow us on</p>
            <div className="flex space-x-3">
              {/* Instagram */}
              <a
                href="#"
                className="p-2 bg-purple-400 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                <Instagram size={20} className="text-white" />{" "}
                {/* Changed icon color to white */}
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="p-2 bg-purple-400 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                <Facebook size={20} className="text-white" />{" "}
                {/* Changed icon color to white */}
              </a>
              {/* Linkedin */}
              <a
                href="#"
                className="p-2 bg-purple-400 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                <Linkedin size={20} className="text-white" />{" "}
                {/* Changed icon color to white */}
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="p-2 bg-purple-400 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                <Twitter size={20} className="text-white" />{" "}
                {/* Changed icon color to white */}
              </a>
              {/* Youtube */}
              <a
                href="#"
                className="p-2 bg-purple-400 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                <Youtube size={20} className="text-white" />{" "}
                {/* Changed icon color to white */}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu - Visible when open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-20"
          onClick={toggleMenu} // Close menu when clicking outside
        ></div>
      )}
    </header>
  );
}

export default Header;
