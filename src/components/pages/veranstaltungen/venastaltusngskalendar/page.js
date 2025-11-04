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
  const [customPosts, setCustomPosts] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");
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
        apiData = await SearchAllPosts(search, 10, cursor);
      } else {
        apiData = await GetListingsVeranstaltungen(10, cursor);
      }

      const newPosts = isSearching ? apiData.data.posts : apiData.data.listings;

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
      const apiData = await SearchAllPosts(search);
      setSearchResults(apiData.data.posts);
      setSearchPageInfo(apiData.data.posts.pageInfo);
      setSearchCurrentPage(1);
      setSearchPageHistory([]);
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
    setSearchPageInfo({ hasNextPage: false, endCursor: null });
    setSearchCurrentPage(1);
    setSearchPageHistory([]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetListingsVeranstaltungen();
        console.log("apiData 2221122222222111", apiData);
        setCookieData(apiData);
        setCustomPosts(apiData.data.listings);
        setPageInfo(apiData.data.listings.pageInfo);
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

  const { title, content } = cookieData.data.pages?.nodes[0] || {};
  console.log("ausflugsziele data: cookieData 2222:", customPosts);
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
                {(isSearching ? searchResults?.edges : customPosts?.edges)?.map(
                  (edge, idx) => {
                    const posts = isSearching ? searchResults : customPosts;
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
                        {!onlyHeadings && idx < posts?.edges?.length - 1 && (
                          <hr className="my-6 border-gray-300" />
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {/* Pagination Buttons - Only show if not searching with empty results */}
            {!(
              isSearching &&
              (!searchResults?.edges || searchResults.edges.length === 0)
            ) && (
              <div className="flex justify-center gap-4 mt-2">
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

export default VenastaltusngskalendarPage;
