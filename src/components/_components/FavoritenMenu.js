"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { getAllFavorites } from '@/lib/utils/favoritesManager';

const FavoritenMenu = () => {
  const route = useRouter();
  const [favorites, setFavorites] = useState([]);
  
  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = getAllFavorites();
      setFavorites(savedFavorites);
    };
    
    loadFavorites();
    
    // Add event listener to update favorites when storage changes
    window.addEventListener('storage', loadFavorites);
    
    // Custom event for when favorites are updated within the same window
    window.addEventListener('favoritesUpdated', loadFavorites);
    
    return () => {
      window.removeEventListener('storage', loadFavorites);
      window.removeEventListener('favoritesUpdated', loadFavorites);
    };
  }, []);

  return (
    <div className="hover-menu calendar-hover-menu history-hover-menu favoriten-hover-menu">
      {favorites.length > 0 ? (
        favorites.map((favorite, i) => (
          <div
            key={i}
            className="menu-item history-item favoriten-item cursor-pointer"
            onClick={() => route.push(favorite.route)}
          >
            <span className="history-title">{favorite.title}</span>
          </div>
        ))
      ) : (
        <div className="menu-item history-item favoriten-item">
          <span className="history-title">Keine Favoriten</span>
        </div>
      )}
    </div>
  );
};

export default FavoritenMenu;