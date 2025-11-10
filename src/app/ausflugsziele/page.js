import AusflugszieleComponent from "./AusflugszieleComponent";
import { GetAusflugszielePages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetAusflugszielePages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;

    return {
      title: seo?.title || pageData?.title || "Ausflugsziele",
      description: seo?.metaDesc || "Ausflugsziele - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "Ausflugsziele",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Ausflugsziele - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/ausflugsziele",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "Ausflugsziele",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Ausflugsziele - Wir in Ungarn",
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/ausflugsziele",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Ausflugsziele",
      description: "Ausflugsziele - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <AusflugszieleComponent />
    </>
  );
}
