"use client";
import React, { useEffect, useState, useRef } from "react";
import { SearchAllPosts, GetAllSprachkursPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import algoliasearch from "algoliasearch/lite";
import CustomPost from "@/components/ui/CustomPost";
const SprachkursPage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [customPosts, setCustomPosts] = useState({});
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
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    endCursor: null,
  });
  const [searchPageInfo, setSearchPageInfo] = useState({
    hasNextPage: false,
    endCursor: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [pageHistory, setPageHistory] = useState([]); // Store page history for navigation
  const [searchPageHistory, setSearchPageHistory] = useState([]); // Store search page history

  const loadPage = async (direction) => {
    if (loadingPage) return;

    setLoadingPage(true);
    try {
      let cursor = null;
      let newPage = isSearching ? searchCurrentPage : currentPage;
      let currentPageInfo = isSearching ? searchPageInfo : pageInfo;
      let currentHistory = isSearching ? searchPageHistory : pageHistory;

      if (direction === "next") {
        cursor = currentPageInfo.endCursor;
        newPage = (isSearching ? searchCurrentPage : currentPage) + 1;
        // Store current page in history
        if (isSearching) {
          setSearchPageHistory((prev) => [
            ...prev,
            { page: searchCurrentPage, cursor: searchPageInfo.endCursor },
          ]);
        } else {
          setPageHistory((prev) => [
            ...prev,
            { page: currentPage, cursor: pageInfo.endCursor },
          ]);
        }
      } else if (direction === "previous") {
        if (currentHistory.length > 0) {
          // Get the previous page from history
          const prevPage = currentHistory[currentHistory.length - 1];
          cursor = prevPage.cursor;
          newPage = prevPage.page;
          // Remove the last page from history
          if (isSearching) {
            setSearchPageHistory((prev) => prev.slice(0, -1));
          } else {
            setPageHistory((prev) => prev.slice(0, -1));
          }
        } else {
          setLoadingPage(false);
          return;
        }
      }

      let apiData;
      if (isSearching) {
        // Add post type filter to search parameters
        apiData = await SearchAllPosts(
          search,
          10,
          cursor,
          window.sprachkursPostTypeFilter
        );
      } else {
        apiData = await GetAllSprachkursPages(10, cursor);
      }

      const newPosts = isSearching
        ? apiData.data.posts
        : apiData.data.sprachkurs;

      // Replace posts instead of appending
      if (isSearching) {
        setSearchResults(newPosts);
        setSearchPageInfo(newPosts.pageInfo);
        setSearchCurrentPage(newPage);
      } else {
        setCustomPosts(newPosts);
        setPageInfo(newPosts.pageInfo);
        setCurrentPage(newPage);
      }
    } catch (err) {
      setError("Fehler beim Laden der Seite.");
    } finally {
      setLoadingPage(false);
    }
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
        // Filter results to include only Sprachkurs items
        const filteredResults = algoliaResults.filter(
          (hit) => hit.post_type_label === window.sprachkursPostTypeFilter
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
              postContentSprachlektion: {
                postContent: hit.post_excerpt || "",
              },
            },
          })),
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
        };

        setSearchResults(processedResults);
        setSearchPageInfo(processedResults.pageInfo);
      } else {
        // Fall back to the original search method with post type filter
        const apiData = await SearchAllPosts(
          search,
          10,
          null,
          window.sprachkursPostTypeFilter
        );
        setSearchResults(apiData.data.posts);
        setSearchPageInfo(apiData.data.posts.pageInfo);
      }

      setSearchCurrentPage(1);
      setSearchPageHistory([]);
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
    setSearchPageInfo({ hasNextPage: false, endCursor: null });
    setSearchCurrentPage(1);
    setSearchPageHistory([]);
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
          filters: window.sprachkursPostTypeFilter
            ? `post_type_label:"${window.sprachkursPostTypeFilter}"`
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
    window.sprachkursPostTypeFilter = "Sprachkurs";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetAllSprachkursPages();
        setCookieData(apiData);
        setCustomPosts(apiData.data.sprachkurs);
        setPageInfo(apiData.data.sprachkurs.pageInfo);
        setCurrentPage(1);
        setPageHistory([]);
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

  const { title, slug, content } = cookieData.data.pages?.nodes[0] || {};
  console.log("sprachkurs data: cookieData 2222:", customPosts);
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
          className="font-bold text-center text-[#FFD6D9]"
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
        className="text-green-800 font-bold leading-relaxed mb-6"
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
            <Typography variant="paragraph" className="text-gray-600 font-medium">
              Keine Suchergebnisse gefunden
            </Typography>
            <Typography variant="small" className="text-gray-500 mt-2">
              Versuchen Sie andere Suchbegriffe oder überprüfen Sie die Schreibweise.
            </Typography>
          </div>
        </div>
      )}

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        {isSearching ? (
          <>
            Suchergebnisse - Seite {searchCurrentPage} - Angezeigt werden{" "}
            {searchResults?.edges?.length || 0} Beiträge.
          </>
        ) : (
          <>
            Seite {currentPage} - Angezeigt werden{" "}
            {customPosts?.edges?.length || 0} Beiträge.
          </>
        )}
      </Typography>
      <div className="py-6 max-w-5xl mx-auto">
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
              (isSearching ? searchResults?.edges : customPosts?.edges)?.map(
                (edge, idx) => {
                  const posts = isSearching ? searchResults : customPosts;
                  return (
                    <div key={edge.node.id}>
                      <CustomPost
                        title={edge.node?.title}
                        image={edge.node?.featuredImage?.node?.sourceUrl}
                        description={
                          edge.node.postContentSprachlektion?.postContent
                        }
                        onlyHeadings={onlyHeadings}
                        slug={edge.node.slug}
                        routePrefix="sprachkurs"
                      />
                      {/* Divider except last */}
                      {!onlyHeadings && idx < posts?.edges?.length - 1 && (
                        <hr className="my-6 border-gray-300" />
                      )}
                    </div>
                  );
                }
              )
            )}

            {/* Pagination Buttons - Only show if not searching with empty results */}
            {!(
              isSearching &&
              (!searchResults?.edges || searchResults.edges.length === 0)
            ) && (
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  color="red"
                  onClick={() => loadPage("previous")}
                  disabled={
                    (isSearching
                      ? searchPageHistory.length === 0
                      : pageHistory.length === 0) || loadingPage
                  }
                  className="px-6 py-2"
                >
                  {loadingPage ? "Lade..." : "Previous"}
                </Button>
                <Button
                  color="red"
                  onClick={() => loadPage("next")}
                  disabled={
                    !(isSearching
                      ? searchPageInfo.hasNextPage
                      : pageInfo.hasNextPage) || loadingPage
                  }
                  className="px-6 py-2"
                >
                  {loadingPage ? "Lade..." : "Next"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SprachkursPage;
