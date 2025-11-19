import { notFound } from "next/navigation";
import { GetCookiesPages } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";

export default async function CookieModal() {
  try {
    const data = await GetCookiesPages();
    
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
    console.error("Error fetching cookie content:", error);
    return notFound();
  }
}
