import React from "react";
import { Link } from "react-router-dom"; // Import Link

const GlobalTeam = () => {
  return (
    <>
      {/* New "Join a global team" section */}
      {/* The outer div maintains its responsive container properties */}
      <div className="container mx-auto mt-24 ">
        {/* The inner div's background is adjusted to a subtle gray,
            approximating rgba(196, 196, 196, 0.15) which is a very light, almost transparent gray.
            We use bg-gray-50 as a common Tailwind class for a very subtle off-white/light gray.
            Shadow and rounded corners are retained as per the visual design. */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#C4C4C426] rounded-xl shadow-lg p-8 md:p-12 gap-8">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Join a global team of change-makers.
            </h2>
            <p className="text-base text-gray-600 mb-6 max-w-xl mx-auto md:mx-0">
              Viverra ut potenti aliquam feugiat dui imperdiet laoreet tempus
              sed. Elit cursus est lorem in est id nec. Quis diam posuere at
              nisl eget turpis sagittis nunc.
            </p>
            <Link
              to="/careers" // Assuming a careers page
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              View Job Openings
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/Lady.jpg" // Path to your Lady.jpg image
              alt="Lady in gradient light"
              className="w-full max-w-md h-auto rounded-lg shadow-xl object-cover" // Added object-cover to ensure image fills and crops if needed
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalTeam;
