import { notFound } from "next/navigation";
import { GetkreuzwortraetselSinglePostBySlug } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";
export default async function kreuzwortraetselSinglePage({ params }) {
  const { slug } = await params;

  try {
    const contentData = await GetkreuzwortraetselSinglePostBySlug(slug);
    console.log(
      "contentData 111111111 for kreuzwortraetselSinglePage",
      contentData
    );
    if (!contentData) {
      console.log("No content data, calling notFound()");
      notFound();
    }

    // Handle post content
    if (contentData?.type === "post") {
      console.log("Processing as post type");
      const { title, postContentCrosswords } = contentData?.data.data.crossword;
      // console.log("postContentCrosswords", postContentCrosswords);
      const imageUrl = null; // No featuredImage in listing query

      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={postContentCrosswords?.excerpt}
            imageFeature={imageUrl}
            contentType="kreuzwortraetsel"
            routePrefix="kreuzwortraetsel"
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
