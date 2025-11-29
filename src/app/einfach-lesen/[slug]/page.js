import { notFound } from "next/navigation";
import { GetDynamicContentV2 } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";

export default async function EinfachDynamicPage({ params }) {
  const { slug } = await params;

  try {
    // Use GetDynamicContentV2 with 'einfach-lesen' prefix to get next/previous navigation
    const contentData = await GetDynamicContentV2(slug, "einfach-lesen");
    if (!contentData || !contentData.data?.data?.post) {
      return notFound();
    }

    const postDetails = contentData.data.data.post;
    const postContent = postDetails.postContent;

    console.log("einfach-lesen postDetails", postDetails);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent
          title={postDetails.title}
          content={postDetails.content}
          imageFeature={postDetails.featuredImage?.node?.sourceUrl || null}
          isSinglePage={true}
          contentType="einfach-lesen"
          routePrefix="einfach-lesen"
          nextPostSlug={contentData.nextPostSlug}
          prevPostSlug={contentData.prevPostSlug}
          nextPostTitle={contentData.nextPostTitle}
          prevPostTitle={contentData.prevPostTitle}
          // databaseId={postDetails.databaseId}
          customFields={postDetails?.einfachLesenFields}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching content:", error);
    notFound();
  }
}
