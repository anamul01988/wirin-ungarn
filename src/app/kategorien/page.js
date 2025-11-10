import KategorienComponent from "./KategorienComponent";
import { GetKategorienPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetKategorienPages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;

    return {
      title: seo?.title || pageData?.title || "Kategorien",
      description: seo?.metaDesc || "Kategorien - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Kategorien",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Kategorien - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/kategorien",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Kategorien",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Kategorien - Wir in Ungarn",
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/kategorien",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Kategorien",
      description: "Kategorien - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <KategorienComponent />
    </>
  );
}
