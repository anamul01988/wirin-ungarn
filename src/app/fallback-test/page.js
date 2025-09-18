export default function FallbackTest() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Simple Custom Post Type Test
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Test Individual Post Types
          </h2>
          <p className="text-gray-600 mb-6">
            Click on the links below to test individual custom post types. This
            avoids complex queries that might cause timeouts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["liedtexte", "sprachkurs"].map((postType) => (
              <div
                key={postType}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <h3 className="font-semibold mb-2 capitalize">
                  {postType.replace("-", " ")}
                </h3>
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

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Note</h3>
          <p className="text-yellow-700">
            If you're getting 508 errors, it means the GraphQL queries are too
            complex for your server. The individual test links above use simpler
            queries that should work better.
          </p>
        </div>
      </div>
    </div>
  );
}
