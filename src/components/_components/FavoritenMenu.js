"use client";
import React from 'react';
import { useRouter } from "next/navigation";

const FavoritenMenu = () => {
  const route = useRouter();
  
  const favorites = [
    { title: "MEINE GESPEICHERTEN SEITEN", route: "/seite/budapest-tipps" },
    { title: "MEINE LERNLISTE", route: "/seite/thermen-ungarn" },
    { title: "VERWALTUNG DER FAVORITEN", route: "/seite/ungarisch-apps" },
  ];

  return (
    <div className="hover-menu calendar-hover-menu history-hover-menu favoriten-hover-menu">
      {favorites.map((favorite, i) => (
        <div
          key={i}
          className="menu-item history-item favoriten-item cursor-pointer"
          onClick={() => route.push(favorite.route)}
        >
          <span className="history-title">{favorite.title}</span>
        </div>
      ))}
    </div>
  );
};

export default FavoritenMenu;