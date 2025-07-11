// frontend/src/Components/MainInterface.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function MainInterface() {
  return (
    <section className="relative bg-[#F9F9FB] py-16 px-6 md:py-24 overflow-hidden min-h-[calc(100vh-100px)] flex items-center">
      {/* Background elements (circles and plus signs) - Adjusted to match new Figma image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Left Outline Circle */}
        <div className="absolute top-[13%] left-[20%] w-5 h-5 border-4 border-[#6854FC] rounded-full"></div>

        {/* Center Outline Circle */}
        <div className="absolute top-[35%] left-[50%] w-5 h-5 border-4 border-[#6854FC] rounded-full"></div>

        {/* Bottom Left Outline Circle */}

        {/* Bottom Center Plus */}
        <div className="absolute bottom-[12%] left-[37%] text-[#6854FC] w-5 h-5 text-2xl font-bold">
          +
        </div>

        {/* Bottom Right Plus */}
        <div className="absolute bottom-[10%] right-[8%] text-[#6854FC] text-2xl font-bold">
          +
        </div>

        {/* Bottom Gradient / Color Fill Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#AEE2FF]"></div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0 animate-slide-in-left">
          {/* Tag */}
          <div className="inline-flex items-center bg-gray-100 text-black text-sm 	text-[18px] leading-[28.8px] tracking-[0.36px] font-inter 	font-medium py-1 px-4 rounded-full mb-4 shadow-sm">
            <div className="w-[38px] h-[38px] bg-[#FFE600] rounded-full mr-2"></div>
            #1 Digital company in the town!
          </div>

          {/* Heading */}
          <h1 className="font-inter font-bold text-6xl leading-[120%] tracking-normal capitalize">
            TURNED Into Reality
          </h1>

          {/* Paragraph */}
          <p className="font-inter font-medium text-lg leading-[160%] tracking-[2%] text-black/50">
            With every single one of our clients, we bring forth a deep passion
            for creative problem solving — which is what we deliver.
          </p>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8 relative">
            <Link
              to="/contact"
              className="font-inter font-bold text-lg leading-[140%] tracking-normal capitalize
    bg-[#6854FC] text-white px-6 py-3 rounded-full inline-flex items-center justify-center"
            >
              Connect With Us
            </Link>
            <Link
              to="/works"
              className="bg-transparent text-[#6854FC]
    font-inter font-semibold text-[22px] leading-[160%] tracking-normal capitalize
    hover:text-purple-700
    flex items-center justify-center transition duration-300 ease-in-out"
            >
              Browse Our Works
            </Link>

            {/* Bottom Circle (absolute positioned) */}
            <div className="absolute left-10 bottom-[-50px] w-5 h-5 border-4 border-[#6854FC] rounded-full"></div>

            {/* Plus Sign (absolute positioned) */}
            <div className="absolute right-5 bottom-[-1px] text-[#6854FC] text-2xl font-bold">
              +
            </div>
          </div>
        </div>

        {/* Right Illustration Area - Speech Bubbles (Using provided image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-slide-in-right">
          {/* Container for the image.
              Adjust max-width and height to match the overall size of the illustration
              as seen in the screenshot.
          */}
          <div className="relative w-full max-w-[430px] h-[380px]">
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
