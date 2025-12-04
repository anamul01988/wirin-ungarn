// venastaltusngskalendar.js"use client";
import React, { useEffect, useState } from "react";
import { GetListingsVeranstaltungen } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPostForEvent from "../CustomPostForEvent";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

// Helper function to parse DD.MM.YYYY format
const parseDateString = (dateString) => {
  if (!dateString) return null;

  // If it's already a Date object, return it
  if (dateString instanceof Date) {
    return dateString;
  }

  // Handle DD.MM.YYYY format (e.g., "28.06.2025")
  if (typeof dateString === "string") {
    // Check if it matches DD.MM.YYYY format
    const ddmmyyyyPattern = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
    const match = dateString.match(ddmmyyyyPattern);

    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // Month is 0-indexed in JavaScript
      const year = parseInt(match[3], 10);
      return new Date(year, month, day);
    }

    // Try standard Date parsing as fallback
    const parsed = new Date(dateString);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return null;
};

// Filter events to show only those within next 15 days from today
const filterEventsByDate = (events) => {
  if (!events || !Array.isArray(events)) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const fifteenDaysLater = new Date(today);
  fifteenDaysLater.setDate(today.getDate() + 15);
  fifteenDaysLater.setHours(23, 59, 59, 999); // End of 15th day

  const filtered = events.filter((edge) => {
    const timefrom = edge.node?.listingFieldGroup?.timefrom;
    if (!timefrom) return false;

    // Parse the date string (DD.MM.YYYY format)
    const eventDate = parseDateString(timefrom);

    // Check if date is valid
    if (!eventDate || isNaN(eventDate.getTime())) return false;

    // Set to start of day for comparison
    eventDate.setHours(0, 0, 0, 0);

    // Event must be today or later, and within 15 days
    return eventDate >= today && eventDate <= fifteenDaysLater;
  });

  // Sort by timefrom (earliest first)
  filtered.sort((a, b) => {
    const dateA = parseDateString(a.node?.listingFieldGroup?.timefrom);
    const dateB = parseDateString(b.node?.listingFieldGroup?.timefrom);

    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });

  return filtered;
};

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

  const handleSearch = () => {
    if (!search.trim()) {
      // If search is empty, clear search and show original data
      clearSearch();
      return;
    }

    setFiltering(true);
    setIsSearching(true);

    // Filter allListings based on search term
    const searchTerm = search.toLowerCase().trim();
    const filtered = allListings.filter((edge) => {
      const node = edge.node;
      const title = node?.title?.toLowerCase() || "";
      const description =
        node?.listingFieldGroup?.description?.toLowerCase() || "";
      const subtitle = node?.listingFieldGroup?.subtitle?.toLowerCase() || "";
      const street = node?.listingFieldGroup?.street?.toLowerCase() || "";
      const category = node?.listingFieldGroup?.category?.toLowerCase() || "";
      const subcategory =
        node?.listingFieldGroup?.subcategory?.toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        subtitle.includes(searchTerm) ||
        street.includes(searchTerm) ||
        category.includes(searchTerm) ||
        subcategory.includes(searchTerm)
      );
    });

    // Set search results in the same format as API response
    setSearchResults({ edges: filtered });
    setSearchCurrentPage(1);
    setFiltering(false);
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
        setCookieData(apiData);
        // Filter events to show only next 15 days and sort by timefrom
        const allEvents = apiData.data.listings.edges || [];
        const filteredEvents = filterEventsByDate(allEvents);
        console.log("allEvents 222222222", allEvents);
        console.log("filteredEvents 222222222", filteredEvents);
        // Store filtered listings in state
        setAllListings(filteredEvents);
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
      <div className="w-full relative flex items-center justify-center mb-3">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/Veranstaltungen.jpg"
          imageAlt="veranstaltungen"
        />
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

      <p className="text-sm text-[#56646F]">
        Diese Seite bietet dir einen Überblick über die Veranstaltungen in
        Ungarn, die innerhalb der nächsten 2 Wochen auf dem Plan stehen. Du
        kannst das nach Art der Veranstaltung und nach Region (per Postleitzahl)
        filtern. Wenn Du weiter in die Zukunft planen möchtest, findest Du alle{" "}
        <span className=" text-red-600">
          {" "}
          Events und Märkte in unserer Karte.
        </span>
        <br />
        <br />
        Du möchtest uns über weitere Termine informieren, dann schreib uns gerne
        über das <span className=" text-red-600">Kontaktformular</span>.
      </p>

      {/* Search Box */}
      <div className="mb-6">
        <Typography variant="small" className="font-medium mt-2 mb-2">
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
          <></>
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
              <div className="text-center py-8"></div>
            ) : (
              <div className="">
                {displayListings?.map((edge, idx) => {
                  return (
                    <div className="relative" key={edge.node.id}>
                      {/* <CustomPost
                        title={edge.node?.title}
                        description={edge.node.listingFieldGroup?.description}
                        onlyHeadings={onlyHeadings}
                        slug={edge.node.slug}
                        routePrefix="veranstaltungen"
                      /> */}

                      <CustomPostForEvent
                        title={edge.node?.title}
                        date={edge.node?.date}
                        subtitle={edge.node.listingFieldGroup?.subtitle}
                        street={edge.node.listingFieldGroup?.street}
                        description={edge.node.listingFieldGroup?.description}
                        category={edge.node.listingFieldGroup?.category}
                        subcategory={edge.node.listingFieldGroup?.subcategory}
                        timefrom={edge.node.listingFieldGroup?.timefrom}
                        timeto={edge.node.listingFieldGroup?.timeto}
                        slug={edge.node?.slug}
                        accentColor={idx % 2 === 0 ? "red" : "green"}
                      />
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
