// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: "Anki-Karten - Wir in Ungarn",
    description: "Ungarisch lernen mit Anki-Karten - Wir in Ungarn",
    openGraph: {
      title: "Anki-Karten - Wir in Ungarn",
      description: "Ungarisch lernen mit Anki-Karten - Wir in Ungarn",
      url: "https://wir-in-ungarn.hu/anki-karten",
      siteName: "Wir in Ungarn",
      type: "website",
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: "Anki-Karten - Wir in Ungarn",
      description: "Ungarisch lernen mit Anki-Karten - Wir in Ungarn",
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/anki-karten",
    },
  };
}

export default function CommonLayout({ children }) {
  return children;
}
