// import { redirect } from "next/navigation";

// export default async function WissenswertDynamicPage({ params }) {
//   const { slug } = params;

//   // Redirect to the root slug URL
//   redirect(`/${slug}`);
// }
// import { redirect } from "next/navigation";

// export default async function PostPage({ params }) {
//   const { slug } = params;
//   redirect(`/${slug}`);
// }

import { notFound } from "next/navigation";
import { GetWissenswertPostBySlug } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";
// import DialogContent from "@/components/DialogContent"; // client component

export default async function WissenswertDynamicPage({ params }) {
  const { slug } = await params;

  try {
    const contentData = await GetWissenswertPostBySlug(slug);
    console.log("content data333eeeee333", contentData.data?.data.post);
    if (contentData.type === "post") {
      const { title, content, featuredImage, postContent } =
        contentData.data.data.post;
      const imageUrl = featuredImage?.node?.sourceUrl || null;

      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={postContent || content || "<p>No content available.</p>"}
            imageFeature={imageUrl}
            contentType="wissenswert"
            routePrefix="wissenswert"
            currentSlug={slug}
          />
        </div>
      );
    }

    // Handle page content
    if (contentData.type === "page") {
      const { title, content } = contentData.data.page;

      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent title={title} content={content} />
        </div>
      );
    }
    notFound();
  } catch (error) {
    console.error("Error fetching content:", error);
    notFound();
  }
}
