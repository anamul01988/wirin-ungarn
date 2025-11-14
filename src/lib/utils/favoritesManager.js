/**
 * Utility functions for managing favorite pages
 */
import { toast } from 'react-toastify';

/**
 * Toggle a page as favorite
 * @param {string} route - The route path without domain (e.g. "/sprachkurs")
 * @param {string} title - The title of the page
 * @returns {boolean} - Whether the page is now favorited or not
 */
export const toggleFavorite = (route, title) => {
  if (typeof window === 'undefined') return false;
  
  try {
    // Get existing favorites
    const existingFavoritesStr = localStorage.getItem('favouritePosts') || '[]';
    const existingFavorites = JSON.parse(existingFavoritesStr);
    
    // Check if this route is already in favorites
    const existingIndex = existingFavorites.findIndex(fav => fav.route === route);
    
    const displayTitle = title || formatRouteToTitle(route);
    
    if (existingIndex >= 0) {
      // Remove from favorites if already exists
      existingFavorites.splice(existingIndex, 1);
      localStorage.setItem('favouritePosts', JSON.stringify(existingFavorites));
      
      // Show toast notification
      toast.info(`"${displayTitle}" aus Favoriten entfernt`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Dispatch custom event for other components to know
      window.dispatchEvent(new Event('favoritesUpdated'));
      
      return false; // No longer favorited
    } else {
      // Add to favorites
      existingFavorites.push({
        route,
        title: displayTitle,
        timestamp: new Date().toISOString()
      });
      
      localStorage.setItem('favouritePosts', JSON.stringify(existingFavorites));
      
      // Show toast notification
      toast.success(`"${displayTitle}" zu Favoriten hinzugefügt`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Dispatch custom event for other components to know
      window.dispatchEvent(new Event('favoritesUpdated'));
      
      return true; // Now favorited
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    
    // Show error toast
    toast.error('Es gab ein Problem beim Speichern des Favoriten', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    return false;
  }
};

/**
 * Check if a route is favorited
 * @param {string} route - The route path
 * @returns {boolean} - Whether the route is favorited
 */
export const isFavorited = (route) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const existingFavoritesStr = localStorage.getItem('favouritePosts') || '[]';
    const existingFavorites = JSON.parse(existingFavoritesStr);
    
    return existingFavorites.some(fav => fav.route === route);
  } catch (error) {
    console.error('Error checking if favorited:', error);
    return false;
  }
};

/**
 * Helper function to format route to title if title is not provided
 * @param {string} route - The route path
 * @returns {string} - Formatted title
 */
const formatRouteToTitle = (route) => {
  // Remove leading slash and replace hyphens with spaces
  const formatted = route.replace(/^\//, '').replace(/-/g, ' ');
  // Capitalize first letter of each word
  return formatted.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get all favorited pages
 * @returns {Array} - Array of favorite pages
 */
export const getAllFavorites = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const existingFavoritesStr = localStorage.getItem('favouritePosts') || '[]';
    return JSON.parse(existingFavoritesStr);
  } catch (error) {
    console.error('Error getting all favorites:', error);
    return [];
  }
};