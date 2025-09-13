"use client";
import { useState, useEffect } from "react";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import ArticleCard from "@/components/ui/ArticleCard";
import { GetAllPosts } from "@/lib/getAllPages";
import { useRouter } from "next/navigation";

export default function Wissenswert({ initialData }) {
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");
  const [apiData, setApiData] = useState({ ...initialData });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [cursors, setCursors] = useState([null]);
  const route = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const after = cursors[page];
      const data = await GetAllPosts({ first: 10, after });
      setApiData(data);

      // Storing the next page's cursor if moving forward
      const nextCursor = data?.data?.posts?.pageInfo?.endCursor;
      if (nextCursor && cursors.length === page + 1) {
        setCursors([...cursors, nextCursor]);
      }
      setLoading(false);
    }
    fetchPosts();
  }, [page]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
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
          <Input
            type="text"
            label="Suche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            crossOrigin={undefined}
          />
          <Button color="red" onClick={() => alert(`Searching for: ${search}`)}>
            SUCHE
          </Button>
        </div>
      </div>

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        Angezeigt werden 50 von 144 Beiträgen.
      </Typography>
      <div className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          apiData?.data?.posts?.nodes?.map((post, idx) => (
            <div key={post.id}>
              <ArticleCard
                image={post.featuredImage.node.sourceUrl}
                title={post.title}
                description={post.excerpt}
                slug={post.slug}
              />
              {idx < apiData?.data?.posts.nodes.length - 1 && (
                <hr className="my-6 border-gray-300" />
              )}
            </div>
          ))
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <Button
          color="red"
          disabled={page === 0 || loading}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <Button
          color="red"
          disabled={!apiData?.data?.posts?.pageInfo?.hasNextPage || loading}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}
