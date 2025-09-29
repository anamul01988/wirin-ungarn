"use client";
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import ImpressumtModal from "../ui/ImpressumModal";
import { footerLinks } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingPage = () => {
  const [tickerClosed, setTickerClosed] = useState(false);
  const [allowImpressumModal, setAllowImpressumModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    number: 0,
  });
  const handleOpen = () => setOpen(!open);
  const route = useRouter();

  // Refs for animations
  const cardsContainerRef = useRef(null);
  const contentSectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Card data structure
  const cardData = [
    {
      title: "Zahlentrainer",
      description:
        "Master Hungarian numbers with interactive exercises and real-world examples.",
      image: "/Merged/tl-Zahlentrainer.avif",
      route: "/zahlentrainer",
    },
    {
      title: "Uhrzeittrainer",
      description:
        "Learn to tell time in Hungarian with practical time-telling exercises.",
      image: "/Merged/tl-Uhrzeittrainer.avif",
      route: "/uhrzeittrainer",
    },
    {
      title: "Kulinarische Seele",
      description:
        "Discover Hungarian cuisine and culinary traditions through interactive content.",
      image: "/Merged/tl-kulinarische-Selle.avif",
      route: "/kulinarische-seele",
    },
    {
      title: "Rätsel",
      description:
        "Solve Hungarian puzzles and brain teasers to improve your language skills.",
      image: "/Merged/tl-Raetsel.avif",
      route: "/raetsel",
    },
    {
      title: "Ungarn-Insider",
      description:
        "Get insider knowledge about Hungary, its culture, and daily life.",
      image: "/Merged/tl-Ungarn-Insider.avif",
      route: "/ungarn-insider",
    },
    {
      title: "Zustand in einem Wort",
      description:
        "Learn to express states and conditions using single Hungarian words.",
      image: "/Merged/tl-Zustand-in-einem-Wort.avif",
      route: "/zustand-in-einem-wort",
    },
    {
      title: "Plural",
      description:
        "Master Hungarian plural forms with comprehensive exercises and examples.",
      image: "/Merged/tl-Plural.avif",
      route: "/plural",
    },
    {
      title: "Makler-Tricks",
      description:
        "Learn real estate terminology and negotiation strategies in Hungarian.",
      image: "/Merged/tl-Makler-Tricks.avif",
      route: "/makler-tricks",
    },
    {
      title: "Aus dem Leben",
      description:
        "Experience real-life Hungarian conversations and everyday situations.",
      image: "/Merged/tl-aus-dem-leben.avif",
      route: "/aus-dem-leben",
    },
    {
      title: "Itt-Ott",
      description:
        "Learn location prepositions and spatial relationships in Hungarian.",
      image: "/Merged/tl-itt-ott.avif",
      route: "/itt-ott",
    },
  ];

  // Helper function to split array into chunks of specified size
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Animation functions
  const getStartPosition = (index) => {
    if (typeof window === "undefined") return { startX: 0, startY: 0 };

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Position cards off-screen to the right initially
    const startX = viewportWidth + 200;
    const startY = viewportHeight * 0.3 + index * 50; // Stagger vertically

    return { startX, startY };
  };

  const findGoodPosition = (
    cardHeight,
    finalPositions,
    areaWidth,
    areaHeight,
    startAreaX,
    startAreaY
  ) => {
    const maxX = areaWidth - 450;
    const maxY = areaHeight - cardHeight;
    const minDist = 300;

    for (let attempts = 0; attempts < 50; attempts++) {
      const x = startAreaX + Math.random() * maxX;
      const y = startAreaY + Math.random() * maxY;
      let tooClose = false;

      for (let pos of finalPositions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < minDist) {
          tooClose = true;
          break;
        }
      }

      if (!tooClose) {
        return { x, y };
      }
    }

    return {
      x: startAreaX + Math.random() * maxX,
      y: startAreaY + Math.random() * maxY,
    };
  };

  const openModal = (title, description, number) => {
    setModalData({ title, description, number });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCardClick = (card, index) => {
    openModal(card.title, card.description, index + 1);
  };

  const handleCardRoute = (cardRoute) => {
    route.push(cardRoute);
  };

  const handleCardHide = (index) => {
    if (cardRefs.current[index]) {
      gsap.to(cardRefs.current[index], {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        onComplete: () => {
          if (cardRefs.current[index]) {
            cardRefs.current[index].style.display = "none";
          }
        },
      });
    }
  };

  const routerServerGlobal = () => {
    setAllowImpressumModal(true);
    handleOpen();
  };

  useEffect(() => {
    setTickerClosed(false);
  }, []);

  // Initialize card animations
  useEffect(() => {
    if (typeof window === "undefined" || !cardsContainerRef.current) {
      console.log("Cards container not ready");
      return;
    }

    const cardWrappers = cardRefs.current.filter((ref) => ref !== null);
    console.log("Card wrappers found:", cardWrappers.length);
    if (cardWrappers.length === 0) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const horizontalMargin = 0.06;
    const verticalMargin = 0.02;

    const areaWidth = viewportWidth * (1 - 2 * horizontalMargin);
    const areaHeight = viewportHeight * (1 - 2 * verticalMargin);
    const startAreaX = viewportWidth * horizontalMargin;
    const startAreaY = viewportHeight * verticalMargin;

    const finalPositions = [];

    // Calculate final positions for all cards
    cardWrappers.forEach((wrapper, index) => {
      if (!wrapper) return;

      const cardHeight = wrapper.clientHeight || 300;
      const pos = findGoodPosition(
        cardHeight,
        finalPositions,
        areaWidth,
        areaHeight,
        startAreaX,
        startAreaY
      );
      finalPositions.push(pos);
    });

    // Set initial state for all cards - visible but positioned off-screen
    cardWrappers.forEach((wrapper, index) => {
      if (!wrapper) return;

      const { startX, startY } = getStartPosition(index);

      gsap.set(wrapper, {
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0.8,
        zIndex: index + 100,
      });
    });

    // Test: Show first card immediately for debugging
    if (cardWrappers[0]) {
      console.log("Setting up test card visibility");
      gsap.set(cardWrappers[0], {
        x: 100,
        y: 100,
        opacity: 1,
        scale: 1,
      });
    }

    // Create a single scroll trigger for all cards
    ScrollTrigger.create({
      trigger: contentSectionRef.current || document.body,
      start: "top bottom", // Start when content section comes into view
      end: "bottom top",
      onEnter: () => {
        console.log("Scroll trigger activated - showing cards");
        // Show all cards when scrolling past hero section
        cardWrappers.forEach((wrapper, index) => {
          if (!wrapper) return;

          console.log(
            `Animating card ${index} to position:`,
            finalPositions[index]
          );
          gsap.to(wrapper, {
            x: finalPositions[index].x,
            y: finalPositions[index].y,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: index * 0.2, // Stagger the animation
          });
        });
      },
      onLeave: () => {
        console.log("Scroll trigger left - keeping cards visible");
        // Keep cards visible when scrolling further down
      },
      onEnterBack: () => {
        console.log("Scroll trigger entered back - showing cards again");
        // Show cards again when scrolling back down
        cardWrappers.forEach((wrapper, index) => {
          if (!wrapper) return;

          gsap.to(wrapper, {
            x: finalPositions[index].x,
            y: finalPositions[index].y,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.1,
          });
        });
      },
      onLeaveBack: () => {
        console.log("Scroll trigger left back - hiding cards");
        // Hide all cards when scrolling back to hero section
        cardWrappers.forEach((wrapper, index) => {
          if (!wrapper) return;

          const { startX, startY } = getStartPosition(index);
          gsap.to(wrapper, {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "power2.in",
            delay: index * 0.05, // Quick stagger for hiding
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cardData]);

  const handleCloseTicker = () => {
    setTickerClosed(true);
  };

  return (
    <div className="landing-page__container">
      {/* Sidebar */}
      <nav className="sidebar">
        {[
          {
            title: "Information",
            text: "alles über Ungarn",
            slug: "information",
            menu: [
              {
                menuName: "WISSEENWERT",
                menuRoute: "/wissenswert",
              },
              {
                menuName: "SHORTS",
                menuRoute: "/shorts",
              },
              {
                menuName: "KATEGORIEN",
                menuRoute: "/kategorien",
              },
            ],
          },
          {
            title: "Sprache",
            text: "einfach lernen",
            slug: "sprache",
            menu: [
              {
                menuName: "GRAMMATIKKURS",
                menuRoute: "/sprachkurs",
              },
              {
                menuName: "Kreuzworträtsel",
                menuRoute: "/kreuzwortraetsel",
              },
              // {
              //   menuName: "Ungarisch-Impulse",
              //   menuRoute: "/ungarisch-impulse",
              // },
              {
                menuName: "SuffixHero",
                menuRoute: "/suffixhero",
              },
              // {
              //   menuName: "Zahlentrainer",
              //   menuRoute: "/zahlentrainer",
              // },
              {
                menuName: "memória",
                menuRoute: "/memoria",
              },
              {
                menuName: "Vokabel-Aufkleber",
                menuRoute: "/vokabel-aufkleber",
              },
              {
                menuName: "LIEDTEXTE",
                menuRoute: "/liedtexte",
              },
              {
                menuName: "KulTour Ungarn",
                menuRoute: "/kultour-ungarn",
              },
              // {
              //   menuName: "Vokabel-Entdecker",
              //   menuRoute: "/ungarisch-lernen/vokabel-entdecker",
              // },
              {
                menuName: "aus dem Leben",
                menuRoute: "/aus-dem-leben",
              },
              {
                menuName: "EINFACH LESEN",
                menuRoute: "/einfach-lesen",
              },
              {
                menuName: "Wie spät ist es?",
                menuRoute: "/wie-spaet-ist-es",
              },
              // {
              //   menuName: "Verbarium",
              //   menuRoute: "/verbarium",
              // },
            ],
          },
          {
            title: "Ungarn",
            text: "Land & Leute",
            slug: "ungarn",
            menu: [
              // {
              //   menuName: "Land & Leute",
              //   menuRoute: "/land-leute",
              // },
              // {
              //   menuName: "Ungarn",
              //   menuRoute: "/ungarn-insider",
              // },
              {
                menuName: "kulinarische Seele",
                menuRoute: "/kulinarische-seele",
              },
              {
                menuName: "AUSFLUGSZIELE",
                menuRoute: "/ausflugsziele",
              },
            ],
          },
          {
            title: "Community",
            text: "Gemeinsam",
            slug: "community",
            menu: [
              // {
              //   menuName: "Gemeinsam",
              //   menuRoute: "/gemeinsam",
              // },
            ],
          },
        ].map((item, i) => (
          <div key={i} className="nav-item">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.slug !== "community" && (
              <div className="hover-menu">
                {chunkArray(item.menu, 6).map((column, columnIndex) => (
                  <div key={columnIndex} className="menu-column">
                    {column.map((menuItem, j) => (
                      <div
                        key={j}
                        className="menu-item cursor-pointer"
                        {...(item.slug === "sprache"
                          ? { onClick: () => route.push(menuItem.menuRoute) }
                          : { onClick: () => route.push(menuItem.menuRoute) })}
                      >
                        {item.slug === "sprache"
                          ? menuItem.menuName
                          : menuItem.menuName}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div
          className="nav-item nav-cards cursor-pointer"
          onClick={routerServerGlobal}
        >
          Cards will go here...
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="panel">
          <h1 className="top-text">Schön, dass du hier bist bei</h1>

          <div className="hero_logo">
            <img src="/Merged/Logo-Welcome.png" alt="Main Logo" />
            <div className="clearfix"></div>
          </div>
          <div className="clearfix"></div>

          <p className="subtitle">
            Entdecke einen Stapel voller Inspiration und Wissen und viele
            Themen, die deinen Alltag in Ungarn bereichern werden. Scrolle
            einfach nach unten und lass dich überraschen. Oder nutze
            traditionell die Navigation hier links.
          </p>

          <p className="body-text">
            Jede Karte ist ein eigenes Thema – klicke sie an um die Inhalte dazu
            aufzurufen. Mit dem <span className="x_icon"></span> blendest du
            aus, was du schon kennst oder Dich nicht interessiert und mit dem{" "}
            <span className="plus_icon"></span> bekommst Du mehr aus diesem
            Themenbereich. Und wenn du etwas ganz Bestimmtes wissen möchtest:
            Die Suche oben rechts beantwortet dir auch komplette Fragen.
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="cards-container" ref={cardsContainerRef}>
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card-wrapper"
            ref={(el) => (cardRefs.current[index] = el)}
            onClick={() => handleCardClick(card, index)}
          >
            <div className="card">
              <div
                className="card-image"
                style={{ backgroundImage: `url('${card.image}')` }}
              ></div>
              <div className="hover-buttons">
                <button
                  className="hover-plus"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardRoute(card.route);
                  }}
                >
                  <img src="/Merged/plus-icon.png" alt="+ button" />
                </button>
                <button
                  className="hover-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardHide(index);
                  }}
                >
                  <img src="/Merged/x-icon.png" alt="x button" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Section for Scroll Trigger */}
      <div className="content-section" ref={contentSectionRef}></div>

      {/* Logo */}
      <div className="main-logo">
        <img src="/assets/WIU-logo.png" alt="Wir In Ungarn Logo" />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* Ticker */}
          {!tickerClosed && (
            <div className="ticker-container">
              <div className="ticker-label">UNGARN-INSIDER</div>
              <div className="ticker-content">
                <div className="ticker-wrapper">
                  {[
                    "Neue Soros-Netzwerk Enthüllungen",
                    "300% Preisunterschied: Warenkorb im Europa-Vergleich",
                    "Streit um Smalltalk: Was Ungarn wirklich denken",
                    "EU-Kommission kritisiert ungarische Mediengesetze",
                    "Budapest: Neue Entwicklungen am Immobilienmarkt",
                  ].map((news, i, arr) => (
                    <React.Fragment key={i}>
                      <span className="ticker-item">
                        <a href="#" className="news-link">
                          {news}
                        </a>
                      </span>
                      {i < arr.length - 1 && (
                        <span className="ticker-separator">|</span>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Duplicate for smooth scroll */}
                  {[
                    "Neue Soros-Netzwerk Enthüllungen",
                    "300% Preisunterschied: Warenkorb im Europa-Vergleich",
                    "Streit um Smalltalk: Was Ungarn wirklich denken",
                    "EU-Kommission kritisiert ungarische Mediengesetze",
                    "Budapest: Neue Entwicklungen am Immobilienmarkt",
                  ].map((news, i, arr) => (
                    <React.Fragment key={"dup-" + i}>
                      <span className="ticker-item">
                        <a href="#" className="news-link">
                          {news}
                        </a>
                      </span>
                      {i < arr.length - 1 && (
                        <span className="ticker-separator">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button
                className="close-button"
                onClick={handleCloseTicker}
                aria-label="Schließen"
              >
                ✕
              </button>
            </div>
          )}

          {/* Footer Links */}
          <div className="footer-links">
            {footerLinks.map((link) => (
              <Link key={link.key} href={link.endpoint} className="footer-link">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Card Modal */}
      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <h2 style={{ marginBottom: "1rem", color: "#333" }}>
              Card {modalData.number}: {modalData.title}
            </h2>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              {modalData.description} This is card number {modalData.number} in
              our collection. Click anywhere outside or the close button to
              dismiss.
            </p>
          </div>
        </div>
      )}

      {/* Impressum Modal */}
      {allowImpressumModal && (
        <ImpressumtModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
        />
      )}
    </div>
  );
};

export default LandingPage;
