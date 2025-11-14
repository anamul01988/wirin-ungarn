"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { toggleFavorite, isFavorited } from '@/lib/utils/favoritesManager';

/**
 * FavoriteButton component to add/remove pages from favorites
 * @param {Object} props - Component properties
 * @param {string} props.title - Title for the favorite (optional, will be generated from route if not provided)
 * @param {string} props.route - Custom route to save (optional, will use current path if not provided)
 * @param {string} props.className - Additional CSS classes
 */
const FavoriteButton = ({ title, route, className = '' }) => {
  const pathname = usePathname();
  const [isFavorite, setIsFavorite] = useState(false);
  const actualRoute = route || pathname;
  
  // Check if this route is already favorited
  useEffect(() => {
    setIsFavorite(isFavorited(actualRoute));
  }, [actualRoute]);
  
  // Handle favorite toggle
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = toggleFavorite(actualRoute, title);
    setIsFavorite(result);
  };
  
  return (
    <button 
      onClick={handleToggleFavorite}
      className={`favorite-btn ${isFavorite ? 'active' : ''} ${className}`}
      aria-label={isFavorite ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
      title={isFavorite ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-5 h-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
};

export default FavoriteButton;