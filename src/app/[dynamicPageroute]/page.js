import { notFound } from "next/navigation";
import { GetDynamicContent } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";
// import DialogContent from "@/components/DialogContent"; // client component

export default async function DynamicPage({ params }) {
  const { dynamicPageroute } = params;

  try {
    const contentData = await GetDynamicContent(dynamicPageroute);

    if (!contentData) {
      notFound();
    }
    // console.log("contentData 222222222", contentData);
    // Handle post content
    if (contentData.type === "post") {
      const { title, content, featuredImage } = contentData.data.data.post;
      const imageUrl = featuredImage?.node?.sourceUrl || null;

      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={content}
            imageFeature={imageUrl}
          />
        </div>
      );
    }

    // Handle page content
    if (contentData.type === "page") {
      const { title, content } = contentData.data.data.page;

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
