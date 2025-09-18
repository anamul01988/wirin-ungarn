import { GetSprachkursPages } from "@/lib/getAllPages";

export default async function TestSprachkurs() {
  console.log("Testing sprachkurs...");

  try {
    const apiData = await GetSprachkursPages();
    const sprachkursPosts = apiData?.data?.sprachkurs?.nodes || [];
    const pageData = apiData?.data?.pages?.nodes?.[0] || null;

    console.log("Sprachkurs API data:", apiData);
    console.log("Sprachkurs posts:", sprachkursPosts);
    console.log("Page data:", pageData);

    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Sprachkurs Test</h1>

          <div className="grid gap-8">
            {/* API Response Debug */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">
                API Response Debug
              </h2>
              <div className="bg-gray-100 p-4 rounded">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              </div>
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Sprachkurs Posts ({sprachkursPosts.length})
              </h2>

              {sprachkursPosts.length > 0 ? (
                <div className="space-y-4">
                  {sprachkursPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {post.title}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>ID:</strong> {post.id}
                        </p>
                        <p>
                          <strong>Slug:</strong> {post.slug}
                        </p>
                        <p>
                          <strong>Date:</strong> {post.date}
                        </p>
                        {post.content && (
                          <p>
                            <strong>Content:</strong>{" "}
                            {post.content.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                      <div className="mt-2">
                        <a
                          href={`/sprachkurs/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View Post
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No sprachkurs posts found.</p>
                </div>
              )}
            </div>

            {/* Page Data */}
            {pageData && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">Page Data</h2>
                <div className="space-y-2">
                  <p>
                    <strong>Title:</strong> {pageData.title}
                  </p>
                  <p>
                    <strong>Slug:</strong> {pageData.slug}
                  </p>
                  <p>
                    <strong>Status:</strong> {pageData.status}
                  </p>
                  {pageData.content && (
                    <div>
                      <p>
                        <strong>Content:</strong>
                      </p>
                      <div
                        className="prose max-w-none mt-2"
                        dangerouslySetInnerHTML={{ __html: pageData.content }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error testing sprachkurs:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">
            Failed to test sprachkurs: {error.message}
          </p>
        </div>
      </div>
    );
  }
}
