"use client";

import React from "react";

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
}) {
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
        <button onClick={onClose} className="px-4 rounded-full">
          <img src="/assets/icons/close.png" alt="Close Icon" />
        </button>

        {type !== "impressum" && (
          <>
            {/* Love Icon */}
            {showFavorite && (
              <button onClick={onFavorite} className="px-4 py-1 rounded-full">
                <img src="/assets/icons/favorit_e.png" alt="Love Icon" />
              </button>
            )}

            {/* Layers Icon */}
            {showLayers && (
              <button onClick={onLayers} className="px-4 py-1 rounded-full">
                <img src="/assets/icons/plus.png" alt="Layers Icon" />
              </button>
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
              <button onClick={onShare} className="px-4 rounded-full">
                <img src="/assets/icons/share.png" alt="Share Icon" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
