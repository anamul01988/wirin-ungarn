export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `${slug} - Verbarium | Wir in Ungarn`,
    description: `Konjugation und Verwendung des ungarischen Verbs "${slug}". Lerne die wichtigsten ungarischen Verben mit unserem interaktiven Verbarium.`,
    openGraph: {
      title: `${slug} - Verbarium`,
      description: `Konjugation und Verwendung des ungarischen Verbs "${slug}".`,
      url: `https://wir-in-ungarn.hu/verbarium/${slug}`,
      siteName: "Wir in Ungarn",
      type: "website",
      locale: "de_DE",
    },
    alternates: {
      canonical: `https://wir-in-ungarn.hu/verbarium/${slug}`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
