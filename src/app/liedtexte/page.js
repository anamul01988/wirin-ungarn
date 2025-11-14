import LiedtexteComponent from "./LiedtexteComponent";
import { GetLiedTextePages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetLiedTextePages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "Liedtexte",
      description: seo?.metaDesc || "Liedtexte - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Liedtexte",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Liedtexte - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/liedtexte",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Liedtexte",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Liedtexte",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Liedtexte - Wir in Ungarn",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/liedtexte",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Liedtexte",
      description: "Liedtexte - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <LiedtexteComponent />
    </>
  );
}
