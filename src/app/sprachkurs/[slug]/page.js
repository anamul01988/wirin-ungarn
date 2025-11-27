import { notFound } from "next/navigation";
import DialogContent from "@/components/_components/DialogContent";
import { GetDynamicContentV2 } from "@/lib/getAllPages";
import HistoryTracker from "@/components/_components/HistoryTracker";

export default async function SprachkursDetailsPage({ params }) {
  const { slug } = await params;

  try {
    // Use GetDynamicContentV2 with 'sprachkurs' prefix to get next/previous navigation
    const contentData = await GetDynamicContentV2(slug, "sprachkurs");

    if (!contentData || !contentData.data?.data?.post) {
      return notFound();
    }

    const sprachkursDetails = contentData.data.data.post;
    const postContent = sprachkursDetails.postContent;

    console.log("sprachkursDetails", contentData);

    return (
      <>
        <HistoryTracker />
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={sprachkursDetails.title}
            postId={sprachkursDetails?.databaseId}
            content={
              sprachkursDetails.postContentSprachlektion ||
              `<p>Content for sprachkurs: ${sprachkursDetails.title}</p>`
            }
            imageFeature={
              sprachkursDetails.featuredImage?.node?.sourceUrl || null
            }
            imageAlt={
              sprachkursDetails.featuredImage?.node?.altText ||
              sprachkursDetails.title
            }
            date={sprachkursDetails.date}
            contentType="sprachkurs"
            routePrefix="sprachkurs"
            postContent={postContent}
            nextPostSlug={contentData.nextPostSlug}
            prevPostSlug={contentData.prevPostSlug}
            nextPostTitle={contentData.nextPostTitle}
            prevPostTitle={contentData.prevPostTitle}
          />
        </div>
      </>
    );
  } catch (err) {
    console.error("Error fetching Sprachkurs:", err);
    return notFound();
  }
}
