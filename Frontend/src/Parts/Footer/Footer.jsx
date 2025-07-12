import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { Instagram, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#0A142F] text-white py-10 px-6">
      <div className="container mx-auto flex flex-col items-center space-y-8">
        {/* Logo - Now using Link to redirect to home page */}
        <div className="flex items-center mb-6 md:mb-0">
          <Link to="/">
            <img
              src="/Company_logo.webp" // Path to your logo in the public folder
              alt="Company Logo"
              className="h-10 w-auto" // Adjust height as needed, w-auto maintains aspect ratio
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-6 md:space-x-10 text-lg font-medium mb-8">
          <Link
            to="/portfolio"
            className="hover:text-yellow-500 transition duration-200"
          >
            Works
          </Link>
          <Link
            to="/services"
            className="hover:text-yellow-500 transition duration-200"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-500 transition duration-200"
          >
            Contact us
          </Link>
          <Link
            to="/careers"
            className="hover:text-yellow-500 transition duration-200"
          >
            Careers
          </Link>
        </nav>

        {/* Social Media Icons - These typically link to external sites, so <a> tags are fine */}
        <div className="flex space-x-4 mb-8">
          <a
            href="https://www.instagram.com/" // Example external link
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            <Instagram size={24} className="text-white" />
          </a>
          <a
            href="https://www.facebook.com/" // Example external link
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            <Facebook size={24} className="text-white" />
          </a>
          <a
            href="https://www.linkedin.com/" // Example external link
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            <Linkedin size={24} className="text-white" />
          </a>
          <a
            href="https://twitter.com/" // Example external link
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            <Twitter size={24} className="text-white" />
          </a>
          <a
            href="https://www.youtube.com/" // Example external link
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            <Youtube size={24} className="text-white" />
          </a>
        </div>

        {/* Copyright and Legal Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
          <span>Copyright 2025</span>
          <Link
            to="/terms"
            className="hover:text-yellow-500 transition duration-200"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/terms"
            className="hover:text-yellow-500 transition duration-200"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
