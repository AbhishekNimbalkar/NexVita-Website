// frontend/src/Pages/Admin/AdminDashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminWorkProcess from "../../Pages/Admin/AdminWorkProcess"; // Corrected path to components
import AdminChangeCredentials from "./AdminChangeCredentials"; // Import the new component
import AdminPortfolio from "./AdminPortfolio";
import AdminTestimonials from "./AdminTestimonials";

const AdminDashboard = () => {
  return (
    // The main container directly holds the content area
    <div className="flex-grow p-6 md:p-8 bg-gray-100">
      {/* Wrap your Route components in Routes */}
      <Routes>
        <Route
          // When the path matches the base path for AdminDashboard (e.g., /admin),
          // it will now render the AdminWorkProcess component directly.
          path="/"
          element={<AdminWorkProcess />}
        />
        {/* Add route for Admin Settings */}
        <Route path="/settings" element={<AdminChangeCredentials />} />
        <Route path="/Portfolio" element={<AdminPortfolio />} />
        <Route path="/Testimonials" element={<AdminTestimonials />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
