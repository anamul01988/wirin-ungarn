import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { createComment } from "@/lib/getAllPages";
import { toast } from "react-toastify";

export default function CollapsibleComment({ postId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Bitte geben Sie einen Kommentar ein");
      return;
    }

    if (!user) {
      toast.error(
        "Sie müssen angemeldet sein, um einen Kommentar zu hinterlassen"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await createComment(
        user.name || "Anonymer Benutzer",
        user.email || "anonym@example.com",
        comment,
        postId
      );

      if (
        response &&
        response.data &&
        response.data.createComment &&
        response.data.createComment.success
      ) {
        toast.success(
          "Deine Anmerkung zum Verbessern unserer Webseite.Your idea has been submitted."
        );
        setComment("");
        setIsOpen(false);
      } else {
        toast.error("Beim Senden des Kommentars ist ein Fehler aufgetreten");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Beim Senden des Kommentars ist ein Fehler aufgetreten");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-[#436f4d]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-[#436f4d] text-white px-4 py-2 text-sm font-medium"
      >
        Fehler in dieser Lektion gefunden?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible Content - smooth transition using max-height + opacity */}
      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out ${
          isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-4 bg-white text-sm text-gray-800 space-y-4">
          <p>
            Manchmal sieht man den Wald vor lauter Bäumen nicht. Und ein anderes
            Mal hat man etwas 5× geprüft (und auch prüfen lassen) und es ist
            dennoch was falsch. So sind auch wir sicher nicht davor verschont,
            dass sich in unseren Schulungsunterlagen ein Fehler eingeschlichen
            haben könnte. Aber wir als Gemeinschaft schaffen es sicher das immer
            weiter zu optimieren.
          </p>

          <textarea
            placeholder="Hier tippen ..."
            className="w-full border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            disabled={isSubmitting}
          />

          <div className="flex justify-end">
            <button
              className={`bg-red-600 text-white px-6 py-2 font-semibold rounded hover:bg-red-700 transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "SENDEN..." : "ABSENDEN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
