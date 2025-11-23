"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const MobileLoginView = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Bitte füllen Sie alle Felder aus");
      setIsLoading(false);
      return;
    }

    const result = await login(formData.username, formData.password);

    if (result.success) {
      if (onClose) onClose();
      setFormData({ username: "", password: "", rememberMe: false });
    } else {
      setError(result.error || "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    const result = await loginWithGoogle();

    if (result.success) {
      if (onClose) onClose();
    } else {
      setError(result.error || "Google-Anmeldung fehlgeschlagen");
    }

    setIsLoading(false);
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    setError("");

    const result = await loginWithFacebook();

    if (result.success) {
      if (onClose) onClose();
    } else {
      setError(result.error || "Facebook-Anmeldung fehlgeschlagen");
    }

    setIsLoading(false);
  };

  const handleRegister = () => {
    router.push("/auth/signup");
    if (onClose) onClose();
  };

  const handleForgotPassword = () => {
    router.push("/reset-password");
    if (onClose) onClose();
  };

  return (
    <div className="bg-white w-full">
      <div className="py-2 px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Anmelden oder Registrieren
          </h2>
          <p className="text-gray-600 mt-2">
            Schnell und einfach loslegen!
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-1/2 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            onClick={handleFacebookLogin}
            disabled={isLoading}
            className="w-1/2 bg-[#46629B] flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-white hover:bg-[#365899] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="#fff" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-2 border-[#4a7c59]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-black font-medium">
              oder
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Direct Login Section */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-green-700 mb-3">
            Direkt bei wir-in-ungarn.hu anmelden
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username and Password fields */}
          <div className="flex flex-col gap-3">
            <div className="flex-1">
              <label className="block text-sm text-black font-semibold">
                Benutzername / E-Mail-Adresse
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your username or email"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-black font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
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
          </div>

          {/* Remember Me checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-black font-semibold"
            >
              Merke Dir mein Login auf diesem PC
            </label>
          </div>

          {/* Links and Submit button */}
          <div className="flex items-center justify-between gap-0 mt-2">
            <div className="space-y-2 items-start">
              <button
                type="button"
                onClick={handleRegister}
                className="text-sm underline text-green-500 hover:text-green-600 font-medium block"
              >
                Ich habe noch kein Nutzerkonto
              </button>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm underline text-green-500 hover:text-green-600 font-medium block"
                style={{ textAlign: "left" }}
              >
                Ich habe mein Passwort vergessen
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-shrink-0 w-1/3 bg-red-800 text-white py-2 px-3 rounded-md hover:bg-red-900 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  ...
                </div>
              ) : (
                "EINLOGEN"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileLoginView;
