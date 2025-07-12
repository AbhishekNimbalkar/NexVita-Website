import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react"; // Import the arrow icon
import api from "../../api/axios";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("/portfolio"); // Fetch from your backend API
        setProjects(response.data);
        setError(null);
      } catch (err) {
        setError(
          "Failed to fetch portfolio items. Please ensure backend is running."
        );
        console.error("Error fetching portfolio items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioProjects();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <section className="bg-white py-16 px-6 md:py-24 min-h-screen">
      <div className="container mx-auto text-center">
        {/* Section Heading */}
        <h2 className="font-inter font-normal text-[36px] leading-[140%] tracking-normal text-black hover:text-blue-400 transition duration-200">
          Our Full Portfolio
        </h2>
        {/* Section Subtitle */}
        <p className="font-inter font-medium text-[18px] leading-[160%] tracking-[0.02em] text-black/50 text-center max-w-2xl mx-auto mb-12">
          A deeper dive into our completed projects, showcasing the breadth of
          our capabilities and the impact we've made.
        </p>
        {loading && (
          <p className="text-gray-400 text-lg">Loading portfolio...</p>
        )}
        {error && <p className="text-red-500 text-lg">{error}</p>}

        {/* Projects Grid */}
        {!loading && !error && projects.length === 0 && (
          <p className="text-gray-400 text-lg">No portfolio items available.</p>
        )}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="bg-[#1A1A1A] rounded-xl overflow-hidden
                           transition-all duration-300 hover:scale-[1.01] cursor-pointer group"
              >
                {/* The image itself now links to the external project URL */}
                <div className="relative w-full h-[400px] overflow-hidden">
                  <a
                    href={project.link} // Link directly to the project's external URL
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                    className="block w-full h-full" // Ensure the anchor covers the image area
                  >
                    <img
                      src={`http://localhost:5000${project.imageUrl}`} // Prepend base URL for backend-served images
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/800x600/1A1A1A/FFFFFF?text=Image+Not+Found";
                      }}
                    />
                  </a>
                  {/* Central Arrow Icon - Now also links to the external project URL */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href={project.link} // Link directly to the project's external URL
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block" // Ensure the anchor covers the icon area
                    >
                      <div className="bg-white rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={32} className="text-black" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Project Number and Title - This part now also links to the external project URL */}
                <a
                  href={project.link} // Link directly to the project's external URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block" // Ensure the anchor covers the bottom section
                >
                  <div className="p-6 flex justify-between items-end text-white">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-lg text-black">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-right flex-grow ml-4">
                      {project.title}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
