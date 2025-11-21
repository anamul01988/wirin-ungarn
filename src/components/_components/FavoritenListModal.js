"use client";
import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { getAllFavorites } from "@/lib/utils/favoritesManager";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";

export default function FavoritenListModal({ open, onClose }) {
  const route = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadFavorites = useCallback(() => {
    try {
      const savedFavorites = getAllFavorites();
      setFavorites(savedFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setSearchQuery("");
      loadFavorites();
    }

    // Add event listener to update favorites when storage changes
    const handleFavoritesUpdate = () => {
      if (open) {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleFavoritesUpdate);
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("storage", handleFavoritesUpdate);
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, [open, loadFavorites]);

  const handleSearch = () => {
    try {
      const savedFavorites = getAllFavorites();
      if (searchQuery.trim()) {
        const filtered = savedFavorites.filter(
          (favorite) =>
            favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            favorite.route.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFavorites(filtered);
      } else {
        setFavorites(savedFavorites);
      }
    } catch (error) {
      console.error("Error searching favorites:", error);
    }
  };

  const handleFavoriteClick = (favoriteRoute) => {
    route.push(favoriteRoute);
    onClose();
  };

  // Clean up title for display
  const getTitleOnly = (title) => {
    let titleOnly = title;
    // Remove trailing slash
    if (titleOnly.endsWith("/")) {
      titleOnly = titleOnly.slice(0, -1);
    }
    // Extract just the last part after the last slash (if any slashes remain)
    if (titleOnly.includes("/")) {
      titleOnly = titleOnly.split("/").pop();
    }
    return titleOnly;
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="lg"
      className="bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] flex flex-col"
    >
      {/* Floating Cross Icon */}
      {open && (
        <ModalIcons
          onClose={onClose}
          showFavorite={false}
          showLayers={false}
          showShare={false}
          showLearningBox={false}
        />
      )}

      <DialogBody className="overflow-auto custom__modal_area mr-1 flex-1 p-[30px]">
        {/* Header */}
        <div className="w-full relative flex items-center justify-center mt-0 mb-5">
          <h1
            className="text-4xl text-[#000] font-bold"
            // style={{
            //   background:
            //     "linear-gradient(to right, #dc2626, #16a34a, #ffffff)",
            //   WebkitBackgroundClip: "text",
            //   WebkitTextFillColor: "transparent",
            //   backgroundClip: "text",
            //   fontFamily: "Arial, sans-serif",
            // }}
          >
            Verwaltung Der Favoriten
          </h1>
        </div>

        {/* Description Text */}
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          Hier siehst du alle deine gespeicherten Favoriten. Du kannst die Liste
          durchsuchen und auf ein Favorit klicken, um direkt dorthin zu
          navigieren.
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Suche..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c4d] focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="bg-[#436F4D] text-white px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            SUCHE
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Lade...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Du hast noch keine Favoriten gespeichert.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((favorite, i) => (
              <div
                key={i}
                onClick={() => handleFavoriteClick(favorite.route)}
                className="bg-white border border-[#c8e6c8] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-[#436F4D] text-lg mb-1">
                  {getTitleOnly(favorite.title)}
                </h3>
                <p className="text-sm text-gray-600">{favorite.route}</p>
              </div>
            ))}
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
}
