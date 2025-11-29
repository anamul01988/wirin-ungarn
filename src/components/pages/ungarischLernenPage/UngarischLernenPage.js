"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
const UngarischLernenPage = () => {
  // Fake data for Hungarian learning content
  const fakeData = {
    title: "Ungarisch Lernen",
    content:
      "Lerne Ungarisch mit unseren kostenlosen Angeboten! Als Auswanderer in Ungarn ist es wichtig, zumindest grundlegende Sprachkenntnisse zu erwerben. So findest du dich im Alltag besser zurecht und tauchst tiefer in die faszinierende Kultur ein.",
    posts: {
      edges: [
        {
          node: {
            id: "1",
            title: "Grammatikkurs",
            slug: "grammatikkurs",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2023/07/CAGRA-.ungarische-Grammatik-1.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                "In unserem etwas anderen Ungarisch-Kurs lernst du die Grundlagen und Feinheiten der ungarischen Sprache, von den ersten Schritten bis hin zu fortgeschrittenen Themen. Beginne deine Reise durch die Welt des Ungarischen und entdecke die Schönheit dieser faszinierenden Sprache.",
            },
          },
        },
        {
          node: {
            id: "2",
            title: "Kreuzworträtsel",
            slug: "kreuzwortraetsel",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2024/12/CAKWR-Kreuzwortratsel-rect.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                "Sprachen lernt man am besten, wenn es auch Spaß macht! Genau deshalb haben wir eine Reihe von Kreuzworträtseln für dich erstellt, die in verschiedenen Levels von A1 bis B2 verfügbar sind und die du online ausfüllen kannst. Ob du gerade erst anfängst oder schon fortgeschritten bist, hier findest du das passende Rätsel, um dein Ungarisch spielerisch zu verbessern.",
            },
          },
        },
        {
          node: {
            id: "3",
            title: "Ungarisch-Impulse",
            slug: "ungarisch-impulse",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/impulse_desk.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                'Mit unseren "Impulsen" bekommst du spannende Themen und Erklärungen aus den Niveaustufen A1, A2 und B1 – ganz ohne feste Reihenfolge. Lass dich vom Zufall inspirieren, entdecke neue Aspekte der ungarischen Sprache und klicke einfach weiter, wenn du einen Impuls schon kennst oder er dir zu schwierig ist. So bleibt das Lernen flexibel, motivierend und macht immer wieder aufs Neue Spaß!',
            },
          },
        },
        {
          node: {
            id: "4",
            title: "SuffixHero",
            slug: "suffixhero",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/CASUF-SuffixHero-desk.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                'In „SuffixHero" lernt ihr ungarische Wortendungen auf eine ganz neue Art kennen. Fliegt mit dem Hubschrauber durch die Levels, hört euch die Sätze an und sammelt die passenden Endungen ein. Das Spiel ist perfekt, um Grammatik zu üben und dabei Spaß zu haben. Probiert es aus und verbessert eure Sprachkenntnisse im Flug!',
            },
          },
        },
        {
          node: {
            id: "5",
            title: "Zahlentrainer",
            slug: "zahlentrainer",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/CAMEM-memoria-desk.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                "Unser Audio-Zahlentrainer hilft dir, ungarische Zahlen (Brüche, Telefonnummern, Gewichte, etc.) effektiv zu lernen. Im Alltag in Ungarn begegnest du Zahlen ständig: beim Einkaufen, im Restaurant, im öffentlichen Verkehr oder in Gesprächen. Mit guten Zahlenkenntnissen verstehst du Preise, Uhrzeiten und Daten besser und fühlst dich sicherer in der Kommunikation. Das Lern-Tool bietet verschiedene Levels von Zahlen und die Auswahl von 4 Geschwindigkeiten, so dass du es auf deinen Wissensstand anpassen kannst.",
            },
          },
        },
        {
          node: {
            id: "6",
            title: "Memory-Spiel",
            slug: "memory-spiel",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2025/03/CAKTU-KulTour-Ungarn-Desktop.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                "Mit unserem Memory-Spiel könnt ihr jetzt euer Gedächtnis trainieren und dabei ungarische Wörter und ihre Aussprache spielerisch entdecken. Wählt aus Kategorien wie Zahlen, Farben, Tieren oder auch Suffixen und Nachstellungen, deckt Karten auf und findet die passenden Paare. Dank der Audiofunktion lernt ihr auch die richtige Aussprache! Probiere es doch einfach mal aus.",
            },
          },
        },
        {
          node: {
            id: "7",
            title: "KulTour Ungarn",
            slug: "kultour-ungarn",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2025/03/CAVOE-Vokabel-Entdecker.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                "Teste dein Wissen über Ungarn mit unserem spannenden Quiz ! Tauche ein in die faszinierende Welt der ungarischen Kultur, Geschichte und Geografie, etc.. Von berühmten Persönlichkeiten über traditionelle Bräuche bis hin zu kulinarischen Spezialitäten - dieses Quiz deckt alle Facetten des Landes ab. Ob du Anfänger oder Ungarn-Experte bist, hier findest du herausfordernde Fragen, die dein Wissen erweitern und deine Neugier auf dieses vielfältige Land wecken.",
            },
          },
        },
        {
          node: {
            id: "8",
            title: "Vokabel-Entdecker",
            slug: "vokabel-aufkleber",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2025/03/CAADL-Aus-demLeben.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                "Entdecke spielerisch neue Wörter! Klicke auf ungarische Begriffe, höre die Aussprache und finde die passende Übersetzung. Wähle aus 40 spannenden Themen und erweitere deinen Wortschatz Schritt für Schritt. Perfekt für alle, die Sprachen lernen und dabei Spaß haben möchten. Starte jetzt und entdecke, wie einfach Lernen sein kann!",
            },
          },
        },

        {
          node: {
            id: "9",
            title: "Aus dem Leben",
            slug: "suffixhero",
            featuredImage: {
              node: {
                sourceUrl:
                  "https://wir-in-ungarn.hu/wiucontent/uploads/2025/02/CAVER-Verbarium-mobile.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                "Ungarisch direkt aus dem Alltag lernen: Mit Fotos von echten Schildern, Plakaten oder auch Wurfzetteln oder Speisekarten erklären wir lebensnah und verständlich, was draufsteht – inklusive spannender Grammatik, Wortschatz und kultureller Hintergrundinfos!",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="bg-[#CC2233] mb-4 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center text-[#fff]">
        <Typography
          variant="h4"
          className="archive__page_title font-bold text-center text-[#FFF]"
        >
          {fakeData.title}
        </Typography>
      </div>

      {/* Description */}
      <Typography
        variant="paragraph"
        className="archive__page_description leading-relaxed font-bold mb-6"
      >
        {fakeData.content} Nutze unsere vielfältigen Ressourcen, um deine
        Sprachfähigkeiten zu verbessern und deinen Start in Ungarn zu
        erleichtern. Mit unserer Hilfe meisterst du die sprachlichen
        Herausforderungen spielend!
      </Typography>

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        Angezeigt werden {fakeData.posts.edges.length} Beiträge.
      </Typography>
      <div className="pt-6 pb-2 max-w-5xl mx-auto">
        {fakeData.posts.edges.map((edge, idx) => (
          <div key={edge.node.id}>
            <CustomPost
              title={edge.node?.title}
              image={edge.node?.featuredImage?.node?.sourceUrl}
              description={edge.node.postContentSprachlektion?.postContent}
              onlyHeadings={false}
              slug={edge.node.slug}
              routePrefix="ungarisch-lernen"
            />
            {/* Divider except last */}
            {idx < fakeData.posts.edges.length - 1 && (
              <hr className="my-6 border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UngarischLernenPage;
