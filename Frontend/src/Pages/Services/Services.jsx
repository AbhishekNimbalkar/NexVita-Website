import React from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  Globe, // Only Globe is kept, others removed as they will be images
} from "lucide-react"; // Import Lucide icons

function Services() {
  const servicesData = [
    {
      icon: (
        <img
          src="/MobileIcon.png" // Using image asset
          alt="Mobile App Designing Icon"
          className="w-12 h-12 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Added positioning classes
        />
      ),
      title: "Mobile App Design", // Updated title
      description:
        "Justo, amet nisl velit quam. Turpis nulla morbi vestibulum morbi cum et.",
    },
    {
      icon: (
        <Globe
          size={48} // Use size prop for Lucide icon
          className="text-[#6854FC] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Apply classes directly
        />
      ),
      title: "Website Design", // Updated title
      description:
        "Eu aliquam libero vehicula posuere. Orci viverra id pharetra adipiscing. Convallis.",
    },
    {
      icon: (
        <img
          src="/GraphicsIcon.png" // Using image asset
          alt="Graphic Designing Icon"
          className="w-12 h-12 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Added positioning classes
        />
      ),
      title: "Graphic Designing",
      description:
        "Aliquam ut sapien viverra blandit nisi. Nam fames suscipit erat sed id. Risus.",
    },
    {
      icon: (
        <img
          src="/DigitalIcon.png" // Using image asset
          alt="Digital Marketing Icon"
          className="w-12 h-12 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Added positioning classes
        />
      ),
      title: "Digital Marketing",
      description:
        "Pulvinar amet ac potenti quam feugiat praesent maecenas. Platea id egestas.",
    },
  ];

  return (
    <section className="bg-[#F9F9FB] py-16 px-6 md:py-24">
      <div className="container mx-auto text-center">
        {/* Section Heading */}
        <h2 className="font-inter font-bold text-[48px] leading-[120%] tracking-[0] text-center capitalize text-black mb-4">
          Services That Lead The Way To Better Business
        </h2>

        {/* Section Subtitle */}
        <p className="font-inter font-medium text-[18px] leading-[160%] tracking-[0.02em] text-center text-black/80 mb-12 max-w-2xl mx-auto">
          Complete Digital Solutions Under One Roof
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-start text-left
                         transition-all duration-300 hover:shadow-lg" // Changed items-center to items-start, text-center to text-left
            >
              {/* Icon Circle with Overlaid Icon */}
              <div className="relative w-[100px] h-[100px] mb-6 rounded-full bg-[#F0EEFF]">
                {/* Centered Icon (either Lucide or Image) */}
                {service.icon} {/* Render the icon directly */}
              </div>

              <h3 className="font-inter font-semibold text-[24px] leading-[120%] tracking-normal text-black text-left mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-inter font-medium text-[18px] leading-[150%] tracking-normal text-black/50 text-left max-w-[300px] mb-8">
                {service.description}
              </p>

              {/* Buttons - Reintroduced */}
              <div className="flex flex-col sm:flex-row justify-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                <Link
                  to="/contact"
                  className="font-inter font-bold text-[18px] leading-[140%] tracking-normal text-white 
             bg-[#6854FC] py-2 px-6 rounded-full shadow-md 
             transition duration-300 ease-in-out w-full sm:w-auto 
             transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Connect now
                </Link>

                <Link
                  to="/portfolio"
                  className="font-inter font-bold text-[18px] leading-[140%] tracking-normal 
             text-[#6854FC] bg-transparent border border-[#6854FC] 
             hover:bg-purple-50 hover:text-purple-700 
             py-2 px-6 rounded-full transition duration-300 ease-in-out 
             w-full sm:w-auto transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  Our Works
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assuming GlobalTeam is a separate component you want to render */}
      {/* <GlobalTeam /> */}
    </section>
  );
}

export default Services; // Exporting with the new name
