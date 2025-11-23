"use client";
import React, { useEffect, useState, useRef } from "react";
import { GetAllAusDemLebens } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { useRouter } from "next/navigation";
import "./AusdemLebenPage.css";

const AusDemLebenPage = () => {
  const [pageData, setPageData] = useState(null);
  const [ausDemLebens, setAusDemLebens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(false);
  const [errorSectionCollapsed, setErrorSectionCollapsed] = useState(true);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const galleryContainerRef = useRef(null);

  // Static gallery data (for now, until API returns data)
  const staticGalleryData = [
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
      image:
        "https://wir-in-ungarn.hu/wiucontent/uploads/2025/04/Szueleszet.jpg",
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
  ];

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const apiData = await GetAllAusDemLebens(50, null);
        console.log("Aus dem Leben data:", apiData);

        if (apiData?.data) {
          // Set page data
          if (apiData.data.pages?.nodes?.length > 0) {
            setPageData(apiData.data.pages.nodes[0]);
          }

          // Set ausDemLebens data (if available)
          if (apiData.data.ausDemLebens?.nodes?.length > 0) {
            // Transform API data to gallery format
            const transformed = apiData.data.ausDemLebens.nodes.map(
              (item, index) => ({
                id: item.databaseId || index + 1,
                slug: item.slug || "",
                image: item.featuredImage?.node?.sourceUrl || "",
                title: item.title || "",
                subtitle: item.title || "",
                content: item.content || "",
              })
            );
            setAusDemLebens(transformed);
          } else {
            // Use static data for now
            setAusDemLebens(staticGalleryData);
          }
        } else {
          // Use static data if API fails
          setAusDemLebens(staticGalleryData);
        }
      } catch (err) {
        console.error("Error fetching Aus dem Leben data:", err);
        setError("Fehler beim Laden der Daten.");
        // Use static data on error
        setAusDemLebens(staticGalleryData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get current image data
  const getImageData = React.useCallback(
    (imageId) => {
      return (
        ausDemLebens.find((item) => item.id === imageId) || ausDemLebens[0]
      );
    },
    [ausDemLebens]
  );

  // Open details - navigate to single page
  const openDetails = React.useCallback(
    (imageId) => {
      const imageData = getImageData(imageId);
      if (!imageData) return;

      // Store current image data in localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "ausDemLebenCurrentData",
            JSON.stringify({
              id: imageData.id,
              title: imageData.title,
              subtitle: imageData.subtitle,
              content: imageData.content,
              image: imageData.image,
            })
          );
        } catch (error) {
          console.error("Error storing data in localStorage:", error);
        }
      }

      // Navigate to single page using id
      router.push(`/aus-dem-leben/${imageData.id}`);
    },
    [getImageData, router]
  );

  // Close details
  const closeDetails = React.useCallback(() => {
    setCurrentImageId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location);
      url.searchParams.delete("id");
      window.history.pushState({}, "", url);
      // Re-enable body scroll on mobile
      document.body.style.overflow = "";
    }
  }, []);

  // Navigation
  const navigateToPrevious = React.useCallback(() => {
    if (currentImageId > 1) {
      openDetails(currentImageId - 1);
    }
  }, [currentImageId, openDetails]);

  const navigateToNext = React.useCallback(() => {
    if (currentImageId < ausDemLebens.length) {
      openDetails(currentImageId + 1);
    }
  }, [currentImageId, ausDemLebens.length, openDetails]);

  // Check URL for direct link
  useEffect(() => {
    if (typeof window !== "undefined" && ausDemLebens.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      if (id) {
        setCurrentImageId(parseInt(id));
        openDetails(parseInt(id));
      }
    }
  }, [ausDemLebens, openDetails]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentImageId) return;

      if (e.key === "Escape") {
        closeDetails();
      } else if (e.key === "ArrowLeft" && currentImageId > 1) {
        navigateToPrevious();
      } else if (
        e.key === "ArrowRight" &&
        currentImageId < ausDemLebens.length
      ) {
        navigateToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentImageId,
    ausDemLebens.length,
    closeDetails,
    navigateToPrevious,
    navigateToNext,
  ]);

  // Gallery scroll
  const scrollGallery = React.useCallback((direction, e) => {
    if (e) {
      e.preventDefault();
    }

    const galleryContainer =
      galleryContainerRef.current ||
      document.getElementById("galleryContainer");
    if (!galleryContainer) {
      console.warn("Gallery container not found");
      return;
    }

    // Scroll by approximately 2 columns (2 * 167px + gaps)
    const scrollAmount = 167 * 2 + 5 * 2; // 2 images + 2 gaps
    galleryContainer.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Render gallery
  const renderGallery = () => {
    // Group items into columns (2 items per column)
    const columns = [];
    for (let i = 0; i < ausDemLebens.length; i += 2) {
      columns.push(ausDemLebens.slice(i, i + 2));
    }

    return columns.map((column, colIndex) => (
      <div key={colIndex} className="ool-column">
        {column.map((item) => (
          <div
            key={item.id}
            className={`ool-image-container ${
              currentImageId === item.id ? "ool-active" : ""
            }`}
            data-id={item.id}
            onClick={() => openDetails(item.id)}
          >
            <img src={item.image} alt={item.title} />
            <div className="ool-overlay-text">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  if (loading) {
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  }

  if (error && ausDemLebens.length === 0) {
    return <div className="ool-page">{error}</div>;
  }

  const { title } = pageData || {};
  const currentImageData = currentImageId ? getImageData(currentImageId) : null;

  return (
    <div className="ool-page">
      {/* Page Header */}
      <div className="ool-page-header">
        <h1 className="ool-page-title">{title || "aus dem Leben"}</h1>
      </div>

      {/* Description Section (Collapsible) */}
      <div className="ool-description-section">
        <div
          className={`ool-description-header ${
            descriptionCollapsed ? "collapsed" : ""
          }`}
          onClick={() => setDescriptionCollapsed(!descriptionCollapsed)}
        >
          <h3>Ungarisch aus dem Leben lernen</h3>
        </div>
        <div
          className={`ool-description-content ${
            descriptionCollapsed ? "hidden" : ""
          }`}
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
            style={{ fontWeight: "bold", color: "var(--ool-primary-color)" }}
          >
            Viel Spaß beim Entdecken und Lernen!
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="ool-container">
        {/* Control Buttons */}
        <div className="ool-controls">
          <button
            className="ool-control-btn"
            onClick={(e) => scrollGallery("prev", e)}
            aria-label="Previous"
            type="button"
          >
            ←
          </button>
          <button
            className="ool-control-btn"
            onClick={(e) => scrollGallery("next", e)}
            aria-label="Next"
            type="button"
          >
            →
          </button>
        </div>

        {/* Gallery Container (Horizontally Scrollable) */}
        <div
          className="ool-gallery-container"
          id="galleryContainer"
          ref={galleryContainerRef}
        >
          <div className="ool-gallery" id="gallery">
            {renderGallery()}
          </div>
        </div>

        {/* Info Container */}
        <div className="ool-info-container">
          Click on an image to view details
        </div>
      </div>

      {/* Details Container (Hidden by default, shown when image clicked) */}
      {currentImageData && (
        <div
          className={`ool-details-container ${
            currentImageId ? "ool-show" : ""
          } ${isMobile && currentImageId ? "mobile-popup" : ""}`}
          id="detailsContainer"
        >
          <button
            className="ool-close-details"
            onClick={closeDetails}
            aria-label="Close"
          >
            ×
          </button>

          <div className="ool-details-header">
            <div className="ool-details-thumbnail" id="detailsThumbnailWrapper">
              <img
                src={currentImageData.image}
                alt={currentImageData.title}
                id="detailsThumbnail"
              />
            </div>
            <div className="ool-details-title-area">
              <h2 className="ool-details-title" id="detailsTitle">
                {currentImageData.title}
              </h2>
              <p className="ool-details-subtitle" id="detailsSubtitle">
                {currentImageData.subtitle}
              </p>
            </div>
          </div>

          <div
            className="ool-details-content"
            id="detailsContent"
            dangerouslySetInnerHTML={{ __html: currentImageData.content }}
          />
        </div>
      )}

      {/* Error Reporting Section */}
      <div className="ool-error-section">
        <div
          className={`ool-error-header ${
            errorSectionCollapsed ? "collapsed" : ""
          }`}
          onClick={() => setErrorSectionCollapsed(!errorSectionCollapsed)}
        >
          <h3>Fehler in dieser Lektion gefunden?</h3>
        </div>
        <div
          className={`ool-error-content ${
            errorSectionCollapsed ? "" : "ool-show"
          }`}
          id="errorContent"
        >
          <p>
            Wenn Sie einen Fehler in dieser Lektion gefunden haben, können Sie
            uns dies mitteilen...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AusDemLebenPage;
