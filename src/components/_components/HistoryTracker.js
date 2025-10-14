"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { addToHistory } from '@/lib/utils/historyManager';

/**
 * This component tracks page navigation and adds visited pages to user history
 * It doesn't render anything visible - it's just for tracking
 */
const HistoryTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking for certain pages
    const excludedPaths = [
      '/auth', 
      '/signin', 
      '/login', 
      '/register', 
      '/profile',
      '/api'
    ];
    
    // Check if current path should be excluded
    const shouldExclude = excludedPaths.some(path => pathname.startsWith(path));
    
    if (pathname && !shouldExclude) {
      // Wait a bit for the page title to be set by page components
      setTimeout(() => {
        // Get document title or generate one from the pathname
        let pageTitle = document.title;
        
        if (!pageTitle || pageTitle === 'Wir In Ungarn' || pageTitle === 'Next.js App') {
          // If no specific title, generate from pathname
          const pathSegments = pathname.split('/').filter(Boolean);
          if (pathSegments.length > 0) {
            const lastSegment = pathSegments[pathSegments.length - 1];
            // Format: replace hyphens with spaces and capitalize words
            pageTitle = lastSegment
              .replace(/-/g, ' ')
              .replace(/\b\w/g, char => char.toUpperCase());
          } else {
            pageTitle = 'Startseite';
          }
        }
        
        // Add the page to history
        addToHistory(pathname, pageTitle);
      }, 300); // Small delay to allow page components to update title
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default HistoryTracker;