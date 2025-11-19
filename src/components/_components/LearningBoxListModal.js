"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import { getLearningBoxCards } from "./LearningBoxModal";

export default function LearningBoxListModal({ open, onClose }) {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && user?.id) {
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

  const handleDelete = (cardId) => {
    if (!user?.id || !confirm("Möchtest du diese Karte wirklich löschen?")) {
      return;
    }

    try {
      const userCards = getLearningBoxCards(user.id);
      const filteredCards = userCards.filter((card) => card.id !== cardId);
      const storageKey = `learningBoxCards_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(filteredCards));
      loadCards(); // Reload the list
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="lg"
      dismiss={{ enabled: false }}
      data-dialog="learning-box-list-modal"
      className="bg-white outline-none relative border-4 border-[#406c4d] rounded-2xl max-h-[90vh] overflow-hidden z-[10000]"
      style={{ maxWidth: "900px", width: "100%" }}
    >
      <DialogBody className="overflow-auto p-6 max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-8 h-8 text-[#406c4d]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <Typography variant="h4" className="text-[#406c4d] font-bold">
              Meine Lernkiste
            </Typography>
          </div>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Titel
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Quelle
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Level
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Wiederholung
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Erstellt
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      Aktion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr
                      key={card.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                        {card.cardTitle}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <a
                          href={card.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate block max-w-xs"
                          title={card.source}
                        >
                          {card.source.length > 40
                            ? `${card.source.substring(0, 40)}...`
                            : card.source}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {card.level}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {card.repeatDate || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(card.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Löschen"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden space-y-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm flex-1">
                      {card.cardTitle}
                    </h3>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="text-red-600 hover:text-red-800 transition-colors ml-2"
                      title="Löschen"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Quelle:</span>{" "}
                      <a
                        href={card.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {card.source.length > 50
                          ? `${card.source.substring(0, 50)}...`
                          : card.source}
                      </a>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="font-medium">Level:</span> {card.level}
                      </div>
                      {card.repeatDate && (
                        <div>
                          <span className="font-medium">Wiederholung:</span>{" "}
                          {card.repeatDate}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Erstellt:</span>{" "}
                      {formatDate(card.createdAt)}
                    </div>
                    {card.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <span className="font-medium">Notizen:</span>
                        <div
                          className="text-gray-700 mt-1"
                          dangerouslySetInnerHTML={{ __html: card.notes }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-[#406c4d] hover:bg-[#355a47] text-white px-6 py-2 rounded-lg font-semibold"
          >
            Schließen
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}

