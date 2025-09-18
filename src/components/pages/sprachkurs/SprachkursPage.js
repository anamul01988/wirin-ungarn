"use client";

import { useEffect, useState } from "react";
import { GetSprachkursPages } from "@/lib/getAllPages";
import Link from "next/link";

export default function SprachkursPage() {
  const [sprachkursPosts, setSprachkursPosts] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiData = await GetSprachkursPages();
        const posts = apiData?.data?.sprachkurs?.nodes || [];
        const page = apiData?.data?.pages?.nodes?.[0] || null;

        console.log("Sprachkurs posts:", posts);
        console.log("Page data:", page);

        setSprachkursPosts(posts);
        setPageData(page);
      } catch (err) {
        console.error("Error fetching sprachkurs data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sprachkurs data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600">Failed to load sprachkurs data: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        {pageData?.title || "Sprachkurs"}
      </h1>

      {pageData?.content && (
        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
      )}

      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold mb-4">
          Available Courses ({sprachkursPosts.length})
        </h2>

        {sprachkursPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sprachkursPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.featuredImage?.node?.sourceUrl && (
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${post.featuredImage.node.sourceUrl}')`,
                    }}
                  />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    <Link
                      href={`/sprachkurs/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {post.date && (
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  )}

                  {post.content && (
                    <div
                      className="text-gray-600 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "...",
                      }}
                    />
                  )}

                  <div className="mt-4">
                    <Link
                      href={`/sprachkurs/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Course
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sprachkurs posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
