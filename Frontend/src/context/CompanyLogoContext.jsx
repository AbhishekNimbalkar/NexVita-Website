// frontend/src/context/CompanyLogoContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios"; // Your axios instance

const CompanyLogoContext = createContext();

export const useCompanyLogos = () => {
  return useContext(CompanyLogoContext);
};

export const CompanyLogoProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the auth header
  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return {}; // Return empty object if no token
  };

  const fetchCompanyLogos = async () => {
    try {
      setLoading(true);
      // No auth header needed for fetching if it's a public route
      const response = await api.get("/company-logos");
      setCompanies(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch company logos.");
      console.error("Error fetching company logos:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCompanyLogo = async (formData) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
          ...getAuthHeader().headers, // Merge auth header
        },
      };
      const response = await api.post("/company-logos", formData, config);
      setCompanies((prevCompanies) => [...prevCompanies, response.data]);
      setError(null);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to add company logo.";
      setError(errorMessage);
      console.error("Error adding company logo:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyLogo = async (id, formData) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
          ...getAuthHeader().headers, // Merge auth header
        },
      };
      const response = await api.put(`/company-logos/${id}`, formData, config);
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company._id === id ? response.data : company
        )
      );
      setError(null);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to update company logo.";
      setError(errorMessage);
      console.error("Error updating company logo:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteCompanyLogo = async (id) => {
    try {
      setLoading(true);
      // Include auth header for delete request
      await api.delete(`/company-logos/${id}`, getAuthHeader());
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company._id !== id)
      );
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to delete company logo.";
      setError(errorMessage);
      console.error("Error deleting company logo:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // --- New Admin Credential Update Functions ---

  const updateAdminEmail = async (data) => {
    try {
      const response = await api.put("/admin/email", data, getAuthHeader());
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to update email.";
      console.error("Error updating admin email:", err);
      return { success: false, error: errorMessage };
    }
  };

  const updateAdminPassword = async (data) => {
    try {
      const response = await api.put("/admin/password", data, getAuthHeader());
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Failed to update password.";
      console.error("Error updating admin password:", err);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchCompanyLogos();
  }, []);

  const value = {
    companies,
    loading,
    error,
    fetchCompanyLogos,
    addCompanyLogo,
    updateCompanyLogo,
    deleteCompanyLogo,
    updateAdminEmail, // Expose new functions
    updateAdminPassword, // Expose new functions
  };

  return (
    <CompanyLogoContext.Provider value={value}>
      {children}
    </CompanyLogoContext.Provider>
  );
};
