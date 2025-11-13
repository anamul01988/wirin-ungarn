// Generate metadata for SEO
export async function generateMetadata() {
  const featuredImage = "/assets/WIU-logo.png";

  return {
    title: "Währungsrechner - Wir in Ungarn",
    description: "EUR zu HUF Währungsrechner - Wir in Ungarn",
    openGraph: {
      title: "Währungsrechner - Wir in Ungarn",
      description: "EUR zu HUF Währungsrechner - Wir in Ungarn",
      url: "https://wir-in-ungarn.hu/coin",
      siteName: "Wir in Ungarn",
      type: "website",
      locale: "de_DE",
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: "Währungsrechner - Wir in Ungarn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Währungsrechner - Wir in Ungarn",
      description: "EUR zu HUF Währungsrechner - Wir in Ungarn",
      images: [featuredImage],
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/coin",
    },
  };
}

export default function CommonLayout({ children }) {
  return children;
}
