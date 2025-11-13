import EinfachComponent from "./EinfachComponent";
import { GetEinFachPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetEinFachPages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "Einfach Lesen",
      description: seo?.metaDesc || "Einfach Lesen - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "Einfach Lesen",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Einfach Lesen - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/einfach-lesen",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Einfach Lesen",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "Einfach Lesen",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Einfach Lesen - Wir in Ungarn",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/einfach-lesen",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Einfach Lesen",
      description: "Einfach Lesen - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <EinfachComponent />
    </>
  );
}
