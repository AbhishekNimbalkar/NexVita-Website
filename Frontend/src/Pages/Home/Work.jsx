import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import api from "../../api/axios"; // Import your axios instance

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially for fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch project data from the backend
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Assuming your backend serves project data from this endpoint
        const response = await api.get("/portfolio"); // Use axios instance
        setProjects(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch projects. Please ensure backend is running and accessible."
        );
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <section className="bg-white py-16 px-6 md:py-24">
      <div className="container mx-auto text-center">
        {/* Section Heading */}
        <h2 className="font-inter font-normal text-[36px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200">
          See Our Work
        </h2>
        {/* Section Subtitle */}
        <p className="font-inter font-medium text-[18px] leading-[160%] tracking-[0.02em] text-black/50 text-center max-w-2xl mx-auto mb-12">
          Interdum ac tincidunt molestie facilisis. Nulla at erat odio bibendum
          diam quam. Scelerisque quis vel egestas justo, purus consequat nibh
          eget. Non risus feugiat porta integer.
        </p>

        {/* Projects Grid */}
        {loading ? (
          <p className="text-gray-600 text-lg">Loading projects...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600 text-lg">
            No projects available. Please add some from the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mb-12">
            {projects.map((project) => (
              <div
                key={project._id} // Assuming each project has a unique _id
                className="bg-white rounded-lg overflow-hidden
                           transition-all duration-300 cursor-pointer group"
              >
                {/* Link wraps the entire card to navigate to the portfolio detail page */}
                <Link to={`/portfolio/${project._id}`} className="block">
                  {/* Project Image */}
                  <div className="w-full h-[400px] overflow-hidden">
                    <img
                      src={`http://localhost:5000${project.imageUrl}`} // Prepend backend URL to image path
                      alt={project.title}
                      className="w-[387px] h-[400px] rounded-[20px] object-cover transition-transform duration-300 group-hover:scale-105 opacity-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/367x400/E0E7FF/3F51B5?text=Image+Not+Found";
                      }} // Fallback image
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* See All Projects Button - Single button below the grid */}
        <Link
          to="/portfolio" // This button will navigate to the main portfolio page
          className="inline-block text-center capitalize font-inter font-bold text-[18px] leading-[140%] tracking-[0] text-white bg-[#6854FC] hover:bg-[#5744e6] py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          See All Projects
        </Link>
      </div>
    </section>
  );
};

export default Work;
