import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { createComment } from "@/lib/getAllPages";
import { toast } from "react-toastify";

export default function KategorianCollapsibleComment({ postId }) {
  const [isOpen, setIsOpen] = useState(true);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const [captcha, setCaptcha] = useState({
    num1: 0,
    num2: 0,
    operation: "",
    answer: "",
  });
  const [captchaInput, setCaptchaInput] = useState("");
  const [guestName, setGuestName] = useState("");

  // Generate a simple math captcha when component loads or user changes
  useEffect(() => {
    if (!user) {
      generateCaptcha();
    }
  }, [user]);

  console.log("22222222222", postId);

  // Function to generate a random math problem
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const isAddition = Math.random() > 0.5;
    const operation = isAddition ? "+" : "-";
    const answer = isAddition ? num1 + num2 : num1 - num2;

    setCaptcha({ num1, num2, operation, answer: answer.toString() });
    setCaptchaInput("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const handleGuestNameChange = (e) => {
    setGuestName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Bitte geben Sie einen Kommentar ein", {
        style: { zIndex: 100 },
      });
      return;
    }

    // Handle guest users with captcha
    if (!user) {
      // Validate guest name
      if (!guestName.trim()) {
        toast.error("Bitte geben Sie Ihren Namen ein", {
          style: { zIndex: 100 },
        });
        return;
      }

      // Validate captcha
      if (captchaInput !== captcha.answer) {
        toast.error(
          "Die Captcha-Antwort ist falsch. Bitte versuchen Sie es erneut.",
          { style: { zIndex: 100 } }
        );
        generateCaptcha(); // Generate a new captcha
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const response = await createComment(
        user ? user.name || "" : guestName,
        user ? user.email || "" : "",
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
          "Deine Anmerkung zum Verbessern unserer Webseite.Your idea has been submitted.",
          { style: { zIndex: 100 } }
        );
        setComment("");
        if (!user) {
          setGuestName("");
          setCaptchaInput("");
          generateCaptcha();
        }
        setIsOpen(false);
      } else {
        toast.error("Beim Senden des Kommentars ist ein Fehler aufgetreten", {
          style: { zIndex: 100 },
        });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Beim Senden des Kommentars ist ein Fehler aufgetreten", {
        style: { zIndex: 100 },
      });
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
        Deine Meinung zählt: Hilf uns, besser zu werden!
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
            Du hast Vorschläge, um unsere Texte zu verbessern? Teile sie uns
            bitte mit. Für jede umgesetzte Idee belohnen wir dich mit einer
            kleinen Aufmerksamkeit. Dein Feedback ermöglicht kontinuierliche
            Verbesserungen und prägt die Qualität unserer Webseite. Sei dabei
            und gestalte mit!
          </p>

          {/* Show guest info fields if user is not logged in */}
          {!user && (
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="guestName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  placeholder="Dein Name"
                  className="w-full border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={guestName}
                  onChange={handleGuestNameChange}
                  disabled={isSubmitting}
                />
              </div>

              {/* Simple Math Captcha */}
              <div>
                <label
                  htmlFor="captcha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Captcha: Was ist {captcha.num1} {captcha.operation}{" "}
                  {captcha.num2}?
                </label>
                <input
                  type="text"
                  id="captcha"
                  placeholder="Ergebnis eingeben"
                  className="w-full border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={captchaInput}
                  onChange={handleCaptchaChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}

          <textarea
            placeholder="Hier tippen ..."
            className="w-full border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            disabled={isSubmitting}
          />

          <div className="flex justify-start">
            <button
              className={`bg-[#CC2233] text-white px-6 py-2 font-semibold rounded hover:bg-red-700 transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "SENDEN..." : "Idee / Meinung absenden"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
