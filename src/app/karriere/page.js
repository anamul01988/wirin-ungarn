import { notFound } from "next/navigation";
import { GetKarrierePages } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";

export default async function KarriereModal() {
  try {
    const data = await GetKarrierePages();
    
    if (!data || !data.data || !data.data.page) {
      return notFound();
    }

    const { title, content } = data.data.page;

    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent 
          title={title} 
          content={content} 
          contentType="page"
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching karriere content:", error);
    return notFound();
  }
}
