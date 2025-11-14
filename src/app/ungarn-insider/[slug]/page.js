import { notFound } from "next/navigation";
import { GetkulinarischeSinglePostBySlug } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";
export default async function kulinarischeSinglePage({ params }) {
  const { slug } = await params;

  try {
    const contentData = await GetkulinarischeSinglePostBySlug(slug);
    // console.log("contentData 222222222", contentData);
    if (!contentData) {
      console.log("No content data, calling notFound()");
      notFound();
    }

    // Handle post content
    if (contentData?.type === "post") {
      console.log("Processing as post type");
      const { title, featuredImage, postContentRecipe } =
        contentData?.data.data.recipe;
      const imageUrl = featuredImage?.node?.sourceUrl || null;

      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={postContentRecipe}
            imageFeature={imageUrl}
            contentType="kulinarische-seele"
          />
        </div>
      );
    }

    // Handle page content
    if (contentData?.type === "page") {
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
