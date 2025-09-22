"use client";
import React, { useEffect, useState } from "react";
import { GetLiedTextePages, GetShortPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
const ShortsPage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [customPosts, setCustomPosts] = useState({});
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    endCursor: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [pageHistory, setPageHistory] = useState([]); // Store page history for navigation

  const loadPage = async (direction) => {
    if (loadingPage) return;

    setLoadingPage(true);
    try {
      let cursor = null;
      let newPage = currentPage;

      if (direction === "next") {
        cursor = pageInfo.endCursor;
        newPage = currentPage + 1;
        // Store current page in history
        setPageHistory((prev) => [
          ...prev,
          { page: currentPage, cursor: pageInfo.endCursor },
        ]);
      } else if (direction === "previous") {
        if (pageHistory.length > 0) {
          // Get the previous page from history
          const prevPage = pageHistory[pageHistory.length - 1];
          cursor = prevPage.cursor;
          newPage = prevPage.page;
          // Remove the last page from history
          setPageHistory((prev) => prev.slice(0, -1));
        } else {
          setLoadingPage(false);
          return;
        }
      }

      const apiData = await GetShortPages(10, cursor);
      const newPosts = apiData.data.posts;

      // Replace posts instead of appending
      setCustomPosts(newPosts);
      setPageInfo(newPosts.pageInfo);
      setCurrentPage(newPage);
    } catch (err) {
      setError("Fehler beim Laden der Seite.");
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetShortPages();
        console.log("shorts data:", apiData.data.posts);
        console.log("shorts data: alll 222222", apiData);
        setCookieData(apiData);
        setCustomPosts(apiData.data.posts);
        setPageInfo(apiData.data.posts.pageInfo);
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
  // if (!cookieData || !cookieData.data || !cookieData.data.page)
  //   return <div>Keine Cookie-Daten gefunden.</div>;
  console.log("shorts data: cookieData 2222:", customPosts);
  const { title, content } = cookieData.data.pages?.nodes[0] || {};

  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      {/* Header */}
      <div className="bg-red-600 text-white py-3 px-4 mb-6">
        <Typography variant="h5" className="font-bold text-center">
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
          <Button
            color="red"
            onClick={async () => {
              setFiltering(true);
              try {
                // For now, just reload all posts - search functionality can be added later
                const apiData = await GetShortPages();
                setCustomPosts(apiData.data.posts);
                setPageInfo(apiData.data.posts.pageInfo);
                setCurrentPage(1);
                setPageHistory([]);
              } catch (err) {
                setError("Fehler beim Suchen.");
              } finally {
                setFiltering(false);
              }
            }}
          >
            SUCHE
          </Button>
        </div>
      </div>

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        Seite {currentPage} - Angezeigt werden {customPosts?.edges?.length || 0}{" "}
        Beiträge.
      </Typography>
      <div className="p-6 max-w-5xl mx-auto">
        {filtering === true ? (
          <div>
            <DefaultSpinner />
          </div>
        ) : (
          <>
            {customPosts?.edges?.map((edge, idx) => (
              <div key={edge.node.id}>
                <CustomPost
                  title={edge.node?.title}
                  description={edge.node.postContentLyrik?.introText}
                  onlyHeadings={onlyHeadings}
                  slug={edge.node.slug}
                  routePrefix="shorts"
                />
                {/* Divider except last */}
                {!onlyHeadings && idx < customPosts?.edges?.length - 1 && (
                  <hr className="my-6 border-gray-300" />
                )}
              </div>
            ))}

            {/* Pagination Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                color="red"
                onClick={() => loadPage("previous")}
                disabled={pageHistory.length === 0 || loadingPage}
                className="px-6 py-2"
              >
                {loadingPage ? "Lade..." : "Vorherige"}
              </Button>
              <Button
                color="red"
                onClick={() => loadPage("next")}
                disabled={!pageInfo.hasNextPage || loadingPage}
                className="px-6 py-2"
              >
                {loadingPage ? "Lade..." : "Nächste"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShortsPage;
