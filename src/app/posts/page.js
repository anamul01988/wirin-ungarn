
import { notFound } from "next/navigation";
import { GetAllPosts } from "@/lib/getAllPages";
import PostList from "@/components/_components/PostList";

export default async function PostPage() {
  try {
    const apiData = await GetAllPosts();

    if (!apiData?.data?.posts?.nodes || apiData.data.posts.nodes.length === 0) {
      notFound();
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <PostList apiData={apiData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    notFound();
  }
}
