import { notFound } from "next/navigation";
import LiedTexteDialogContent from "@/components/_components/LiedTexteDialogContent";
import { GetLiedtexteSinglePostBySlug } from "@/lib/getAllPages";

export default async function LiedTexteDetailsPage({ params }) {
  const { slug } = await params;

  try {
    const apiData = await GetLiedtexteSinglePostBySlug(slug);
    console.log("apiData 222222222", apiData);
    if (!apiData) {
      console.log("No content data, calling notFound()");
      notFound();
    }
    const texteDetails = apiData?.data?.lyrik?.nodes?.[0] || null;

    // if (!texteDetails) {
    //   return notFound();
    // }
    console.log("texteDetails", texteDetails);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LiedTexteDialogContent
          title={texteDetails.title}
          content={texteDetails.postContentLyrik}
          imageFeature={texteDetails.featuredImage}
        />
      </div>
    );
  } catch (err) {
    console.error("Error fetching Liedtexte:", err);
    return notFound();
  }
}
