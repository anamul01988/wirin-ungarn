// Generate metadata for SEO
export async function generateMetadata() {
  const featuredImage = "/assets/WIU-logo.png";

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
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: "Karriere - Wir in Ungarn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Karriere - Wir in Ungarn",
      description: "Karrieremöglichkeiten bei Wir in Ungarn",
      images: [featuredImage],
    },
    alternates: {
      canonical: "https://wir-in-ungarn.hu/karriere",
    },
  };
}

export default function CommonLayout({ children }) {
  return children;
}
