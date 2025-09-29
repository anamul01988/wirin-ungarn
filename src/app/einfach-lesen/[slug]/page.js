import { notFound } from "next/navigation";
import { GetEinfachLesenPostBySlug } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";
export default async function EinfachDynamicPage({ params }) {
  const { slug } = await params;

  try {
    const contentData = await GetEinfachLesenPostBySlug(slug);

    if (!contentData) {
      console.log("No content data, calling notFound()");
      notFound();
    }

    // Handle post content
    if (contentData.type === "post") {
      console.log("Processing as post type");
      const { title, content, featuredImage } =
        contentData?.data?.data.einfachLesen;
      const imageUrl = featuredImage?.node?.sourceUrl || null;

      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={content}
            imageFeature={imageUrl}
            contentType="einfach-lesen"
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
