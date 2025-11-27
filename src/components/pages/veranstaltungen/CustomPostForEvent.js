"use client";

import { useState } from "react";

const CustomPostForEvent = ({
  title,
  date,
  subtitle,
  street,
  description,
  category,
  subcategory,
  timefrom,
  timeto,
  slug,
  accentColor = "red", // red or green
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return { month: "NOV", day: "28", dateRange: "Nov 27" };
    const date = new Date(dateString);
    const months = [
      "JAN",
      "FEB",
      "MÄR",
      "APR",
      "MAI",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OKT",
      "NOV",
      "DEZ",
    ];
    const monthShort = [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];

    const day = date.getDate().toString();
    const month = months[date.getMonth()];
    const monthShortName = monthShort[date.getMonth()];
    const year = date.getFullYear();

    // For date range, show previous day
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDay = prevDate.getDate();
    const prevMonthShort = monthShort[prevDate.getMonth()];

    return {
      month,
      day,
      dateRange: `${prevMonthShort} ${prevDay}`,
    };
  };

  const dateInfo = formatDate(date);

  // Color definitions
  const colors =
    accentColor === "green"
      ? {
          primary: "#436f4d",
          primaryDark: "#355a3f",
          light: "#6b9a7a",
        }
      : {
          primary: "#cc2233",
          primaryDark: "#a01a2a",
          light: "#e85566",
        };

  // Truncate description to 20 characters
  const truncateText = (text, maxChars = 200) => {
    if (!text) return "";
    if (typeof text !== "string") return text;
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars);
  };

  const truncatedDescription = truncateText(description, 200);
  const shouldShowButton = description && description.length > 200;

  // Build category string
  const categoryString =
    category && subcategory
      ? `${category.toUpperCase()} > ${subcategory.toUpperCase()}`
      : category
      ? category.toUpperCase()
      : "";

  return (
    <div className="flex gap-4 mb-6">
      {/* Date Section */}
      <div className="flex-shrink-0 w-20">
        <div className="text-right">
          <div className="text-md font-normal" style={{ color: colors.light }}>
            {dateInfo.month}
          </div>
          <div
            className="text-2xl font-bold leading-none mt-1"
            style={{ color: colors.primary }}
          >
            {dateInfo.day}
          </div>
          <div className="flex justify-center my-2">
            <div
              className="border-t w-4"
              style={{ borderColor: colors.light }}
            ></div>
          </div>
          <div className="text-md font-normal" style={{ color: colors.light }}>
            {dateInfo.dateRange}
          </div>
        </div>
      </div>

      {/* Vertical Accent Bar */}
      <div
        className="w-2 rounded-sm flex-shrink-0"
        style={{ backgroundColor: colors.primary }}
      ></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <p
          className="text-[22px] font-normal m-0 text-[#333] uppercase"
          style={{ fontFamily: "var(--font-roboto-condensed), sans-serif" }}
        >
          {title || "EVENT TITLE"}
        </p>

        {/* Subtitle (Hungarian) */}
        {subtitle && (
          <p
            className="text-[16px] font-normal m-0 text-[#333] uppercase mb-2"
            style={{ fontFamily: "var(--font-roboto-condensed), sans-serif" }}
          >
            [ {subtitle} ]
          </p>
        )}

        {/* Location */}
        {street && (
          <p
            className="text-sm text-gray-900 mb-2"
            style={{ fontFamily: "var(--font-roboto-condensed), sans-serif" }}
          >
            {street}
          </p>
        )}

        {/* Description */}
        {description && (
          <div className="mb-3">
            <p
              className="text-sm text-[#555] leading-5"
              style={{ fontFamily: "var(--font-roboto-condensed), sans-serif" }}
            >
              {isExpanded ? description : truncatedDescription}
            </p>
          </div>
        )}

        {/* Category and Button Row */}
        <div className="flex items-end justify-between mt-auto">
          {/* Category */}
          {categoryString && (
            <p
              className="text-xs text-[#222] uppercase"
              style={{ fontFamily: "var(--font-roboto-condensed), sans-serif" }}
            >
              {categoryString}
            </p>
          )}

          <div className="flex gap-2">
            {/* Mehr anzeigen/Weniger anzeigen Button */}
            {shouldShowButton && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{
                  fontFamily: "var(--font-roboto-condensed), sans-serif",
                  backgroundColor: colors.primary,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = colors.primaryDark)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = colors.primary)
                }
              >
                {isExpanded ? "Weniger anzeigen" : "weiterlesen"}
              </button>
            )}

            {/* Weiterlesen Button */}
            {slug && (
              <a
                href={`/veranstaltungen/${slug}`}
                className="text-white px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{
                  fontFamily: "var(--font-roboto-condensed), sans-serif",
                  backgroundColor: colors.primary,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = colors.primaryDark)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = colors.primary)
                }
              >
                weiterlesen
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPostForEvent;
