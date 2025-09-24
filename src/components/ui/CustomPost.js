"use client";

import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

// Utility function to check if content contains HTML
const isHTML = (str) => {
  if (typeof str !== "string") return false;
  return /<[a-z][\s\S]*>/i.test(str);
};

// Utility function to truncate text to 300 words
const truncateText = (text, maxWords = 100) => {
  if (typeof text !== "string") return text;

  // For HTML content, we need to be more careful
  if (isHTML(text)) {
    // Remove HTML tags to count words
    const textOnly = text
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = textOnly.split(" ");

    if (words.length <= maxWords) {
      return text;
    }

    // Find the position where to cut in the original HTML
    let wordCount = 0;
    let cutPosition = 0;
    const wordsInOriginal = text.split(/\s+/);

    for (let i = 0; i < wordsInOriginal.length; i++) {
      const word = wordsInOriginal[i].replace(/<[^>]*>/g, "").trim();
      if (word) {
        wordCount++;
        if (wordCount > maxWords) {
          cutPosition = i;
          break;
        }
      }
    }

    const truncated = wordsInOriginal.slice(0, cutPosition).join(" ");
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

  const handleClick = (slug) => {
    // route.push(`/${routePrefix}/${slug}`);
    route.push(`${slug}`);
  };

  // Render description based on routePrefix and data type
  const renderDescription = () => {
    // For kategorien route, description is an array of objects
    if (routePrefix === "kategorien" && Array.isArray(description)) {
      return (
        <div className="space-y-4">
          {description.map((item, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              <h6 className="font-semibold text-blue-800 mb-2 text-sm">
                {item.title}
              </h6>
              <div
                className="text-sm leading-relaxed text-justify"
                {...(isHTML(item.content)
                  ? {
                      dangerouslySetInnerHTML: {
                        __html: truncateText(item.content),
                      },
                    }
                  : { children: truncateText(item.content) })}
              />
            </div>
          ))}
        </div>
      );
    }

    // For sprachkurs route, description is an array of objects with icon, title, content
    if (routePrefix === "sprachkurs" && Array.isArray(description)) {
      return (
        <div className="space-y-4">
          {description.map((item, index) => (
            <div key={index} className="border-l-4 border-green-200 pl-4">
              <div className="flex items-center gap-2 mb-2">
                {item.icon && item.icon.length > 0 && (
                  <div className="flex items-center gap-1">
                    {item.icon.map((iconName, iconIndex) => (
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
                  {item.title}
                </h6>
              </div>
              <div
                className="text-sm leading-relaxed text-justify"
                {...(isHTML(item.content)
                  ? {
                      dangerouslySetInnerHTML: {
                        __html: truncateText(item.content),
                      },
                    }
                  : { children: truncateText(item.content) })}
              />
            </div>
          ))}
        </div>
      );
    }

    // For liedtexte route, description is an array of objects with title, content
    if (routePrefix === "liedtexte" && Array.isArray(description)) {
      return (
        <div className="space-y-4">
          {description.map((item, index) => (
            <div key={index} className="border-l-4 border-purple-200 pl-4">
              <h6 className="font-semibold text-purple-800 mb-2 text-sm">
                {item.title}
              </h6>
              <div
                className="text-sm leading-relaxed text-justify"
                {...(isHTML(item.content)
                  ? {
                      dangerouslySetInnerHTML: {
                        __html: truncateText(item.content),
                      },
                    }
                  : { children: truncateText(item.content) })}
              />
            </div>
          ))}
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
