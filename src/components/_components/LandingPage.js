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
      {/* Header */}
      {/* <header className="header">
        <nav className="header-buttons">
          <button className="header-btn">
            <span className="ht_text">Währungsrechner</span> EUR ⇔ HUF
          </button>
          <button className="header-btn">
            <span className="ht_text">06.08. Zsuzsanna</span> 📅
          </button>
          <button className="header-btn">
            <span className="ht_text">meine Seiten-Historie</span>
          </button>
        </nav>
        <nav className="header-buttons">
          <button className="header-btn favorites">
            <span className="ht_text">Favoriten</span> ❤
          </button>
          <button className="header-btn register">
            <span className="ht_text">Anmelden</span>
          </button>
        </nav>
      </header> */}

      {/* Sidebar */}
      <nav className="sidebar">
        {[
          {
            title: "Information",
            text: "alles über Ungarn",
            slug: "information",
            menu: [
              "Einwanderungsguide",
              "Rechtliche Grundlagen",
              "Behördengänge",
              "Steuersystem",
              "Versicherungen",
            ],
          },
          {
            title: "Sprache",
            text: "einfach lernen",
            slug: "sprache",
            menu: [
              "Ungarisch Grundkurs",
              "Vokabeltrainer",
              "Grammatik-Übungen",
              "Sprachpartner finden",
              "Online-Kurse",
            ],
          },
          {
            title: "Ungarn",
            text: "Land & Leute",
            slug: "ungarn",
            menu: [
              "Kultur & Traditionen",
              "Städte & Regionen",
              "Geschichte",
              "Sehenswürdigkeiten",
              "Ungarische Küche",
            ],
          },
          {
            title: "Community",
            text: "Gemeinsam",
            slug: "community",
            menu: [
              "Forum",
              "Lokale Gruppen",
              "Veranstaltungen",
              "Kleinanzeigen",
              "Expat-Treffen",
            ],
          },
        ].map((item, i) => (
          <div key={i} className="nav-item">
            <h3>{item.title}</h3>
            <p>{item.text}</p>

            <div className="hover-menu">
              {item.menu.map((menuItem, j) => (
                <div key={j} className="menu-item">
                  {menuItem}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

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
