// Generate metadata for SEO
export async function generateMetadata() {
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
    },
    twitter: {
      card: "summary_large_image",
      title: "Währungsrechner - Wir in Ungarn",
      description: "EUR zu HUF Währungsrechner - Wir in Ungarn",
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/coin",
    },
  };
}

export default function CommonLayout({ children }) {
  return children;
}
