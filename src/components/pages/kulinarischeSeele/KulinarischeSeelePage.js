"use client";
import React, { useEffect, useState, useRef } from "react";
import { GetKulinarischeSeelePages, SearchAllPosts } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import algoliasearch from "algoliasearch/lite";
import CustomPost from "@/components/ui/CustomPost";
const KulinarischeSeelePage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]); // Store all recipes
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
  const recipesPerPage = 10;

  // Get current recipes to display based on pagination
  const getCurrentRecipes = () => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    return allRecipes.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const getTotalPages = () => {
    return Math.ceil(allRecipes.length / recipesPerPage);
  };

  // Get current search results to display based on pagination
  const getCurrentSearchResults = () => {
    if (!searchResults?.edges) return [];
    const startIndex = (searchCurrentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    return searchResults.edges.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (isSearching) {
      setSearchCurrentPage(pageNumber);
    } else {
      setCurrentPage(pageNumber);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        // Filter results to include only Recipes items
        const filteredResults = algoliaResults.filter(
          (hit) =>
            hit.post_type_label === window.kulinarischeSeelePostTypeFilter
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
              featuredImage: {
                node: {
                  sourceUrl: hit.featured_image_url || "",
                  altText: hit.post_title || "",
                },
              },
              postContentRecipe: {
                introText: hit.post_excerpt || "",
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
          window.kulinarischeSeelePostTypeFilter
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
          ],
          attributesToHighlight: ["post_title", "post_excerpt"],
          highlightPreTag: "<strong>",
          highlightPostTag: "</strong>",
          filters: window.kulinarischeSeelePostTypeFilter
            ? `post_type_label:"${window.kulinarischeSeelePostTypeFilter}"`
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
    window.kulinarischeSeelePostTypeFilter = "Recipes";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetKulinarischeSeelePages();
        console.log("shorts data:", apiData.data.posts);
        console.log("shorts data: alll 222222", apiData);
        setCookieData(apiData);
        // Store all recipes in state
        setAllRecipes(apiData.data.recipes.edges || []);
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
  
  console.log("shorts data: allRecipes:", allRecipes);
  const { title, content } = cookieData.data.pages?.nodes[0] || {};
  
  // Get recipes to display
  const displayRecipes = isSearching ? getCurrentSearchResults() : getCurrentRecipes();
  const totalPages = isSearching ? Math.ceil((searchResults?.edges?.length || 0) / recipesPerPage) : getTotalPages();
  const activePage = isSearching ? searchCurrentPage : currentPage;
  const totalRecipes = isSearching ? (searchResults?.edges?.length || 0) : allRecipes.length;

  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      {/* Header */}
      <div className="mb-4 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center">
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
      >
        Auf dieser Übersichtsseite findest du alle Artikel, die die
        verschiedenen Auswanderer-Themen im Detail behandeln. Du kannst gerne
        durch die Beiträge stöbern oder die Filterfunktion nutzen, um gezielt
        nach bestimmten Inhalten zu suchen.
      </Typography>

      {/* Search Box */}
      <div className="mb-6">
        <Typography variant="small" className="font-medium mb-2">
          Diese Seite durchsuchen
        </Typography>
        <div className="flex lg:flex-nowrap md:flex-wrap gap-5">
          <div className="relative w-full">
            <Input
              type="text"
              label="Suche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              crossOrigin={undefined}
              className={algoliaSearching ? "opacity-70" : ""}
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                title="Suche löschen"
              >
                ✕
              </button>
            )}
            {algoliaSearching && (
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

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
        <div className="border rounded-md mb-4 bg-gray-50">
          <div className="p-3 border-b bg-gray-100">
            <Typography variant="small" className="font-bold">
              {algoliaResults.length} schnelle Suchergebnisse gefunden
            </Typography>
          </div>
          <ul className="divide-y">
            {algoliaResults.slice(0, 5).map((hit) => (
              <li key={hit.objectID} className="p-3 hover:bg-gray-100">
                <a href={hit.permalink} className="block">
                  <Typography
                    variant="paragraph"
                    className="font-medium text-red-600"
                    dangerouslySetInnerHTML={{
                      __html:
                        hit._highlightResult?.post_title?.value ||
                        hit.post_title,
                    }}
                  />
                  {hit._highlightResult?.post_excerpt?.value && (
                    <Typography
                      variant="small"
                      className="text-gray-600 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: hit._highlightResult.post_excerpt.value,
                      }}
                    />
                  )}
                  <Typography variant="small" className="text-gray-500 mt-1">
                    {hit.permalink}
                  </Typography>
                </a>
              </li>
            ))}
          </ul>
          {algoliaResults.length > 5 && (
            <div className="p-3 border-t bg-gray-100 text-center">
              <Typography variant="small" className="text-red-600 font-medium">
                Weitere {algoliaResults.length - 5} Ergebnisse verfügbar
              </Typography>
            </div>
          )}
        </div>
      )}

      {/* No results found message */}
      {search && algoliaResults.length === 0 && !algoliaSearching && (
        <div className="border rounded-md mb-4 bg-gray-50">
          <div className="p-4 text-center">
            <Typography
              variant="paragraph"
              className="text-gray-600 font-medium"
            >
              Keine Suchergebnisse gefunden
            </Typography>
            <Typography variant="small" className="text-gray-500 mt-2">
              Versuchen Sie andere Suchbegriffe oder überprüfen Sie die
              Schreibweise.
            </Typography>
          </div>
        </div>
      )}

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        {isSearching ? (
          <>
            Suchergebnisse - Seite {activePage} von {totalPages} - Insgesamt {totalRecipes} Beiträge - Angezeigt werden{" "}
            {displayRecipes?.length || 0} Beiträge.
          </>
        ) : (
          <>
            Seite {activePage} von {totalPages} - Insgesamt {totalRecipes} Beiträge - Angezeigt werden{" "}
            {displayRecipes?.length || 0} Beiträge.
          </>
        )}
      </Typography>
      <div className="pt-6 pb-2 max-w-5xl mx-auto">
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
              displayRecipes?.map(
                (edge, idx) => {
                  return (
                    <div key={edge.node.id}>
                      <CustomPost
                        title={edge.node?.title}
                        image={edge.node?.featuredImage?.node?.sourceUrl}
                        imageAlt={edge.node?.featuredImage?.node?.altText}
                        description={edge.node.postContentRecipe?.introText}
                        onlyHeadings={onlyHeadings}
                        slug={edge.node.slug}
                        routePrefix="kulinarische-seele"
                      />
                      {/* Divider except last */}
                      {!onlyHeadings && idx < displayRecipes?.length - 1 && (
                        <hr className="my-6 border-gray-300" />
                      )}
                    </div>
                  );
                }
              )
            )}

            {/* Numbered Pagination - Only show if not searching with empty results and more than 1 page */}
            {!(
              isSearching &&
              (!searchResults?.edges || searchResults.edges.length === 0)
            ) && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-4 flex-wrap">
                {/* Previous button */}
                <Button
                  color="red"
                  variant="outlined"
                  onClick={() => handlePageChange(activePage - 1)}
                  disabled={activePage === 1}
                  className="px-4 py-2"
                >
                  &laquo;
                </Button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    (pageNum >= activePage - 2 && pageNum <= activePage + 2);
                  
                  const showEllipsis = 
                    (pageNum === activePage - 3 && activePage > 4) ||
                    (pageNum === activePage + 3 && activePage < totalPages - 3);

                  if (showEllipsis) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <Button
                      key={pageNum}
                      color="red"
                      variant={pageNum === activePage ? "filled" : "outlined"}
                      onClick={() => handlePageChange(pageNum)}
                      className="px-4 py-2 min-w-[40px]"
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                {/* Next button */}
                <Button
                  color="red"
                  variant="outlined"
                  onClick={() => handlePageChange(activePage + 1)}
                  disabled={activePage === totalPages}
                  className="px-4 py-2"
                >
                  &raquo;
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default KulinarischeSeelePage;
