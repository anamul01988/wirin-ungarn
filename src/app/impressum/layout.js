import { GetImpressumPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetImpressumPages();
    const pageData = data?.data?.page;
    const seo = pageData?.seo;

    return {
      title: seo?.title || pageData?.title || "Impressum",
      description: seo?.metaDesc || "Impressum - Wir in Ungarn",
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || pageData?.title || "Impressum",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Impressum - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/impressum",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.opengraphTitle || seo?.title || pageData?.title || "Impressum",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Impressum - Wir in Ungarn",
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/impressum",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Impressum",
      description: "Impressum - Wir in Ungarn",
    };
  }
}

export default function CommonLayout({ children }) {
  return children;
}
