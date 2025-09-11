import { notFound } from "next/navigation";
import { GetDynamicCookiesPages } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";
// import DialogContent from "@/components/DialogContent"; // client component

export default async function DynamicPage({ params }) {
  const { dynamicPageroute } = params;

  try {
    const apiData = await GetDynamicCookiesPages(dynamicPageroute);

    if (!apiData?.data?.page) {
      notFound();
    }

    const { title, content } = apiData.data.page;

    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Pass data into client component */}
        <DialogContent title={title} content={content} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    notFound();
  }
}
