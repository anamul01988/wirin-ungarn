import SprachkursComponent from "./SprachkursComponent";
import { GetAllSprachkursPages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetAllSprachkursPages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;

    return {
      title: seo?.title || pageData?.title || "Sprachkurs",
      description: seo?.metaDesc || "Sprachkurs - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Sprachkurs",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Sprachkurs - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/sprachkurs",
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
      },
      twitter: {
        card: "summary_large_image",
        title:
          seo?.opengraphTitle || seo?.title || pageData?.title || "Sprachkurs",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Sprachkurs - Wir in Ungarn",
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/sprachkurs",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Sprachkurs",
      description: "Sprachkurs - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <SprachkursComponent />
    </>
  );
}
