import React from "react";
import { Link } from "react-router-dom";

const AboutIntro = () => {
  return (
    <>
      {/* Top Section: Matching Figma design */}
      <div className="bg-[#F9F9FB] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16   md:p-12 w-full ">
        {/* Left Column: Bold Heading */}
        <div className="text-left flex items-center pl-15 ">
          <h2 className="font-inter font-semibold text-[37px] leading-[140%] tracking-normal text-black">
            We’re a lean creative agency <br className="hidden md:block" />
            that uses design and code to <br className="hidden md:block" />
            solve problems.
          </h2>
        </div>

        {/* Right Column: Vertical border + paragraph */}
        <div className="flex items-center ">
          <div className="border-l-[5px] border-[#C4C4C426] pl-7 font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50">
            <p>
              Semper bibendum nisl, fermentum mi convallis. Sed vitae tincidunt
              nunc, aliquam orci. Porttitor faucibus morbi sed senectus justo,
              adipiscing augue. Est, in in pretium at libero morbi. Euismod
              viverra arcu nisi eu sit. <br />
              <br />
              Praesent diam non imperdiet imperdiet potenti tristique et. Amet
              nec.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-white py-16 px-6 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Column: Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/AboutImage.jpg"
                alt="Creative Team"
                className="w-full h-auto object-cover rounded-[20px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400?text=Image+Not+Found";
                }}
              />
            </div>

            {/* Right Column: Heading, Paragraph, Button */}
            <div className="text-left md:pl-8">
              <h2 className="font-inter font-semibold text-[40px] leading-[140%] text-black capitalize mb-6">
                Designed And Built By An Astonishing Creative Team.
              </h2>

              <p className="font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50 mb-8">
                Et eleifend consectetur tellus consectetur nibh non urna
                lobortis. Quis sapien enim posuere mollis risus. Nec dictumst
                ullamcorper et leo. Varius praesent tinc.
              </p>

              <Link
                to="/about"
                className="inline-block bg-[#6854FC] text-white font-inter font-bold text-[18px] leading-[140%] py-3 px-8 rounded-full shadow-md  transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                About us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutIntro;
