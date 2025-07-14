import React, { useState, useEffect } from "react";
import axios from "axios";

const TestimonialsPart = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/testimonials"
        );
        setTestimonials(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials for TestimonialsPart:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="bg-white py-16 px-6 md:py-24">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Image Gallery (Absolute Positioning for precise layout) */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full flex items-center justify-center">
          {/* Image 1: Brown hair, headphones (left-middle) */}
          <img
            src="/image1.jpg" // Using .png based on your public folder
            alt="Testimonial User 1"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "120px", // Adjusted size
              height: "120px", // Adjusted size
              top: "30%", // Adjusted position
              left: "10%", // Adjusted position
              transform: "translate(-50%, -50%) ", // Maintain slight rotation
            }}
          />

          {/* Image 2: Bearded guy (top-left) */}
          <img
            src="/image2.png"
            alt="Testimonial User 2"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "120px", // Adjusted size
              height: "120px", // Adjusted size
              top: "23%", // Adjusted position
              left: "37%", // Adjusted position
              transform: "translate(-50%, -50%) ", // Maintain slight rotation
            }}
          />

          {/* Image 3: Red shirt, short dark hair (top-middle-right) */}
          <img
            src="/image3.png"
            alt="Testimonial User 3"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "94x",
              height: "94px",
              top: "20%",
              right: "20%", // Adjusted position
              transform: "translate(10%, -40%) ",
            }}
          />

          {/* Image 4: Pink/purple hair (center-left) */}
          <img
            src="/image3.png"
            alt="Testimonial User 4"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "100px", // Adjusted size
              height: "100px", // Adjusted size
              top: "55%", // Adjusted position
              left: "30%", // Adjusted position
              transform: "translate(-50%, -50%) ",
            }}
          />

          {/* Image 5: Striped shirt, curly hair (center-right) */}
          <img
            src="/image5.png"
            alt="Testimonial User 5"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "110px", // Adjusted size
              height: "110px", // Adjusted size
              top: "45%", // Adjusted position
              right: "45%", // Adjusted position
              transform: "translate(50%, -50%) ",
            }}
          />

          {/* Image 6: Sunglasses, striped top (bottom-left) */}
          <img
            src="/image6.png"
            alt="Testimonial User 6"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "100px",
              height: "100px",
              bottom: "25%", // Adjusted position
              left: "10%", // Adjusted position
              transform: "translate(-50%, 50%) ",
            }}
          />

          {/* Image 7: Brown hair, headphones (bottom-middle) - appears as a duplicate of image1.png in the collage, but is image7.png */}
          <img
            src="/image7.png" // This is the image from your public folder, visually similar to image1
            alt="Testimonial User 7"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "110px", // Adjusted size
              height: "110px", // Adjusted size
              bottom: "25%", // Adjusted position
              left: "50%", // Adjusted position
              transform: "translate(-50%, 50%) ",
            }}
          />

          {/* Image 8: Monochrome, looking straight (top-right most) */}
          <img
            src="/image8.png" // This is the image from your public folder
            alt="Testimonial User 8"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "80px", // Smaller size as in the image
              height: "80px", // Smaller size
              top: "45%", // Adjusted position
              right: "15%", // Adjusted position, slightly off-canvas to match the crop
              transform: "translate(50%, -50%)", // No rotation for this one
            }}
          />

          {/* Image 9: Grey turtleneck (bottom-right) */}
          <img
            src="/image9.png" // This is the image from your public folder
            alt="Testimonial User 9"
            className="absolute object-cover rounded-xl shadow-lg"
            style={{
              width: "110px", // Adjusted size
              height: "110px", // Adjusted size
              bottom: "25%", // Adjusted position
              right: "15%", // Adjusted position
              transform: "translate(50%, 50%) ",
            }}
          />
        </div>

        {/* Right Column: Testimonial Content - Now dynamic */}
        {testimonials.length > 0 && currentTestimonial ? (
          <div className="max-w-xl text-left">
            {/* Title */}
            <h2 className="font-inter font-bold text-3xl md:text-4xl leading-tight text-black mb-4">
              Meet Client Satisfaction <br /> After Working With Us
            </h2>
            {/* Subtitle */}
            <p className="font-inter font-normal text-lg md:text-xl text-black/80 mb-2">
              Doesn’t feel like an agency
            </p>

            {/* Star Rating */}
            <div className="flex text-yellow-400 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
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

            {/* Testimonial Text */}
            <p className="font-inter font-normal text-base md:text-lg leading-relaxed text-black/70 mb-8">
              {currentTestimonial.description}
            </p>

            {/* Author Info and Navigation Arrows */}
            <div className="flex items-center">
              <img
                src={`http://localhost:5000${currentTestimonial.imageUrl}`}
                alt={currentTestimonial.personName}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/48x48/E0E0E0/FFFFFF?text=No+Image";
                }}
              />
              <div>
                <p className="font-inter font-semibold text-lg text-black">
                  {currentTestimonial.personName}
                </p>
                <p className="font-inter font-normal text-sm text-black/60">
                  {currentTestimonial.companyName}
                </p>
              </div>
              {/* Navigation Arrows */}
              <div className="flex ml-auto space-x-4">
                <button
                  onClick={handlePrevTestimonial}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center transition-colors hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center transition-colors hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl text-left">
            <p className="text-center text-gray-600">
              No testimonials available to display in this section.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsPart;
