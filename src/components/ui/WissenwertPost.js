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
      className="wissenwert-post-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleClick}
      data-category={category}
    >
      {/* Image Wrapper */}
      <div className="relative h-48">
        {image && (
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        )}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full ${
            badge === "SHORTS"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
          {title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {truncateText(description, 25)}
        </p>
        <button className="text-orange-500 text-sm font-semibold hover:text-orange-600 transition-colors">
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
  isSearchLoading = false,
  searchValue = "",
  onSearchChange,
  activeFilter = "all",
  onlyHeadings = false,
  hasNextPage = false,
  hasPreviousPage = false,
  loadingPage = false,
}) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Update filtered posts when posts change (filtering is handled at API level)
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-red-600 mb-4 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center">
        <Typography
          variant="h4"
          className="font-bold text-center text-[#FFD6D9]"
        >
          {title}
        </Typography>
      </div>

      {/* Intro Text */}
      <div className="mb-4">
        <Typography
          variant="paragraph"
          className="text-[#2c2b2b] font-normal font-[400] leading-relaxed text-lg"
        >
          Entdecke unsere Artikel entweder visuell, indem du durch die
          Themenkacheln stöberst, oder finde gezielt, was du suchst: Nutze
          einfach die Themen-Tags zur Filterung oder die freie Suche.
        </Typography>
      </div>

      {/* Search Section */}
      <div className="bg-gray-50 p-0 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Suche..."
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              labelProps={{
                className: "hidden",
              }}
              onKeyPress={handleKeyPress}
              crossOrigin={undefined}
              className="!border-2 !border-gray-300 focus:!border-green-500 focus:!ring-2 focus:!ring-green-200 !rounded-lg h-[40px]"
            />
          </div>
          <Button
            color="green"
            onClick={handleSearch}
            disabled={isLoading}
            className="px-8 py-2 bg-green-600 hover:bg-green-700 h-[40px]"
          >
            {isSearchLoading ? "Suche..." : "Suche"}
          </Button>
          <Button
            color="gray"
            variant="outlined"
            className="px-4 py-2 border-green-500 text-green-600 hover:bg-green-50"
          >
            nur Überschriften
            <br />
            anzeigen
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
              className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 wissenwert-filter-tag ${
                activeFilter === tag.key
                  ? "bg-green-600 text-white border-green-600 shadow-md"
                  : "bg-white text-gray-700 border-green-300 hover:border-green-500 hover:bg-green-50"
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
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
          <div className="flex justify-center gap-4 mt-8">
            <Button
              color="red"
              onClick={() => onPageChange && onPageChange("previous")}
              disabled={!hasPreviousPage || loadingPage}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingPage ? "Lade..." : "Previous"}
            </Button>
            <Button
              color="red"
              onClick={() => onPageChange && onPageChange("next")}
              disabled={!hasNextPage || loadingPage}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingPage ? "Lade..." : "Next"}
            </Button>
          </div>

          {/* Results Info */}
          <div className="text-center mt-6">
            <Typography variant="small" color="gray" className="text-sm">
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
