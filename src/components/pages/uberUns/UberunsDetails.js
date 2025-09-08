import { uberUns } from "@/lib/utils/utils";
import React from "react";

const UberUnsDetails = ({ onBack }) => {
  return (
    <div className="p-4">
      {/* Back button */}
      {/* <button
        onClick={onBack}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center justify-center text-blue-700 hover:text-blue-900 p-1 z-10"
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

      <div className="w-full mx-auto">
        {/* Header Section */}
        <h1 className={uberUns.page.header.h1.style}>
          {uberUns.page.header.h1.text}
        </h1>
        <p className={uberUns.page.header.p.style}>
          {uberUns.page.header.p.text}
        </p>

        {/* Content Section */}
        <div className="mb-8">
          <p className={uberUns.page.content.introduction.style}>
            {uberUns.page.content.introduction.text
              .split("wir-in-ungarn.hu.")
              .map((line, index, arr) => (
                <React.Fragment key={index}>
                  {line}
                  {index < arr.length - 1 && (
                    <span className="text-red-600 dark:text-red-400 font-semibold">
                      wir-in-ungarn.hu.
                    </span>
                  )}
                </React.Fragment>
              ))}
          </p>
        </div>

        {uberUns.page.content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className={section.header.h2.style}>
              {section.header.h2.text}
            </h2>
            {section.list_items ? (
              <ul className="list-disc pl-5">
                {section.list_items.map((item, itemIndex) => (
                  <li key={itemIndex} className={item.style}>
                    {item.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={section.paragraph.style}>
                {section.paragraph.text
                  .split("wir-in-ungarn.hu.")
                  .map((line, index, arr) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < arr.length - 1 && (
                        <span className="text-red-600 dark:text-red-400 font-semibold">
                          wir-in-ungarn.hu.
                        </span>
                      )}
                    </React.Fragment>
                  ))}
              </p>
            )}
          </div>
        ))}

        <p className={uberUns.page.content.closing.style}>
          {uberUns.page.content.closing.text.split("\n").map((line, index) => (
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

export default UberUnsDetails;
