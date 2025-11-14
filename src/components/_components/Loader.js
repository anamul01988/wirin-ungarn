"use client";

import React from "react";
import Image from "next/image";

/**
 * Unified Loader Component
 * Uses the loader.gif from public/assets/loader.gif
 *
 * @param {Object} props
 * @param {string} props.size - Size of loader: 'small' | 'medium' | 'large' (default: 'medium')
 * @param {string} props.text - Optional loading text to display
 * @param {string} props.variant - Variant: 'default' | 'fullscreen' | 'inline' | 'overlay' (default: 'default')
 * @param {string} props.className - Additional custom classes
 */
const Loader = ({
  size = "medium",
  text = "",
  variant = "default",
  className = "",
}) => {
  // Size mappings (3x larger for better visibility)
  const sizeMap = {
    small: { width: 120, height: 120 },
    medium: { width: 240, height: 240 },
    large: { width: 360, height: 360 },
  };

  const dimensions = sizeMap[size] || sizeMap.medium;

  // Base loader image
  const LoaderImage = () => (
    <Image
      src="/assets/loader.gif"
      alt="Loading..."
      width={dimensions.width}
      height={dimensions.height}
      unoptimized
      priority
    />
  );

  // Variant: Inline - Small loader for inline use
  if (variant === "inline") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LoaderImage />
        {text && <span className="ml-2 text-sm">{text}</span>}
      </div>
    );
  }

  // Variant: Fullscreen - Covers entire screen
  if (variant === "fullscreen") {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white ${className}`}
      >
        <div className="text-center">
          <LoaderImage />
          {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  // Variant: Overlay - Semi-transparent overlay
  if (variant === "overlay") {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`}
      >
        <div className="bg-white rounded-lg p-6 text-center shadow-xl">
          <LoaderImage />
          {text && <p className="mt-4 text-gray-700 font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  // Variant: Default - Centered in container
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-40 w-full ${className}`}
    >
      <LoaderImage />
      {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

// Export named variants for convenience
export const InlineLoader = (props) => <Loader {...props} variant="inline" />;
export const FullscreenLoader = (props) => (
  <Loader {...props} variant="fullscreen" />
);
export const OverlayLoader = (props) => <Loader {...props} variant="overlay" />;

// Export default Loader component
export default Loader;

// Export a DefaultSpinner alias for backward compatibility
export const DefaultSpinner = (props) => <Loader {...props} />;
