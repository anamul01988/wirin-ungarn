import NewsCard from "@/components/_components/NewsCard";
import NewscardHeader from "@/components/_components/NewscardHeader";
import NewsCardParent from "@/components/_components/NewsCardParent";
import Image from "next/image";
import { useState } from "react";

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
    title: <NewscardHeader />,
    content: <NewsCardParent />,
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
      sections: [
        {
          header: {
            p: {
              text: "Liebe Besucherin, lieber Besucher,",
              style: " mb-3 mt-3 font-semibold  text-var(--offblack)",
            },
          },
          paragraph: {
            text: "bevor du dich in das bunte Treiben unserer Seite stürzt, möchten wir dir gerne erzählen, was hinter diesem Projekt steckt. Denn das Portal ist nicht nur ein Sammelsurium von Informationen und Ratschlägen. Es ist der Ausdruck einer tiefen Überzeugung und einer Philosophie, die uns alle verbindet.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },

        {
          header: {
            p: {
              text: "Verbindung und Gemeinschaft",
              style: "mb-3 mt-3 font-semibold  text-var(--offblack)",
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
            p: {
              text: "Hilfe und Unterstützung",
              style: "mb-3 mt-3 font-semibold  text-var(--offblack)",
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
            p: {
              text: "Authentizität und Integrität",
              style: "mb-3 mt-3 font-semibold  text-var(--offblack)",
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
            p: {
              text: "Wachstum und Entwicklung",
              style: "mb-3 mt-3 font-semibold  text-var(--offblack)",
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

    content2: {
      sections2: [
        {
          header: {
            p: {
              text: "Worüber schreiben wir?,",
              style: " mb-3 mt-3 font-semibold  text-var(--offblack)",
            },
          },
          paragraph: {
            text: "Unsere Webseite „wir-in-ungarn“ widmet sich allen Aspekten des Lebens, die zugewanderte Menschen, insbesondere aus deutschsprachigen Ländern, in Ungarn wissen müssen. Unsere Artikel decken ein breites Spektrum an Themen ab, von alltäglichen Herausforderungen und praktischen Tipps bis hin zu kulturellen und sozialen Aspekten des Lebens in Ungarn. Wir verstehen, dass der Umzug in ein neues Land viele Fragen aufwirft, und daher bemühen wir uns, diese Fragen zu beantworten und wertvolle Informationen bereitzustellen.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },

        {
          header: {
            p: {
              text: "Für wen schreiben wir?",
              style: "mb-3 mt-3 font-semibold  text-var(--offblack)",
            },
          },
          paragraph: {
            text: "Unser Publikum sind vor allem Menschen, die nach Ungarn gezogen sind oder dies planen, insbesondere solche aus deutschsprachigen Ländern. Wir richten uns an Einzelpersonen und Familien, die sich in einem neuen Umfeld zurechtfinden müssen und nach verlässlichen und umfassenden Informationen suchen. Unser Ziel ist es, eine Gemeinschaft zu schaffen, die sich gegenseitig unterstützt und austauscht.",
            style:
              "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
          },
        },

        {
          header: {
            p: {
              text: "Warum schreiben wir?",
              style: "mb-3 mt-3 font-semibold  text-var(--offblack)",
            },
          },
          paragraph: {
            text: "Die Idee hinter „wir-in-ungarn“ entstand aus persönlicher Erfahrung. Als wir selbst nach Ungarn zogen, mussten wir mühsam Informationen an vielen verschiedenen Stellen zusammensuchen. Diese Herausforderung inspirierte uns, eine zentrale Plattform zu schaffen, auf der alle notwendigen Informationen leicht zugänglich sind. Unsere Webseite wächst stetig und bietet nun neben umfassenden Artikeln zum Alltagsleben auch einen kostenlosen Ungarisch-Kurs an, um den Einstieg in das neue Leben zu erleichtern.",
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
  // {
  //   title: "Neueste Beiträge",
  //   key: "posts",
  //   endpoint: "/posts",
  //   primary: true,
  // },
  // {
  //   title: "Neuigkeiten",
  //   key: "news",
  //   endpoint: "/neuigkeiten-bei-wir-in-ungarn",
  //   primary: true,
  // },
  { title: "Über uns", key: "about", endpoint: "/uber-uns", primary: true },
  {
    title: "Philosophie",
    key: "philosophie",
    endpoint: "/philosophie",
    primary: true,
  },
  { title: "Kontakt", key: "kontakt", endpoint: "/kontakt", primary: true },
  {
    title: "Impressum",
    key: "impressum",
    endpoint: "/impressum",
    primary: true,
  },
  {
    title: "Datenschutz",
    key: "datenschutz",
    endpoint: "/datenschutz",
    primary: true,
  },

  {
    title: "Ungarn-Insider",
    key: "insider",
    endpoint: "/ungarn-insider",
    primary: false,
  },
  {
    title: "Transparenz",
    key: "transparenz",
    endpoint: "/transparenz",
    primary: false,
  },
  {
    title: "WIU-Münzen",
    key: "wiu-muenzen",
    endpoint: "/wiu-muenzen",
    primary: false,
  },
  { title: "Karriere", key: "karriere", endpoint: "/karriere", primary: false },
  {
    title: "Cookie-Richtlinie",
    key: "cookies",
    endpoint: "/cookie-richtlinie-eu",
    primary: false,
  },
  {
    title: "Soziale Projekte",
    key: "projekte",
    endpoint: "/soziale-projekte",
    primary: false,
  },
  {
    title: "Kooperationen",
    key: "kooperationen",
    endpoint: "/kooperationen",
    primary: false,
  },
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

export const cookieData = {
  page: {
    title: "Cookie-Richtlinie (EU)",
    header: {
      h1: {
        text: "Cookie-Richtlinie (EU)",
        style:
          "text-4xl md:text-5xl font-semibold mb-6 text-gray-800 dark:text-white",
      },
    },
    content: [
      {
        p: {
          text: "Informationen zu Cookies auf wir-in-ungarn.hu",
          style:
            "text-xl md:text-2xl font-medium mb-2 text-black dark:text-gray-300",
        },
        introduction: {
          text: "Du nutzt unsere Webseite, und wir möchten dir erklären, wie wir Cookies verwenden. Wir setzen ausschließlich essentielle Cookies ein. Diese Cookies sind notwendig, damit unsere Seite ordnungsgemäß funktioniert. Sie ermöglichen grundlegende Funktionen wie die Navigation zwischen Seiten oder den Zugriff auf bestimmte Inhalte.",
          style:
            "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
        },
      },
      {
        p: {
          text: "Was sind essentielle Cookies?",
          style:
            "text-xl md:text-2xl font-medium mb-2 text-black dark:text-gray-300",
        },
        introduction: {
          text: "Essentielle Cookies sind unverzichtbar für die grundlegende Funktionalität einer Webseite. Sie speichern beispielsweise Informationen über deine aktuelle Sitzung, damit du nicht bei jedem Seitenwechsel neu anmelden musst. Diese Cookies sind für den Betrieb unserer Webseite unerlässlich und erfordern keine Zustimmung gemäß den geltenden Datenschutzbestimmungen wie der DSGVO.",
          style:
            "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
        },
      },
      {
        p: {
          text: "Warum verwenden wir keine nicht-essentiellen Cookies?",
          style:
            "text-xl md:text-2xl font-medium mb-2 text-black dark:text-gray-300",
        },
        introduction: {
          text: "Wir legen großen Wert auf deine Privatsphäre und vermeiden daher den Einsatz von Cookies, die nicht unbedingt notwendig sind. Unsere Plattform bleibt werbefrei und konzentriert sich darauf, dir nützliche Informationen und Unterstützung bei deinem Leben in Ungarn zu bieten.",
          style:
            "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
        },
      },
      {
        p: {
          text: "Transparenz und Datenschutz",
          style:
            "text-xl md:text-2xl font-medium mb-2 text-black dark:text-gray-300",
        },
        introduction: {
          text: "Wir informieren dich transparent über den Einsatz von Cookies auf unserer Webseite. Da wir nur essentielle Cookies verwenden, benötigen wir keine Zustimmung für deren Verwendung. Dennoch möchten wir dir über den Zweck und die Funktionsweise dieser Cookies informieren. ",
          style:
            "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
        },
      },
    ],
  },
};

const commonStyles = {
  p: "text-xl md:text-2xl font-medium mb-2 text-black dark:text-gray-300",
  introduction:
    "text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-200",
};

export const datenschutzData = {
  page: {
    title: "Datenschutz",
    header: {
      h1: {
        text: "Datenschutz",
        style:
          "text-4xl md:text-5xl font-semibold mb-6 text-gray-800 dark:text-white",
      },
    },
    content: [
      {
        p: {
          text: "Einleitung",
          style: commonStyles.p,
        },
        introduction: {
          text: "Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Nachfolgend informieren wir Sie über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten bei der Nutzung unserer Webseite. Unsere Datenschutzpraxis richtet sich nach den Bestimmungen der Datenschutz-Grundverordnung (DSGVO) und des ungarischen Datenschutzgesetzes.",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Verantwortliche Stelle",
          style: commonStyles.p,
        },
        introduction: {
          text: "Firmenname: 151 CONCEPTS\nRechtsform: Egyéni vállalkozás (Einzelunternehmen)\nInhaber: Messemer Markus\nAdresse: Fő Utca 151, 7149 Báta, Ungarn\nKontakt: E-Mail: wiu@151.hu",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Erhebung und Verarbeitung personenbezogener Daten",
          style: commonStyles.p,
        },
        introduction: {
          text: "Registrierung: Bei der Registrierung auf unserer Webseite werden folgende personenbezogene Daten erhoben: Name und E-Mail-Adresse. Diese Daten werden ausschließlich zur Identifizierung und Authentifizierung des Nutzers verwendet.\nTechnische Daten: Bei jedem Besuch unserer Webseite werden automatisch technische Daten wie IP-Adresse, Browsertyp und -version, sowie Datum und Uhrzeit des Zugriffs erhoben. Diese Daten werden zur Gewährleistung eines reibungslosen Betriebs der Webseite und zur Verbesserung unserer Dienstleistungen verwendet.",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Zweck der Datenverarbeitung",
          style: commonStyles.p,
        },
        introduction: {
          text: "Die erhobenen personenbezogenen Daten werden ausschließlich zur Erfüllung der nachfolgend genannten Zwecke verwendet:\n– Identifizierung und Authentifizierung des Nutzers\n– Gewährleistung eines reibungslosen Betriebs der Webseite\n– Verbesserung unserer Dienstleistungen",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Speicherdauer",
          style: commonStyles.p,
        },
        introduction: {
          text: "Die personenbezogenen Daten werden nur so lange gespeichert, wie es für die Erfüllung der oben genannten Zwecke erforderlich ist. Nach Ablauf dieser Frist werden die Daten gelöscht, es sei denn, gesetzliche Aufbewahrungspflichten stehen einer Löschung entgegen.",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Rechte der betroffenen Personen",
          style: commonStyles.p,
        },
        introduction: {
          text: "Als betroffene Person haben Sie das Recht auf:\n– Auskunft über die gespeicherten Daten\n– Berichtigung unrichtiger Daten\n– Löschung der Daten\n– Einschränkung der Verarbeitung\n– Datenübertragbarkeit\n– Widerspruch gegen die Verarbeitung\nUm diese Rechte geltend zu machen, wenden Sie sich bitte an die unter Punkt 2 genannte verantwortliche Stelle.",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Sicherheit der Daten",
          style: commonStyles.p,
        },
        introduction: {
          text: "Wir treffen alle notwendigen technischen und organisatorischen Maßnahmen, um die Sicherheit Ihrer personenbezogenen Daten zu gewährleisten. Unsere Webseite nutzt eine SSL-Verschlüsselung, um die Datenübertragung zu schützen.",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Änderungen dieser Datenschutzerklärung",
          style: commonStyles.p,
        },
        introduction: {
          text: "Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit anzupassen, um sie an geänderte rechtliche Anforderungen oder Änderungen unserer Dienstleistungen anzupassen. Bitte prüfen Sie diese Seite regelmäßig auf Änderungen.",
          style: commonStyles.introduction,
        },
      },
    ],
  },
};
export const impressumData = {
  page: {
    title: "Impressum",
    header: {
      h1: {
        text: "Impressum",
        style:
          "text-4xl md:text-5xl font-semibold mb-6 text-gray-800 dark:text-white",
      },
    },
    content: [
      {
        p: {
          text: "Einleitung",
          style: commonStyles.p,
        },
        introduction: {
          text: "Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Nachfolgend informieren wir Sie über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten bei der Nutzung unserer Webseite. Unsere Datenschutzpraxis richtet sich nach den Bestimmungen der Datenschutz-Grundverordnung (DSGVO) und des ungarischen Datenschutzgesetzes.",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Zweck der Datenverarbeitung",
          style: commonStyles.p,
        },
        introduction: {
          text: "Die erhobenen personenbezogenen Daten werden ausschließlich zur Erfüllung der nachfolgend genannten Zwecke verwendet:Identifizierung und Authentifizierung des NutzersGewährleistung eines reibungslosen Betriebs der WebseiteVerbesserung unserer Dienstleistungen",
          style: commonStyles.introduction,
        },
      },
      {
        p: {
          text: "Erhebung und Verarbeitung personenbezogener Daten",
          style: commonStyles.p,
        },
        introduction: {
          text: "Registrierung: Bei der Registrierung auf unserer Webseite werden folgende personenbezogene Daten erhoben: Name und E-Mail-Adresse. Diese Daten werden ausschließlich zur Identifizierung und Authentifizierung des Nutzers verwendet.Technische Daten: Bei jedem Besuch unserer Webseite werden automatisch technische Daten wie IP-Adresse, Browsertyp und -version, sowie Datum und Uhrzeit des Zugriffs erhoben. Diese Daten werden zur Gewährleistung eines reibungslosen Betriebs der Webseite und zur Verbesserung unserer Dienstleistungen verwendet.",
          style: commonStyles.introduction,
        },
      },
    ],
  },
};

export const kontactData = {
  page: {
    title: "Kontakt",
    header: {
      h1: {
        text: "Kontakt",
        style:
          "text-4xl md:text-5xl font-semibold mb-6 text-gray-800 dark:text-white",
      },
    },
    content: {
      sections: [
        {
          paragraph: {
            text: "Hey, schön, dass du uns schreiben möchtest!",
            style: "text-base  mb-4 text-gray-500 dark:text-gray-200",
          },
        },
        {
          paragraph: {
            text: "Bevor du uns kontaktierst, könnte es hilfreich sein, kurz auf unserer Seite zu stöbern. Viele Antworten auf gängige Fragen findest du vielleicht schon in unseren Blogposts, FAQs oder anderen Bereichen.",
            style: "text-base  mb-4 text-gray-500 dark:text-gray-200",
          },
        },
        {
          paragraph: {
            text: "Aber natürlich wissen wir, dass manchmal direkte Kommunikation unschlagbar ist! Wenn du also eine spezielle Frage hast, Anregungen geben möchtest oder einfach nur Hallo sagen willst, zögere nicht und schreib uns. Wir nehmen uns gerne die Zeit für dich und werden so schnell wie möglich antworten.",
            style:
              "text-base leading-relaxed mb-4 text-gray-500 dark:text-gray-200",
          },
        },
      ],
    },
  },
};

export const landingCards = [
  {
    id: 1,
    image: "/assets/tl-Zahlentrainer.avif",
    title: "Zahlentrainer",
    route: "/zahlentrainer",
  },
  {
    id: 2,
    image: "/assets/tl-Uhrzeittrainer.avif",
    title: "Uhrzeittrainer",
    route: "/wie-spaet-ist-es",
  },
  {
    id: 3,
    image: "/assets/tl-kulinarische-Selle.avif",
    title: "Kulinarische Seele",
    route: "/kulinarische-seele",
  },
  {
    id: 4,
    image: "/assets/tl-Raetsel.avif",
    title: "Rätsel",
    route: "/kreuzwortraetsel",
  },
  {
    id: 5,
    image: "/assets/tl-Ungarn-Insider.avif",
    title: "Ungarn Insider",
    route: "/wissenswert",
  },
  {
    id: 6,
    image: "/assets/tl-Zustand-in-einem-Wort.avif",
    title: "Zustand in einem Wort",
    route: "/einfach-lesen",
  },
  {
    id: 7,
    image: "/assets/tl-Plural.avif",
    title: "Plural",
    route: "/sprachkurs",
  },
  {
    id: 8,
    image: "/assets/tl-Makler-Tricks.avif",
    title: "Makler Tricks",
    route: "/wissenswert",
  },
  {
    id: 9,
    image: "/assets/tl-aus-dem-leben.avif",
    title: "Aus dem Leben",
    route: "/aus-dem-leben",
  },
  {
    id: 10,
    image: "/assets/tl-itt-ott.avif",
    title: "Itt-Ott",
    route: "/einfach-lesen",
  },
];

export const ArchivePageHeaderImage = ({ imageUrl, imageAlt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-auto h-auto">
      {/* Loading placeholder/skeleton */}
      {!loaded && !error && (
        <div className="w-[500px] h-[80px] bg-gray-300 animate-pulse flex items-center justify-center rounded">
          <div className="w-full h-full bg-gray-200 rounded" />
        </div>
      )}

      {/* Error placeholder */}
      {error && (
        <div className="w-[500px] h-[80px] bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      )}

      {/* Actual image */}
      {imageUrl && !error && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={500}
          height={0}
          style={{ height: "50px" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(false);
          }}
          className={`
              object-contain
              ${loaded ? "opacity-100" : "opacity-0"}
              transition-opacity duration-300
            `}
        />
      )}
    </div>
  );
};
