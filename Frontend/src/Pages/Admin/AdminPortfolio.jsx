import React, { useState, useEffect } from "react";
import api from "../../api/axios"; // Your axios instance
import { PlusCircle, Edit, Trash2, XCircle } from "lucide-react"; // Icons

const AdminPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // For edit mode

  // Form states
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formMessage, setFormMessage] = useState(""); // For success/error messages in form

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
    return {};
  };

  // Fetch all portfolio items
  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const response = await api.get("/portfolio");
      setPortfolioItems(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch portfolio items.");
      console.error("Error fetching portfolio items:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new portfolio item
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (!title || !link || !image) {
      setFormMessage("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", image); // 'image' should match the field name in multerConfig

    try {
      setLoading(true);
      const response = await api.post("/portfolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeader().headers,
        },
      });
      setPortfolioItems((prevItems) => [...prevItems, response.data]);
      setFormMessage("Project added successfully!");
      resetForm();
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add project.";
      setFormMessage(`Error: ${msg}`);
      console.error("Error adding project:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update existing portfolio item
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (!title || !link || !currentProject) {
      setFormMessage("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    if (image) {
      // Only append image if a new one is selected
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const response = await api.put(
        `/portfolio/${currentProject._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...getAuthHeader().headers,
          },
        }
      );
      setPortfolioItems((prevItems) =>
        prevItems.map((item) =>
          item._id === currentProject._id ? response.data : item
        )
      );
      setFormMessage("Project updated successfully!");
      resetForm();
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update project.";
      setFormMessage(`Error: ${msg}`);
      console.error("Error updating project:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete portfolio item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        setLoading(true);
        await api.delete(`/portfolio/${id}`, getAuthHeader());
        setPortfolioItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        setFormMessage("Project deleted successfully!");
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to delete project.";
        setFormMessage(`Error: ${msg}`);
        console.error("Error deleting project:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setLink("");
    setImage(null);
    setImagePreview("");
    setCurrentProject(null);
    setFormMessage("");
  };

  // Open modal for adding
  const openAddModal = () => {
    resetForm(); // Ensure form is clean
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (project) => {
    setCurrentProject(project);
    setTitle(project.title);
    setLink(project.link);
    setImagePreview(`http://localhost:5000${project.imageUrl}`); // Set current image for preview
    setIsModalOpen(true);
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(
        currentProject ? `http://localhost:5000${currentProject.imageUrl}` : ""
      );
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []); // Fetch on component mount

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Portfolio
      </h1>

      {/* Add New Project Button */}
      <button
        onClick={openAddModal}
        className="bg-[#6854FC] hover:bg-[#5744e6] text-white font-semibold py-2 px-4 rounded-full shadow-md flex items-center mb-6"
      >
        <PlusCircle size={20} className="mr-2" /> Add New Project
      </button>

      {formMessage && (
        <p
          className={`mb-4 text-center ${
            formMessage.startsWith("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {formMessage}
        </p>
      )}

      {/* Loading and Error states */}
      {loading && (
        <p className="text-gray-600 text-center">Loading portfolio items...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Portfolio Items List/Grid */}
      {!loading && !error && portfolioItems.length === 0 && (
        <p className="text-gray-600 text-center">
          No portfolio items found. Add one!
        </p>
      )}

      {!loading && !error && portfolioItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`http://localhost:5000${project.imageUrl}`}
                alt={project.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x200?text=Image+Error";
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 truncate">
                  {project.link}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition duration-200"
                    title="Edit Project"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-200"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentProject ? "Edit Project" : "Add New Project"}
            </h2>
            <form
              onSubmit={currentProject ? handleEditSubmit : handleAddSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="link"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Link (URL):
                </label>
                <input
                  type="url"
                  id="link"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                  onChange={handleImageChange}
                  required={!currentProject} // Image is required only for new projects
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              {formMessage && (
                <p
                  className={`mb-4 text-center ${
                    formMessage.startsWith("Error")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {formMessage}
                </p>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#6854FC] hover:bg-[#5744e6] text-white font-bold py-2 px-4 rounded-full transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6854FC] hover:bg-[#5744e6] text-white font-bold py-2 px-4 rounded-full transition duration-200"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : currentProject
                    ? "Update Project"
                    : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
