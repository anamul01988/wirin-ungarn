"use client";
import React, { useEffect, useState, useRef } from "react";
import { SearchAllPosts, GetAusflugszielePages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import algoliasearch from "algoliasearch/lite";
import CustomPost from "@/components/ui/CustomPost";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

const AusflugszielePage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [allListings, setAllListings] = useState([]); // Store all listings
  const [searchResults, setSearchResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");

  // Algolia search client
  const algoliaClient = useRef(null);
  const searchIndex = useRef(null);
  const [algoliaResults, setAlgoliaResults] = useState([]);
  const [algoliaSearching, setAlgoliaSearching] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const listingsPerPage = 10;

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
      // If we already have Algolia results, use them
      if (algoliaResults.length > 0) {
        // Filter results to include only Listings items
        const filteredResults = algoliaResults.filter(
          (hit) => hit.post_type_label === window.ausflugszielePostTypeFilter
        );

        // Create a structure compatible with your existing code
        const processedResults = {
          edges: filteredResults.map((hit) => ({
            node: {
              id: hit.objectID,
              title: hit.post_title,
              slug: hit.permalink
                ? hit.permalink.split("/").filter(Boolean).pop()
                : "",
              listingFieldGroup: {
                subtitle: hit.subtitle || "",
                description: hit.post_excerpt || "",
                subcategory: hit.subcategory || "",
              },
            },
          })),
        };

        setSearchResults(processedResults);
      } else {
        // Fall back to the original search method with post type filter
        const apiData = await SearchAllPosts(
          search,
          1000,
          null,
          window.ausflugszielePostTypeFilter
        );
        setSearchResults(apiData.data.posts);
      }

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
    setSearchResults({});
    setSearchCurrentPage(1);
    setAlgoliaResults([]);
  };

  // Algolia search with debouncing
  useEffect(() => {
    // Clear previous debounce timeout
    if (searchDebounce) {
      clearTimeout(searchDebounce);
    }

    // Skip if search is empty or search index not initialized
    if (!search.trim() || !searchIndex.current) {
      setAlgoliaResults([]);
      return;
    }

    // Set debounce timeout
    const debounceTimer = setTimeout(async () => {
      setAlgoliaSearching(true);

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
            "subtitle",
            "subcategory",
          ],
          attributesToHighlight: ["post_title", "post_excerpt"],
          highlightPreTag: "<strong>",
          highlightPostTag: "</strong>",
          filters: window.ausflugszielePostTypeFilter
            ? `post_type_label:"${window.ausflugszielePostTypeFilter}"`
            : "",
        };

        const response = await searchIndex.current.search(search, searchParams);
        console.log("Algolia search results:", response);
        setAlgoliaResults(response.hits);

        // Also use hits for the main search results when appropriate
        if (response.hits.length > 0) {
          setIsSearching(true);
        }
      } catch (error) {
        console.error("Algolia search error:", error);
      } finally {
        setAlgoliaSearching(false);
      }
    }, 300); // 300ms debounce

    setSearchDebounce(debounceTimer);

    // Cleanup timeout on component unmount
    return () => {
      if (searchDebounce) {
        clearTimeout(searchDebounce);
      }
    };
  }, [search]);

  // Initialize Algolia client with post type filter
  useEffect(() => {
    // Initialize Algolia client
    algoliaClient.current = algoliasearch(
      "4BNRIJHLXZ",
      "0707974c58f2e7c53a70e1e58eeec381"
    );
    searchIndex.current = algoliaClient.current.initIndex(
      "wp_searchable_posts"
    );

    // Store the post type filter for use in search
    window.ausflugszielePostTypeFilter = "Listings";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetAusflugszielePages();
        console.log("apiData 222222222", apiData);
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
            crossOrigin={undefined}
            className={algoliaSearching ? "opacity-70" : ""}
          />
          <Button
            color="red"
            onClick={handleSearch}
            disabled={filtering || algoliaSearching}
          >
            {filtering || algoliaSearching ? "Suche..." : "SUCHE"}
          </Button>
          {isSearching && (
            <Button color="gray" onClick={clearSearch} className="px-4 py-2">
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Algolia search results preview */}
      {search && algoliaResults.length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <Typography variant="small" className="font-semibold mb-2">
            {algoliaResults.length} schnelle Suchergebnisse gefunden
          </Typography>
          <div className="space-y-2">
            {algoliaResults.slice(0, 5).map((hit) => (
              <div
                key={hit.objectID}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  const slug = hit.permalink
                    ? hit.permalink.split("/").filter(Boolean).pop()
                    : "";
                  if (slug) {
                    window.location.href = `/ausflugsziele/${slug}`;
                  }
                }}
              >
                <Typography
                  variant="small"
                  className="font-medium text-blue-600 hover:text-blue-800"
                  dangerouslySetInnerHTML={{
                    __html:
                      hit._highlightResult?.post_title?.value || hit.post_title,
                  }}
                />
                {hit._highlightResult?.post_excerpt?.value && (
                  <Typography
                    variant="small"
                    className="text-gray-600 text-xs mt-1"
                    dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.post_excerpt.value,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {algoliaResults.length > 5 && (
            <Typography variant="small" className="text-gray-500 mt-2">
              Weitere {algoliaResults.length - 5} Ergebnisse verfügbar
            </Typography>
          )}
        </div>
      )}

      {search && algoliaResults.length === 0 && !algoliaSearching && (
        <Typography variant="small" className="text-gray-500 mb-4">
          Keine schnellen Suchergebnisse gefunden. Klicken Sie auf "SUCHE" für
          eine vollständige Suche.
        </Typography>
      )}

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
        className="py-6 max-w-5xl overflow-auto mx-auto"
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
              displayListings?.map((edge, idx) => {
                return (
                  <div className="relative" key={edge.node.id}>
                    <CustomPost
                      title={edge.node?.title}
                      subtitle={edge.node.listingFieldGroup?.subtitle}
                      subcategory={edge.node.listingFieldGroup?.subcategory}
                      description={edge.node.listingFieldGroup?.description}
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

export default AusflugszielePage;
