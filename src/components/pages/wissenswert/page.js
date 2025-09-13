"use client";
import { useState, useEffect } from "react";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { articles } from "@/lib/utils/utils";
import ArticleCard from "@/components/ui/ArticleCard"; // Ensure the correct path
import { useRouter } from "next/navigation";

export default function Wissenswert({ apiData }) {
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const route = useRouter();

  // Initialize filtered posts when component mounts or apiData changes
  useEffect(() => {
    if (apiData?.apiData?.data?.posts?.nodes) {
      setFilteredPosts(apiData.apiData.data.posts.nodes);
      setTotalPosts(apiData.apiData.data.posts.nodes.length);
    }
  }, [apiData]);

  // Reset to all posts when search is cleared
  useEffect(() => {
    if (search === "" && apiData?.apiData?.data?.posts?.nodes) {
      setFilteredPosts(apiData.apiData.data.posts.nodes);
    }
  }, [search, apiData]);

  // Handle search functionality
  const handleSearch = () => {
    if (!apiData?.apiData?.data?.posts?.nodes) return;

    const searchTerm = search.toLowerCase().trim();
    if (!searchTerm) {
      // If search is empty, show all posts
      setFilteredPosts(apiData.apiData.data.posts.nodes);
      setTotalPosts(apiData.apiData.data.posts.nodes.length);
      return;
    }

    // Filter posts based on search term in title and excerpt
    const filtered = apiData.apiData.data.posts.nodes.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const excerpt = post.excerpt?.toLowerCase() || "";
      const content = post.postContent?.introText?.toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        excerpt.includes(searchTerm) ||
        content.includes(searchTerm)
      );
    });

    setFilteredPosts(filtered);
    setTotalPosts(apiData.apiData.data.posts.nodes.length); // Keep total count the same
  };
  return (
    <>
      <div className="mb-4">
        <button
          onClick={() => route.push("/")}
          className="absolute top-4 left-4 flex items-center justify-center text-blue-700 hover:text-blue-900 p-1 z-10"
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      {/* Header */}
      <div className="bg-red-600 text-white py-3 px-4 mb-6">
        <Typography variant="h5" className="font-bold text-center">
          Wissenswert – Die Übersicht
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
          <div className="relative flex-1">
            <Input
              type="text"
              label="Suche..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // If search is cleared, reset to show all posts immediately
                if (
                  e.target.value === "" &&
                  apiData?.apiData?.data?.posts?.nodes
                ) {
                  setFilteredPosts(apiData.apiData.data.posts.nodes);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              crossOrigin={undefined}
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  if (apiData?.apiData?.data?.posts?.nodes) {
                    setFilteredPosts(apiData.apiData.data.posts.nodes);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <Button color="red" onClick={handleSearch}>
            SUCHE
          </Button>
        </div>
      </div>

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        Angezeigt werden {filteredPosts.length} von {totalPosts} Beiträgen.
      </Typography>

      <div className="p-6 max-w-5xl mx-auto">
        {apiData ? (
          <>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id}>
                  <ArticleCard
                    image={post.featuredImage.node.sourceUrl}
                    title={post.title}
                    description={post.excerpt}
                    slug={post.slug}
                  />
                  {post.id < filteredPosts.length - 1 && (
                    <hr className="my-6 border-gray-300" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <Typography variant="h6" color="red">
                  Keine Ergebnisse gefunden
                </Typography>
                <Typography variant="paragraph" color="gray" className="mt-2">
                  Bitte versuchen Sie es mit einem anderen Suchbegriff.
                </Typography>
              </div>
            )}
          </>
        ) : (
          <>
            {articles?.map((item, idx) => (
              <div key={item.id}>
                <ArticleCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
                {/* Divider except last */}
                {idx < articles.length - 1 && (
                  <hr className="my-6 border-gray-300" />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
