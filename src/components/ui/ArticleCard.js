"use client";

import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DefaultSpinner } from "../_components/Spinners";

const ArticleCard = ({ image, title, description, slug, onlyHeadings }) => {
  const route = useRouter();
  const [expanded, setExpanded] = useState(false);
  const words = description?.split(/\s+/) || [];
  const shortDescription = words.slice(0, 45).join(" ");
  const hasMore = words.length > 45;
  const handleClick = (slug) => {
    route.push(`/${slug}`);
  };

  const handleDetails = () => {
    route.push("die-nutzung-des-oeffentlichen-verkehrs-in-ungarn");
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 pb-6">
      {/* Left Image */}
      {onlyHeadings && (
        <Typography
          variant="h6"
          color="blue-gray"
          className="font-semibold mb-2 cursor-pointer"
          onClick={() => (slug ? handleClick(slug) : handleDetails())}
        >
          {title}
        </Typography>
      )}

      <div className="w-full md:w-56 flex-shrink-0">
        {!onlyHeadings && (
          <>
            {image ? (
              <>
                <img
                  src={image}
                  alt={title}
                  className="w-full object-cover rounded-md"
                />
              </>
            ) : (
              <>
                {" "}
                <DefaultSpinner />{" "}
              </>
            )}
          </>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1">
        {!onlyHeadings && (
          <>
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-semibold mb-2 cursor-pointer"
              onClick={() => (slug ? handleClick(slug) : handleDetails())}
            >
              {title}
            </Typography>

            <Typography
              variant="small"
              color="blue-gray"
              className="text-sm leading-relaxed text-justify"
              dangerouslySetInnerHTML={{
                __html:
                  expanded || !hasMore ? description : shortDescription + "...",
              }}
            />

            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-black-500 mt-2 font-medium hover:underline"
              >
                {expanded ? "Read Less <<" : "Read More >>"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
