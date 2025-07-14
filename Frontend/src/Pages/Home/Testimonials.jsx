import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import GlobalTeam from "../Services/GlobalTeam";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/testimonials"
        ); // Adjust this URL to your backend
        setTestimonials(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-16 px-6 md:py-24 text-center">
        <p>Loading testimonials...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-16 px-6 md:py-24 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-[#ffffff] py-16 px-6 md:py-24">
        <div className="container mx-auto">
          <h1 className="font-inter font-bold text-[48px] leading-[120%] text-center capitalize text-black mb-4">
            Testimonials
          </h1>

          <p className="font-inter font-medium text-[18px] leading-[160%] tracking-[0.02em] text-center text-black/80 mb-12">
            Pharetra velit libero eros volutpat proin bibendum.
          </p>

          {testimonials.length === 0 ? (
            <p className="text-center text-gray-600">
              No testimonials available yet. Please add some from the admin
              panel!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-gray-50 p-6 rounded-md shadow-md flex flex-col items-start border border-[#e6e6e6]"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={`http://localhost:5000${testimonial.imageUrl}`} // Dynamically loaded image
                      alt={testimonial.personName}
                      className="w-[60px] h-[60px] rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/64x64/E0E0E0/FFFFFF?text=No+Image";
                      }} // Fallback image
                    />
                    <div>
                      <p className="font-inter font-semibold text-[20px] leading-[130%] tracking-[0.02em] text-black">
                        {testimonial.companyName}
                      </p>
                      <p className="font-inter font-normal text-[18px] leading-[130%] tracking-[0.02em] text-black/50">
                        {testimonial.personName}
                      </p>
                    </div>
                  </div>
                  {/* Removed Star Rating from Testimonials component */}
                  <p className="font-inter font-normal text-[18px] leading-[140%] tracking-[0.02em] text-black/70">
                    {testimonial.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <GlobalTeam></GlobalTeam>
      </section>
    </>
  );
};

export default Testimonials;
