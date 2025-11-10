// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: "Philosophie - Wir in Ungarn",
    description: "Unsere Philosophie und Werte - Wir in Ungarn",
    openGraph: {
      title: "Philosophie - Wir in Ungarn",
      description: "Unsere Philosophie und Werte - Wir in Ungarn",
      url: "https://wir-in-ungarn.hu/philosophie",
      siteName: "Wir in Ungarn",
      type: "website",
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: "Philosophie - Wir in Ungarn",
      description: "Unsere Philosophie und Werte - Wir in Ungarn",
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/philosophie",
    },
  };
}

export default function PhilosophieLayout({ children }) {
  return children;
}
