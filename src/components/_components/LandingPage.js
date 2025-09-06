"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import ImpressumtModal from "../ui/ImpressumModal";
import HomePage from "../pages/home/Home";

const LandingPage = () => {
  const [tickerClosed, setTickerClosed] = useState(false);
  const [allowImpressumModal, setAllowImpressumModal] = useState(false);
  const [open, setOpen] = useState(false);
  const route = useRouter();
  const handleOpen = () => setOpen(!open);
  const routerServerGlobal = () => {
    setAllowImpressumModal(true);
    handleOpen();
    // return <ImpressumtModal />;
  };
  //   // Load from localStorage when component mounts
  //   useEffect(() => {
  //     const closed = localStorage.getItem("tickerClosed");
  //     if (closed === "true") {
  //       setTickerClosed(true);
  //     }

  //     // Reset ticker visibility daily
  //     const today = new Date().toDateString();
  //     const lastReset = localStorage.getItem("tickerLastReset");
  //     if (lastReset !== today) {
  //       localStorage.removeItem("tickerClosed");
  //       localStorage.setItem("tickerLastReset", today);
  //       setTickerClosed(false);
  //     }
  //   }, []);

  //   const handleCloseTicker = () => {
  //     setTickerClosed(true);
  //     localStorage.setItem("tickerClosed", "true");
  //   };
  // //   ---------------------------

  useEffect(() => {
    setTickerClosed(false);
  }, []);

  const handleCloseTicker = () => {
    setTickerClosed(true);
  };

  // Function to render ticker items
  const renderNewsItems = (keyPrefix) => {
    const newsList = [
      "Neue Soros-Netzwerk Enthüllungen",
      "300% Preisunterschied: Warenkorb im Europa-Vergleich",
      "Streit um Smalltalk: Was Ungarn wirklich denken",
      "EU-Kommission kritisiert ungarische Mediengesetze",
      "Budapest: Neue Entwicklungen am Immobilienmarkt",
    ];

    return newsList.map((news, i, arr) => (
      <React.Fragment key={`${keyPrefix}-${i}`}>
        <span className="ticker-item">
          <a href="#" className="news-link">
            {news}
          </a>
        </span>
        {i < arr.length - 1 && <span className="ticker-separator">|</span>}
      </React.Fragment>
    ));
  };

  return (
    <div className="landing-page__container">
      {/* Header */}
      <header className="header">
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
      </header>

      {/* Sidebar */}
      <nav className="sidebar">
        {[
          { title: "Information", text: "alles über Ungarn" },
          { title: "Sprache", text: "einfach lernen" },
          { title: "Ungarn", text: "Land & Leute" },
          { title: "Community", text: "Gemeinsam" },
        ].map((item, i) => (
          <div
            key={i}
            className="nav-item"
            onClick={(e) => {
              e.currentTarget.style.transform = "scale(0.98)";
              setTimeout(() => {
                e.currentTarget.style.transform = "scale(1)";
              }, 100);
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </nav>

      <div>
        <div className="cards" onClick={routerServerGlobal}>
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
            {[
              "Neueste Beiträge",
              "Philosophie",
              "Datenschutz",
              "Ungarn-Insider",
              "Transparenz",
              "Neuigkeiten",
              "Kontakt",
              "WIU-Münzen",
              "Karriere",
              "Cookie-Richtlinie",
              "Über uns",
              "Impressum",
              "Soziale Projekte",
              "Kooperationen",
            ].map((link, i) => (
              <a key={i} href="#" className="footer-link">
                {link}
              </a>
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
