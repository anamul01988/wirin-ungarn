"use client";

import React, { useState, useEffect, useRef } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRoutePrefix } from "@/lib/store/routeSlice";
import algoliasearch from "algoliasearch/lite";
import "./WissenwertPost.css";

// Algolia Search Class for Wissenswert
class WissenwertAlgoliaSearch {
  constructor(onResults, onLoading) {
    this.client = algoliasearch(
      "4BNRIJHLXZ",
      "0707974c58f2e7c53a70e1e58eeec381"
    );
    this.index = this.client.initIndex("wp_searchable_posts");
    this.onResults = onResults;
    this.onLoading = onLoading;
    this.currentQuery = "";
  }

  async search(query, category = "all") {
    this.currentQuery = query;

    // If query is empty, return empty results
    if (!query || query.trim() === "") {
      this.onResults([]);
      return;
    }

    this.onLoading(true);

    try {
      const searchParams = {
        hitsPerPage: 10,
        attributesToRetrieve: [
          "objectID",
          "post_title",
          "permalink",
          "post_excerpt",
          "post_type",
          "post_type_label",
        ],
        attributesToHighlight: ["post_title", "post_excerpt"],
        highlightPreTag: "<strong>",
        highlightPostTag: "</strong>",
        filters: 'post_type_label:"Posts"', // Only wissenswert posts
      };

      const response = await this.index.search(query, searchParams);
      console.log("Algolia search results:", response);

      // Transform Algolia results to match the expected format
      const transformedHits = response.hits.map((hit) => ({
        id: hit.objectID,
        title: hit.post_title || "Untitled",
        highlightedTitle:
          hit._highlightResult?.post_title?.value || hit.post_title,
        excerpt: hit.post_excerpt || "",
        highlightedExcerpt: hit._highlightResult?.post_excerpt?.value || "",
        slug: this.extractSlug(hit.permalink),
        route: hit.permalink || "#",
        permalink: hit.permalink || "#",
      }));

      this.onResults(transformedHits);
    } catch (error) {
      console.error("Algolia search error:", error);
      this.onResults([]);
    } finally {
      this.onLoading(false);
    }
  }

  extractSlug(permalink) {
    if (!permalink) return "";
    const parts = permalink.split("/").filter(Boolean);
    return parts[parts.length - 1] || "";
  }
}

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
              ? "bg-[#436F4D] text-white"
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
  const [algoliaResults, setAlgoliaResults] = useState([]);
  const [isAlgoliaLoading, setIsAlgoliaLoading] = useState(false);
  const [showAlgoliaResults, setShowAlgoliaResults] = useState(false);
  const algoliaSearchRef = useRef(null);
  const observerTarget = React.useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  // Initialize Algolia search
  useEffect(() => {
    algoliaSearchRef.current = new WissenwertAlgoliaSearch(
      (results) => {
        setAlgoliaResults(results);
        setShowAlgoliaResults(results.length > 0);
      },
      (loading) => {
        setIsAlgoliaLoading(loading);
      }
    );
  }, []);

  // Update filtered posts when posts change (filtering is handled at API level)
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Infinite scroll detection using Intersection Observer
  useEffect(() => {
    // Only set up observer if there's a next page available
    if (!hasNextPage || loadingPage || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !loadingPage &&
          !isLoading
        ) {
          // User has scrolled to the bottom, load next page
          if (onPageChange) {
            onPageChange("next");
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, loadingPage, isLoading, onPageChange]);

  const filterTags = [
    { key: "all", label: "Alle" },
    { key: "burokratie", label: "Bürokratie / Ämter" },
    { key: "verkehr", label: "Verkehr / Mobilität" },
    { key: "immobilien", label: "Immobilien / Miete" },
    { key: "kultur", label: "Alltag / Kultur" },
    { key: "arbeit", label: "Arbeit / Finanzen" },
  ];

  // Handle search input changes with debouncing for Algolia
  const handleSearchInputChange = (value) => {
    if (onSearchChange) {
      onSearchChange(value);
    }

    // Trigger Algolia search with debouncing
    if (algoliaSearchRef.current) {
      // Clear results if empty
      if (!value || value.trim() === "") {
        setShowAlgoliaResults(false);
        setAlgoliaResults([]);
        return;
      }

      algoliaSearchRef.current.search(value, activeFilter);
    }
  };

  const handleSearch = () => {
    // Hide Algolia results when performing regular search
    setShowAlgoliaResults(false);

    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAlgoliaResultClick = (result) => {
    dispatch(setRoutePrefix("wissenswert"));
    setTimeout(() => {
      router.push(`/wissenswert/${result.slug}`);
    }, 10);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#CC2233] mb-4 rounded-[18px] h-[50px] bg-[#CC2233] flex items-center justify-center">
        <Typography
          variant="h4"
          className="font-bold text-center text-white archive__page_title"
        >
          {title}
        </Typography>
      </div>

      {/* Intro Text */}
      <div className="mb-4">
        <Typography
          variant="paragraph"
          className="text-[#386e44] font-normal leading-relaxed archive__page_description"
        >
          Entdecke unsere Artikel entweder visuell, indem du durch die
          Themenkacheln stöberst, oder finde gezielt, was du suchst: Nutze
          einfach die Themen-Tags zur Filterung oder die freie Suche.
        </Typography>
      </div>

      {/* Search Section */}
      <div className="bg-gray-50 p-0 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center relative">
          <div className="flex-1 relative w-full">
            <Input
              type="text"
              placeholder="Suche..."
              value={searchValue}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              labelProps={{
                className: "hidden",
              }}
              onKeyPress={handleKeyPress}
              crossOrigin={undefined}
              className="!border-2 !border-gray-300 focus:!border-green-500 focus:!ring-2 focus:!ring-green-200 !rounded-lg h-[40px]"
            />

            {/* Algolia Search Results Dropdown */}
            {showAlgoliaResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-green-500 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {isAlgoliaLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Suche läuft...
                  </div>
                ) : algoliaResults.length > 0 ? (
                  <div className="py-2">
                    {algoliaResults.map((result, index) => (
                      <div
                        key={result.id || index}
                        onClick={() => handleAlgoliaResultClick(result)}
                        className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div
                          className="font-semibold text-green-600 text-sm mb-1"
                          dangerouslySetInnerHTML={{
                            __html: result.highlightedTitle || result.title,
                          }}
                        />
                        {result.highlightedExcerpt && (
                          <div
                            className="text-gray-600 text-xs line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: result.highlightedExcerpt,
                            }}
                          />
                        )}
                        <div className="text-gray-500 text-xs mt-1">
                          {result.permalink}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Keine Ergebnisse gefunden
                  </div>
                )}
              </div>
            )}
          </div>
          <Button
            // color="green"
            onClick={handleSearch}
            disabled={isLoading}
            className="px-8 py-2 hover:bg-green-700 h-[40px]"
            style={{ backgroundColor: "#436F4D" }}
          >
            {isSearchLoading ? "Suche..." : "Suche"}
          </Button>
          {/* <Button
            // color="gray"
            variant="outlined"
            className="px-4 py-2 border-green-500 text-green-600 hover:bg-green-50"
          >
            nur Überschriften
            <br />
            anzeigen
          </Button> */}
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
                  ? "bg-[#436F4D] text-white border-green-900 shadow-md"
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

          {/* Infinite Scroll Observer Target */}
          {hasNextPage && (
            <div
              ref={observerTarget}
              className="h-20 flex items-center justify-center"
            >
              {loadingPage && (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              )}
            </div>
          )}
          {/* {!hasNextPage && filteredPosts.length > 0 && (
            <div className="text-center mt-6 mb-4">
              <Typography variant="small" color="gray" className="text-sm">
                Alle Beiträge wurden geladen.
              </Typography>
            </div>
          )} */}

          {/* Pagination - Commented out for infinite scroll */}
          {/* <div className="flex justify-center gap-4 mt-2">
            <Button
              color="red"
              onClick={() => onPageChange && onPageChange("previous")}
              disabled={!hasPreviousPage || loadingPage}
              className="px-8 py-3 bg-[#CC2233] hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingPage ? "Lade..." : "Previous"}
            </Button>
            <Button
              color="red"
              onClick={() => onPageChange && onPageChange("next")}
              disabled={!hasNextPage || loadingPage}
              className="px-8 py-3 bg-[#CC2233] hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingPage ? "Lade..." : "Next"}
            </Button>
          </div> */}

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
