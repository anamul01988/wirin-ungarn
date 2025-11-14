import { GetAllKnowledges } from "@/lib/getAllPages";
import KurzKnappComponent from "./KurzKnappComponent";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetAllKnowledges(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "kurz & knapp",
      description:
        seo?.metaDesc || "kurz & knapp - Dein Ungarn-Auswanderer-Portal",
      openGraph: {
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "kurz & knapp",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "kurz & knapp - Dein Ungarn-Auswanderer-Portal",
        url: "https://wir-in-ungarn.hu/kurz-und-knapp",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "kurz & knapp",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "kurz & knapp",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "kurz & knapp - Dein Ungarn-Auswanderer-Portal",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/kurz-und-knapp",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "kurz & knapp",
      description: "kurz & knapp - Dein Ungarn-Auswanderer-Portal",
    };
  }
}

export default function Page() {
  return (
    <>
      <KurzKnappComponent />
    </>
  );
}
