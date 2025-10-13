"use client";

import React, { useState, useEffect } from "react";
import { isFavorited, toggleFavorite } from "@/lib/utils/favoritesManager";
import { usePathname } from 'next/navigation';

/**
 * Reusable Modal Icons Component
 * @param {Object} props
 * @param {Function} props.onClose - Function to handle close button click
 * @param {Function} props.onFavorite - Function to handle favorite button click (optional)
 * @param {Function} props.onLayers - Function to handle layers button click (optional)
 * @param {Function} props.onShare - Function to handle share button click (optional)
 * @param {boolean} props.showFavorite - Whether to show favorite icon (default: true)
 * @param {boolean} props.showLayers - Whether to show layers icon (default: true)
 * @param {boolean} props.showShare - Whether to show share icon (default: true)
 * @param {Object} props.topIconsStyle - Custom style for top icons container (optional)
 * @param {Object} props.shareIconStyle - Custom style for share icon container (optional)
 * @param {string} props.pageTitle - The title of the current page (for favorites)
 * @param {string} props.customRoute - Custom route to use for favorites instead of current path
 */
export default function ModalIcons({
  onClose,
  onFavorite,
  onLayers,
  onShare,
  showFavorite = true,
  showLayers = true,
  showShare = true,
  topIconsStyle,
  shareIconStyle,
  type,
  pageTitle,
  customRoute
}) {
  const pathname = usePathname();
  const [isFavorite, setIsFavorite] = useState(false);
  const actualRoute = customRoute || pathname;

  useEffect(() => {
    setIsFavorite(isFavorited(actualRoute));
  }, [actualRoute]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = toggleFavorite(actualRoute, pageTitle);
    setIsFavorite(result);
    
    if (onFavorite) {
      onFavorite(result);
    }
  };

  const defaultTopIconsStyle = {
    top: "0rem",
    right: "-6.5rem",
  };

  const defaultShareIconStyle = {
    bottom: "0rem",
    right: "-6rem",
  };

  return (
    <>
      {/* Top icons (Cross, Love, Layers) */}
      <div
        className="absolute flex flex-col z-50"
        style={{
          ...defaultTopIconsStyle,
          ...topIconsStyle,
        }}
      >
        {/* Cross Icon */}
        <div onClick={onClose} className="px-4 cursor-pointer rounded-full">
          <img src="/assets/icons/close.png" alt="Close Icon" />
        </div>

        {type !== "impressum" && (
          <>
            {/* Love Icon */}
            {showFavorite && (
              <div onClick={handleFavoriteClick} className="px-4 cursor-pointer py-1 rounded-full favorite-icon">
                <img 
                  src="/assets/icons/favorit_e.png"
                  alt="Favorite Icon"
                />
              </div>
            )}

            {/* Layers Icon */}
            {showLayers && (
              <div onClick={onLayers} className="px-4 cursor-pointer py-1 rounded-full">
                <img src="/assets/icons/plus.png" alt="Layers Icon" />
              </div>
            )}
          </>
        )}
      </div>

      {/* Share button anchored at bottom */}
      {type !== "impressum" && (
        <>
          {showShare && (
            <div
              className="absolute z-50"
              style={{
                ...defaultShareIconStyle,
                ...shareIconStyle,
              }}
            >
              <div onClick={onShare} className="px-4 cursor-pointer rounded-full">
                <img src="/assets/icons/share.png" alt="Share Icon" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
