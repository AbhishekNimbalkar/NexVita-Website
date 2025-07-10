import React, { useState, useEffect } from "react";
import { useCompanyLogos } from "../../context/CompanyLogoContext";
import { Edit, Trash2, PlusCircle, Save, XCircle } from "lucide-react"; // Import Save and XCircle for edit form buttons

const AdminWorkProcess = () => {
  const {
    companies,
    loading,
    error,
    addCompanyLogo,
    updateCompanyLogo,
    deleteCompanyLogo,
    // fetchCompanyLogos, // Not directly used in this component's logic flow, but available from context
  } = useCompanyLogos();

  // State for Add New Logo Form
  const [newLogoName, setNewLogoName] = useState("");
  const [newLogoFile, setNewLogoFile] = useState(null);
  const [addFormError, setAddFormError] = useState(null);
  const [addFormSuccess, setAddFormSuccess] = useState(null);

  // State for Editing Logos
  const [editingLogoId, setEditingLogoId] = useState(null);
  const [editingLogoName, setEditingLogoName] = useState("");
  const [editingLogoFile, setEditingLogoFile] = useState(null);
  const [editFormError, setEditFormError] = useState(null);

  // Global Notification State for Delete/Update Success/Error
  const [globalNotification, setGlobalNotification] = useState(null); // { message: string, type: 'success' | 'error' }

  // Effect to clear global notifications after a few seconds
  useEffect(() => {
    if (globalNotification) {
      const timer = setTimeout(() => {
        setGlobalNotification(null);
      }, 4000); // Clear after 4 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [globalNotification]);

  const handleNewLogoSubmit = async (e) => {
    e.preventDefault();
    setAddFormError(null);
    setAddFormSuccess(null);
    setGlobalNotification(null); // Clear any other active notifications

    if (!newLogoName.trim() || !newLogoFile) {
      // Use .trim() for input validation
      setAddFormError("Please provide both a name and select a logo file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newLogoName.trim());
    formData.append("logo", newLogoFile); // 'logo' must match the field name in multer

    const result = await addCompanyLogo(formData);
    if (result.success) {
      setNewLogoName("");
      setNewLogoFile(null);
      e.target.reset(); // Clear file input (important for type="file")
      setAddFormSuccess("Logo added successfully!");
      setGlobalNotification({
        message: "Logo added successfully!",
        type: "success",
      });
    } else {
      const errorMessage = result.error || "Failed to add logo.";
      setAddFormError(errorMessage);
      setGlobalNotification({ message: errorMessage, type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this logo?")) {
      setGlobalNotification(null); // Clear previous notifications
      const result = await deleteCompanyLogo(id);
      if (result.success) {
        setGlobalNotification({
          message: "Logo deleted successfully!",
          type: "success",
        });
      } else {
        setGlobalNotification({
          message: result.error || "Failed to delete logo.",
          type: "error",
        });
      }
    }
  };

  const handleEditClick = (company) => {
    setEditingLogoId(company._id);
    setEditingLogoName(company.name);
    setEditingLogoFile(null); // Clear previous file selection for new edit
    setEditFormError(null);
    setGlobalNotification(null); // Clear global notification when starting an edit
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setEditFormError(null);
    setGlobalNotification(null); // Clear previous notifications

    // Check if anything was actually changed
    if (!editingLogoName.trim() && !editingLogoFile) {
      setEditFormError(
        "Please provide a new name or select a new logo file to update."
      );
      return;
    }

    const formData = new FormData();
    if (editingLogoName.trim()) {
      formData.append("name", editingLogoName.trim());
    }
    if (editingLogoFile) {
      formData.append("logo", editingLogoFile);
    }

    const result = await updateCompanyLogo(editingLogoId, formData);
    if (result.success) {
      setEditingLogoId(null); // Exit edit mode
      setEditingLogoName("");
      setEditingLogoFile(null);
      setGlobalNotification({
        message: "Logo updated successfully!",
        type: "success",
      });
    } else {
      const errorMessage = result.error || "Failed to update logo.";
      setEditFormError(errorMessage);
      setGlobalNotification({
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 md:py-16 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-sm">
          Admin Panel - Work Process Logos
        </h1>

        {/* Global Notification Display */}
        {globalNotification && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white font-semibold transition-opacity duration-500 ease-in-out ${
              globalNotification.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            } opacity-100`}
            role="alert"
          >
            {globalNotification.message}
          </div>
        )}

        {/* Add New Logo Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <PlusCircle className="mr-3 text-blue-600" size={28} /> Add New
            Company Logo
          </h2>
          <form
            onSubmit={handleNewLogoSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label
                htmlFor="newLogoName"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Company Name:
              </label>
              <input
                type="text"
                id="newLogoName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={newLogoName}
                onChange={(e) => setNewLogoName(e.target.value)}
                placeholder="e.g., Acme Corp"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newLogoFile"
                className="block text-gray-700 font-semibold mb-2 text-sm md:text-base"
              >
                Select Logo Image:
              </label>
              <input
                type="file"
                id="newLogoFile"
                className="w-full text-gray-700
                                 file:mr-2 file:py-2 file:px-3 file:text-sm file:font-semibold
                                 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700
                                 hover:file:bg-blue-100 cursor-pointer
                                 border border-gray-300 rounded-lg py-2 px-2 transition duration-200"
                accept="image/*"
                onChange={(e) => setNewLogoFile(e.target.files[0])}
                required
              />
            </div>
            <div className="md:col-span-2">
              {addFormError && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <XCircle size={16} className="mr-1" /> {addFormError}
                </p>
              )}
              {addFormSuccess && (
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <PlusCircle size={16} className="mr-1" /> {addFormSuccess}
                </p>
              )}
              <button
                type="submit"
                className="mt-6 w-full md:w-auto bg-[#0A142F] text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add Logo
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Manage Existing Logos
          </h2>

          {loading ? (
            <p className="text-gray-600 text-center">Loading logos...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : companies.length === 0 ? (
            <p className="text-gray-600 text-center">No logos added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {companies.map((company) => (
                <div
                  key={company._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm"
                >
                  <img
                    src={`http://localhost:5000${company.logoUrl}`}
                    alt={`${company.name} Logo`}
                    className="h-20 w-auto object-contain mb-4"
                  />
                  <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    {company.name}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditClick(company)}
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                      title="Edit Logo"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                      title="Delete Logo"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {editingLogoId === company._id && (
                    <form
                      onSubmit={handleUpdateSubmit}
                      className="mt-6 w-full space-y-4"
                    >
                      <h4 className="font-semibold text-gray-800">
                        Edit "{company.name}"
                      </h4>
                      <div>
                        <label
                          htmlFor={`editName-${company._id}`}
                          className="block text-gray-700 text-sm mb-1"
                        >
                          New Name:
                        </label>
                        <input
                          type="text"
                          id={`editName-${company._id}`}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                          value={editingLogoName}
                          onChange={(e) => setEditingLogoName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`editFile-${company._id}`}
                          className="block text-gray-700 text-sm mb-1"
                        >
                          New Logo (optional):
                        </label>
                        <input
                          type="file"
                          id={`editFile-${company._id}`}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                          accept="image/*"
                          onChange={(e) =>
                            setEditingLogoFile(e.target.files[0])
                          }
                        />
                      </div>
                      {editFormError && (
                        <p className="text-red-500 text-sm mt-2">
                          {editFormError}
                        </p>
                      )}
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setEditingLogoId(null)}
                          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#0A142F] text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminWorkProcess;
