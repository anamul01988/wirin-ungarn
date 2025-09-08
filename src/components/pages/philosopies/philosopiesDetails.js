import { philosopiesDetails } from "@/lib/utils/utils";
import React from "react";

const PhilosopiesDetails = ({ onBack }) => {
  return (
    <div className="p-4">
      <div>
        {/* <button
          onClick={onBack}
          className="flex items-center justify-center text-blue-700 hover:text-blue-900 p-1 z-10"
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button> */}
      </div>

      <div className="w-full mx-auto">
        {/* Header Section */}
        <h1 className={philosopiesDetails.page.header.h1.style}>
          {philosopiesDetails.page.header.h1.text}
        </h1>
        <p className={philosopiesDetails.page.header.p.style}>
          {philosopiesDetails.page.header.p.text}
        </p>

        {/* Content Section */}
        <p className={philosopiesDetails.page.content.introduction.style}>
          {philosopiesDetails.page.content.introduction.text}
        </p>

        {philosopiesDetails.page.content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className={section.header.h2.style}>
              {section.header.h2.text}
            </h2>
            <p className={section.paragraph.style}>{section.paragraph.text}</p>
          </div>
        ))}

        <p className={philosopiesDetails.page.content.closing.style}>
          {philosopiesDetails.page.content.closing.text
            .split("\n")
            .map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>
      </div>
    </div>
  );
};

export default PhilosopiesDetails;
