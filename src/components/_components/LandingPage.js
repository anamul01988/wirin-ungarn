"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import ImpressumtModal from "../ui/ImpressumModal";
import { footerLinks } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const [tickerClosed, setTickerClosed] = useState(false);
  const [allowImpressumModal, setAllowImpressumModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const route = useRouter();

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
    setTickerClosed(false);
  }, []);

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
              {
                menuName: "Ungarisch-Impulse",
                menuRoute: "/ungarisch-impulse",
              },
              {
                menuName: "SuffixHero",
                menuRoute: "/suffixhero",
              },
              {
                menuName: "Zahlentrainer",
                menuRoute: "/zahlentrainer",
              },
              {
                menuName: "memória",
                menuRoute: "/memoria",
              },
              {
                menuName: "KulTour Ungarn",
                menuRoute: "/kultour-ungarn",
              },
              {
                menuName: "Vokabel-Entdecker",
                menuRoute: "/ungarisch-lernen/vokabel-entdecker",
              },
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
              {
                menuName: "Verbarium",
                menuRoute: "/verbarium",
              },
              {
                menuName: "Vokabel-Aufkleber",
                menuRoute: "/vokabel-aufkleber",
              },
              {
                menuName: "LIEDTEXTE",
                menuRoute: "/liedtexte",
              },
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
              {
                menuName: "Ungarn",
                menuRoute: "/ungarn-insider",
              },
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
              {
                menuName: "Gemeinsam",
                menuRoute: "/gemeinsam",
              },
            ],
          },
        ].map((item, i) => (
          <div key={i} className="nav-item">
            <h3>{item.title}</h3>
            <p>{item.text}</p>

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
          </div>
        ))}
      </nav>

      {/* Cards */}
      <div>
        <div className="cards cursor-pointer" onClick={routerServerGlobal}>
          Cards will go here...
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
