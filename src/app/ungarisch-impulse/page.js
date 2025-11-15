import { GetAllImpulse } from "@/lib/getAllPages";
import UngarischImpulseComponent from "./UngarischImpulseComponent";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetAllImpulse(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "Ungarisch-Impulse",
      description:
        seo?.metaDesc ||
        "Entdecke spannende Ungarisch-Lektionen für A1, A2 und B1. Lass dich vom Zufall inspirieren und lerne flexibel neue Themen – ganz ohne feste Reihenfolge!",
      openGraph: {
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Ungarisch-Impulse",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Entdecke spannende Ungarisch-Lektionen für A1, A2 und B1. Lass dich vom Zufall inspirieren und lerne flexibel neue Themen – ganz ohne feste Reihenfolge!",
        url: "https://wir-in-ungarn.hu/ungarisch-impulse",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Ungarisch-Impulse",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Ungarisch-Impulse",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Entdecke spannende Ungarisch-Lektionen für A1, A2 und B1. Lass dich vom Zufall inspirieren und lerne flexibel neue Themen – ganz ohne feste Reihenfolge!",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/ungarisch-impulse",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Ungarisch-Impulse",
      description:
        "Entdecke spannende Ungarisch-Lektionen für A1, A2 und B1. Lass dich vom Zufall inspirieren und lerne flexibel neue Themen – ganz ohne feste Reihenfolge!",
    };
  }
}

export default function Page() {
  return (
    <>
      <UngarischImpulseComponent />
    </>
  );
}
