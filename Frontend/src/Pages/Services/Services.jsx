import React from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  Smartphone, // Icon for Mobile App Designing
  Globe, // Icon for Website Designing
  PenTool, // Icon for Graphic Designing
  MonitorPlay, // Icon for Digital Marketing
} from "lucide-react"; // Import Lucide icons
import GlobalTeam from "./GlobalTeam";

function Services() {
  // Renamed component to ServicesSection
  const servicesData = [
    {
      icon: Smartphone,
      title: "Mobile App Design", // Updated title
      description:
        "Viverra ut potenti aliquam feugiat dui imperdiet laoreet tempus sed. Elit cursus est lorem in est id nec. Quis diam posuere at nisl eget turpis sagittis nunc. Aliquet et ultrices purus, id. Sagittis erat nunc in parturient.",
    },
    {
      icon: Globe,
      title: "Website Design", // Updated title
      description:
        "Viverra ut potenti aliquam feugiat dui imperdiet laoreet tempus sed. Elit cursus est lorem in est id nec. Quis diam posuere at nisl eget turpis sagittis nunc. Aliquet et ultrices purus, id. Sagittis erat nunc in parturient.",
    },
    {
      icon: PenTool,
      title: "Graphic Designing",
      description:
        "Viverra ut potenti aliquam feugiat dui imperdiet laoreet tempus sed. Elit cursus est lorem in est id nec. Quis diam posuere at nisl eget turpis sagittis nunc. Aliquet et ultrices purus, id. Sagittis erat nunc in parturient.",
    },
    {
      icon: MonitorPlay,
      title: "Digital Marketing",
      description:
        "Viverra ut potenti aliquam feugiat dui imperdiet laoreet tempus sed. Elit cursus est lorem in est id nec. Quis diam posuere at nisl eget turpis sagittis nunc. Aliquet et ultrices purus, id. Sagittis erat nunc in parturient.",
    },
  ];

  return (
    <section className="bg-[#F9F9FB] py-16 px-6 md:py-24">
      <div className="container mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">
          Services We Provide
        </h2>
        {/* Section Subtitle */}
        <p className="text-base md:text-lg text-gray-700 mb-12 max-w-2xl mx-auto opacity-90">
          Enim egestas at massa senectus justo ut. Hac est.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-start text-left
                         transition-all duration-300 hover:shadow-lg" // Reintroduced shadow and hover
            >
              {/* Icon Container - Styled to match the purple circle in the image */}
              <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-purple-100">
                {/* Render the Lucide Icon component */}
                {React.createElement(service.icon, {
                  size: 48, // Adjust icon size to match visual
                  className: "text-purple-600", // Apply purple color to the icon
                })}
              </div>
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              {/* Description */}
              <p className="text-gray-600 mb-8">
                {" "}
                {/* Reintroduced bottom margin for buttons */}
                {service.description}
              </p>
              {/* Buttons - Reintroduced */}
              <div className="flex flex-col sm:flex-row justify-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                <Link
                  to="/contact"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-md
                             transition duration-300 ease-in-out w-full sm:w-auto transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Connect now
                </Link>
                <Link
                  to="/works"
                  className="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700
                             font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out w-full sm:w-auto
                             transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  Our Works
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GlobalTeam></GlobalTeam>
    </section>
  );
}

export default Services; // Exporting with the new name
