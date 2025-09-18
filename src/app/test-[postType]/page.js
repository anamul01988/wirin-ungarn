import { getAllCustomPostTypePosts } from "@/lib/getAllPages";
import { notFound } from "next/navigation";

export default async function TestPostType({ params }) {
  const { postType } = params;

  try {
    const result = await getAllCustomPostTypePosts(postType, { first: 10 });

    if (!result.success) {
      return (
        <div className="min-h-screen p-8 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Error Testing {postType}</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
              <p className="text-red-700">{result.error}</p>
            </div>
          </div>
        </div>
      );
    }

    const posts = result.data?.nodes || [];

    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Testing {postType}</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Found {posts.length} posts
            </h2>
            
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
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
                        {post.excerpt.replace(/<[^>]*>/g, '')}
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
            ) : (
              <p className="text-gray-600">No posts found for this post type.</p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error testing ${postType}:`, error);
    notFound();
  }
}
