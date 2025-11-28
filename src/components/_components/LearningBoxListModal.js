"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import { getLearningBoxCards } from "./LearningBoxModal";
import Image from "next/image";
import ModalIcons from "@/components/_components/ModalIcons";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

export default function LearningBoxListModal({ open, onClose }) {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open && user?.id) {
      setSearchQuery("");
      loadCards();
    }
  }, [open, user?.id]);

  const loadCards = () => {
    if (!user?.id) {
      setCards([]);
      setLoading(false);
      return;
    }

    try {
      const userCards = getLearningBoxCards(user.id);
      // Sort by creation date, newest first
      const sortedCards = userCards.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCards(sortedCards);
    } catch (error) {
      console.error("Error loading learning box cards:", error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!user?.id) return;

    try {
      const userCards = getLearningBoxCards(user.id);
      if (searchQuery.trim()) {
        const filtered = userCards.filter(
          (card) =>
            card.cardTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (card.notes &&
              card.notes.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        const sortedCards = filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCards(sortedCards);
      } else {
        // If search is empty, reload all cards
        const sortedCards = userCards.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCards(sortedCards);
      }
    } catch (error) {
      console.error("Error searching cards:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      // If it's already in DD.MM.YYYY format, return as is
      if (
        typeof dateString === "string" &&
        dateString.includes(".") &&
        dateString.match(/^\d{2}\.\d{2}\.\d{4}$/)
      ) {
        return dateString;
      }
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return null;
      }
      return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  // Helper to get description text for a card
  const getCardDescription = (card) => {
    // Use notes if available, otherwise use source
    let description = "";
    if (card.notes) {
      const textContent = card.notes.replace(/<[^>]*>/g, "").trim();
      description = textContent || "";
    }
    if (!description && card.source) {
      description = card.source;
    }
    if (!description) {
      return "Keine Beschreibung verfügbar";
    }
    // Truncate if too long
    return description.length > 80
      ? description.substring(0, 80) + "..."
      : description;
  };

  // Helper to get status/notes text for a card
  const getCardStatus = (card) => {
    // Show notes if available (truncated), otherwise show a default message
    if (card.notes) {
      const textContent = card.notes.replace(/<[^>]*>/g, "").trim();
      if (textContent) {
        // Truncate to reasonable length for display
        return textContent.length > 50
          ? textContent.substring(0, 50) + "..."
          : textContent;
      }
    }
    return "keine Notizen";
  };

  // Helper to get date for a card
  const getCardDate = (card) => {
    // Prefer repeatDate, then createdAt
    const date = formatDate(card.repeatDate) || formatDate(card.createdAt);
    return date || "-";
  };

  console.log("Rendering LearningBoxListModal with cards:", cards);
  return (
    <Dialog
      open={open}
      handler={onClose}
      size="lg"
      // dismiss={{ enabled: false }}
      // data-dialog="learning-box-list-modal"
      className="dialog-learning-box-list bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] flex flex-col"
    >
      {/* Floating Cross Icon - outside DialogBody */}
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
        {/* Header with Logo */}
        <div className="flex items-center gap-3">
          {/* <Image
            src="/Meine_Lernkiste_logo.jpeg"
            alt="Meine Lernkiste"
            width={80}
            height={80}
            className="object-contain"
          /> */}
          {/* <h1
            className="text-4xl font-bold"
            style={{
              background:
                "linear-gradient(to right, #dc2626, #16a34a, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Arial, sans-serif",
            }}
          >
            meine Lernkiste
          </h1> */}
        </div>
        <div className="w-full relative flex items-center justify-center mb-3">
          <ArchivePageHeaderImage
            imageUrl="/headlineImages/meine-Lernkiste.jpg"
            imageAlt="meine Lernkiste"
          />
        </div>
        {/* Description Text */}
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          Hier siehst du, in der Reihenfolge in der du es dann im Stapel auf der
          Startseite angezeigt bekommst, alle Themen, die du in deiner Lernliste
          hast. Du kannst die Liste durchsuchen, dir einzelne Themen anzeigen
          lassen und auch, mit anklicken des Zahnrades, die Karten modifizieren.
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
        {!user?.id ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Bitte melde dich an, um deine Lernkiste zu sehen.
            </p>
          </div>
        ) : loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Lade...</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Deine Lernkiste ist leer. Füge Karten hinzu, um sie hier zu sehen.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-[#c8e6c8] rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-[#436F4D] text-lg mb-1">
                    {card.cardTitle}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1 leading-relaxed">
                    {getCardDescription(card)}
                  </p>
                  <div className="flex gap-10 flex-wrap text-sm text-gray-600">
                    <div className="font-medium text-red-200">
                      {getCardDate(card)}
                    </div>
                    <div className="text-red-200">{card.source}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // TODO: Open edit modal
                    console.log("Edit card:", card.id);
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors ml-4 flex-shrink-0"
                  title="Karte bearbeiten"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
}
