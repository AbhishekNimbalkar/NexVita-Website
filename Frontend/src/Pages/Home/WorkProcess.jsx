import React from "react";
import { useCompanyLogos } from "../../context/CompanyLogoContext"; // Import hook

function WorkProcess() {
  const { companies, loading, error } = useCompanyLogos(); // Use context hook

  const processSteps = [
    {
      // Using image from public folder
      icon: (
        <img
          src="/Discovery.png"
          alt="Discovery Icon"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Research & Analysis",
      description:
        "We start by deeply understanding your business, analyzing your needs, and researching the best solutions that match your goals.",
      bgColor: "#FCEDEE", // Pinkish Red
    },
    {
      // Using image from public folder
      icon: (
        <img
          src="/Plan.png"
          alt="Plan Icon"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Planning & Strategy",
      description:
        "After research, we plan the complete workflow, design strategy, and timelines to ensure everything runs smoothly from start to finish.",
      bgColor: "#BED3FF", // Soft Blue
    },
    {
      // Using image from public folder
      icon: (
        <img
          src="/Execute.png"
          alt="Execute Icon"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Design, Development & Testing",
      description:
        "Our team works on creating, developing, and testing high-quality solutions that are secure, functional, and user-friendly for your audience.",
      bgColor: "#DEFEEA", // Mint Green
    },
    {
      // Using image from public folder
      icon: (
        <img
          src="/Deliver.png"
          alt="Deliver Icon"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Delivery & Ongoing Support",
      description:
        "Once completed, we deliver the final product and provide continuous support to ensure everything works perfectly as expected.",
      bgColor: "#FFEEA6", // Light Yellow
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6 md:py-24">
      {/* Companies We Work With Section */}
      <div className="container mx-auto text-center mb-16 md:mb-24">
        <h2 className="font-inter font-semibold text-[40px] leading-[140%] tracking-normal text-black capitalize mb-4">
          Companies We Work With
        </h2>

        <p className="font-inter font-medium text-[18px] leading-[160%] tracking-[0.02em] text-black/50 text-center max-w-3xl mx-auto mb-12">
          At NEXVITA IT Solutions, we believe in creating impactful digital
          experiences that help businesses thrive in the modern world. From
          startups to enterprises, we deliver innovative and customized IT
          solutions that drive efficiency, growth, and success.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-16 max-w-6xl mx-auto">
          {loading ? (
            <p className="text-gray-600 animate-pulse">Loading companies...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            companies.map((company) => (
              <div
                key={company._id}
                className="w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center opacity-100 transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={`http://localhost:5000${company.logoUrl}`}
                  alt={`${company.name} Logo`}
                  className="w-[60px] h-[60px] object-contain"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Our Process Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 bg-white  p-8 md:p-12 ">
        {" "}
        {/* Removed bg-gradient-to-b from-gray-50 to-white and added shadow-lg */}
        {/* Left Image Area - Now using Laptop.jpg */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start relative z-10">
          <img
            src="/Laptop.jpg" // Changed src to Laptop.jpg from public folder
            alt="Office Desk with Laptops"
            className="rounded-xl object-cover w-full max-w-xs sm:max-w-sm md:max-w-md h-auto shadow-xl transform transition-transform duration-500 hover:scale-105"
            style={{
              position: "relative", // Changed to relative to allow margin adjustments
              left: "0", // Reset left
              top: "0", // Reset top
              marginRight: "auto", // Push to the left on larger screens
              marginLeft: "auto", // Center on smaller screens
            }}
          />
          {/* Optional: Overlapping decorative element */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-xl z-0 hidden md:block"></div>
        </div>
        {/* Right Process Steps Area */}
        <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
          <h2 className="text-[40px] leading-[140%] font-semibold text-black tracking-normal mb-8 font-inter">
            Our Digital Transformation Process
          </h2>
          <p className="font-medium text-[18px] leading-[160%] tracking-[0.02em] text-black/50 font-inter">
            Sit arcu, egestas nunc, eros dignissim nunc, pretium malesuada.
            Tristique est tellus non maecenas in egestas aliquam. Eget dolor
            pellentesque consequat donec lectus nisl ligula. Ut sed nisi amet.
          </p>

          <div className="space-y-6 md:space-y-1">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left p-4 rounded-lg bg-white transition-all duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer group"
              >
                <div
                  className="p-3 rounded-full mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 shadow-sm transition-colors duration-300 group-hover:bg-opacity-80"
                  style={{ backgroundColor: step.bgColor }}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-[18px] leading-[160%] tracking-[0.02em] text-black mb-2 transition-colors duration-300 group-hover:text-blue-700">
                    {step.title}
                  </h3>

                  <p className="font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50 transition-colors duration-300 group-hover:text-gray-800">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkProcess;
