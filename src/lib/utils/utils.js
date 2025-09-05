import NewsCard from "@/components/_components/NewsCard";

export const fakeData = {
  title: "Einleitung: Der Duft von Sommer, Markt und purer Lebensfreude",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  content: `Es gibt Düfte, die sich ins Gedächtnis brennen wie die Sommersonne auf dem Asphalt. ...`,
  heroImage: "https://picsum.photos/800/300?random=1",
  secondTitle: "Die Geschichte des Lángos: Von der Ofenflamme zum heißen Öl",
  secondIcon: (
    <svg
      className="w-full h-auto text-orange-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 
             6.707a1 1 0 010-1.414l3-3a1 1 0 
             011.414 0l3 3a1 1 0 01-1.414 
             1.414L11 5.414V13a1 1 0 
             11-2 0V5.414L7.707 6.707a1 
             1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  secondContent: `
Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV / A tartalomért felelős személy a RStV 55. § (2) bekezdése alapján :
Messemer Markus

Haftungsausschluss:

Inhalt des Onlineangebotes / Az online tartalom :
Die Inhalte dieser Webseite werden mit größtmöglicher Sorgfalt erstellt. Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte der Webseite erfolgt auf eigene Gefahr des Nutzers.
A weboldal tartalmát a lehető legnagyobb gondossággal hozzuk létre. A szolgáltató azonban nem vállal garanciát ...
`,
};

export const slideData = [
  {
    title: "Ungran-Insider",
    content: <NewsCard />,
  },
  {
    title: "Explore Features",
    content:
      "This is the second slide that showcases our amazing features. Discover all the tools and capabilities that make our platform unique and powerful.",
  },
  {
    title: "Get Started Today",
    content:
      "This is the third slide encouraging you to take action. Join thousands of users who are already benefiting from our innovative solutions.",
  },
];

export const articles = [
  {
    id: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Volanbusz_bus.jpg",
    title: "Die Nutzung öffentlicher Verkehrsmittel",
    description:
      "Der öffentliche Nahverkehr in Ungarn bietet eine umfassende und effiziente Infrastruktur, die es Reisenden ermöglicht im gesamten Land problemlos zu navigieren. Das ungarische Verkehrssystem wird von mehreren zentralen Akteuren gesteuert...",
  },
  {
    id: 2,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hungarian_ID_Card.jpg",
    title: "Dein Wegweiser zur Lakcímkártya – So beantragst du deine Wohnkarte",
    description:
      "Die Lakcímkártya, direkt übersetzt „Wohnadressen-Karte“, ist ein offizielles Dokument, das deine Wohnadresse in Ungarn bestätigt. Sie ist wichtig für viele administrative Angelegenheiten wie die Eröffnung eines Bankkontos, die Anmeldung bei der Krankenversicherung oder dem Anmelden eines...",
  },
  {
    id: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hungarian_ID_Card.jpg",
    title: "Dein Wegweiser zur Lakcímkártya – So beantragst du deine Wohnkarte",
    description:
      "Die Lakcímkártya, direkt übersetzt „Wohnadressen-Karte“, ist ein offizielles Dokument, das deine Wohnadresse in Ungarn bestätigt. Sie ist wichtig für viele administrative Angelegenheiten wie die Eröffnung eines Bankkontos, die Anmeldung bei der Krankenversicherung oder dem Anmelden eines...",
  },
];

