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

export function NewsCard() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row">
      {/* Left side content */}
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-x-6 md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-truck"
              viewBox="0 0 16 16"
            >
              <path d="M15 8a1 1 0 0 0-1-1h-1V5a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v3H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1h1a1 1 0 0 0 1-1V8zM3 5h10v3H3V5zM1 9h14v5h-1v1a1 1 0 0 0-1 1H3a1 1 0 0 0-1-1v-1H1V9z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Sep 03, 2025 08:49</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            INTELLIGENTE AUTOBAN M1: ENDE DER STAU IN SICHT?
          </h2>
          <p className="text-gray-600 mt-2">
            Ungarn investiert massiv in seine wichtigste Verkehrsader. Der
            M1-Ausbau bringt nicht nur mehr Spuren, sondern auch modernisierte
            Rastplätze, neue Knotenpunkte und 300 Lkw-Stellplätze. Die Arbeiten
            laufen bei fließendem Verkehr.
          </p>
        </div>
      </div>

      {/* Right side button */}
      <div className="flex justify-end space-x-4 mt-4 md:mt-0">
        <a
          href="https://www.budapester.hu/wirtschaft/ausbau-auf-sechs-spuren/"
          className="inline-flex items-center text-green-600 hover:text-green-800 font-medium space-x-2"
        >
          <span>Zur Seite</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11.293 8.707a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414L13.414 8H3a1 1 0 0 1 0-2h10.414L12.707 3.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L13.414 8H3a1 1 0 0 1 0-2h10.414L12.707 3.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L13.414 8H3a1 1 0 0 1 0-2h10.414L12.707 3.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L13.414 8H3z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

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
