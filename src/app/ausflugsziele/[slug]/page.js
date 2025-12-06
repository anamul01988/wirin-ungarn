import { notFound } from "next/navigation";
import { GetAusflugszielePostBySlug } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";
export default async function AusflugszieleDynamicPage({ params }) {
  const { slug } = await params;

  try {
    const contentData = await GetAusflugszielePostBySlug(slug);
    if (!contentData) {
      console.log("No content data, calling notFound()");
      notFound();
    }

    // Handle post content
    if (contentData.type === "post") {
      console.log("Processing as post type");
      const { title, content } = contentData?.data.data.listing;
      const imageUrl = null; // No featuredImage in listing query

      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={content}
            imageFeature={imageUrl}
            contentType="ausflugsziele"
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
