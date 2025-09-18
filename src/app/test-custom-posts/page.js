import {
  getAllCustomPostTypes,
  getAllCustomPostTypePosts,
  getAllLiedtextePosts,
  getAllSprachkursPosts,
} from "@/lib/getAllPages";

export default async function TestCustomPosts() {
  // Get all available custom post types
  const customPostTypes = await getAllCustomPostTypes();
  console.log("customPostTypes:", customPostTypes);

  // Test the confirmed working custom post types using specific functions
  const postTypesWithCounts = [];

  // Test liedtexte
  try {
    console.log("Testing liedtexte...");
    const liedtexteResult = await getAllLiedtextePosts({ first: 1 });
    postTypesWithCounts.push({
      name: "liedtexte",
      available: liedtexteResult.success,
      hasPosts:
        liedtexteResult.success && liedtexteResult.data?.nodes?.length > 0,
      error: liedtexteResult.error,
    });
  } catch (error) {
    console.error("Error testing liedtexte:", error);
    postTypesWithCounts.push({
      name: "liedtexte",
      available: false,
      hasPosts: false,
      error: error.message,
    });
  }

  // Test sprachkurs
  try {
    console.log("Testing sprachkurs...");
    const sprachkursResult = await getAllSprachkursPosts({ first: 1 });
    postTypesWithCounts.push({
      name: "sprachkurs",
      available: sprachkursResult.success,
      hasPosts:
        sprachkursResult.success && sprachkursResult.data?.nodes?.length > 0,
      error: sprachkursResult.error,
    });
  } catch (error) {
    console.error("Error testing sprachkurs:", error);
    postTypesWithCounts.push({
      name: "sprachkurs",
      available: false,
      hasPosts: false,
      error: error.message,
    });
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Custom Post Types Test</h1>

        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Available Custom Post Types ({customPostTypes.length})
            </h2>
            {customPostTypes.length > 0 ? (
              <div className="space-y-2">
                {customPostTypes.map((postType) => (
                  <div
                    key={postType}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <span className="font-medium">{postType}</span>
                    <a
                      href={`/${postType}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Posts
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-red-600 p-4 bg-red-50 rounded">
                No custom post types found. Check the console for errors.
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Post Types with Status ({postTypesWithCounts.length})
            </h2>
            {postTypesWithCounts.length > 0 ? (
              <div className="space-y-2">
                {postTypesWithCounts.map(
                  ({ name, available, hasPosts, error }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <span className="font-medium">{name}</span>
                        <div className="text-sm text-gray-600">
                          {available ? (
                            hasPosts ? (
                              "✅ Available with posts"
                            ) : (
                              "⚠️ Available but no posts"
                            )
                          ) : (
                            <span className="text-red-600">
                              ❌ Not available
                            </span>
                          )}
                          {error && (
                            <span className="text-red-500 ml-2">({error})</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-yellow-600 p-4 bg-yellow-50 rounded">
                No post types tested yet. This might be due to server timeouts.
              </div>
            )}
          </div>

          {/* Simple test links */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Test Individual Post Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customPostTypes.map((postType) => (
                <div key={postType} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{postType}</h3>
                  <div className="space-y-2">
                    <a
                      href={`/${postType}`}
                      className="block text-blue-600 hover:text-blue-800 underline"
                    >
                      View {postType} posts
                    </a>
                    <a
                      href={`/test-${postType}`}
                      className="block text-green-600 hover:text-green-800 underline"
                    >
                      Test {postType} API
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
