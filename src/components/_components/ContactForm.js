"use client";

import { useState } from "react";
import Toast from "./Toast";

export default function ContactForm({ formHtml }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // GraphQL endpoint - you can set this in your environment variables
  // const graphqlEndpoint =
  //   process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://wir-in-ungarn.hu/graphql";
  const graphqlEndpoint = "https://wir-in-ungarn.hu/graphql";
  // Fixed form ID
  const formId = "4da2d38";

  // Simple check if form exists
  const hasForm = formHtml && formHtml.includes("wpcf7-form");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    hideToast();

    const mutation = `
      mutation SubmitContactForm($input: SubmitContactFormInput!) {
        submitContactForm(input: $input) {
          success
          message
        }
      }
    `;

    const variables = {
      input: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        formId: parseInt(formId),
      },
    };

    try {
      const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "GraphQL error occurred");
      }

      if (result.data) {
        const { success, message } = result.data.submitContactForm;

        if (success) {
          showToast(
            message ||
              "Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.",
            "success"
          );
          // Clear form
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          showToast(
            message || "Es gab ein Problem beim Senden deiner Nachricht.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showToast(
        "Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es erneut.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasForm) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">No contact form found.</p>
      </div>
    );
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={hideToast}
      />

      <div className="w-full mx-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Kontakt</h2>

          <p className="text-gray-600 mb-6">
            Hey, schön, dass du uns schreiben möchtest! Bevor du uns
            kontaktierst, könnte es hilfreich sein, kurz auf unserer Seite zu
            stöbern. Viele Antworten auf gängige Fragen findest du vielleicht
            schon in unseren Blogposts, FAQs oder anderen Bereichen.
          </p>

          <p className="text-gray-600 mb-8">
            Aber natürlich wissen wir, dass manchmal direkte Kommunikation
            unschlagbar ist! Wenn du also eine spezielle Frage hast, Anregungen
            geben möchtest oder einfach nur Hallo sagen willst, zögere nicht und
            schreib uns.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Dein Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="Dein Name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Deine E-Mail-Adresse *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="Deine E-Mail-Adresse"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Betreff *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="Betreff"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Deine Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 resize-vertical"
                placeholder="Deine Nachricht"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Wird gesendet...
                  </>
                ) : (
                  "Nachricht senden"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
