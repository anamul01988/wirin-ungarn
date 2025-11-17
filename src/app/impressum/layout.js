import HomePageLayout from "@/components/_components/HomePageLayout";
import { GetImpressumPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetImpressumPages();
    const pageData = data?.data?.page;
    const seo = pageData?.seo;
    const featuredImage =
      pageData?.featuredImage?.node?.sourceUrl || "/assets/WIU-logo.png";

    return {
      title: seo?.title || pageData?.title || "Impressum",
      description: seo?.metaDesc || "Impressum - Wir in Ungarn",
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || pageData?.title || "Impressum",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Impressum - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/impressum",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: seo?.title || pageData?.title || "Impressum",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.opengraphTitle || seo?.title || pageData?.title || "Impressum",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Impressum - Wir in Ungarn",
        images: [featuredImage],
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/impressum",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Impressum",
      description: "Impressum - Wir in Ungarn",
    };
  }
}

export default function CommonLayout({ children }) {
   return (
      <>
        {children}
        <HomePageLayout />
      </>
    );
}
