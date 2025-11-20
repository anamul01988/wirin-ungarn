import { notFound } from "next/navigation";
import { GetKarrierePages } from "@/lib/getAllPages";
import DialogContent from "@/components/_components/DialogContent";

// Generate metadata for SEO
export async function generateMetadata() {
  const featuredImage = "/assets/WIU-logo.png";

  return {
    title: "Karriere - Wir in Ungarn",
    description: "Karrieremöglichkeiten bei Wir in Ungarn",
    openGraph: {
      title: "Karriere - Wir in Ungarn",
      description: "Karrieremöglichkeiten bei Wir in Ungarn",
      url: "https://wir-in-ungarn.hu/karriere",
      siteName: "Wir in Ungarn",
      type: "website",
      locale: "de_DE",
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: "Karriere - Wir in Ungarn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Karriere - Wir in Ungarn",
      description: "Karrieremöglichkeiten bei Wir in Ungarn",
      images: [featuredImage],
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/karriere",
    },
  };
}

export default async function KarriereModal() {
  try {
    const data = await GetKarrierePages();

    if (!data || !data.data || !data.data.page) {
      return notFound();
    }

    const { title, content } = data.data.page;

    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent title={title} content={content} contentType="page" />
      </div>
    );
  } catch (error) {
    console.error("Error fetching karriere content:", error);
    return notFound();
  }
}
