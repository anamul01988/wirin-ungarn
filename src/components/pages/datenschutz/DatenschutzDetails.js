import { datenschutzData } from "@/lib/utils/utils";
import React from "react";

const DatenschutzDetails = ({ onBack }) => {
  return (
    <div className="p-4">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <h1 className={datenschutzData.page.header.h1.style}>
          {datenschutzData.page.header.h1.text}
        </h1>

        {/* Content Section */}
        {datenschutzData.page.content.map((section, index) => (
          <div key={index} className="mb-8">
            <p className={section.p.style}>{section.p.text}</p>
            <p className={section.introduction.style}>
              {section.introduction.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatenschutzDetails;
