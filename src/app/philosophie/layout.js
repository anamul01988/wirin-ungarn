// Generate metadata for SEO
export async function generateMetadata() {
  const featuredImage = "/assets/WIU-logo.png";

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
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: "Philosophie - Wir in Ungarn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Philosophie - Wir in Ungarn",
      description: "Unsere Philosophie und Werte - Wir in Ungarn",
      images: [featuredImage],
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/philosophie",
    },
  };
}

export default function PhilosophieLayout({ children }) {
  return children;
}
