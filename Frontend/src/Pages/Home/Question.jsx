import React from "react";

const Question = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mb-12">
        <h2 className="font-inter font-semibold text-[40px] leading-[140%] tracking-[0] text-center text-black mb-4">
          Frequently Asked Questions
        </h2>

        <p className="font-inter font-medium text-[18px] leading-[160%] tracking-[0.02em] text-center text-black/50 mt-2">
          At et turpis ridiculus tristique fermentum. Morbi nunc interdum
          adipiscing elit, placerat enim. Odio consectetur proin eget id ut.
          Dolor aliquam egestas viverra aliquam. Vitae nisl, in sit scelerisque
          eget sed. Nibh amet rhoncus ultrices.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-6">
        {/* Placeholder for FAQ Item 1 */}
        <div className="bg-[rgba(240,238,255,1)] p-6 rounded-lg shadow-sm h-32">
          {/* Content for FAQ item 1 would go here */}
        </div>

        {/* Placeholder for FAQ Item 2 */}
        <div className="bg-[rgba(240,238,255,1)] p-6 rounded-lg shadow-sm h-32">
          {/* Content for FAQ item 2 would go here */}
        </div>

        {/* Placeholder for FAQ Item 3 */}
        <div className="bg-[rgba(240,238,255,1)] p-6 rounded-lg shadow-sm h-32">
          {/* Content for FAQ item 3 would go here */}
        </div>

        {/* Placeholder for FAQ Item 4 */}
        <div className="bg-[rgba(240,238,255,1)] p-6 rounded-lg shadow-sm h-32">
          {/* Content for FAQ item 4 would go here */}
        </div>
      </div>
    </div>
  );
};

export default Question;
