import { philosopiesDetails } from "@/lib/utils/utils";
import React from "react";

const PhilosopiesDetails = ({ onBack }) => {
  return (
    <div className="p-4">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <h1 className="single__page_title mb-3 text-2xl font-bold text-gray-800 pr-12 leading-snug">
          {philosopiesDetails.page.header.h1.text}
        </h1>

        <div className="prose prose-lg max-w-none">

        <p className="has-medium-font-size">
        <strong>  {philosopiesDetails.page.header.p.text} </strong>
        </p>

        {philosopiesDetails.page.content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className={section.header.p.style}>
              {section.header.p.text}
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

        <p className="has-medium-font-size mt-40">
        <strong>  Redaktionelle Grundsätze von „wir-in-ungarn“ </strong>
        </p>



        {philosopiesDetails.page.content2.sections2.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className={section.header.p.style}>
              {section.header.p.text}
            </h2>
            <p className={section.paragraph.style}>{section.paragraph.text}</p>
          </div>
        ))}


      </div>
      </div>
    </div>
  );
};

export default PhilosopiesDetails;
