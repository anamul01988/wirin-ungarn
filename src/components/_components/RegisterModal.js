"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Checkbox } from "@material-tailwind/react";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register } = useAuth();

  // Check if a user already exists for the given email via GraphQL
  const checkUserExists = async (email) => {
    try {
      const response = await fetch("https://wir-in-ungarn.hu/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query CheckUser($email: String!) {
              userExists(email: $email)
            }
          `,
          variables: { email },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        // If the backend returns an error, treat as "cannot register"
        console.error("CheckUser error:", result.errors);
        throw new Error(
          result.errors[0]?.message || "Fehler bei der Benutzerprüfung"
        );
      }

      return Boolean(result.data?.userExists);
    } catch (err) {
      console.error("CheckUser request failed:", err);
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // First: check if a user already exists with this email
      const exists = await checkUserExists(formData.email);
      if (exists) {
        setError(
          "Für diese E-Mail-Adresse existiert bereits ein Nutzerkonto. Bitte melde Dich an oder nutze 'Passwort vergessen'."
        );
        setIsLoading(false);
        return;
      }

      const result = await register(
        formData.username,
        formData.email,
        formData.password
      );

      if (result.success) {
        setSuccess(
          result.message || "Registration successful! You are now logged in."
        );

        // Auto close modal after 2 seconds since user is now logged in
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    setError("");
    setSuccess("");
    onClose();
  };

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 auth-modal">
      <div className="bg-white rounded-lg p-2  w-full max-w-2xl  relative auth-modal-content">
        <div className=" border-2 border-black rounded-lg border-solid">
          <div className="py-6 px-16">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Nutzerkonto registrieren
              </h2>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username field */}
              <div>
                <label
                  htmlFor="reg-username"
                  className="block text-md font-bold text-black text mb-1"
                >
                  Gewünschter Benutzername{" "}
                  <span className=" text-red-800">*</span>
                  <span className="block text-sm font-medium text-gray-700 italic text mb-2">
                    Wähle Dir einen Namen mit 3 - 12 Buchstaben Länge.
                  </span>
                </label>
                <input
                  type="text"
                  id="reg-username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Choose a username"
                  disabled={isLoading}
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-md font-bold text-black text mb-1"
                >
                  Deine E-Mail-Adresse <span className=" text-red-800">*</span>
                  <span className="block text-sm font-medium text-gray-700 italic text mb-2">
                    Wir senden Dir zur Bestätigung eine Nachricht mit Link.
                  </span>
                </label>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="reg-password"
                  className="block text-md font-bold text-black text mb-1"
                >
                  Password <span className=" text-red-800">*</span>
                  <span className="block text-sm font-medium text-gray-700 italic text mb-2">
                    Wähle eine Zeichenfolge, die mindestens 7 Zeichen (Groß- und
                    Kleinbuchstaben und Sonderzeichen) enthält.
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="reg-password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password field */}
              <div>
                <label
                  htmlFor="reg-confirm-password"
                  className="block text-md font-bold text-black text mb-1"
                >
                  Passwort bestätigen <span className=" text-red-800">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="reg-confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 items-end">
                <div className="flex-shrink-0 pt-0.5">
                  <Checkbox />
                </div>
                <span className="text-sm text-gray-600 leading-tight">
                  Ich habe die{" "}
                  <span className=" underline"> Teilnahmebedingungen </span>{" "}
                  verstanden und bestätige hiermit, dass ich diese akzeptiere.
                </span>
              </div>

              {/* Submit button */}
              {/* <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
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
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button> */}

              <div className="flex pl-10 items-center gap-10 my-4">
                <div
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                  className="underline text-green-800 hover:text-green-900 font-medium"
                >
                  Anmelden <br /> Passwort vergessen
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-shrink-0 bg-red-800 text-white py-3 px-8 rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base auth-button whitespace-nowrap"
                  style={{ minWidth: "fit-content" }}
                >
                  {isLoading ? (
                    <> JETZT REGISTRIEREN...</>
                  ) : (
                    "JETZT REGISTRIEREN"
                  )}
                </button>
              </div>
            </form>

            {/* Login link */}
            {/* <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
