import { impressumData } from "@/lib/utils/utils";
import React from "react";

const ImpressumDetails = ({ onBack }) => {
  return (
    <div className="p-4">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <h1 className={impressumData.page.header.h1.style}>
          {impressumData.page.header.h1.text}
        </h1>

        {/* Content Section */}
        {impressumData.page.content.map((section, index) => (
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

export default ImpressumDetails;
