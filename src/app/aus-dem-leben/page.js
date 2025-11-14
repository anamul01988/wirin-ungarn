import AusDemLebenComponent from "./AusDemLebenComponent";
import {GetAllAusDemLebens} from "@/lib/getAllPages";

// Generate metadata for SEO
export async function generateMetadata() {
  try {
    const res = await GetAllAusDemLebens(1);

    // Debug: check the returned shape (remove this log after verifying)
    console.log("GetAllAusDemLebens response:", res);

    // Expected shape: { data: { ausDemLebens: { nodes: [ ... ] } } }
    const node = res?.data?.ausDemLebens?.nodes?.[0] ?? null;

    // If node is still null, fallback to safe defaults
    const seo = node?.seo ?? null;

    const featuredImage =
      node?.featuredImage?.node?.sourceUrl ?? "/assets/WIU-logo.png";

    const title = seo?.title ?? node?.title ?? "Aus dem Leben";
    const description =
      seo?.metaDesc ??
      (node?.content
        ? // strip HTML and truncate
          node.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 140)
        : "Aus dem Leben - Wir in Ungarn");

    const openGraphTitle =
      seo?.opengraphTitle ?? seo?.title ?? node?.title ?? title;
    const openGraphDescription =
      seo?.opengraphDescription ?? seo?.metaDesc ?? description;

    const slug = node?.slug ?? "aus-dem-leben";
    const canonicalUrl = `https://wir-in-ungarn.hu/${slug}`;

    return {
      title,
      description,
      openGraph: {
        title: openGraphTitle,
        description: openGraphDescription,
        url: canonicalUrl,
        siteName: "Wir in Ungarn",
        type: "website",
        locale: "de_DE",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: openGraphTitle,
        description: openGraphDescription,
        images: [featuredImage],
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Aus dem Leben",
      description: "Aus dem Leben - Wir in Ungarn",
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
