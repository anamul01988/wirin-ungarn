import { notFound } from "next/navigation";
import DialogContent from "@/components/_components/DialogContent";
import { GET_SINGLE_POST } from "../../../../graphql/queries";
import { BASE_URL } from "@/lib/routes";

export default async function PostPage({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_SINGLE_POST,
        variables: { id: slug },
      }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const apiData = await res.json();

    console.log('78888888888',apiData);
    

    if (!apiData?.data?.post) {
      notFound();
    }

    const { title, content, featuredImage } = apiData.data.post;

    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent title={title} content={content} imageFeature={featuredImage.node.sourceUrl} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
