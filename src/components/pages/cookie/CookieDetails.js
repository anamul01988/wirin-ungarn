import { cookieData } from "@/lib/utils/utils";
import React from "react";

const CookieDetails = ({ onBack }) => {
  return (
    <div className="p-4">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <h1 className={cookieData.page.header.h1.style}>
          {cookieData.page.header.h1.text}
        </h1>

        {/* Content Section */}
        {cookieData.page.content.map((section, index) => (
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

export default CookieDetails;
