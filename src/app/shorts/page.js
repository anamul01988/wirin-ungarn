import ShortsComponent from "./ShortsComponent";
import { GetShortPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetShortPages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "Shorts",
      description: seo?.metaDesc || "Shorts - Wir in Ungarn",
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || pageData?.title || "Shorts",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Shorts - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/shorts",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Shorts",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.opengraphTitle || seo?.title || pageData?.title || "Shorts",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Shorts - Wir in Ungarn",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/shorts",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Shorts",
      description: "Shorts - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <ShortsComponent />
    </>
  );
}
