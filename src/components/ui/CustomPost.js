"use client";

import { setRoutePrefix } from "@/lib/store/routeSlice";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";

// Utility function to check if content contains HTML
const isHTML = (str) => {
  if (typeof str !== "string") return false;
  return /<[a-z][\s\S]*>/i.test(str);
};

// Utility function to truncate text to 300 words
export const truncateText = (text, maxWords = 80) => {
  if (typeof text !== "string") return text;

  if (isHTML(text)) {
    const cleanText = text
      .replace(/<[^>]*>/g, " ")
      .replace(/&[^;]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const words = cleanText.split(" ");
    if (words.length <= maxWords) return cleanText;
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    const words = text.split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  }
};

// ✅ Reusable Image Component With Skeleton + Fade In
function PostImage({ image, title }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full md:w-56 flex-shrink-0">
      {/* Skeleton */}
      {!loaded && (
        <div className="w-full h-40 md:h-[200px] rounded-md bg-gray-300 animate-pulse" />
      )}

      <Image
        src={image}
        alt={title}
        width={500}
        height={200}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`
          w-full h-40 md:h-[200px] object-contain rounded-md
          ${loaded ? "opacity-100" : "opacity-0"}
          transition-opacity duration-500
        `}
      />
    </div>
  );
}

const CustomPost = ({
  image = "",
  title,
  description,
  slug,
  onlyHeadings,
  routePrefix = "liedtexte",
  subtitle,
  subcategory = "",
}) => {
  const route = useRouter();
  const dispatch = useDispatch();

  const handleClick = (slug) => {
    if (routePrefix === "kategorien") route.push(`/${slug}`);
    if (routePrefix === "sprachkurs") route.push(`/${routePrefix}/${slug}`);
    if (routePrefix === "einfach-lesen") route.push(`/${routePrefix}/${slug}`);
    if (routePrefix === "liedtexte") route.push(`/${routePrefix}/${slug}`);
    if (routePrefix === "kreuzwortraetsel")
      route.push(`/${routePrefix}/${slug}`);
    if (routePrefix === "kulinarische-seele")
      route.push(`/${routePrefix}/${slug}`);

    dispatch(setRoutePrefix(routePrefix));
  };

  // Description renderer (unchanged)
  const renderDescription = () => {
    if (routePrefix === "ausflugsziele") {
      return (
        <div className="space-y-4">
          <div className="text-[14px] text-[#56646F] text-justify">
            {subtitle}
          </div>
          <div
            className="archive__page_content text-justify"
            {...(isHTML(description)
              ? {
                  dangerouslySetInnerHTML: {
                    __html: truncateText(description),
                  },
                }
              : { children: truncateText(description) })}
          />
        </div>
      );
    }
    // For kategorien route, description is an array of objects
    if (routePrefix === "kategorien" && Array.isArray(description)) {
      const firstItem = description.length > 0 ? description[0] : null;
      if (!firstItem) return null;

      return (
        <div className="space-y-4">
          {/* <h6 className="font-semibold text-blue-800 mb-2 text-sm">
              {firstItem.title}
            </h6> */}
          <div
            className="archive__page_content leading-relaxed text-justify"
            {...(isHTML(firstItem.content)
              ? {
                  dangerouslySetInnerHTML: {
                    __html: truncateText(firstItem.content),
                  },
                }
              : { children: truncateText(firstItem.content) })}
          />
        </div>
      );
    }

    // For sprachkurs route, description is an array of objects with icon, title, content
    if (routePrefix === "sprachkurs" && Array.isArray(description)) {
      const firstItem = description.length > 0 ? description[0] : null;
      if (!firstItem) return null;

      return (
        <div className="space-y-4">
          {/* <div className="border-l-4 border-green-200 pl-0"> */}
          <div className="pl-0">
            <div className="flex items-center gap-2 mb-2">
              {/* {firstItem.icon && firstItem.icon.length > 0 && (
                <div className="flex items-center gap-1">
                  {firstItem.icon.map((iconName, iconIndex) => (
                    <span
                      key={iconIndex}
                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                    >
                      {iconName}
                    </span>
                  ))}
                </div>
              )}
              <h6 className="font-semibold text-green-800 text-sm">
                {firstItem.title}
              </h6> */}
            </div>
            <div
              className="archive__page_content leading-relaxed text-justify"
              {...(isHTML(firstItem.content)
                ? {
                    dangerouslySetInnerHTML: {
                      __html: truncateText(firstItem.content),
                    },
                  }
                : { children: truncateText(firstItem.content) })}
            />
          </div>
        </div>
      );
    }

    // For liedtexte route, description is an array of objects with title, content
    if (routePrefix === "liedtexte" && Array.isArray(description)) {
      const firstItem = description.length > 0 ? description[0] : null;
      if (!firstItem) return null;

      return (
        <div className="space-y-4">
          <div className="pl-0">
            {/* <h6 className="font-semibold text-purple-800 mb-2 text-sm">
              {firstItem.title}
            </h6> */}
            <div
              className="archive__page_content leading-relaxed text-justify"
              {...(isHTML(firstItem.content)
                ? {
                    dangerouslySetInnerHTML: {
                      __html: truncateText(firstItem.content),
                    },
                  }
                : { children: truncateText(firstItem.content) })}
            />
          </div>
        </div>
      );
    }

    // For other routes, description is a string
    return (
      <div
        className="archive__page_content leading-relaxed text-justify"
        {...(isHTML(description)
          ? {
              dangerouslySetInnerHTML: {
                __html: truncateText(description),
              },
            }
          : { children: truncateText(description) })}
      />
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 pb-6">
      {onlyHeadings ? (
        <div className="flex-1">
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-semibold mb-2 cursor-pointer"
            onClick={() => handleClick(slug)}
          >
            {title}
          </Typography>
        </div>
      ) : (
        <>
          {/* ✅ Left Image (now using next/image + skeleton) */}
          {image && <PostImage image={image} title={title} />}

          {/* ✅ Right Content */}
          <div className="flex-1">
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-normal flex justify-between items-center mb-2 cursor-pointer text-[24px] text-[#494158]"
              onClick={() => handleClick(slug)}
            >
              {title}
              <span className="text-[14px] text-[#56646F]">{subcategory}</span>
            </Typography>

            {renderDescription()}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomPost;
