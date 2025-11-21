// venastaltusngskalendar.js"use client";
import React, { useEffect, useState } from "react";
import { SearchAllPosts, GetListingsVeranstaltungen } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
const VenastaltusngskalendarPage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [allListings, setAllListings] = useState([]); // Store all listings
  const [searchResults, setSearchResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const listingsPerPage = 10;
  const isHTML = (str) => {
    if (typeof str !== "string") return false;
    return /<[a-z][\s\S]*>/i.test(str);
  };
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

  // Get current listings to display based on pagination
  const getCurrentListings = () => {
    const startIndex = (currentPage - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    return allListings.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const getTotalPages = () => {
    return Math.ceil(allListings.length / listingsPerPage);
  };

  // Get current search results to display based on pagination
  const getCurrentSearchResults = () => {
    if (!searchResults?.edges) return [];
    const startIndex = (searchCurrentPage - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    return searchResults.edges.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (isSearching) {
      setSearchCurrentPage(pageNumber);
    } else {
      setCurrentPage(pageNumber);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      // If search is empty, clear search and show original data
      clearSearch();
      return;
    }

    setFiltering(true);
    setIsSearching(true);
    try {
      const apiData = await SearchAllPosts(search, 1000);
      setSearchResults(apiData.data.posts);
      setSearchCurrentPage(1);
    } catch (err) {
      setError("Fehler beim Suchen.");
    } finally {
      setFiltering(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setIsSearching(false);
    setSearchResults({});
    setSearchCurrentPage(1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetListingsVeranstaltungen();
        console.log("apiData 2221122222222111", apiData);
        setCookieData(apiData);
        // Store all listings in state
        setAllListings(apiData.data.listings.edges || []);
        setCurrentPage(1);
      } catch (err) {
        setError("Fehler beim Laden der Cookie-Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  if (error) return <div>{error}</div>;

  const { title, content } = cookieData.data.pages?.nodes[0] || {};

  // Get listings to display
  const displayListings = isSearching
    ? getCurrentSearchResults()
    : getCurrentListings();
  const totalPages = isSearching
    ? Math.ceil((searchResults?.edges?.length || 0) / listingsPerPage)
    : getTotalPages();
  const activePage = isSearching ? searchCurrentPage : currentPage;
  const totalListings = isSearching
    ? searchResults?.edges?.length || 0
    : allListings.length;

  console.log("ausflugsziele data: allListings:", allListings);
  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      {/* Header */}
      <div className="bg-[#CC2233] mb-4 rounded-[18px] h-[50px] flex items-center justify-center text-[#fff]">
        <Typography
          variant="h4"
          className="archive__page_title font-bold text-center text-[#FFF]"
        >
          {title}
        </Typography>
      </div>

      {/* Checkbox */}
      <div className="flex items-center justify-end mb-4">
        <Checkbox
          color="red"
          checked={onlyHeadings}
          onChange={(e) => setOnlyHeadings(e.target.checked)}
          label="ausschließlich Überschriften anzeigen"
          crossOrigin={undefined} // needed for React strict mode
        />
      </div>

      {/* Description */}
      <Typography
        variant="paragraph"
        className="archive__page_description leading-relaxed font-bold mb-6"
        dangerouslySetInnerHTML={{
          __html: truncateText(content),
        }}
      />

      {/* Search Box */}
      <div className="mb-6">
        <Typography variant="small" className="font-medium mb-2">
          Diese Seite durchsuchen
        </Typography>
        <div className="flex lg:flex-nowrap md:flex-wrap gap-5">
          <Input
            type="text"
            label="Suche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            crossOrigin={undefined}
          />
          {/* <Button color="red" onClick={() => alert(`Searching for: ${search}`)}>
            SUCHE
          </Button> */}
          <Button color="red" onClick={handleSearch} disabled={filtering}>
            {filtering ? "Suche..." : "SUCHE"}
          </Button>
          {isSearching && (
            <Button color="gray" onClick={clearSearch} className="px-4 py-2">
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        {isSearching ? (
          <>
            Suchergebnisse - Seite {activePage} von {totalPages} - Insgesamt{" "}
            {totalListings} Beiträge - Angezeigt werden{" "}
            {displayListings?.length || 0} Beiträge.
          </>
        ) : (
          <>
            Seite {activePage} von {totalPages} - Insgesamt {totalListings}{" "}
            Beiträge - Angezeigt werden {displayListings?.length || 0} Beiträge.
          </>
        )}
      </Typography>
      <div
        className="pt-6 pb-3 max-w-5xl overflow-auto mx-auto"
        // style={{ height: "calc(100vh - 450px)" }}
      >
        {filtering === true ? (
          <div>
            <DefaultSpinner />
          </div>
        ) : (
          <>
            {isSearching &&
            (!searchResults?.edges || searchResults.edges.length === 0) ? (
              <div className="text-center py-8">
                <Typography variant="h6" color="gray" className="mb-4">
                  Keine Suchergebnisse gefunden
                </Typography>
                <Typography variant="paragraph" color="gray">
                  Versuchen Sie es mit anderen Suchbegriffen oder schauen Sie
                  sich alle verfügbaren Artikel an.
                </Typography>
              </div>
            ) : (
              <div className="">
                {displayListings?.map((edge, idx) => {
                  return (
                    <div className="relative" key={edge.node.id}>
                      <CustomPost
                        title={edge.node?.title}
                        description={edge.node.listingFieldGroup?.description}
                        onlyHeadings={onlyHeadings}
                        slug={edge.node.slug}
                        routePrefix="veranstaltungen"
                      />
                      {/* Divider except last */}
                      {!onlyHeadings && idx < displayListings?.length - 1 && (
                        <hr className="my-6 border-gray-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Numbered Pagination - Only show if not searching with empty results and more than 1 page */}
            {!(
              isSearching &&
              (!searchResults?.edges || searchResults.edges.length === 0)
            ) &&
              totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 mb-4 flex-wrap">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage === 1}
                    className="pagination-number"
                  >
                    &laquo;
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= activePage - 2 &&
                          pageNum <= activePage + 2);

                      const showEllipsis =
                        (pageNum === activePage - 3 && activePage > 4) ||
                        (pageNum === activePage + 3 &&
                          activePage < totalPages - 3);

                      if (showEllipsis) {
                        return (
                          <span key={pageNum} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`pagination-number ${
                            pageNum === activePage ? "active" : ""
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(activePage + 1)}
                    disabled={activePage === totalPages}
                    className="pagination-number"
                  >
                    &raquo;
                  </button>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default VenastaltusngskalendarPage;
