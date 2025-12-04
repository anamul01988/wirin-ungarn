import KarteComponent from "./KartePage";

// Generate static metadata for SEO
export async function generateMetadata() {
  const featuredImage = "/assets/WIU-logo.png";

  return {
    title: "Karte - Wir in Ungarn",
    description: "Interaktive Karte von Ungarn - Wir in Ungarn",
    openGraph: {
      title: "Karte - Wir in Ungarn",
      description: "Interaktive Karte von Ungarn - Wir in Ungarn",
      url: "https://wir-in-ungarn.hu/karte",
      siteName: "Wir in Ungarn",
      type: "website",
      locale: "de_DE",
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: "Karte - Wir in Ungarn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Karte - Wir in Ungarn",
      description: "Interaktive Karte von Ungarn - Wir in Ungarn",
      images: [featuredImage],
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/karte",
    },
  };
}

export default function Page() {
  return (
    <>
      <KarteComponent />
    </>
  );
}
