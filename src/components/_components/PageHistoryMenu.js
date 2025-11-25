"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllHistory, clearHistory } from "@/lib/utils/historyManager";

const PageHistoryMenu = () => {
  const route = useRouter();
  const [pageHistory, setPageHistory] = useState([]);

  // List of category overview routes (without slug)
  const categoryOverviewRoutes = [
    "/kategorien",
    "/wissenswert",
    "/shorts",
    "/liedtexte",
    "/sprachkurs",
    "/einfach-lesen",
    "/ausflugsziele",
    "/veranstaltungen",
    "/kreuzwortraetsel",
    "/kulinarische-seele",
  ];

  // List of non-content pages to exclude
  const nonContentRoutes = [
    "/impressum",
    "/kontakt",
    "/datenschutz",
    "/philosophie",
    "/karriere",
    "/cookie-richtlinie-eu",
    "/uber-uns",
    "/profile",
    "/coin",
    "/anki-karten",
    "/zahlentrainer",
    "/kultour-ungarn",
    "/soziale-projekte",
    "/kooperationen",
    "/ungarn-insider",
    "/transparenz",
    "/wiu-muenzen",
    "/kurz-und-knapp",
  ];

  // Filter function to check if a route is a content page
  const isContentPage = (route) => {
    // Exclude non-content pages
    if (nonContentRoutes.includes(route)) {
      return false;
    }

    // Exclude category overview pages (exact match)
    if (categoryOverviewRoutes.includes(route)) {
      return false;
    }

    // Exclude home page
    if (route === "/" || route === "") {
      return false;
    }

    return true;
  };

  // Format date based on when the page was visited
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const itemDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const diffDays = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    // Today: only show time
    if (diffDays === 0) {
      return timeStr;
    }

    // Last 7 days: show weekday abbreviation and time
    if (diffDays > 0 && diffDays <= 7) {
      const weekdayAbbr = date.toLocaleDateString("de-DE", {
        weekday: "short",
      });
      return `${weekdayAbbr} ${timeStr}`;
    }

    // Before that: only show day and month
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  useEffect(() => {
    const loadHistory = () => {
      const history = getAllHistory();
      // Filter to only show content pages
      const filteredHistory = history.filter((page) =>
        isContentPage(page.route)
      );
      setPageHistory(filteredHistory);
    };

    loadHistory();

    // Add event listener to update history when storage changes
    window.addEventListener("storage", loadHistory);

    // Custom event for when history is updated within the same window
    window.addEventListener("historyUpdated", loadHistory);

    return () => {
      window.removeEventListener("storage", loadHistory);
      window.removeEventListener("historyUpdated", loadHistory);
    };
  }, []);

  const handleClearHistory = (e) => {
    e.stopPropagation();
    clearHistory();
  };

  return (
    <div className="hover-menu calendar-hover-menu history-hover-menu">
      {pageHistory.length > 0 ? (
        pageHistory.map((page, i) => (
          <div
            key={i}
            className="menu-item history-item cursor-pointer"
            onClick={() => route.push(page.route)}
            title={page.route}
          >
            <span className="history-title">
              {(page.title || "Unbenannte Seite").length > 35
                ? `${(page.title || "Unbenannte Seite").substring(0, 35)}...`
                : page.title || "Unbenannte Seite"}
            </span>
            <span className="history-date whitespace-nowrap">
              {formatDate(page.timestamp)}
            </span>
          </div>
        ))
      ) : (
        <div className="menu-item history-item">
          <span className="history-title">Keine Verlaufsdaten vorhanden</span>
        </div>
      )}
      {pageHistory.length > 0 && (
        <div
          className="menu-footer cursor-pointer"
          onClick={handleClearHistory}
        >
          Verlauf löschen
        </div>
      )}
    </div>
  );
};

export default PageHistoryMenu;
