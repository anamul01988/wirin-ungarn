import NewsCard from "@/components/_components/NewsCard";
import NewscardHeader from "@/components/_components/NewscardHeader";
import NewsCardParent from "@/components/_components/NewsCardParent";

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
    title: <NewscardHeader/>,
    content: <NewsCardParent/>,
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
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2024/03/BLBUS-Busverkehr-in-Ungarn-2-240x180.jpg",
    title: "Die Nutzung öffentlicher Verkehrsmittel",
    description:
      "Der öffentliche Nahverkehr in Ungarn bietet eine umfassende und effiziente Infrastruktur, die es Reisenden ermöglicht im gesamten Land problemlos zu navigieren. Das ungarische Verkehrssystem wird von mehreren zentralen Akteuren gesteuert...",
  },
  {
    id: 2,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2024/04/BLLCK-Lakcim-Kartya-240x180.jpg",
    title: "Dein Wegweiser zur Lakcímkártya – So beantragst du deine Wohnkarte",
    description:
      "Die Lakcímkártya, direkt übersetzt „Wohnadressen-Karte“, ist ein offizielles Dokument, das deine Wohnadresse in Ungarn bestätigt. Sie ist wichtig für viele administrative Angelegenheiten wie die Eröffnung eines Bankkontos, die Anmeldung bei der Krankenversicherung oder dem Anmelden eines...",
  },
  {
    id: 3,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/SHTHK-Tipps-fuer-den-Hauskauf-in-Ungarn-240x180.jpg",
    title: "Dein Wegweiser zur Lakcímkártya – So beantragst du deine Wohnkarte",
    description:
      "Die Lakcímkártya, direkt übersetzt „Wohnadressen-Karte“, ist ein offizielles Dokument, das deine Wohnadresse in Ungarn bestätigt. Sie ist wichtig für viele administrative Angelegenheiten wie die Eröffnung eines Bankkontos, die Anmeldung bei der Krankenversicherung oder dem Anmelden eines...",
  },
];

export const philosopiesDetails = {
  page: {
    title: "Wir in Ungarn",
    header: {
      h1: {
        text: "Philosophie",
        style:
          "text-4xl md:text-5xl font-semibold mb-6 text-gray-800 dark:text-white",
      },
      p: {
        text: "Warum wir-in-ungarn mehr als nur eine Website ist",
        style:
          "text-2xl md:text-3xl font-medium mb-8 text-gray-600 dark:text-gray-300",
      },
    },
    content: {
      introduction: {
        text: "Liebe Besucherin, lieber Besucher, bevor du dich in das bunte Treiben unserer Seite stürzt, möchten wir dir gerne erzählen, was hinter diesem Projekt steckt. Denn das Portal ist nicht nur ein Sammelsurium von Informationen und Ratschlägen. Es ist der Ausdruck einer tiefen Überzeugung und einer Philosophie, die uns alle verbindet.",
        style:
          "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
      },
      sections: [
        {
          header: {
            h2: {
              text: "Verbindung und Gemeinschaft",
              style:
                "text-xl font-medium mb-3 text-gray-800 dark:text-gray-100",
            },
          },
          paragraph: {
            text: "Ungarn ist nicht nur ein Ort – es ist ein Gefühl, eine Erfahrung und eine Reise. Als wir unsere eigene Reise hierher begonnen haben, wurde uns bewusst, wie wichtig es ist, sich miteinander zu verbinden, Erfahrungen auszutauschen und eine Gemeinschaft aufzubauen. Dieses Gefühl der Zusammengehörigkeit wollten wir auch anderen bieten.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
        {
          header: {
            h2: {
              text: "Hilfe und Unterstützung",
              style:
                "text-xl font-medium mb-3 text-gray-800 dark:text-gray-100",
            },
          },
          paragraph: {
            text: "In einer Welt, die sich so schnell verändert, kann das Auswandern in ein anderes Land mit vielen Herausforderungen verbunden sein. Unsere Philosophie dreht sich darum, Menschen zu helfen und zu unterstützen, sodass der Prozess des Neuanfangs erleichtert wird. Jeder von uns hat seine eigenen Geschichten, Erfolge und Hindernisse. Indem wir sie teilen, können wir anderen den Weg erleuchten.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
        {
          header: {
            h2: {
              text: "Authentizität und Integrität",
              style:
                "text-xl font-medium mb-3 text-gray-800 dark:text-gray-100",
            },
          },
          paragraph: {
            text: "Wir sind stolz darauf, dass diese Seite zu 100% non-profit ist. Für uns steht der Mensch und nicht der finanzielle Vorteil im Vordergrund. Das bedeutet, dass jede Information, jeder Rat und jede Geschichte, die du hier findest, authentisch und von Herzen kommt. Es geht uns um das Teilen, das Geben und das Helfen.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
        {
          header: {
            h2: {
              text: "Wachstum und Entwicklung",
              style:
                "text-xl font-medium mb-3 text-gray-800 dark:text-gray-100",
            },
          },
          paragraph: {
            text: "Wir glauben daran, dass wir ständig lernen und wachsen können. Und so wie Ungarn sich weiterentwickelt, wollen auch wir uns weiterentwickeln. Das bedeutet, dass du immer auf der Suche nach neuen Möglichkeiten, Ideen und Wegen sind, um diese Plattform zu verbessern und dir das bestmögliche Erlebnis zu bieten.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
      ],
      closing: {
        text: "Bevor du weiterklickst und all die Ressourcen, Geschichten und Gemeinschaften erkundest, die wir hier aufgebaut haben, möchten wir dir einfach danken. Danke, dass du hier bist und ein Teil dieser Reise bist. Denn letztlich bist du es, der unserer Philosophie Leben einhaucht.\n\nDein Team von https://wir-in-ungarn.hu ❤",
        style:
          "text-base leading-relaxed mt-6 text-gray-700 dark:text-gray-200",
      },
    },
  },
};
export const footerLinks = [
  { title: "Neueste Beiträge", key: "posts", endpoint: "/posts" },
  { title: "Philosophie", key: "philosophie", endpoint: "/philosophie" },
  { title: "Datenschutz", key: "datenschutz", endpoint: "/datenschutz" },
  { title: "Ungarn-Insider", key: "insider", endpoint: "/ungarn-insider" },
  { title: "Transparenz", key: "transparenz", endpoint: "/transparenz" },
  { title: "Neuigkeiten", key: "news", endpoint: "/news" },
  { title: "Kontakt", key: "kontakt", endpoint: "/kontakt" },
  { title: "WIU-Münzen", key: "wiu-muenzen", endpoint: "/wiu-muenzen" },
  { title: "Karriere", key: "karriere", endpoint: "/karriere" },
  {
    title: "Cookie-Richtlinie",
    key: "cookies",
    endpoint: "/cookie-richtlinie",
  },
  { title: "Über uns", key: "about", endpoint: "/ueber-uns" },
  { title: "Impressum", key: "impressum", endpoint: "/impressum" },
  { title: "Soziale Projekte", key: "projekte", endpoint: "/soziale-projekte" },
  { title: "Kooperationen", key: "kooperationen", endpoint: "/kooperationen" },
];

export const karriere = {
  page: {
    title: "Karriere",
    header: {
      h1: {
        text: "Karriere",
        style:
          "text-4xl md:text-5xl font-semibold mb-4 text-gray-800 dark:text-white",
      },
      p: {
        text: "Werde Teil unseres Teams und unterstütze Einwanderer in Ungarn!",
        style:
          "text-2xl md:text-3xl font-medium mb-8 text-gray-600 dark:text-gray-300",
      },
    },
    content: {
      introduction: {
        text: "Ungarn hat viel zu bieten – von seiner reichen Kultur und Geschichte bis hin zu wunderschönen Landschaften. Doch für viele, die den Schritt wagen und nach Ungarn auswandern, beginnt mit der Ankunft ein neues Kapitel voller Herausforderungen. Genau hier kommst du ins Spiel!",
        style:
          "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
      },
      sections: [
        {
          header: {
            h2: {
              text: "Das bringst du mit",
              style: "text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100",
            },
          },
          list_items: [
            {
              text: "Perfekte Kenntnisse der ungarischen Sprache.",
              style:
                "text-base leading-relaxed mb-2 text-gray-700 dark:text-gray-200",
            },
            {
              text: "Sehr gute Deutschkenntnisse, um die Anliegen und Sorgen der Einwanderer bestmöglich zu verstehen und vermitteln zu können.",
              style:
                "text-base leading-relaxed mb-2 text-gray-700 dark:text-gray-200",
            },
          ],
        },
        {
          header: {
            h2: {
              text: "Wie du Einwanderern helfen kannst",
              style: "text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100",
            },
          },
          list_items: [
            {
              text: "Immobilien: Unterstütze bei der Besichtigung von Immobilien und helfe, das perfekte neue Zuhause zu finden.",
              style:
                "text-base leading-relaxed mb-2 text-gray-700 dark:text-gray-200",
            },
            {
              text: "Wohnberechtigung: Begleite beim Beantragen der Wohnberechtigung und mache den bürokratischen Prozess verständlicher.",
              style:
                "text-base leading-relaxed mb-2 text-gray-700 dark:text-gray-200",
            },
            {
              text: "Finanzen: Assistiere beim Einrichten von Bankkonten und beim Beantragen der Steuernummer.",
              style:
                "text-base leading-relaxed mb-2 text-gray-700 dark:text-gray-200",
            },
            {
              text: "Bildung: Hilf dabei, in Schulen und Kindergärten anzumelden und den Übergang so einfach wie möglich zu gestalten.",
              style:
                "text-base leading-relaxed mb-2 text-gray-700 dark:text-gray-200",
            },
            {
              text: "Schriftverkehr: Unterstütze bei der Bearbeitung des ungarischen Schriftverkehrs, sodass keine Missverständnisse entstehen.",
              style:
                "text-base leading-relaxed mb-2 text-gray-700 dark:text-gray-200",
            },
          ],
        },
      ],
      closing: {
        text: "Das ist nur die Spitze des Eisbergs. Es gibt unzählige andere Situationen, in denen ein Muttersprachler unerlässlich ist – sei es bei der Anmeldung beim Arzt, beim Autokauf oder einfach beim Kennenlernen der ungarischen Kultur und Lebensweise.\n\nWenn du denkst, dass du der perfekte Kandidat für diese Aufgabe bist und die Idee liebst, Menschen beim Neustart in Ungarn zu unterstützen, dann würden wir uns freuen, von dir zu hören! Es handelt sich hierbei nicht um eine feste Anstellung. Vielmehr bieten wir die Gelegenheit, dich in unserer Datenbank zu listen. Bei Bedarf würden wir dir einen Fragebogen zusenden und die gesammelten Daten verwenden, um geeignete Matches zu finden. Für die erfolgreiche Vermittlung stellen wir beiden Parteien einmalig 10 WIUM in Rechnung. Alle weiteren finanziellen Absprachen erfolgen direkt zwischen dir und den Einwanderern. Interessiert? Dann melde dich bei uns!",
        style:
          "text-base leading-relaxed mt-6 text-gray-700 dark:text-gray-200",
      },
    },
  },
};

export const uberUns = {
  page: {
    title: "Über uns",
    header: {
      h1: {
        text: "Über uns",
        style:
          "text-4xl md:text-5xl font-semibold mb-4 text-gray-800 dark:text-white",
      },
      p: {
        text: "Deine Brücke nach Ungarn",
        style:
          "text-2xl md:text-3xl font-medium mb-8 text-gray-600 dark:text-gray-300",
      },
    },
    content: {
      introduction: {
        text: "Als wir selbst den Schritt gewagt haben, nach Ungarn auszuwandern, standen wir vor zahlreichen Herausforderungen. Das Sammeln von Informationen, das Durchforsten unzähliger Webseiten, Anschauen von YouTube-Videos, das Kontaktieren von Behörden und Schulen… diese Aufgabe war mühsam und oft überwältigend. Jeder, der einmal ausgewandert ist, kennt die vielen kleinen und großen Hürden, die sich einem in den Weg stellen. Und genau das war der Ausgangspunkt für wir-in-ungarn.hu.",
        style:
          "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
      },
      sections: [
        {
          header: {
            h2: {
              text: "",
              style: "",
            },
          },
          paragraph: {
            text: "Wir erinnern uns an die ersten Schritte im Land, das Entdecken von Kultur und die „Eigenheiten“ der Menschen, die auf den ersten Blick fremd, aber auf den zweiten so herzlich und einladend sind. Wir erkannten, dass diese Reise viel einfacher wäre, wenn man einen zentralen Ort hätte, an dem all diese wertvollen Informationen zusammenkommen.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
        {
          header: {
            h2: {
              text: "",
              style: "",
            },
          },
          paragraph: {
            text: "Genau das war unsere Vision: Einen Ort zu schaffen, an dem Interessierte, Neugierige und zukünftige Auswanderer alle Antworten finden können. Und so entstand wir-in-ungarn.hu.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
        {
          header: {
            h2: {
              text: "",
              style: "",
            },
          },
          paragraph: {
            text: "Bei uns findest du nicht nur eine große Menge Informationen, die in verschiedenen Arten von Beiträgen präsentiert werden, sondern auch eine lebendige Community, die sich gegenseitig unterstützt und Tipps gibt. Und weil das Leben und die Anforderungen immer im Wandel sind, arbeitet unser engagiertes Team ständig daran, neue praktische Inhalte und Funktionen hinzuzufügen.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
        {
          header: {
            h2: {
              text: "",
              style: "",
            },
          },
          paragraph: {
            text: "Denn unser größter Wunsch ist es, deinen Weg in Ungarn – sei es nur für einen Besuch oder für den Rest deines Lebens – so angenehm und reibungslos wie möglich zu gestalten. Und dabei setzen wir auf den Non-Profit-Gedanken, weil es uns um das Miteinander, die Hilfe und die Vernetzung geht und nicht darum etwas zu verdienen.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },
      ],
      closing: {
        text: "Wir freuen uns, wenn du dein Wissen und deine Meinung mit uns teilst, um die Inhalte auf unserer Seite noch weiter zu verbessern und aktuelle Informationen einfließen zu lassen. Dafür findest du am Ende jeder Seite eine Box, in die du deine Ideen eintragen kannst. Diese Vorschläge werden von unserem Team dann in unsere Inhalte integriert.\n\nBist du bereit für dein Ungarn-Abenteuer? Wir sind hier, um dich dabei zu begleiten!",
        style:
          "text-base leading-relaxed mt-6 text-gray-700 dark:text-gray-200",
      },
    },
  },
};
