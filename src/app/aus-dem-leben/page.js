import { GetAllAusDemLebens } from "@/lib/getAllPages";
import AusDemLebenComponent from "./AusDemLebenComponent";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetAllAusDemLebens(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "aus dem Leben",
      description:
        seo?.metaDesc ||
        "Alltagsungarisch lernen mit echten Beispielen & Bildern | Dein Ungarn-Auswanderer-Portal",
      openGraph: {
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "aus dem Leben",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Ungarisch einfach lernen: Lebensnahe Erklärungen zu Sprache und Grammatik mit echten Alltagsbeispielen – für schnelle Lernerfolge und mehr Sprachgefühl!",
        url: "https://wir-in-ungarn.hu/aus-dem-leben",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "aus dem Leben",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "aus dem Leben",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Ungarisch einfach lernen: Lebensnahe Erklärungen zu Sprache und Grammatik mit echten Alltagsbeispielen – für schnelle Lernerfolge und mehr Sprachgefühl!",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/aus-dem-leben",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "aus dem Leben",
      description:
        "Alltagsungarisch lernen mit echten Beispielen & Bildern | Dein Ungarn-Auswanderer-Portal",
    };
  }
}

export default function Page() {
  return (
    <>
      <AusDemLebenComponent />
    </>
  );
}
