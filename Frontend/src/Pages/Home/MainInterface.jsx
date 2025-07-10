// frontend/src/Components/MainInterface.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function MainInterface() {
  return (
    <section className="relative bg-[#F9F9FB] py-16 px-6 md:py-24 overflow-hidden min-h-[calc(100vh-100px)] flex items-center">
      {/* Background elements (circles and plus signs) - Adjusted to match new Figma image */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left circle (blue) */}
        <div className="absolute top-[8%] left-[8%] w-6 h-6 bg-[#AEE2FF] rounded-full opacity-70"></div>
        {/* Bottom left circle (blue) */}
        <div className="absolute bottom-[10%] left-[20%] w-8 h-8 bg-[#AEE2FF] rounded-full opacity-70"></div>
        {/* Top right plus (purple) */}
        <div className="absolute top-[8%] right-[8%] text-purple-400 text-4xl font-bold opacity-70">
          +
        </div>
        {/* Mid left plus (purple) */}
        <div className="absolute top-[40%] left-[30%] text-purple-400 text-4xl font-bold opacity-70">
          +
        </div>
        {/* Bottom right plus (purple) */}
        <div className="absolute bottom-[20%] right-[15%] text-purple-400 text-4xl font-bold opacity-70">
          +
        </div>
        {/* Bottom mid circle (blue) */}
        <div className="absolute bottom-[10%] left-[40%] w-7 h-7 bg-[#AEE2FF] rounded-full opacity-70"></div>

        {/* Bottom light blue gradient/shape as seen in Figma image */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#AEE2FF]"></div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0 animate-slide-in-left">
          {/* Tag */}
          <div className="inline-block bg-yellow-300 text-gray-900 text-sm font-semibold py-1 px-4 rounded-full mb-4 shadow-md">
            #1 Digital company in the town!
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-sm">
            TURNED Into Reality
          </h1>

          {/* Paragraph */}
          <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
            With every single one of our clients, we bring forth a deep passion
            for creative problem solving — which is what we deliver.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Connect With Us
            </Link>
            <Link
              to="/works"
              className="bg-transparent border-2  text-purple-600 hover:bg-purple-50 hover:text-purple-700 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out flex items-center justify-center transform hover:-translate-y-1 hover:scale-105"
            >
              Browse Our Works
            </Link>
          </div>
        </div>

        {/* Right Illustration Area - Speech Bubbles (Using provided image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-slide-in-right">
          {/* Container for the image.
              Adjust max-width and height to match the overall size of the illustration
              as seen in the screenshot.
          */}
          <div className="relative w-full max-w-[450px] h-[400px]">
            <img
              src="/bubble.png" // Path to your combined bubble image
              alt="Speech Bubbles Illustration"
              className="absolute w-full h-full object-contain"
              style={{
                top: "0%",
                left: "0%",
                transform: "scale(1.05)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainInterface;
