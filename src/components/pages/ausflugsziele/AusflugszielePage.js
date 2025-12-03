"use client";
import React, { useEffect, useState } from "react";
import { GetAusflugszielePages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

const AusflugszielePage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [allListings, setAllListings] = useState([]); // Store all listings
  const [searchResults, setSearchResults] = useState([]); // Store filtered search results
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const listingsPerPage = 10;

  // Sort listings by zip code
  const sortListingsByZip = (listings) => {
    return [...listings].sort((a, b) => {
      const zipA = a.node?.listingFieldGroup?.zip || "";
      const zipB = b.node?.listingFieldGroup?.zip || "";

      // If both are empty, keep original order
      if (!zipA && !zipB) return 0;
      // If only A is empty, put it at the end
      if (!zipA) return 1;
      // If only B is empty, put it at the end
      if (!zipB) return -1;

      // Convert to numbers if possible for numeric sorting
      const numA = parseInt(zipA, 10);
      const numB = parseInt(zipB, 10);

      // If both are valid numbers, sort numerically
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }

      // Otherwise, sort alphabetically
      return zipA.localeCompare(zipB);
    });
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
    if (!searchResults || searchResults.length === 0) return [];
    const startIndex = (searchCurrentPage - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    return searchResults.slice(startIndex, endIndex);
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

  // Search function to filter listings locally
  const handleSearch = () => {
    if (!search.trim()) {
      // If search is empty, clear search and show original data
      clearSearch();
      return;
    }

    setFiltering(true);
    setIsSearching(true);

    try {
      const searchTerm = search.toLowerCase().trim();

      // Filter listings based on search term
      const filteredListings = allListings.filter((edge) => {
        const node = edge.node;
        const listingFieldGroup = node.listingFieldGroup || {};

        // Search in multiple fields
        const title = (node.title || "").toLowerCase();
        const subtitle = (listingFieldGroup.subtitle || "").toLowerCase();
        const description = (listingFieldGroup.description || "").toLowerCase();
        const subcategory = (listingFieldGroup.subcategory || "").toLowerCase();
        const city = (listingFieldGroup.city || "").toLowerCase();
        const zip = (listingFieldGroup.zip || "").toLowerCase();
        const street = (listingFieldGroup.street || "").toLowerCase();

        // Check if search term matches any field
        return (
          title.includes(searchTerm) ||
          subtitle.includes(searchTerm) ||
          description.includes(searchTerm) ||
          subcategory.includes(searchTerm) ||
          city.includes(searchTerm) ||
          zip.includes(searchTerm) ||
          street.includes(searchTerm)
        );
      });

      // Sort filtered results by zip code
      const sortedResults = sortListingsByZip(filteredListings);
      setSearchResults(sortedResults);
      setSearchCurrentPage(1);
    } catch (err) {
      console.error("Search error:", err);
      setError("Fehler beim Suchen.");
    } finally {
      setFiltering(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setIsSearching(false);
    setSearchResults([]);
    setSearchCurrentPage(1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetAusflugszielePages();
        console.log("apiData 222222222", apiData);
        setCookieData(apiData);
        // Store all listings in state, sorted by zip code
        const listings = apiData.data.listings.edges || [];
        const sortedListings = sortListingsByZip(listings);
        setAllListings(sortedListings);
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
    ? Math.ceil((searchResults?.length || 0) / listingsPerPage)
    : getTotalPages();
  const activePage = isSearching ? searchCurrentPage : currentPage;
  const totalListings = isSearching
    ? searchResults?.length || 0
    : allListings.length;

  return (
    <div className="mx-auto">
      {/* <div className="mb-4 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center">
        <Typography
          variant="h4"
          className="archive__page_title font-bold text-center text-[#FFF]"
        >
          {title}
        </Typography>
      </div> */}
      <div className="w-full relative flex items-center justify-center mb-3">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/Ausflugsziele.jpg"
          imageAlt="ausflugsziele"
        />
      </div>

      {/* Checkbox */}
      {/* <div className="flex items-center justify-end mb-4">
        <Checkbox
          color="red"
          checked={onlyHeadings}
          onChange={(e) => setOnlyHeadings(e.target.checked)}
          label="ausschließlich Überschriften anzeigen"
          crossOrigin={undefined} // needed for React strict mode
        />
      </div> */}

      {/* Description */}
      <Typography
        variant="paragraph"
        className="archive__page_description leading-relaxed font-bold mb-6"
      >
        Entdecke die Vielfalt Ungarns! Ob Zoos, Freizeitparks, Museen oder
        Schwimmbäder – hier findest du 840 spannende Ausflugsziele, die nur
        darauf warten, von dir erkundet zu werden. Stöbere, plane und lass dich
        inspirieren für dein nächstes Abenteuer in Ungarn!
      </Typography>

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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            crossOrigin={undefined}
            className={filtering ? "opacity-70" : ""}
          />
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

      {/* Search results info */}
      {isSearching && searchResults.length > 0 && (
        <Typography variant="small" className="text-gray-600 mb-4">
          {searchResults.length} Ergebnis
          {searchResults.length !== 1 ? "se" : ""} gefunden
        </Typography>
      )}

      {isSearching && searchResults.length === 0 && !filtering && (
        <Typography variant="small" className="text-gray-500 mb-4">
          Keine Ergebnisse gefunden. Bitte versuchen Sie einen anderen
          Suchbegriff.
        </Typography>
      )}

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        {isSearching ? (
          <></>
        ) : (
          <>
            Seite {activePage} von {totalPages} - Insgesamt {totalListings}{" "}
            Beiträge - Angezeigt werden {displayListings?.length || 0} Beiträge.
          </>
        )}
      </Typography>
      <div
        className="py-6 max-w-5xl overflow-auto mx-auto"
        // style={{ height: "calc(100vh - 450px)" }}
      >
        {filtering === true ? (
          <div>
            <DefaultSpinner />
          </div>
        ) : (
          <>
            {isSearching && (!searchResults || searchResults.length === 0) ? (
              <div className="text-center py-8"></div>
            ) : (
              displayListings?.map((edge, idx) => {
                return (
                  <div className="relative" key={edge.node.id}>
                    <CustomPost
                      title={edge.node?.title}
                      subtitle={edge.node.listingFieldGroup?.subtitle}
                      subcategory={edge.node.listingFieldGroup?.subcategory}
                      description={edge.node.listingFieldGroup?.description}
                      listingFieldGroup={edge.node.listingFieldGroup}
                      onlyHeadings={onlyHeadings}
                      slug={edge.node.slug}
                      routePrefix="ausflugsziele"
                    />
                    {/* Divider except last */}
                    {!onlyHeadings && idx < displayListings?.length - 1 && (
                      <hr className="my-6 border-gray-300" />
                    )}
                  </div>
                );
              })
            )}

            {/* Numbered Pagination - Only show if not searching with empty results and more than 1 page */}
            {!(isSearching && (!searchResults || searchResults.length === 0)) &&
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

export default AusflugszielePage;
