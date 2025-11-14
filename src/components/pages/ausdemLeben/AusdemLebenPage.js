"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";

/**
 * Aus dem Leben Gallery - Next.js client component
 * - paste galleryData from your HTML if you want to edit items
 * - or replace galleryData with an API fetch to WPGraphQL / REST
 */

const galleryData = [
  {
    id: 1,
    image: "https://wir-in-ungarn.hu/wiucontent/uploads/2023/07/Zseton.jpg",
    title: "Ausfahrt mit Chip",
    subtitle: "Jeton für Verlassen des Parkplat...",
    content:
      "<p>Wie man den Parkplatz mit einem Chip verlässt - eine praktische Einführung in ungarische Parkplatzsysteme.</p>",
  },
  {
    id: 2,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/atlagos-tapertek.jpg",
    title: "Joghurt-Nährwerte",
    subtitle: "Die Nährwerttabelle genau verste...",
    content:
      "<p>Lerne die ungarischen Begriffe für Nährwerte und verstehe Produktverpackungen besser.</p>",
  },
  {
    id: 3,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/koeszoenjuek-hogy-vasarolt.jpg",
    title: "Danke & Tschüss!",
    subtitle: "Ein freundlicher Abschied aus dem...",
    content:
      "<p>Die freundliche Art, sich bei Kunden zu bedanken - wichtige Höflichkeitsformeln auf Ungarisch.</p>",
  },
  {
    id: 4,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/Foeldhivatal.jpg",
    title: "Katasteramt",
    subtitle: "Wer ist zuständig für Grundstü...",
    content:
      "<p>Verstehe die Begriffe rund um Grundstücke und Behörden in Ungarn.</p>",
  },
  {
    id: 5,
    image: "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/Szueleszet.jpg",
    title: "Klinik-Abteilung",
    subtitle: "Wegweiser im Krankenhaus: Diese A...",
    content:
      "<p>Wichtige medizinische Begriffe und Abteilungsnamen im ungarischen Krankenhaus.</p>",
  },
  {
    id: 6,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2023/07/vakalathullas.jpg",
    title: "Achtung, Putz!",
    subtitle: "Diesen Bereich unbedingt meiden",
    content:
      "<p>Warnschilder verstehen - wichtig für deine Sicherheit auf Baustellen.</p>",
  },
  {
    id: 7,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/sporolj-veluenk.jpg",
    title: "günstiger einkaufen",
    subtitle: "Spare mit uns - Woche für Woche ...",
    content:
      "<p>Wie du bei Werbeangeboten Geld sparen kannst - Vokabeln fürs Shopping.</p>",
  },
  {
    id: 8,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/Kinai-Buefe.jpg",
    title: "Asiatisch essen",
    subtitle: "Öffnungszeiten verstehen, um nic...",
    content:
      "<p>Öffnungszeiten und Restaurantbegriffe - damit du nicht vor verschlossener Tür stehst.</p>",
  },
  {
    id: 9,
    image: "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/Parkhaus.jpg",
    title: "Parkhaus-Tarife",
    subtitle: "Öffnungszeiten und Gebühren des...",
    content:
      "<p>Verstehe Parkhaus-Tarife und Öffnungszeiten auf Ungarisch.</p>",
  },
  {
    id: 10,
    image:
      "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/arcsoekkentett-Termek.jpg",
    title: "Schnäppchen-Alarm",
    subtitle: "Dieses Produkt ist jetzt günstig...",
    content:
      "<p>Reduzierte Preise erkennen - so findest du die besten Angebote im Supermarkt.</p>",
  },
  // ... add the rest of your items (I've included top 10 here for brevity)
];

/* helper: chunk into columns of 2 items each */
function chunkColumns(arr, size = 2) {
  const cols = [];
  for (let i = 0; i < arr.length; i += size) cols.push(arr.slice(i, i + size));
  return cols;
}

export default function AusdemLebenGallery() {
  const [currentImageId, setCurrentImageId] = useState(null); // currently opened detail id
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [errorCollapsed, setErrorCollapsed] = useState(true);
  const galleryContainerRef = useRef(null);
  const detailsContainerRef = useRef(null);

  // memoize columns
  const columns = useMemo(() => chunkColumns(galleryData, 2), []);

  /* open details panel for id */
  function openDetails(id) {
    const numericId = Number(id);
    const item = galleryData.find((g) => g.id === numericId);
    if (!item) return;
    setCurrentImageId(numericId);
    setIsDetailsOpen(true);

    // when on small screens, prevent body scroll
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 767) {
        document.body.style.overflow = "hidden";
      }
      // update query param
      const url = new URL(window.location.href);
      url.searchParams.set("id", String(numericId));
      window.history.pushState({}, "", url);
    }
  }

  /* close details */
  function closeDetails() {
    setIsDetailsOpen(false);
    setCurrentImageId(null);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "";
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      window.history.pushState({}, "", url);
    }
  }

  /* navigate prev/next inside details */
  function navigateToPrevious() {
    if (!currentImageId) return;
    const prevId = currentImageId - 1;
    if (prevId >= 1) openDetails(prevId);
  }
  function navigateToNext() {
    if (!currentImageId) return;
    const nextId = currentImageId + 1;
    if (nextId <= galleryData.length) openDetails(nextId);
  }

  /* set active class logic */
  function isActive(id) {
    return currentImageId === id;
  }

  /* scroll gallery by approximate column width */
  function scrollGallery(shift = 1) {
    const galleryContainer = galleryContainerRef.current;
    if (!galleryContainer) return;
    const columnWidth = 340; // approximate column width — adjust or compute dynamically
    galleryContainer.scrollBy({left: columnWidth * shift, behavior: "smooth"});
  }

  /* keyboard navigation */
  useEffect(() => {
    function onKeyDown(e) {
      if (!isDetailsOpen) return;
      if (e.key === "Escape") {
        closeDetails();
      } else if (e.key === "ArrowLeft") {
        navigateToPrevious();
      } else if (e.key === "ArrowRight") {
        navigateToNext();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDetailsOpen, currentImageId]);

  /* watch resize to toggle mobile popup behavior */
  useEffect(() => {
    function onResize() {
      if (!isDetailsOpen) return;
      if (window.innerWidth <= 767) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isDetailsOpen]);

  /* on mount: check URL param id for direct link */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      openDetails(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeItem =
    galleryData.find((g) => g.id === currentImageId) ?? galleryData[0];

  return (
    <div className="mx-auto ool-page max-w-6xl p-4">
      {/* Page Header */}
      <div className="ool-page-header">
        <h1 className="ool-page-title">aus dem Leben</h1>
      </div>

      {/* Description Section (Collapsible) */}
      <div className="ool-description-section">
        <button
          id="descriptionHeader"
          type="button"
          className="ool-description-header flex items-center w-full text-left"
          onClick={() => setCollapsed((s) => !s)}
          aria-expanded={!collapsed}
          aria-controls="descriptionContent"
        >
          <h3 className="m-0">Ungarisch aus dem Leben lernen</h3>
          <span
            aria-hidden
            style={{
              marginLeft: "auto",
              transform: collapsed ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "transform .2s",
            }}
          >
            ▼
          </span>
        </button>

        <div
          id="descriptionContent"
          className={`ool-description-content ${
            collapsed ? "hidden" : "block"
          } mt-3`}
          aria-hidden={collapsed}
        >
          <p className="ool-description-text">
            Die ungarische Sprache begegnet dir überall – auf Schildern,
            Verpackungen, Speisekarten und Plakaten. Warum nicht diese echten
            Beispiele aus der Praxis nutzen, um Ungarisch zu lernen? Sie sind
            voller nützlicher Vokabeln und zeigen die Grammatik in Aktion!
          </p>

          <p className="ool-description-text">
            Stöbere durch die Galerie und klicke einfach auf ein Bild, das dich
            interessiert oder neugierig macht. Du erhältst dann eine
            detaillierte Erklärung, was die einzelnen Wörter bedeuten und welche
            grammatikalischen Besonderheiten dahinterstecken.
          </p>

          <p
            className="ool-description-text"
            style={{fontWeight: "bold", color: "var(--ool-primary-color)"}}
          >
            Viel Spaß beim Entdecken und Lernen!
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="ool-container mb-6">
        <div className="ool-controls flex gap-2 justify-end mb-3">
          <button
            className="ool-control-btn p-2 rounded bg-gray-100"
            id="prevBtn"
            aria-label="Previous"
            onClick={() => scrollGallery(-1)}
          >
            ←
          </button>
          <button
            className="ool-control-btn p-2 rounded bg-gray-100"
            id="nextBtn"
            aria-label="Next"
            onClick={() => scrollGallery(1)}
          >
            →
          </button>
        </div>

        {/* Gallery */}
        <div
          className="ool-gallery-container overflow-x-auto"
          id="galleryContainer"
          ref={galleryContainerRef}
        >
          <div className="ool-gallery flex gap-4" id="gallery">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="ool-column flex-shrink-0 w-80">
                {col.map((item) => (
                  <div
                    key={item.id}
                    data-id={item.id}
                    className={`ool-image-container mb-4 cursor-pointer relative overflow-hidden rounded-md border ${
                      isActive(item.id) ? "ool-active ring-2 ring-red-500" : ""
                    }`}
                    onClick={() => openDetails(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        openDetails(item.id);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="ool-overlay-text p-3 bg-white/80 absolute left-0 bottom-0 right-0">
                      <h3 className="text-md font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="ool-info-container mt-3 text-sm text-gray-600">
          Click on an image to view details
        </div>
      </div>

      {/* Details panel */}
      <div
        id="detailsContainer"
        ref={detailsContainerRef}
        className={`ool-details-container fixed inset-0 z-50 flex items-start justify-center p-6 transition-opacity ${
          isDetailsOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isDetailsOpen}
      >
        <div
          className={`ool-details-panel relative w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-auto ${
            window?.innerWidth <= 767 ? "h-full" : "max-h-[85vh]"
          }`}
        >
          <button
            className="ool-close-details absolute right-4 top-4 text-2xl"
            id="closeDetails"
            aria-label="Close"
            onClick={closeDetails}
          >
            ×
          </button>

          <div className="ool-details-header flex gap-4 p-6">
            <div className="ool-details-thumbnail w-36 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <img
                id="detailsThumbnail"
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ool-details-title-area">
              <h2 id="detailsTitle" className="text-2xl font-bold">
                {activeItem.title}
              </h2>
              <p id="detailsSubtitle" className="text-sm text-gray-500">
                {activeItem.subtitle}
              </p>
            </div>
          </div>

          <div
            id="detailsContent"
            className="ool-details-content p-6 prose max-w-none"
            dangerouslySetInnerHTML={{__html: activeItem.content}}
          />

          {/* Prev / Next within details */}
          <div className="p-6 flex justify-between">
            <button
              className="px-4 py-2 rounded bg-gray-100"
              onClick={navigateToPrevious}
              disabled={currentImageId <= 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-100"
              onClick={navigateToNext}
              disabled={currentImageId >= galleryData.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Error reporting collapsible */}
      <div className="ool-error-section mt-8">
        <div
          className="ool-error-header flex justify-between items-center cursor-pointer"
          onClick={() => setErrorCollapsed(!errorCollapsed)}
        >
          <h3>Fehler in dieser Lektion gefunden?</h3>
          <button aria-label="Toggle error" className="ml-2">
            {errorCollapsed ? "▼" : "▲"}
          </button>
        </div>
        <div
          className={`${
            errorCollapsed ? "hidden" : "block"
          } ool-error-content mt-2`}
        >
          <p>
            Wenn Sie einen Fehler in dieser Lektion gefunden haben, können Sie
            uns dies mitteilen...
          </p>
        </div>
      </div>
    </div>
  );
}
