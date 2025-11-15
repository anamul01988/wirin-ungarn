import { GetAllVerbarium, GetAllVerbariums } from "@/lib/getAllPages";
import VerbariumComponent from "./VerbariumComponent";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetAllVerbariums(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "Verbarium",
      description:
        seo?.metaDesc ||
        "Lerne die wichtigsten ungarischen Verben mit unserem interaktiven Verbarium. Verbessere deine Sprachkenntnisse und meistere die Grundlagen der ungarischen Grammatik. Jetzt entdecken!",
      openGraph: {
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Verbarium",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Lerne die wichtigsten ungarischen Verben mit unserem interaktiven Verbarium. Verbessere deine Sprachkenntnisse und meistere die Grundlagen der ungarischen Grammatik. Jetzt entdecken!",
        url: "https://wir-in-ungarn.hu/verbarium",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Verbarium",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Verbarium",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Lerne die wichtigsten ungarischen Verben mit unserem interaktiven Verbarium. Verbessere deine Sprachkenntnisse und meistere die Grundlagen der ungarischen Grammatik. Jetzt entdecken!",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/verbarium",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Verbarium",
      description:
        "Lerne die wichtigsten ungarischen Verben mit unserem interaktiven Verbarium. Verbessere deine Sprachkenntnisse und meistere die Grundlagen der ungarischen Grammatik. Jetzt entdecken!",
    };
  }
}

export default function Page() {
  return (
    <>
      <VerbariumComponent />
    </>
  );
}
