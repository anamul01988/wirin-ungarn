// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: "Karriere - Wir in Ungarn",
    description: "Karrieremöglichkeiten bei Wir in Ungarn",
    openGraph: {
      title: "Karriere - Wir in Ungarn",
      description: "Karrieremöglichkeiten bei Wir in Ungarn",
      url: "https://wir-in-ungarn.hu/karriere",
      siteName: "Wir in Ungarn",
      type: "website",
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: "Karriere - Wir in Ungarn",
      description: "Karrieremöglichkeiten bei Wir in Ungarn",
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/karriere",
    },
  };
}

export default function CommonLayout({ children }) {
  return children;
}
