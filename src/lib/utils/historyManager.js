/**
 * Utility functions for managing user browsing history
 */

/**
 * Add a page to user history
 * @param {string} route - The route path without domain (e.g. "/sprachkurs")
 * @param {string} title - The title of the page
 * @returns {void}
 */
export const addToHistory = (route, title) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Get existing history
    const existingHistoryStr = localStorage.getItem('userHistory') || '[]';
    const existingHistory = JSON.parse(existingHistoryStr);
    
    // Check if this route is already in history
    const existingIndex = existingHistory.findIndex(item => item.route === route);
    
    // Prepare the page title
    const displayTitle = title || formatRouteToTitle(route);
    
    if (existingIndex >= 0) {
      // Remove existing entry to add it at the top (most recent)
      existingHistory.splice(existingIndex, 1);
    }
    
    // Add to history at the beginning (most recent first)
    existingHistory.unshift({
      route,
      title: displayTitle,
      timestamp: new Date().toISOString()
    });
    
    // Limit history to 20 items
    if (existingHistory.length > 20) {
      existingHistory.pop(); // Remove oldest item
    }
    
    // Save updated history
    localStorage.setItem('userHistory', JSON.stringify(existingHistory));
    
    // Dispatch custom event for other components to know
    window.dispatchEvent(new Event('historyUpdated'));
    
  } catch (error) {
    console.error('Error adding to history:', error);
  }
};

/**
 * Get all user history
 * @returns {Array} - Array of history items
 */
export const getAllHistory = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const historyStr = localStorage.getItem('userHistory') || '[]';
    return JSON.parse(historyStr);
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

/**
 * Clear user history
 * @returns {void}
 */
export const clearHistory = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('userHistory');
    window.dispatchEvent(new Event('historyUpdated'));
  } catch (error) {
    console.error('Error clearing history:', error);
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