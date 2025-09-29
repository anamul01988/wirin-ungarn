"use client";

import { setRoutePrefix } from "@/lib/store/routeSlice";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// Utility function to check if content contains HTML
const isHTML = (str) => {
  if (typeof str !== "string") return false;
  return /<[a-z][\s\S]*>/i.test(str);
};

// Utility function to truncate text to 300 words
const truncateText = (text, maxWords = 80) => {
  if (typeof text !== "string") return text;

  // For HTML content, remove all HTML tags and entities
  if (isHTML(text)) {
    // Remove HTML tags, entities, and clean up whitespace
    const cleanText = text
      .replace(/<[^>]*>/g, " ") // Remove all HTML tags
      .replace(/&[^;]+;/g, " ") // Remove HTML entities like &#8211;
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing whitespace

    const words = cleanText.split(" ");

    if (words.length <= maxWords) {
      return cleanText;
    }

    const truncated = words.slice(0, maxWords).join(" ");
    return truncated + "...";
  } else {
    // For plain text
    const words = text.split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  }
};

const CustomPost = ({
  image = "",
  title,
  description,
  slug,
  onlyHeadings,
  routePrefix = "liedtexte",
}) => {
  const route = useRouter();
  const dispatch = useDispatch();

  const handleClick = (slug) => {
    console.log("routePrefix", routePrefix, typeof routePrefix);
    // Dispatch routePrefix to Redux store before navigation
    dispatch(setRoutePrefix(routePrefix));
    console.log("Dispatched routePrefix to Redux:", routePrefix);

    // Small timeout to ensure dispatch completes before navigation
    setTimeout(() => {
      // route.push(`/${routePrefix}/${slug}`);
      if (routePrefix === "wissenswert") {
        route.push(`/${routePrefix}/${slug}`);
      }
      if (routePrefix === "einfach-lesen") {
        route.push(`/${routePrefix}/${slug}`);
      }
      if (routePrefix === "ausflugsziele") {
        route.push(`/${routePrefix}/${slug}`);
      } else {
        route.push(`${slug}`);
      }
    }, 10);
  };

  // Render description based on routePrefix and data type
  const renderDescription = () => {
    // For kategorien route, description is an array of objects
    if (routePrefix === "kategorien" && Array.isArray(description)) {
      const firstItem = description.length > 0 ? description[0] : null;
      if (!firstItem) return null;

      return (
        <div className="space-y-4">
          <div className="pl-4">
            {/* <h6 className="font-semibold text-blue-800 mb-2 text-sm">
              {firstItem.title}
            </h6> */}
            <div
              className="text-sm leading-relaxed text-justify"
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

    // For sprachkurs route, description is an array of objects with icon, title, content
    if (routePrefix === "sprachkurs" && Array.isArray(description)) {
      const firstItem = description.length > 0 ? description[0] : null;
      if (!firstItem) return null;

      return (
        <div className="space-y-4">
          {/* <div className="border-l-4 border-green-200 pl-4"> */}
          <div className="pl-4">
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
              className="text-sm leading-relaxed text-justify"
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
          <div className="pl-4">
            {/* <h6 className="font-semibold text-purple-800 mb-2 text-sm">
              {firstItem.title}
            </h6> */}
            <div
              className="text-sm leading-relaxed text-justify"
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
      <Typography
        variant="small"
        color="blue-gray"
        className="text-sm leading-relaxed text-justify"
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
          {" "}
          {/* Left Image */}
          {image && (
            <div className="w-full md:w-56 flex-shrink-0">
              <img
                src={image}
                alt={title}
                className="w-full h-40 md:max-h-[300px] object-cover rounded-md"
              />
            </div>
          )}
          {/* Right Content */}
          <div className="flex-1">
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-semibold mb-2 cursor-pointer"
              onClick={() => handleClick(slug)}
            >
              {title}
            </Typography>
            {renderDescription()}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomPost;
