"use client";
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import ImpressumtModal from "../ui/ImpressumModal";
import { footerLinks } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const LandingPage = () => {
  const [tickerClosed, setTickerClosed] = useState(false);
  const [allowImpressumModal, setAllowImpressumModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAiBtn, setOpenAiBtn] = useState(false);

  const primaryLinks = footerLinks.filter((link) => link.primary);
  const secondaryLinks = footerLinks.filter((link) => !link.primary);
  const handleOpen = () => setOpen(!open);
  const route = useRouter();
  const cardsContainerRef = useRef(null);

  // Helper function to split array into chunks of specified size
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const routerServerGlobal = () => {
    setAllowImpressumModal(true);
    handleOpen();
  };

  useEffect(() => {
    // Check ticker status and reset daily if needed
    resetTickerDaily();

    // Register GSAP ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Card data object for modal content (if needed)
      const cardData = [
        { title: "Zahlentrainer", description: "Übe Zahlen auf Ungarisch" },
        {
          title: "Uhrzeittrainer",
          description: "Lerne die Uhrzeit auf Ungarisch",
        },
        {
          title: "Kulinarische Seele",
          description: "Entdecke die ungarische Küche",
        },
        { title: "Rätsel", description: "Teste dein Wissen mit Rätseln" },
        { title: "Ungarn Insider", description: "Insider-Tipps für Ungarn" },
        {
          title: "Zustand in einem Wort",
          description: "Lerne ungarische Ausdrücke",
        },
        {
          title: "Plural",
          description: "Lerne die Pluralbildung im Ungarischen",
        },
        {
          title: "Makler-Tricks",
          description: "Worauf du bei Maklern achten solltest",
        },
        {
          title: "Aus dem Leben",
          description: "Geschichten aus dem ungarischen Alltag",
        },
        { title: "Itt-Ott", description: "Hier und da in Ungarn" },
      ];

      // Animation for hero section
      gsap
        .timeline()
        .to(".hero-title", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          ".hero-subtitle",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .to(".scroll-indicator", { opacity: 0.7, duration: 1 }, "-=0.3");

      // Add hover buttons to cards
      const cardWrappers = gsap.utils.toArray(".card-wrapper");
      cardWrappers.forEach((wrapper) => {
        const card = wrapper.querySelector(".card");
        const hoverButtons = document.createElement("div");
        hoverButtons.className = "hover-buttons";
        hoverButtons.innerHTML = `
          <button class="hover-plus"><img src="/assets/plus-icon.png" alt="+ button" style="width:40px; height:40px;"></button>
          <button class="hover-close"><img src="/assets/x-icon.png" alt="x button" style="width:40px; height:40px;"></button>
        `;
        card.appendChild(hoverButtons);

        const plusBtn = hoverButtons.querySelector(".hover-plus");
        plusBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          // Add favorite functionality here
          console.log("Added to favorites:", card);
        });

        const closeBtn = hoverButtons.querySelector(".hover-close");
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          // Hide the card with smooth animation
          gsap.to(wrapper, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
              wrapper.style.display = "none";
            },
          });
        });
      });

      // Function to determine start positions for cards
      function getStartPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const startX = Math.random() * (viewportWidth + 800) - 400;
        const startY = viewportHeight + 400;

        return { startX, startY };
      }

      // Load and process card images
      const imagePromises = [];
      cardWrappers.forEach((wrapper) => {
        const imageDiv = wrapper.querySelector(".card-image");
        if (imageDiv) {
          const styleAttr = imageDiv.getAttribute("style");
          const urlMatch = styleAttr
            ? styleAttr.match(/url\(['"]?([^'"]+)['"]?\)/)
            : null;
          if (urlMatch) {
            const url = urlMatch[1];
            imagePromises.push(
              new Promise((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                  const aspectRatio = img.naturalHeight / img.naturalWidth;
                  const containerWidth = 450;
                  const newHeight = aspectRatio * containerWidth;
                  imageDiv.style.height = `${newHeight}px`;
                  resolve();
                };
                img.onerror = resolve;
              })
            );
          }
        }
      });

      // Set up card animations after images load
      Promise.all(imagePromises).then(() => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const horizontalMargin = 0.06;
        const verticalMargin = 0.02;

        const areaWidth = viewportWidth * (1 - 2 * horizontalMargin);
        const areaHeight = viewportHeight * (1 - 2 * verticalMargin);
        const startAreaX = viewportWidth * horizontalMargin;
        const startAreaY = viewportHeight * verticalMargin;

        const finalPositions = [];
        const minDist = 300;

        // Function to find non-overlapping positions for cards
        function findGoodPosition(cardHeight) {
          const maxX = areaWidth - 450;
          const maxY = areaHeight - cardHeight;
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
        }

        // Create scroll-triggered animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".content-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        // Animate each card wrapper
        cardWrappers.forEach((wrapper, index) => {
          const cardHeight = wrapper.clientHeight;
          const pos = findGoodPosition(cardHeight);
          finalPositions.push(pos);
          const { startX, startY } = getStartPosition();

          gsap.set(wrapper, {
            x: startX,
            y: startY,
            opacity: 0,
            zIndex: index + 10,
          });

          tl.to(
            wrapper,
            {
              opacity: 1,
              duration: 2,
              ease: "power2.out",
            },
            index * 1.5
          );

          tl.to(
            wrapper,
            {
              x: pos.x,
              y: pos.y,
              duration: 4,
              ease: "power2.out",
            },
            index * 1.5
          );
        });

        // Add window resize handler
        window.addEventListener("resize", () => {
          ScrollTrigger.refresh();
        });
      });
    }
  }, []);

  const handleCloseTicker = () => {
    setTickerClosed(true);
    localStorage.setItem("tickerClosed", "true");
  };

  // Function to reset ticker visibility daily
  const resetTickerDaily = () => {
    if (typeof window !== "undefined") {
      const lastReset = localStorage.getItem("tickerLastReset");
      const today = new Date().toDateString();
      if (lastReset !== today) {
        localStorage.removeItem("tickerClosed");
        localStorage.setItem("tickerLastReset", today);
        setTickerClosed(false);
      } else {
        // Check if ticker was previously closed
        const wasClosed = localStorage.getItem("tickerClosed");
        if (wasClosed === "true") {
          setTickerClosed(true);
        }
      }
    }
  };

  return (
    <div
      className="landing-page__container"
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: "url(/assets/pattern-bg.jpg)",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="aiBtn bg-[#4a7c59] rounded-md text-lg text-white hover:bg-[#426e4f]">
        {!openAiBtn && (
          <button
            onClick={() => setOpenAiBtn(true)}
            className="flex items-center gap-2 bg-[#4a7c59] text-white font-bold rounded-md px-4 py-2 shadow-lg hover:bg-[#426e4f] transition"
          >
            AI{" "}
            <Image
              src="/assets/search-icon-white.png"
              alt="AI Icon"
              width={24}
              height={24}
            />
          </button>
        )}

        {openAiBtn && (
          <div className="flex items-center bg-[#4a7c59] rounded-md shadow-lg overflow-hidden">
            <input
              type="text"
              style={{ width: "520px" }}
              placeholder="SCHREIBE HIER WAS DU SUCHST, GERNE AUCH ALS FRAGE"
              className="px-4 py-2 text-white placeholder-white bg-transparent outline-none"
            />
            <button
              onClick={() => setOpenAiBtn(false)}
              className="bg-[#4a7c59] hover:bg-[#426e4f] px-3 py-2 text-white"
            >
              <Image
                src="/assets/search-icon-white.png"
                alt="AI Icon"
                width={24}
                height={24}
              />
            </button>
          </div>
        )}
      </div>

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
      </nav>

      {/* Cards */}
      {/* <div>
        <div className="cards cursor-pointer" onClick={routerServerGlobal}>
          Cards will go here...
        </div>
      </div> */}

      <div className="hero-section">
        <div className="panel">
          <h1 className="top-text">Schön, dass du hier bist bei</h1>

          <div className="hero_logo">
            <img src="/assets/WIU-logo.png" alt="Main Logo" />
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

      <div
        className="cards-container"
        id="cardsContainer"
        ref={cardsContainerRef}
      >
        {[
          {
            image: "/assets/tl-Zahlentrainer.avif",
            title: "Zahlentrainer",
            route: "/zahlentrainer",
          },
          {
            image: "/assets/tl-Uhrzeittrainer.avif",
            title: "Uhrzeittrainer",
            route: "/wie-spaet-ist-es",
          },
          {
            image: "/assets/tl-kulinarische-Selle.avif",
            title: "Kulinarische Seele",
            route: "/kulinarische-seele",
          },
          {
            image: "/assets/tl-Raetsel.avif",
            title: "Rätsel",
            route: "/kreuzwortraetsel",
          },
          {
            image: "/assets/tl-Ungarn-Insider.avif",
            title: "Ungarn Insider",
            route: "/wissenswert",
          },
          {
            image: "/assets/tl-Zustand-in-einem-Wort.avif",
            title: "Zustand in einem Wort",
            route: "/einfach-lesen",
          },
          {
            image: "/assets/tl-Plural.avif",
            title: "Plural",
            route: "/sprachkurs",
          },
          {
            image: "/assets/tl-Makler-Tricks.avif",
            title: "Makler Tricks",
            route: "/wissenswert",
          },
          {
            image: "/assets/tl-aus-dem-leben.avif",
            title: "Aus dem Leben",
            route: "/aus-dem-leben",
          },
          {
            image: "/assets/tl-itt-ott.avif",
            title: "Itt-Ott",
            route: "/einfach-lesen",
          },
        ].map((card, index) => (
          <div key={index} className="card-wrapper">
            <div
              className="card"
              onClick={() => {
                const modal = document.getElementById("modal");
                document.getElementById(
                  "modalTitle"
                ).textContent = `${card.title}`;
                document.getElementById(
                  "modalText"
                ).textContent = `Klicken Sie auf "Zur Seite", um mehr über ${card.title} zu erfahren.`;

                // Add a button to navigate to the page
                const buttonContainer =
                  modal.querySelector(".modal-content div");
                if (buttonContainer) {
                  // Clear existing buttons first
                  const existingNavigateBtn =
                    buttonContainer.querySelector(".navigate-btn");
                  if (existingNavigateBtn) {
                    existingNavigateBtn.remove();
                  }

                  // Create and add the navigation button
                  const navigateBtn = document.createElement("button");
                  navigateBtn.className = "close-modal navigate-btn";
                  navigateBtn.style.backgroundColor = "#4a7c59";
                  navigateBtn.textContent = "Zur Seite";
                  navigateBtn.onclick = () => {
                    route.push(card.route);
                  };
                  buttonContainer.appendChild(navigateBtn);
                }

                modal.style.display = "flex";
              }}
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url('${card.image}')` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="content-section"
        style={{ minHeight: "300vh", position: "relative", zIndex: 2 }}
      ></div>

      {/* Modal for card details */}
      <div className="modal" id="modal" style={{ display: "none" }}>
        <div className="modal-content">
          <h2
            id="modalTitle"
            style={{
              color: "#4a7c59",
              fontFamily: "'Roboto Condensed', sans-serif",
              marginBottom: "15px",
            }}
          >
            Card Title
          </h2>
          <p
            id="modalText"
            style={{
              marginBottom: "20px",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            Card details will appear here
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button
              className="close-modal"
              onClick={() => {
                document.getElementById("modal").style.display = "none";
              }}
              style={{ backgroundColor: "#4a7c59", marginRight: "10px" }}
            >
              Schließen
            </button>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="main-logo">
        <img src="/assets/WIU-logo.png" alt="Wir In Ungarn Logo" />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* Ticker */}
          {!tickerClosed && (
            <div
              className="ticker-container"
              style={{
                margin: "0",
                outline: "5px solid #ffffff",
              }}
            >
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

          {/* <div>
            <div className="cards cursor-pointer" onClick={routerServerGlobal}>
              Cards will go here...
            </div>
          </div> */}

          {/* Footer Links */}

          <div className="relative">
            {/* Main Footer Links */}
            <div className="bg-[#4a7c59] p-3 rounded-lg border-[5px] border-white shadow-lg">
              <div className="flex flex-wrap items-center">
                {primaryLinks.map((link, index) => (
                  <React.Fragment key={link.key}>
                    <Link
                      href={link.endpoint}
                      className="text-white hover:text-gray-200 transition-colors text-sm font-medium px-1 whitespace-nowrap"
                    >
                      {link.title}
                    </Link>
                    {index < primaryLinks.length - 1 && (
                      <span className="text-white">|</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-white">|</span>

                {/* More Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-gray-200 transition-colors text-sm font-medium flex items-center gap-1 px-1"
                  >
                    more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                      />

                      {/* Menu */}
                      <div className="absolute bottom-full right-0 mb-2 bg-[#e3e3e3] rounded-lg shadow-xl border-[3px] border-white py-2 min-w-[220px] z-20">
                        {secondaryLinks.map((link) => (
                          <Link
                            key={link.key}
                            href={link.endpoint}
                            className="block px-4 py-2.5 text-sm font-semibold hover:bg-[#d2d0d0] transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
