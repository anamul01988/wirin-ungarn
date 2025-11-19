"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";

const STORAGE_KEY = "learningBoxCards";

// Helper functions for localStorage
const getStorageKey = (userId) => `${STORAGE_KEY}_${userId}`;

export const getLearningBoxCards = (userId) => {
  if (typeof window === "undefined" || !userId) return [];
  try {
    const data = localStorage.getItem(getStorageKey(userId));
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading learning box cards:", error);
    return [];
  }
};

const saveLearningBoxCard = (userId, cardData) => {
  if (typeof window === "undefined" || !userId) return false;
  try {
    const cards = getLearningBoxCards(userId);

    // Check for duplicate - compare by source URL
    const isDuplicate = cards.some(
      (card) =>
        card.source === cardData.source && card.cardTitle === cardData.cardTitle
    );

    if (isDuplicate) {
      return {
        success: false,
        error: "Diese Karte existiert bereits in deiner Lernkiste.",
      };
    }

    // Add new card with timestamp
    const newCard = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    cards.push(newCard);
    localStorage.setItem(getStorageKey(userId), JSON.stringify(cards));
    return { success: true };
  } catch (error) {
    console.error("Error saving learning box card:", error);
    return {
      success: false,
      error: "Fehler beim Speichern. Bitte versuche es erneut.",
    };
  }
};

export default function LearningBoxModal({ open, onClose, sourceUrl, title }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    cardTitle: "",
    source: sourceUrl || "",
    level: "12",
    notes: "",
    repeatDate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Update source when sourceUrl prop changes
  useEffect(() => {
    if (sourceUrl) {
      setFormData((prev) => ({ ...prev, source: sourceUrl }));
    }
  }, [sourceUrl]);

  // Set default card title from page title
  useEffect(() => {
    if (title && !formData.cardTitle) {
      setFormData((prev) => ({ ...prev, cardTitle: title }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  // Clear messages when modal opens/closes
  useEffect(() => {
    if (open) {
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [open]);

  // Calculate date based on quick selection
  const handleQuickDateSelect = (days) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);

    const formattedDate = futureDate.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    setFormData((prev) => ({ ...prev, repeatDate: formattedDate }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!user?.id) {
      setErrorMessage("Bitte melde dich an, um Karten zu speichern.");
      return;
    }

    // Validate required fields
    if (!formData.cardTitle.trim()) {
      setErrorMessage("Bitte gib einen Titel ein.");
      return;
    }

    if (!formData.source.trim()) {
      setErrorMessage("Bitte gib eine Quelle ein.");
      return;
    }

    // Save to localStorage
    const result = saveLearningBoxCard(user.id, {
      cardTitle: formData.cardTitle.trim(),
      source: formData.source.trim(),
      level: formData.level,
      notes: formData.notes.trim(),
      repeatDate: formData.repeatDate,
    });

    if (result.success) {
      setSuccessMessage("Karte erfolgreich gespeichert!");
      setErrorMessage("");

      // Reset form
      setFormData({
        cardTitle: "",
        source: sourceUrl || "",
        level: "12",
        notes: "",
        repeatDate: "",
      });

      // Close modal after 1 second
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 1000);
    } else {
      setErrorMessage(result.error || "Fehler beim Speichern.");
      setSuccessMessage("");
    }
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  // Convert input date (YYYY-MM-DD) to display format (DD.MM.YYYY)
  const handleDateInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue) {
      const [year, month, day] = inputValue.split("-");
      const formattedDate = `${day}.${month}.${year}`;
      setFormData((prev) => ({ ...prev, repeatDate: formattedDate }));
    } else {
      setFormData((prev) => ({ ...prev, repeatDate: "" }));
    }
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="sm"
      dismiss={{ enabled: false }}
      data-dialog="learning-box-modal"
      className="bg-white outline-none relative border-4 border-[#406c4d] rounded-2xl max-h-[90vh] overflow-hidden z-[10000]"
      style={{ maxWidth: "650px", width: "100%" }}
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
              ZU MEINER LERNKISTE HINZUFÜGEN
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

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titel der Lernkarte (den du auch frei wählen kannst)
            </label>
            <input
              type="text"
              value={formData.cardTitle}
              onChange={(e) => handleInputChange("cardTitle", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c4d]"
              placeholder="Gib einen Titel ein..."
            />
          </div>

          {/* Source and Level Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quelle
              </label>
              <input
                type="text"
                value={formData.source}
                onChange={(e) => handleInputChange("source", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c4d]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Level (1-99)
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={formData.level}
                onChange={(e) => handleInputChange("level", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c4d]"
              />
            </div>
          </div>

          {/* Notes Field with Rich Text Editor Toolbar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deine Anmerkungen
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Hier ist Platz für deine Gedanken, Zusammenfassungen, Bilder oder
              zusätzliche Links...
            </p>

            {/* Rich Text Editor Toolbar */}
            <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 font-bold"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 italic"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 underline"
                title="Underline"
              >
                U
              </button>
              <div className="border-l border-gray-300 h-6 mx-1"></div>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                title="Align Left"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                title="Align Center"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 00-1 1v2a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1H5zm-2 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                title="Align Right"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm4 4a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V9a1 1 0 00-1-1H7zm-4 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                title="Justify"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </button>
              <div className="border-l border-gray-300 h-6 mx-1"></div>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                title="Blockquote"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V7a1 1 0 112 0v3.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                title="Link"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </button>
            </div>

            {/* Textarea */}
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-[#406c4d] min-h-[120px] resize-y"
              placeholder="This is a formatted information text with a detailed link."
            />
          </div>

          {/* Date Selection - Single Row */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Wiederholung anzeigen zu folgendem Datum
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Definiere hier, wann wir dir diese Karte wieder präsentieren
              sollen.
            </p>

            {/* Quick Date Selection Buttons and Date Input in Single Row */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickDateSelect(1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
              >
                1 Tag
              </button>
              <button
                type="button"
                onClick={() => handleQuickDateSelect(3)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
              >
                3 Tage
              </button>
              <button
                type="button"
                onClick={() => handleQuickDateSelect(7)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
              >
                1 Woche
              </button>
              <button
                type="button"
                onClick={() => handleQuickDateSelect(30)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
              >
                1 Monat
              </button>

              {/* Date Input */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="date"
                  value={formatDateForInput(formData.repeatDate)}
                  onChange={handleDateInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406c4d] pr-10"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}
        {successMessage && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            SPEICHERN
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
