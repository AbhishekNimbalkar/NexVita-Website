import React from "react";
import { Globe } from "lucide-react"; // Only Globe is kept, others removed as they will be images

function HomeServices() {
  const servicesData = [
    {
      icon: (
        <img
          src="/MobileIcon.png" // Using image asset
          alt="Mobile App Designing Icon"
          className="w-12 h-12 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Added positioning classes
        />
      ),
      title: "Mobile App Designing",
      description:
        "Justo, amet nisl velit quam. Turpis nulla morbi vestibulum morbi cum et.",
    },
    {
      // Changed Globe to a function that returns the Globe component
      icon: (props) => (
        <Globe
          {...props}
          className="text-[#6854FC] w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      ),
      title: "Website Designing",
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
        <h2 className="font-inter font-semibold text-center capitalize text-black text-[40px] leading-[140%] tracking-normal mb-4">
          Services That Lead The Way To Better Business
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-12 max-w-2xl mx-auto opacity-90">
          Complete Digital Solutions Under One Roof
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="rounded-xl p-4 flex flex-col items-center text-center"
            >
              {/* Icon Circle with Overlaid Icon */}
              <div className="relative w-[100px] h-[100px] mb-6">
                {/* Background Circle SVG */}
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50" fill="#F0EEFF" />
                </svg>

                {/* Centered Icon (either Lucide or Image) */}
                {
                  typeof service.icon === "function" // If it's a function (like for Globe), call it to get the React element
                    ? service.icon() // Call the function directly
                    : // Otherwise, it's an image element, which now has its own positioning classes
                      service.icon // Render the img directly
                }
              </div>

              <h3 className="font-inter font-semibold text-[22px] leading-[160%] tracking-[0.02em] text-[#6854FC] text-center mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50 text-center max-w-[300px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
