// frontend/src/Parts/Header/AdminHeader.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Briefcase, // Icon for Work Process (or Cog, HardHat)
  Users, // Icon for Manage Users
  Image, // Icon for Portfolio (or Folder, Layers)
  MessageSquare, // Icon for Testimonials (or Quote)
  LogOut, // Icon for Logout
  Settings, // New icon for Admin Settings
} from "lucide-react"; // Import all necessary icons

// AdminHeader Component
// Receive onLogout prop
function AdminHeader({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu after navigation
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    closeMenu(); // Close mobile menu first
    if (onLogout) {
      onLogout(); // Call the logout function passed from App.jsx
    }
  };

  return (
    // Header Section
    <header className="bg-[#0A142F] shadow-md py-4 px-6 flex justify-between items-center relative z-20">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/admin" onClick={closeMenu}>
          <img
            src="/Company_logo.webp" // Path to your logo in the public folder
            alt="Company Logo"
            className="h-10 w-auto" // Adjust height as needed, w-auto maintains aspect ratio
          />
        </Link>
      </div>

      {/* Desktop Navigation - Visible on medium and larger screens */}
      <div className="hidden md:flex items-center space-x-6 text-white text-lg font-medium">
        <Link
          to="/admin" // This now serves as the "Work Process" link
          className="flex items-center space-x-2 hover:text-blue-400 transition duration-200"
        >
          <Briefcase size={20} />
          <span>Work Process</span>
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center space-x-2 hover:text-blue-400 transition duration-200"
        >
          <Users size={20} />
          <span>Manage Users</span>
        </Link>
        <Link
          to="/admin/portfolio"
          className="flex items-center space-x-2 hover:text-blue-400 transition duration-200"
        >
          <Image size={20} />
          <span>Portfolio</span>
        </Link>
        <Link
          to="/admin/testimonials"
          className="flex items-center space-x-2 hover:text-blue-400 transition duration-200"
        >
          <MessageSquare size={20} />
          <span>Testimonials</span>
        </Link>
        {/* New Admin Settings Link */}
        <Link
          to="/admin/settings" // New route for admin settings
          onClick={closeMenu}
          className="flex items-center space-x-2 hover:text-blue-400 transition duration-200"
        >
          <Settings size={20} />
          <span>Admin Settings</span>
        </Link>
        {/* Changed Link to a button for logout, as it's an action, not just navigation */}
        <button
          onClick={handleLogoutClick}
          className="flex items-center space-x-2 hover:text-blue-400 transition duration-200 bg-transparent border-none cursor-pointer text-white text-lg font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Menu Button (Hamburger Icon) - Visible only on mobile/tablet */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-200 focus:outline-none"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Sidebar - Appears from the right on mobile/tablet when open */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#0A142F] shadow-lg transform transition-transform duration-300 ease-in-out z-10
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <nav className="flex flex-col space-y-4 text-lg font-medium text-white">
            {/* Admin Menu Items for Mobile */}
            <Link
              to="/admin" // This is the "Work Process" link for mobile
              onClick={closeMenu}
              className="flex items-center space-x-3 hover:text-blue-400 transition duration-200"
            >
              <Briefcase size={24} /> {/* Larger icon for mobile menu */}
              <span>Work Process</span>
            </Link>
            <Link
              to="/admin/users"
              onClick={closeMenu}
              className="flex items-center space-x-3 hover:text-blue-400 transition duration-200"
            >
              <Users size={24} />
              <span>Manage Users</span>
            </Link>
            <Link
              to="/admin/portfolio"
              onClick={closeMenu}
              className="flex items-center space-x-3 hover:text-blue-400 transition duration-200"
            >
              <Image size={24} />
              <span>Portfolio</span>
            </Link>
            <Link
              to="/admin/testimonials"
              onClick={closeMenu}
              className="flex items-center space-x-3 hover:text-blue-400 transition duration-200"
            >
              <MessageSquare size={24} />
              <span>Testimonials</span>
            </Link>
            {/* New Admin Settings Link for Mobile */}
            <Link
              to="/admin/settings" // New route for admin settings
              onClick={closeMenu}
              className="flex items-center space-x-3 hover:text-blue-400 transition duration-200"
            >
              <Settings size={24} />
              <span>Admin Settings</span>
            </Link>
            {/* Logout for mobile menu */}
            <button
              onClick={handleLogoutClick}
              className="flex items-center space-x-3 hover:text-blue-400 transition duration-200 bg-transparent border-none cursor-pointer text-white text-lg font-medium text-left w-full"
            >
              <LogOut size={24} />
              <span>Logout</span>
            </button>
          </nav>

          {/* Social Media Links (as before) */}
          <div className="mt-8">
            <p className="text-white text-sm mb-3">Follow us on</p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200"
              >
                <Instagram size={20} className="text-blue-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200"
              >
                <Facebook size={20} className="text-blue-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200"
              >
                <Linkedin size={20} className="text-blue-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200"
              >
                <Twitter size={20} className="text-blue-600" />
              </a>
              <a
                href="#"
                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200"
              >
                <Youtube size={20} className="text-blue-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu - Visible on all screen sizes when open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={toggleMenu} // Close menu when clicking outside
        ></div>
      )}
    </header>
  );
}

export default AdminHeader;
