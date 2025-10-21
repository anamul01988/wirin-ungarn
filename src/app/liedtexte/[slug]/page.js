import { notFound } from "next/navigation";
import LiedTexteDialogContent from "@/components/_components/LiedTexteDialogContent";
import { GetDynamicContentV2 } from "@/lib/getAllPages";

export default async function LiedTexteDetailsPage({ params }) {
  const { slug } = await params;

  try {
    // Use GetDynamicContentV2 with 'liedtexte' prefix to get next/previous navigation
    const contentData = await GetDynamicContentV2(slug, "liedtexte");
    
    if (!contentData || !contentData.data?.data?.post) {
      return notFound();
    }

    const texteDetails = contentData.data.data.post;
    const postContent = texteDetails.postContent;

    console.log("texteDetails", texteDetails);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <LiedTexteDialogContent
          title={texteDetails.title}
          content={postContent?.liedtexteContent || texteDetails.postContentLyrik}
          imageFeature={texteDetails.featuredImage}
          contentType="liedtexte"
          routePrefix="liedtexte"
          nextPostSlug={contentData.nextPostSlug}
          prevPostSlug={contentData.prevPostSlug}
        />
      </div>
    );
  } catch (err) {
    console.error("Error fetching Liedtexte:", err);
    return notFound();
  }
}
