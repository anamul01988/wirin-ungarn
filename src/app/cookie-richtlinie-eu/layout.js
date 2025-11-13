import { GetCookiesPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetCookiesPages();
    const pageData = data?.data?.page;
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

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
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Cookie-Richtlinie (EU)",
          },
        ],
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
        images: [featuredImage],
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
