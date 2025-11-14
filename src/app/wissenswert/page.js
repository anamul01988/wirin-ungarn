import Wissenswert from "./Wessentwert";
import { GetWessenwertPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetWessenwertPages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "Wissenswert",
      description: seo?.metaDesc || "Wissenswert - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Wissenswert",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Wissenswert - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/wissenswert",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Wissenswert",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Wissenswert",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Wissenswert - Wir in Ungarn",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/wissenswert",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Wissenswert",
      description: "Wissenswert - Wir in Ungarn",
    };
  }
}

export default function page() {
  return (
    <>
      <Wissenswert />
    </>
  );
}
