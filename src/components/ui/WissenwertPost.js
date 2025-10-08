"use client";

import React, { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRoutePrefix } from "@/lib/store/routeSlice";
import "./WissenwertPost.css";

// Utility function to check if content contains HTML
const isHTML = (str) => {
  if (typeof str !== "string") return false;
  return /<[a-z][\s\S]*>/i.test(str);
};

// Utility function to truncate text
const truncateText = (text, maxWords = 30) => {
  if (typeof text !== "string") return text;

  // For HTML content, remove all HTML tags and entities
  if (isHTML(text)) {
    const cleanText = text
      .replace(/<[^>]*>/g, " ")
      .replace(/&[^;]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const words = cleanText.split(" ");
    if (words.length <= maxWords) {
      return cleanText;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    const words = text.split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  }
};

const WissenwertPost = ({
  title,
  description,
  image,
  imageAlt,
  slug,
  category = "all",
  badge = "ARTIKEL",
  routePrefix = "wissenswert",
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setRoutePrefix(routePrefix));
    setTimeout(() => {
      router.push(`/${routePrefix}/${slug}`);
    }, 10);
  };

  return (
    <div
      className="wissenwert-post-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
      data-category={category}
    >
      {/* Image Wrapper */}
      <div className="relative">
        {image && (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-48 object-cover"
          />
        )}
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
            badge === "SHORTS"
              ? "bg-blue-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {truncateText(description)}
        </p>
        <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors">
          Weiterlesen
        </button>
      </div>
    </div>
  );
};

const WissenwertPostGrid = ({
  posts = [],
  title,
  onSearch,
  onFilter,
  onPageChange,
  currentPage,
  totalPages,
  isLoading = false,
  searchValue = "",
  onSearchChange,
  activeFilter = "all",
  onlyHeadings = false,
}) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Filter posts based on active filter
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === activeFilter));
    }
  }, [posts, activeFilter]);

  const filterTags = [
    { key: "all", label: "Alle" },
    { key: "burokratie", label: "Bürokratie / Ämter" },
    { key: "verkehr", label: "Verkehr / Mobilität" },
    { key: "immobilien", label: "Immobilien / Miete" },
    { key: "kultur", label: "Alltag / Kultur" },
    { key: "arbeit", label: "Arbeit / Finanzen" },
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-red-600 rounded-md text-white py-3 px-4 mb-6">
        <Typography variant="h5" className="font-bold text-center">
          {title}
        </Typography>
      </div>

      {/* Intro Text */}
      <div className="wissenwert-intro-text">
        <Typography
          variant="paragraph"
          className="text-gray-700 leading-relaxed"
        >
          Entdecke unsere Artikel entweder visuell, indem du durch die
          Themenkacheln stöberst, oder finde gezielt, was du suchst: Nutze
          einfach die Themen-Tags zur Filterung oder die freie Suche.
        </Typography>
      </div>

      {/* Search Section */}
      <div className="wissenwert-search-section">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Suche..."
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              crossOrigin={undefined}
              className="!border-gray-300 focus:!border-red-500"
            />
          </div>
          <Button
            color="red"
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-2"
          >
            {isLoading ? "Suche..." : "Suche"}
          </Button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag.key}
              onClick={() => onFilter && onFilter(tag.key)}
              className={`wissenwert-filter-tag px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tag.key
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <>
          {/* Masonry Grid */}
          <div className="wissenwert-masonry-grid mb-8">
            {filteredPosts.map((post, index) => (
              <WissenwertPost
                key={post.id || index}
                title={post.title}
                description={post.description}
                image={post.image}
                imageAlt={post.imageAlt}
                slug={post.slug}
                category={post.category}
                badge={post.badge}
                routePrefix="wissenswert"
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <Button
                color="red"
                onClick={() => onPageChange && onPageChange("previous")}
                disabled={currentPage <= 1}
                className="px-6 py-2"
              >
                Previous
              </Button>
              <Button
                color="red"
                onClick={() => onPageChange && onPageChange("next")}
                disabled={currentPage >= totalPages}
                className="px-6 py-2"
              >
                Next
              </Button>
            </div>
          )}

          {/* Results Info */}
          <div className="text-center mt-6">
            <Typography variant="small" color="gray">
              Seite {currentPage} - Angezeigt werden {filteredPosts.length}{" "}
              Beiträge.
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default WissenwertPostGrid;
export { WissenwertPost };
