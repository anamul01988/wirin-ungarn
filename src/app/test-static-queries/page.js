import { getAllLiedtextePosts, getAllSprachkursPosts } from "@/lib/getAllPages";

export default async function TestStaticQueries() {
  console.log("Testing static queries...");

  // Test liedtexte with static query
  const liedtexteResult = await getAllLiedtextePosts({ first: 5 });
  console.log("Liedtexte result:", liedtexteResult);

  // Test sprachkurs with static query
  const sprachkursResult = await getAllSprachkursPosts({ first: 5 });
  console.log("Sprachkurs result:", sprachkursResult);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Static Query Test</h1>

        <div className="grid gap-8">
          {/* Liedtexte Results */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Liedtexte Test
              {liedtexteResult.success ? (
                <span className="text-green-600 ml-2">✅ Success</span>
              ) : (
                <span className="text-red-600 ml-2">❌ Failed</span>
              )}
            </h2>

            {liedtexteResult.success && liedtexteResult.data ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Found {liedtexteResult.data.nodes.length} posts
                </p>
                <div className="space-y-2">
                  {liedtexteResult.data.nodes.map((post) => (
                    <div key={post.id} className="p-3 bg-gray-50 rounded">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-600">
                        Slug: {post.slug} | Date: {post.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-red-600 p-4 bg-red-50 rounded">
                Error: {liedtexteResult.error}
              </div>
            )}
          </div>

          {/* Sprachkurs Results */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Sprachkurs Test
              {sprachkursResult.success ? (
                <span className="text-green-600 ml-2">✅ Success</span>
              ) : (
                <span className="text-red-600 ml-2">❌ Failed</span>
              )}
            </h2>

            {sprachkursResult.success && sprachkursResult.data ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Found {sprachkursResult.data.nodes.length} posts
                </p>
                <div className="space-y-2">
                  {sprachkursResult.data.nodes.map((post) => (
                    <div key={post.id} className="p-3 bg-gray-50 rounded">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-600">
                        Slug: {post.slug} | Date: {post.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-red-600 p-4 bg-red-50 rounded">
                Error: {sprachkursResult.error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
