import VeranstaltungenComponent from "./VeranstaltungenComponent";
import { GetListingsVeranstaltungen } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetListingsVeranstaltungen(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;

    return {
      title: seo?.title || pageData?.title || "Veranstaltungskalender",
      description: seo?.metaDesc || "Veranstaltungskalender - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "Veranstaltungskalender",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Veranstaltungskalender - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/veranstaltungen",
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
          "Veranstaltungskalender",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Veranstaltungskalender - Wir in Ungarn",
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/veranstaltungen",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Veranstaltungskalender",
      description: "Veranstaltungskalender - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <VeranstaltungenComponent />
    </>
  );
}
