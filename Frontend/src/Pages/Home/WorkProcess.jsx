import React from "react";
import { Lightbulb, FileText, CheckCircle, Truck } from "lucide-react";
import { useCompanyLogos } from "../../context/CompanyLogoContext"; // Import hook

function WorkProcess() {
  const { companies, loading, error } = useCompanyLogos(); // Use context hook

  const processSteps = [
    {
      icon: <Lightbulb size={28} className="text-blue-500" />, // Increased icon size and changed color
      title: "Research & Analysis",
      description:
        "We start by deeply understanding your business, analyzing your needs, and researching the best solutions that match your goals.",
    },
    {
      icon: <FileText size={28} className="text-indigo-500" />, // Increased icon size and changed color
      title: "Planning & Strategy",
      description:
        "After research, we plan the complete workflow, design strategy, and timelines to ensure everything runs smoothly from start to finish.",
    },
    {
      icon: <CheckCircle size={28} className="text-green-500" />, // Increased icon size and changed color
      title: "Design, Development & Testing",
      description:
        "Our team works on creating, developing, and testing high-quality solutions that are secure, functional, and user-friendly for your audience.",
    },
    {
      icon: <Truck size={28} className="text-purple-500" />, // Increased icon size and changed color
      title: "Delivery & Ongoing Support",
      description:
        "Once completed, we deliver the final product and provide continuous support to ensure everything works perfectly as expected.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6 md:py-24">
      {/* Companies We Work With Section */}
      <div className="container mx-auto text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
          Companies We Work With
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-12 max-w-3xl mx-auto opacity-90">
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
                key={company._id} // Use _id from MongoDB
                className="p-3 bg-white rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105" // Removed shadow, border, and transform hover:rotate-3
              >
                <img
                  src={`http://localhost:5000${company.logoUrl}`} // Prepend base URL for logo
                  alt={`${company.name} Logo`}
                  className="h-16 w-16 object-contain" // Adjusted size to match image
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Our Process Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 bg-white rounded-3xl p-8 md:p-12 ">
        {" "}
        {/* Added shadow-lg to match previous design */}
        {/* Left Image Area - Now using Laptop.jpg */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start relative z-10">
          <img
            src="/Laptop.jpg" // Changed src to Laptop.jpg from public folder
            alt="Office Desk with Laptops"
            className="rounded-xl object-cover w-full max-w-md h-auto shadow-xl transform transition-transform duration-500 hover:scale-105"
          />
          {/* Optional: Overlapping decorative element */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-xl z-0 hidden md:block"></div>
        </div>
        {/* Right Process Steps Area */}
        <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
            Our Digital Transformation Process
          </h2>
          <div className="space-y-6 md:space-y-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left p-4 rounded-lg bg-white transition-all duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer group"
              >
                <div className="bg-blue-50 p-3 rounded-full mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 shadow-sm transition-colors duration-300 group-hover:bg-blue-100">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-700">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
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
