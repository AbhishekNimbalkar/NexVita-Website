import React from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  Smartphone, // Icon for Mobile App Designing
  Globe, // Icon for Website Designing
  PenTool, // Icon for Graphic Designing
  MonitorPlay, // Icon for Digital Marketing
} from "lucide-react"; // Import Lucide icons

function HomeServices() {
  const servicesData = [
    {
      icon: Smartphone, // Changed to icon
      title: "Mobile App Designing",
      description:
        "Justo, amet nisl velit quam. Turpis nulla morbi vestibulum morbi cum et.",
    },
    {
      icon: Globe, // Changed to icon
      title: "Website Designing",
      description:
        "Eu aliquam libero vehicula posuere. Orci viverra id pharetra adipiscing. Convallis.",
    },
    {
      icon: PenTool, // Changed to icon
      title: "Graphic Designing",
      description:
        "Aliquam ut sapien viverra blandit nisi. Nam fames suscipit erat sed id. Risus.",
    },
    {
      icon: MonitorPlay, // Changed to icon
      title: "Digital Marketing",
      description:
        "Pulvinar amet ac potenti quam feugiat praesent maecenas. Platea id egestas.",
    },
  ];

  return (
    <section className="bg-[#F9F9FB] py-16 px-6 md:py-24">
      <div className="container mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
          Services That Lead The Way To Better Business
        </h2>
        {/* Section Subtitle */}
        <p className="text-base md:text-lg text-gray-700 mb-12 max-w-2xl mx-auto opacity-90">
          Faucibus fringilla sed integer cursus tellus et, quis ultricies.
          Aliquam, faucibus arcu in laoreet ac elementum in eget. Massa urna
          viverra vulputate euismod pulvinar nibh in vel. Laoreet blandit etiam
          orci est in vel lacus neque pretium.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-[#F9F9FB] rounded-xl p-8 flex flex-col items-center text-center" // Removed shadow and hover effects
            >
              {/* Icon Container - Styled to match the purple circle in the image */}
              <div
                className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-purple-100" // Removed hover effect
              >
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
              <p className="text-gray-600 mb-0">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
