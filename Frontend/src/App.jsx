// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./Parts/Header/Header";
import Footer from "./Parts/Footer/Footer";
import Services from "./Pages/Services/Services";
import Home from "./Pages/Home/Home";

// Import Admin components
import AdminHeader from "./Parts/Header/AdminHeader";
import AdminFooter from "./Parts/Footer/AdminFooter";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLogin from "./Pages/Admin/AdminLogin"; // Import the new login component

// Import the CompanyLogoProvider (assuming you have it set up in context/CompanyLogoContext.js)
import { CompanyLogoProvider } from "./context/CompanyLogoContext";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Testimonials from "./Pages/Home/Testimonials";

function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check for a token in localStorage on component mount
    const token = localStorage.getItem("adminToken");
    if (token) {
      // In a real app, you'd want to validate this token with your backend
      // For simplicity, we'll assume its presence means authenticated
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove token on logout
    setIsAdminAuthenticated(false);
    navigate("/"); // Redirect to login page
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    // Wrap your entire application or relevant parts with CompanyLogoProvider
    <CompanyLogoProvider>
      <div className="min-h-screen flex flex-col font-sans bg-gray-100">
        {/* Conditionally render Header or AdminHeader */}
        {isAdminRoute ? (
          <AdminHeader onLogout={handleLogout} /> // Pass onLogout to AdminHeader
        ) : (
          <Header />
        )}

        {/* Main Content area where routes will be rendered */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />{" "}
            {/* Optional: For "See All Projects" button */}
            <Route path="/portfolio/:id" element={<Portfolio />} />{" "}
            {/* Route for individual project details */}
            <Route
              path="/works"
              element={
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Our Works Page
                  </h1>
                  <p className="text-gray-700">Content for the Works page.</p>
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    About Us Page
                  </h1>
                  <p className="text-gray-700">
                    Content for the About Us page.
                  </p>
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Contact Us Page
                  </h1>
                  <p className="text-gray-700">
                    Content for the Contact Us page.
                  </p>
                </div>
              }
            />
            <Route
              path="/blogs"
              element={
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Blogs Page
                  </h1>
                  <p className="text-gray-700">Content for the Blogs page.</p>
                </div>
              }
            />
            <Route path="/Testimonials" element={<Testimonials />} />
            <Route
              path="/terms"
              element={
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Terms & Conditions Page
                  </h1>
                  <p className="text-gray-700">
                    Content for the Terms & Conditions page.
                  </p>
                </div>
              }
            />
            <Route
              path="/privacy"
              element={
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Privacy Policy
                  </h1>
                  <p className="text-gray-700">
                    Content for your Privacy Policy page.
                  </p>
                </div>
              }
            />
            {/* Admin Routes */}
            {/* If not authenticated, show login page for /admin path */}
            {!isAdminAuthenticated ? (
              <Route
                path="/admin/*" // Matches /admin and any sub-paths
                element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
              />
            ) : (
              // If authenticated, show AdminDashboard (which contains sub-admin routes)
              <Route path="/admin/*" element={<AdminDashboard />} />
            )}
          </Routes>
        </main>

        {/* Conditionally render Footer or AdminFooter */}
        {isAdminRoute ? <AdminFooter /> : <Footer />}
      </div>
    </CompanyLogoProvider>
  );
}

export default App;
