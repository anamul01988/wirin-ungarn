"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllFavorites } from "@/lib/utils/favoritesManager";
import LearningBoxListModal from "./LearningBoxListModal";
import FavoritenListModal from "./FavoritenListModal";

const FavoritenMenu = () => {
  const route = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [learningBoxOpen, setLearningBoxOpen] = useState(false);
  const [favoritenModalOpen, setFavoritenModalOpen] = useState(false);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = getAllFavorites();
      setFavorites(savedFavorites);
    };

    loadFavorites();

    // Add event listener to update favorites when storage changes
    window.addEventListener("storage", loadFavorites);

    // Custom event for when favorites are updated within the same window
    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  return (
    <>
      <div className="hover-menu calendar-hover-menu history-hover-menu favoriten-hover-menu">
        {/* Static "Meine Lernkiste" item */}
        <div
          className="menu-item history-item favoriten-item cursor-pointer"
          onClick={() => setLearningBoxOpen(true)}
          title="Meine Lernkiste"
        >
          <span className="history-title">Meine Lernkiste</span>
        </div>

        {/* Favorites Modal Menu Item */}
        <div
          className="menu-item history-item favoriten-item cursor-pointer"
          onClick={() => setFavoritenModalOpen(true)}
          title="Verwaltung Der Favoriten"
        >
          <span className="history-title">Verwaltung Der Favoriten</span>
        </div>

        {/* Favorites list */}
        {/* {favorites.length > 0
          ? favorites.map((favorite, i) => {
              // Remove trailing slash if it exists and clean up the title
              let titleOnly = favorite.title;

              // Remove trailing slash
              if (titleOnly.endsWith("/")) {
                titleOnly = titleOnly.slice(0, -1);
              }

              // Extract just the last part after the last slash (if any slashes remain)
              if (titleOnly.includes("/")) {
                titleOnly = titleOnly.split("/").pop();
              }

              return (
                <div
                  key={i}
                  className="menu-item history-item favoriten-item cursor-pointer"
                  onClick={() => route.push(favorite.route)}
                  title={favorite.title}
                >
                  <span className="history-title">{titleOnly}</span>
                </div>
              );
            })
          : null} */}
      </div>

      {/* Learning Box List Modal */}
      <LearningBoxListModal
        open={learningBoxOpen}
        onClose={() => setLearningBoxOpen(false)}
      />

      {/* Favoriten List Modal */}
      <FavoritenListModal
        open={favoritenModalOpen}
        onClose={() => setFavoritenModalOpen(false)}
      />
    </>
  );
};

export default FavoritenMenu;
