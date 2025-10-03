"use client";
import React from 'react';
import { useRouter } from "next/navigation";

const PageHistoryMenu = () => {
  const route = useRouter();
  
const pageHistory = [
  { title: "Lerne Ungarisch mit Anki – Der Turbo für", route: "/seite/anki-ungarisch" },
  { title: "Immobilienkauf in Ungarn – die Rolle von", route: "/seite/immobilien-ungarn" },
  { title: "Die ungarische Medienlandschaft", route: "/seite/medienlandschaft" },
  { title: "Deutschsprachige Zeitungen in Ungarn", route: "/seite/zeitungen-ungarn" },
  { title: "KulTour Ungarn", route: "/seite/kultour" },
  { title: "Ungarn und die EU – Eine turbulente Bezi", route: "/seite/ungarn-eu" },
];


  return (
    <div className="hover-menu calendar-hover-menu history-hover-menu">
      {pageHistory.map((page, i) => (
        <div
          key={i}
          className="menu-item history-item cursor-pointer"
          onClick={() => route.push(page.route)}
        >
          <span className="history-title">{page.title}</span>
        </div>
      ))}
       <div className="menu-footer">alle anzeigen</div>
    </div>
  );
};

export default PageHistoryMenu;