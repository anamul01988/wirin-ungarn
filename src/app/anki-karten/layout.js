// // Generate metadata for SEO
// export async function generateMetadata() {
//   const featuredImage = "/assets/WIU-logo.png";

//   return {
//     title: "Anki-Karten - Wir in Ungarn",
//     description: "Ungarisch lernen mit Anki-Karten - Wir in Ungarn",
//     openGraph: {
//       title: "Anki-Karten - Wir in Ungarn",
//       description: "Ungarisch lernen mit Anki-Karten - Wir in Ungarn",
//       url: "https://wir-in-ungarn.hu/anki-karten",
//       siteName: "Wir in Ungarn",
//       type: "website",
//       locale: "de_DE",
//       images: [
//         {
//           url: featuredImage,
//           width: 1200,
//           height: 630,
//           alt: "Anki-Karten - Wir in Ungarn",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Anki-Karten - Wir in Ungarn",
//       description: "Ungarisch lernen mit Anki-Karten - Wir in Ungarn",
//       images: [featuredImage],
//     },
//     alternates: {
//       canonical: "https://wir-in-ungarn.hu/anki-karten",
//     },
//   };
// }

// export default function CommonLayout({ children }) {
//   return children;
// }
"use client";

import HomePageLayout from "@/components/_components/HomePageLayout";

export default function CommonLayout({ children }) {
  return (
    <>
      {children}
      <HomePageLayout />
    </>
  );
}
