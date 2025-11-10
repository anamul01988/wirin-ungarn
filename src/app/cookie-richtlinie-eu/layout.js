import { GetCookiesPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetCookiesPages();
    const pageData = data?.data?.page;
    const seo = pageData?.seo;

    return {
      title: seo?.title || pageData?.title || "Cookie-Richtlinie (EU)",
      description: seo?.metaDesc || "Cookie-Richtlinie (EU) - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "Cookie-Richtlinie (EU)",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Cookie-Richtlinie (EU) - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/cookie-richtlinie-eu",
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
          "Cookie-Richtlinie (EU)",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Cookie-Richtlinie (EU) - Wir in Ungarn",
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/cookie-richtlinie-eu",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Cookie-Richtlinie (EU)",
      description: "Cookie-Richtlinie (EU) - Wir in Ungarn",
    };
  }
}

export default function CommonLayout({ children }) {
  return children;
}
