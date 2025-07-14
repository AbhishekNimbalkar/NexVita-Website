import React from "react";

const ServiceDetail = () => {
  return (
    <>
      <div className="w-full h-[4px] bg-[rgb(232,232,232)] "></div>
      <section className="bg-white py-16 px-6 md:py-24 min-h-screen">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Content */}
            <div className="text-left">
              <h1 className="font-inter font-bold text-[40px] leading-[140%] text-black mb-6">
                Ultimate Services for your businesses.
              </h1>

              <p className="font-inter font-medium text-[18px] leading-[160%] tracking-[0.02em] text-black/50 mb-12">
                Nunc, porta phasellus nisl ac risus eget lectus neque, mauris.
                Dictumst mauris, id eget tellus tincidunt sit nisi, non cras.
              </p>

              {/* Grid of Service Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {/* Service Item 1 */}
                <div className="flex flex-col items-start">
                  <div className="w-16 h-16 rounded-full bg-[#F0EEFF] mb-4"></div>{" "}
                  {/* Circular placeholder */}
                  <h3 className="font-inter font-semibold text-[22px] leading-[160%] tracking-[0.02em] text-[#6854FC] mb-2">
                    Lorem Ipsum
                  </h3>
                  <p className="font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50">
                    Ut vitae sit orci, ultricies. A nunc nullam feugiat facilisi
                    bibendum amet.
                  </p>
                </div>

                {/* Service Item 2 */}
                <div className="flex flex-col items-start">
                  <div className="w-16 h-16 rounded-full bg-[#F0EEFF] mb-4"></div>{" "}
                  {/* Circular placeholder */}
                  <h3 className="font-inter font-semibold text-[22px] leading-[160%] tracking-[0.02em] text-[#6854FC] mb-2">
                    Lorem Ipsum
                  </h3>
                  <p className="font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50">
                    Nisi vivamus nisl nullam justo, sed at odio sit. Et nunc
                    vestibulum.
                  </p>
                </div>

                {/* Service Item 3 */}
                <div className="flex flex-col items-start">
                  <div className="w-16 h-16 rounded-full bg-[#F0EEFF] mb-4"></div>{" "}
                  {/* Circular placeholder */}
                  <h3 className="font-inter font-semibold text-[22px] leading-[160%] tracking-[0.02em] text-[#6854FC] mb-2">
                    Lorem Ipsum
                  </h3>
                  <p className="font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50">
                    Sit lobortis semper mus nulla ultrices ridiculus cum gravida
                    phasellus.
                  </p>
                </div>

                {/* Service Item 4 */}
                <div className="flex flex-col items-start">
                  <div className="w-16 h-16 rounded-full bg-[#F0EEFF] mb-4"></div>{" "}
                  {/* Circular placeholder */}
                  <h3 className="font-inter font-semibold text-[22px] leading-[160%] tracking-[0.02em] text-[#6854FC] mb-2">
                    Lorem Ipsum
                  </h3>
                  <p className="font-inter font-normal text-[18px] leading-[160%] tracking-[0.02em] text-black/50">
                    Quis cras vitae laoreet in mauris nibh at. In velit semper
                    ullamcorper porta.
                  </p>
                </div>
              </div>

              {/* See all button */}
              <button className="bg-[#6854FC] text-white font-inter font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg">
                See all
              </button>
            </div>

            {/* Right Column: Large Placeholder Box - Updated with specific color and rounded corners */}
            <div className="bg-[#F0EEFF] rounded-[30px] min-h-[500px] w-full">
              {" "}
              {/* Changed rounded-xl to rounded-[30px] and confirmed color */}
              {/* This div acts as the large light purple placeholder box */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
