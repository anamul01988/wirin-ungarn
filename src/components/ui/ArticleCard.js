"use client";

import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const ArticleCard = ({ image, title, description,slug }) => {
  const route = useRouter();

    const handleClick = (slug) => {
    route.push(`/${slug}`);
  };

    const handleDetails = () => {
    route.push("die-nutzung-des-oeffentlichen-verkehrs-in-ungarn");
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 pb-6">
      {/* Left Image */}
      <div className="w-full md:w-56 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-40 md:h-full object-cover rounded-md"
        />
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <Typography
          variant="h6"
          color="blue-gray"
          className="font-semibold mb-2 cursor-pointer"
          onClick={() => slug ? handleClick(slug) : handleDetails()}
        >
          {title}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="text-sm leading-relaxed text-justify"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default ArticleCard;
