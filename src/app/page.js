import HomePageLayout from "@/components/_components/HomePageLayout";

// Generate metadata for SEO - Landing Page
export const metadata = {
  metadataBase: new URL("https://wir-in-ungarn.hu"),
  title: "Wir in Ungarn - Ihr Portal für das Leben in Ungarn",
  description:
    "Entdecken Sie Ungarn mit uns! Ungarisch lernen, Kultur erleben, kulinarische Köstlichkeiten genießen. Ihr umfassendes Portal für das Leben in Ungarn mit Sprachkursen, Reisetipps, Rezepten und vielem mehr.",
  keywords: [
    "Ungarn",
    "Wir in Ungarn",
    "Ungarisch lernen",
    "Sprachkurs Ungarisch",
    "Ungarn Kultur",
    "Ungarische Küche",
    "Leben in Ungarn",
    "Auswandern nach Ungarn",
    "Budapest",
    "Ungarisch Vokabeln",
    "Ungarische Rezepte",
    "Ausflugsziele Ungarn",
    "Veranstaltungen Ungarn",
  ],
  authors: [{ name: "Wir in Ungarn" }],
  creator: "Wir in Ungarn",
  publisher: "Wir in Ungarn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://wir-in-ungarn.hu",
    siteName: "Wir in Ungarn",
    title: "Wir in Ungarn - Ihr Portal für das Leben in Ungarn",
    description:
      "Entdecken Sie Ungarn mit uns! Ungarisch lernen, Kultur erleben, kulinarische Köstlichkeiten genießen. Sprachkurse, Reisetipps, Rezepte und mehr.",
    images: [
      {
        url: "/assets/WIU-logo.png",
        width: 1200,
        height: 630,
        alt: "Wir in Ungarn Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wir in Ungarn - Ihr Portal für das Leben in Ungarn",
    description:
      "Entdecken Sie Ungarn mit uns! Ungarisch lernen, Kultur erleben, kulinarische Köstlichkeiten genießen.",
    images: ["/assets/WIU-logo.png"],
  },
  alternates: {
    canonical: "https://wir-in-ungarn.hu",
  },
  category: "education",
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function Home() {
  return <HomePageLayout />;
}
