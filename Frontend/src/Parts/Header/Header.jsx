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
} from "lucide-react";

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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="text-black"
    >
      <rect x="6" y="5" width="14" height="2" fill="currentColor" />
      <rect x="3" y="11" width="20" height="2" fill="currentColor" />
      <rect x="5" y="17" width="14" height="2" fill="currentColor" />
    </svg>
  );
  return (
    // Header Section: bg-white for the main header background
    <header className="bg-white shadow-md py-4 px-4 sm:px-6 flex justify-between items-center z-20 fixed w-full h-[75px]">
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
      <div className="flex items-center space-x-4 ">
        {/* Connect Button - Hidden on medium screens and below, visible only on large screens */}
        <Link
          to="/contact"
          className="hidden lg:block bg-[#6854FC] hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out flex-shrink-0"
        >
          Connect with us
        </Link>
        {/* Mobile Menu Button (Custom Hamburger Icon) - Always visible */}
        <button
          onClick={toggleMenu}
          className="focus:outline-none p-2 hover:bg-gray-100 transition-colors duration-200"
        >
          {isMenuOpen ? (
            <X size={32} className="text-black" />
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
          {/* Close button and "Start a New Project" button in a flex container */}
          <div className="flex justify-between items-center mb-6">
            {/* New "Start a New Project" button - moved here */}
            <Link
              to="/contact" // Assuming this button also leads to contact
              onClick={closeMenu}
              className="flex items-center space-x-2 bg-[#6854FC]  text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out w-auto whitespace-nowrap"
            >
              {/* Added a right arrow icon (using a simple SVG for now as lucide-react doesn't have a direct arrow-right-circle) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <span className="font-inter font-bold text-[13px] leading-[140%] tracking-normal text-white">
                Start a New Project
              </span>
            </Link>
            {/* Close button inside sidebar for better UX - moved here */}
            <button
              onClick={closeMenu}
              className="text-gray-400 bg-gray-100 focus:outline-none p-2 rounded-full hover:bg-white-700 transition-colors duration-200 ml-4"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 text-lg font-medium text-black">
            <Link
              to="/"
              onClick={closeMenu}
              className="font-inter font-normal text-[20px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/works"
              onClick={closeMenu}
              className="font-inter font-normal text-[20px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200"
            >
              Works
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="font-inter font-normal text-[20px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200"
            >
              About us
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="font-inter font-normal text-[20px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200"
            >
              Contact us
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="font-inter font-normal text-[20px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200"
            >
              Service
            </Link>
            <Link
              to="/blogs"
              onClick={closeMenu}
              className="font-inter font-normal text-[20px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200"
            >
              Blogs
            </Link>
            <Link
              to="/terms"
              onClick={closeMenu}
              className="font-inter font-normal text-[20px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200"
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
                className="p-2 bg-[#e0e0f0] rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <Instagram size={20} className="text-[#6854FC]" />
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="p-2 bg-[#e0e0f0] rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <Facebook size={20} className="text-[#6854FC]" />
              </a>
              {/* Linkedin */}
              <a
                href="#"
                className="p-2 bg-[#e0e0f0] rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <Linkedin size={20} className="text-[#6854FC]" />
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="p-2 bg-[#e0e0f0] rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <Twitter size={20} className="text-[#6854FC]" />
              </a>
              {/* Youtube */}
              <a
                href="#"
                className="p-2 bg-[#e0e0f0] rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <Youtube size={20} className="text-[#6854FC]" />
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
