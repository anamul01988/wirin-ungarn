"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { toggleFavorite, isFavorited } from '@/lib/utils/favoritesManager';

/**
 * FavoriteIconButton component - Simple icon-only version of the favorite button for use in cards/components
 * @param {Object} props - Component properties
 * @param {string} props.title - Title for the favorite (optional, will be generated from route if not provided)
 * @param {string} props.route - Custom route to save (optional, will use current path if not provided)
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Optional callback when favorite is toggled
 */
const FavoriteIconButton = ({ title, route, className = '', onClick }) => {
  const pathname = usePathname();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const actualRoute = route || pathname;
  
  // Check if this route is already favorited
  React.useEffect(() => {
    setIsFavorite(isFavorited(actualRoute));
  }, [actualRoute]);
  
  // Handle favorite toggle
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = toggleFavorite(actualRoute, title);
    setIsFavorite(result);
    
    if (onClick) {
      onClick(result);
    }
  };
  
  return (
    <div 
      onClick={handleToggleFavorite}
      className={`px-4 cursor-pointer py-1 rounded-full ${className}`}
      title={isFavorite ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
    >
      <img 
        src="/assets/icons/favorit_e.png"
        alt="Favorite Icon" 
      />
    </div>
  );
};

export default FavoriteIconButton;