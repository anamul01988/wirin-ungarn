"use client";
import React, { useState } from "react";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
const UngarischLernenPage = () => {
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

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
                sourceUrl: "/images/grammar-course.jpg",
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
                sourceUrl: "/images/crossword-puzzle.jpg",
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
                sourceUrl: "/images/hungarian-impulses.jpg",
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
                sourceUrl: "/images/suffix-hero.jpg",
              },
            },
            postContentSprachlektion: {
              postContent:
                'In „SuffixHero" lernt ihr ungarische Wortendungen auf eine ganz neue Art kennen. Fliegt mit dem Hubschrauber durch die Levels, hört euch die Sätze an und sammelt die passenden Endungen ein. Das Spiel ist perfekt, um Grammatik zu üben und dabei Spaß zu haben. Probiert es aus und verbessert eure Sprachkenntnisse im Flug!',
            },
          },
        },
      ],
    },
  };

  // Simple search function for fake data
  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredPosts([]);
      return;
    }

    const filtered = fakeData.posts.edges.filter(
      (edge) =>
        edge.node.title.toLowerCase().includes(search.toLowerCase()) ||
        edge.node.postContentSprachlektion.postContent
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredPosts([]);
  };

  // Get posts to display (filtered or all)
  const postsToShow =
    filteredPosts.length > 0 ? filteredPosts : fakeData.posts.edges;
  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      {/* Header */}
      <div className="bg-red-600 mb-4 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center">
        <Typography
          variant="h4"
          className="font-bold text-center text-[#FFD6D9]"
        >
          {fakeData.title}
        </Typography>
      </div>

      {/* Checkbox */}
      <div className="flex items-center justify-end mb-4">
        <Checkbox
          color="red"
          checked={onlyHeadings}
          onChange={(e) => setOnlyHeadings(e.target.checked)}
          label="ausschließlich Überschriften anzeigen"
          crossOrigin={undefined} // needed for React strict mode
        />
      </div>

      {/* Description */}
      <Typography
        variant="paragraph"
        className="text-green-800 font-bold leading-relaxed mb-6"
      >
        {fakeData.content} Nutze unsere vielfältigen Ressourcen, um deine
        Sprachfähigkeiten zu verbessern und deinen Start in Ungarn zu
        erleichtern. Mit unserer Hilfe meisterst du die sprachlichen
        Herausforderungen spielend!
      </Typography>

      {/* Search Box */}
      <div className="mb-6">
        <Typography variant="small" className="font-medium mb-2">
          Diese Seite durchsuchen
        </Typography>
        <div className="flex lg:flex-nowrap md:flex-wrap gap-5">
          <Input
            type="text"
            label="Suche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            crossOrigin={undefined}
          />
          <Button color="red" onClick={handleSearch}>
            SUCHE
          </Button>
          {filteredPosts.length > 0 && (
            <Button color="gray" onClick={clearSearch} className="px-4 py-2">
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        {filteredPosts.length > 0 ? (
          <>
            Suchergebnisse - Angezeigt werden {filteredPosts.length} Beiträge.
          </>
        ) : (
          <>Angezeigt werden {fakeData.posts.edges.length} Beiträge.</>
        )}
      </Typography>
      <div className="py-6 max-w-5xl mx-auto">
        {search.trim() && filteredPosts.length === 0 ? (
          <div className="text-center py-8">
            <Typography variant="h6" color="gray" className="mb-4">
              Keine Suchergebnisse gefunden
            </Typography>
            <Typography variant="paragraph" color="gray">
              Versuchen Sie es mit anderen Suchbegriffen oder schauen Sie sich
              alle verfügbaren Artikel an.
            </Typography>
          </div>
        ) : (
          postsToShow.map((edge, idx) => (
            <div key={edge.node.id}>
              <CustomPost
                title={edge.node?.title}
                image={edge.node?.featuredImage?.node?.sourceUrl}
                description={edge.node.postContentSprachlektion?.postContent}
                onlyHeadings={onlyHeadings}
                slug={edge.node.slug}
                routePrefix="sprachkurs"
              />
              {/* Divider except last */}
              {!onlyHeadings && idx < postsToShow.length - 1 && (
                <hr className="my-6 border-gray-300" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UngarischLernenPage;
