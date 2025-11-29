"use client";
import React, { useEffect, useState, useRef } from "react";
import { GetKulinarischeSeelePages, SearchAllPosts } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import algoliasearch from "algoliasearch/lite";
import CustomPost from "@/components/ui/CustomPost";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";
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

  // Without pagination: always use full lists
  const getCurrentRecipes = () => {
    return allRecipes;
  };

  const getCurrentSearchResults = () => {
    if (!searchResults?.edges) return [];
    return searchResults.edges;
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

      // reset any pagination-related state if needed (none now)
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
    // reset any pagination-related state if needed (none now)
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
        // Store all recipes in state (no pagination)
        setAllRecipes(apiData.data.recipes.edges || []);
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

  // Get recipes to display (no pagination)
  const displayRecipes = isSearching
    ? getCurrentSearchResults()
    : getCurrentRecipes();
  const totalRecipes = isSearching
    ? searchResults?.edges?.length || 0
    : allRecipes.length;

  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      {/* Header */}
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
          imageUrl="/headlineImages/kulinarische-Seele.jpg"
          imageAlt="kulinarische Seele"
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

      {/* Description */}
      <Typography
        variant="paragraph"
        className="archive__page_description leading-relaxed font-semibold mb-6"
      >
        Willkommen zum Vermächtnis der ungarischen Küche! In unserem
        Online-Kochbuch findest du nicht einfach nur Rezepte – wir entschlüsseln
        für dich die Seele jedes einzelnen Gerichts. Wir glauben, dass
        authentischer Geschmack im Detail liegt. Deshalb bieten wir dir die
        ausführlichsten Schritt-für-Schritt-Anleitungen, die du finden wirst.
        Jedes unserer traditionellen Rezepte wird ergänzt durch die Geschichte
        und Herkunft des Gerichts, die wichtigsten Geheimtipps für die perfekte
        Zubereitung und die Warenkunde zu den entscheidenden Zutaten. Lerne mit
        uns, die Klassiker der ungarischen Hausmannskost so zu kochen, dass sie
        schmecken wie bei Oma in Ungarn.
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

      {/* Footer info without pagination */}
      <Typography variant="small" color="gray" className="mt-4">
        {isSearching ? (
          <>
            Suchergebnisse – Insgesamt {totalRecipes} Beiträge – Angezeigt
            werden {displayRecipes?.length || 0} Beiträge.
          </>
        ) : (
          <>
            Insgesamt {totalRecipes} Beiträge – Angezeigt werden{" "}
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
              displayRecipes?.map((edge, idx) => {
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
              })
            )}
          </>
        )}
      </div>

      <div>
        <hr />
      </div>

      <p className="mt-10 text-[#56646F] text-sm leading-6">
        Die ungarische Küche ist weltberühmt für ihre herzhaften Eintöpfe wie
        Gulyás und Pörkölt, deren Basis oft edelsüßes Paprikapulver aus Szeged
        oder Kalocsa bildet. Doch die kulinarische Tradition Ungarns bietet weit
        mehr als nur Hühnerpaprikasch oder Lángos. Entdecke auf unserer Seite
        die Vielfalt von deftiger Hausmannskost wie Töltött Káposzta
        (Krautwickel) bis hin zu feinsten Desserts aus der k.u.k.-Zeit wie dem
        Zserbó Szelet. Wir erklären dir die Unterschiede der Gerichte im Detail
        und geben dir die besten Traditionsrezepte an die Hand, damit jedes
        Gericht gelingt.
      </p>
    </div>
  );
};

export default KulinarischeSeelePage;
