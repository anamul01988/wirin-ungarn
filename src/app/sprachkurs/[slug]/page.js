import { notFound } from "next/navigation";
import DialogContent from "@/components/_components/DialogContent";
import { GetSprachkursPages } from "@/lib/getAllPages";

export default async function SprachkursDetailsPage({ params }) {
  const { slug } = await params;

  try {
    const apiData = await GetSprachkursPages(slug);
    const sprachkursDetails = apiData?.data?.sprachkurs?.nodes?.[0] || null;

    if (!sprachkursDetails) {
      return notFound();
    }

    console.log("sprachkursDetails", sprachkursDetails);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent
          title={sprachkursDetails.title}
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
          excerpt={null}
          date={sprachkursDetails.date}
          contentType="sprachkurs"
        />
      </div>
    );
  } catch (err) {
    console.error("Error fetching Sprachkurs:", err);
    return notFound();
  }
}
