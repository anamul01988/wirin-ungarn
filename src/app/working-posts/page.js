import { getAllLiedtextePosts, getAllSprachkursPosts } from "@/lib/getAllPages";

export default async function WorkingPosts() {
  // Test both confirmed working custom post types
  const [liedtexteResult, sprachkursResult] = await Promise.allSettled([
    getAllLiedtextePosts({ first: 10 }),
    getAllSprachkursPosts({ first: 10 }),
  ]);

  const liedtexte =
    liedtexteResult.status === "fulfilled"
      ? liedtexteResult.value
      : { success: false, error: "Failed to fetch" };
  const sprachkurs =
    sprachkursResult.status === "fulfilled"
      ? sprachkursResult.value
      : { success: false, error: "Failed to fetch" };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Working Custom Post Types</h1>

        <div className="grid gap-8">
          {/* Liedtexte Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Liedtexte Posts
              {liedtexte.success ? (
                <span className="text-green-600 ml-2">✅ Working</span>
              ) : (
                <span className="text-red-600 ml-2">❌ Error</span>
              )}
            </h2>

            {liedtexte.success && liedtexte.data ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Found {liedtexte.data.nodes.length} posts
                </p>
                <div className="grid gap-4">
                  {liedtexte.data.nodes.map((post) => (
                    <div
                      key={post.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <h3 className="font-semibold text-lg mb-2">
                        <a
                          href={`/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {post.title}
                        </a>
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-2">
                          {post.excerpt.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                      <div className="text-xs text-gray-500">
                        <span>Slug: {post.slug}</span>
                        {post.date && (
                          <span className="ml-4">
                            Date: {new Date(post.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-red-600 p-4 bg-red-50 rounded">
                Error: {liedtexte.error || "Failed to fetch liedtexte posts"}
              </div>
            )}
          </div>

          {/* Sprachkurs Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Sprachkurs Posts
              {sprachkurs.success ? (
                <span className="text-green-600 ml-2">✅ Working</span>
              ) : (
                <span className="text-red-600 ml-2">❌ Error</span>
              )}
            </h2>

            {sprachkurs.success && sprachkurs.data ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Found {sprachkurs.data.nodes.length} posts
                </p>
                <div className="grid gap-4">
                  {sprachkurs.data.nodes.map((post) => (
                    <div
                      key={post.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <h3 className="font-semibold text-lg mb-2">
                        <a
                          href={`/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {post.title}
                        </a>
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-2">
                          {post.excerpt.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                      <div className="text-xs text-gray-500">
                        <span>Slug: {post.slug}</span>
                        {post.date && (
                          <span className="ml-4">
                            Date: {new Date(post.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-red-600 p-4 bg-red-50 rounded">
                Error: {sprachkurs.error || "Failed to fetch sprachkurs posts"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
