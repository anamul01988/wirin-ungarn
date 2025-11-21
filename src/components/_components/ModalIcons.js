"use client";

import React, { useState, useEffect } from "react";
import { isFavorited, toggleFavorite } from "@/lib/utils/favoritesManager";
import { usePathname } from "next/navigation";
import { FaBox } from "react-icons/fa";

/**
 * Reusable Modal Icons Component
 * @param {Object} props
 * @param {Function} props.onClose - Function to handle close button click
 * @param {Function} props.onFavorite - Function to handle favorite button click (optional)
 * @param {Function} props.onLayers - Function to handle layers button click (optional)
 * @param {Function} props.onShare - Function to handle share button click (optional)
 * @param {Function} props.onLearningBox - Function to handle learning box button click (optional)
 * @param {boolean} props.showFavorite - Whether to show favorite icon (default: true)
 * @param {boolean} props.showLayers - Whether to show layers icon (default: true)
 * @param {boolean} props.showShare - Whether to show share icon (default: true)
 * @param {boolean} props.showLearningBox - Whether to show learning box icon (default: false)
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
  onLearningBox,
  showFavorite = false,
  showLayers = false,
  showShare = true,
  showLearningBox = false,
  topIconsStyle,
  shareIconStyle,
  type,
  pageTitle,
  customRoute,
  isSinglePage = true,
}) {
  const pathname = usePathname();
  const [isFavorite, setIsFavorite] = useState(false);
  const actualRoute = customRoute || pathname;

  // Routes that should not show heart and plus/layer icons
  const routesWithoutIcons = [
    "/wie-spaet-ist-es",
    "/vokabel-aufkleber",
    "/neuigkeiten-bei-wir-in-ungarn",
    "/ueber-uns",
    "/philosophie",
    "/kontakt",
    "/datenschutz",
    "/ungarn-inside",
    "/transparenz",
    "/wiu-muenzen",
    "/karriere",
    "/cookie-richtlinie-eu",
    "/soziale-projekte",
    "/kooperationen",
    "/anki-karten",
    "/impressum",
  ];
  const shouldHideIcons = routesWithoutIcons.some(
    (route) => actualRoute.includes(route) || pathname.includes(route)
  );

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
    right: isSinglePage ? "-4.5rem" : "-6.5rem",
  };

  const defaultShareIconStyle = {
    bottom: "0rem",
    right: "-6rem",
  };

  return (
    <>
      {/* Top icons (Cross, Love, Layers) */}
      <div
        className={`absolute flex flex-col z-50 ${isSinglePage && "gap-3"}`}
        style={{
          ...defaultTopIconsStyle,
          ...topIconsStyle,
        }}
      >
        {/* Cross Icon */}
        <div
          onClick={onClose}
          className={
            isSinglePage
              ? "flex items-center justify-center bg-white h-12 w-12 cursor-pointer rounded-lg shadow-md hover:bg-gray-100"
              : "px-4 cursor-pointer rounded-full"
          }
        >
          {isSinglePage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <img src="/assets/icons/close.png" alt="Close Icon" />
          )}
        </div>

        {type !== "impressum" && !shouldHideIcons && (
          <>
            {/* Love Icon */}
            {showFavorite && (
              <div
                onClick={handleFavoriteClick}
                className={
                  isSinglePage
                    ? "flex items-center justify-center bg-white h-12 w-12 cursor-pointer rounded-lg shadow-md hover:bg-gray-100"
                    : "px-4 cursor-pointer py-1 rounded-full favorite-icon"
                }
              >
                {isSinglePage ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ) : (
                  <img src="/assets/icons/favorit_e.png" alt="Favorite Icon" />
                )}
              </div>
            )}

            {/* Layers Icon */}
            {showLayers && type !== "sprachkurs" && (
              <div
                onClick={onLayers}
                className={
                  isSinglePage
                    ? "flex items-center justify-center bg-white h-12 w-12 cursor-pointer rounded-lg shadow-md hover:bg-gray-100"
                    : "px-4 cursor-pointer py-1 rounded-full"
                }
              >
                {isSinglePage ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                ) : (
                  <img
                    style={{ width: "92%" }}
                    src="/assets/icons/plus.png"
                    alt="Layers Icon"
                  />
                )}
              </div>
            )}

            {/* Learning Box Icon - Only for einfach-lesen */}
            {showLearningBox && onLearningBox && (
              <div
                onClick={onLearningBox}
                className={
                  isSinglePage
                    ? "flex items-center justify-center bg-white cursor-pointer rounded-lg shadow-md hover:bg-gray-100"
                    : "px-4 cursor-pointer py-1 rounded-full staticBoxicon"
                }
                style={isSinglePage ? { width: "45px", height: "45px" } : {}}
              >
                <FaBox
                  className="text-[#406c4d]"
                  style={
                    isSinglePage
                      ? { width: "24px", height: "24px" }
                      : { width: "24px", height: "24px" }
                  }
                />
              </div>
            )}
          </>
        )}
        {isSinglePage && showShare && (
          <div>
            <div
              onClick={onShare}
              className="flex items-center justify-center bg-white h-12 w-12 cursor-pointer rounded-lg shadow-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Share button anchored at bottom */}
      {!isSinglePage && type !== "impressum" && (
        <>
          {showShare && (
            <div
              className="absolute z-50"
              style={{
                ...defaultShareIconStyle,
                ...shareIconStyle,
              }}
            >
              <div
                onClick={onShare}
                className="px-4 cursor-pointer rounded-full"
              >
                <img src="/assets/icons/share.png" alt="Share Icon" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
