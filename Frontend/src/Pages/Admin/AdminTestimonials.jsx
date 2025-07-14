import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    personName: "",
    companyName: "",
    description: "",
    rating: 5,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // New state for custom confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [testimonialToDeleteId, setTestimonialToDeleteId] = useState(null);

  const API_URL = "http://localhost:5000/api/testimonials";

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTestimonials(response.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const data = new FormData();
    data.append("personName", formData.personName);
    data.append("companyName", formData.companyName);
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Testimonial updated successfully!");
      } else {
        await axios.post(API_URL, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Testimonial added successfully!");
      }
      setFormData({
        personName: "",
        companyName: "",
        description: "",
        rating: 5,
        image: null,
      });
      setImagePreview(null);
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setFormData({
      personName: testimonial.personName,
      companyName: testimonial.companyName,
      description: testimonial.description,
      rating: testimonial.rating,
      image: null,
    });
    setImagePreview(`http://localhost:5000${testimonial.imageUrl}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to show the custom confirmation dialog
  const confirmDelete = (id) => {
    setTestimonialToDeleteId(id);
    setShowConfirmDialog(true);
  };

  // Function to actually perform the deletion
  const performDelete = async () => {
    setShowConfirmDialog(false); // Close dialog immediately
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${testimonialToDeleteId}`);
      fetchTestimonials(); // Refresh the list
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      setError("Failed to delete testimonial.");
    } finally {
      setLoading(false);
      setTestimonialToDeleteId(null); // Clear the ID
    }
  };

  // Function to cancel the deletion
  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setTestimonialToDeleteId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      personName: "",
      companyName: "",
      description: "",
      rating: 5,
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="font-inter font-bold text-3xl text-center text-black mb-8">
        Manage Testimonials
      </h1>

      {message && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {message}
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Testimonial Form */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
        <h2 className="font-inter font-semibold text-2xl text-black mb-6">
          {editingId ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="personName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Person Name
            </label>
            <input
              type="text"
              id="personName"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rating (1-5 Stars)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required={!editingId}
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full shadow-md"
                />
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="mt-6 w-full md:w-auto bg-[#0A142F] text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Testimonial"
                : "Add Testimonial"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="mt-6 w-full md:w-auto bg-[#0A142F] text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                disabled={loading}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Testimonials List */}
      <h2 className="font-inter font-semibold text-2xl text-black mb-6">
        Existing Testimonials
      </h2>
      {testimonials.length === 0 ? (
        <p className="text-center text-gray-600">No testimonials to display.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col"
            >
              <div className="flex items-center mb-4">
                <img
                  src={`http://localhost:5000${testimonial.imageUrl}`}
                  alt={testimonial.personName}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/64x64/E0E0E0/FFFFFF?text=No+Image";
                  }}
                />
                <div>
                  <p className="font-inter font-semibold text-lg text-black">
                    {testimonial.companyName}
                  </p>
                  <p className="font-inter text-sm text-black/60">
                    {testimonial.personName}
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-inter text-base text-black/70 leading-relaxed mb-4 flex-grow">
                {testimonial.description}
              </p>
              <div className="flex justify-end space-x-2 mt-auto">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  <Edit size={18} />
                </button>
                <button
                  // Change to call confirmDelete instead of handleDelete directly
                  onClick={() => confirmDelete(testimonial._id)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0  bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={performDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
