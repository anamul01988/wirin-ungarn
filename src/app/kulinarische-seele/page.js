import KulinarischeComponent from "./KulinarischeComponent";
import { GetKulinarischeSeelePages } from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const data = await GetKulinarischeSeelePages(1);
    const pageData = data?.data?.pages?.nodes?.[0];
    const seo = pageData?.seo;

    return {
      title: seo?.title || pageData?.title || "Kulinarische Seele",
      description:
        seo?.metaDesc || "Ungarns kulinarische Seele - Wir in Ungarn",
      openGraph: {
        title:
          seo?.opengraphTitle ||
          seo?.title ||
          pageData?.title ||
          "Kulinarische Seele",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Ungarns kulinarische Seele - Wir in Ungarn",
        url: "https://wir-in-ungarn.hu/kulinarische-seele",
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
          "Kulinarische Seele",
        description:
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          "Ungarns kulinarische Seele - Wir in Ungarn",
      },
      alternates: {
        canonical: "https://wir-in-ungarn.hu/kulinarische-seele",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Kulinarische Seele",
      description: "Ungarns kulinarische Seele - Wir in Ungarn",
    };
  }
}

export default function Page() {
  return (
    <>
      <KulinarischeComponent />
    </>
  );
}
