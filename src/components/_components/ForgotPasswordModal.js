"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const ForgotPasswordModal = ({ isOpen, onClose, onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    const result = await forgotPassword(email);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Failed to send reset email");
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    onClose();
  };

  // Escape key closes modal
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 auth-modal">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative auth-modal-content">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-green-800 font-medium">Email Sent!</p>
              <p className="text-green-700 text-sm mt-1">
                Check your email for password reset instructions
              </p>
            </div>
            <button
              onClick={onBackToLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 auth-button"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            {/* Error message */}
            {error && <div className="auth-message error">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent auth-input"
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed auth-button"
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
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            {/* Back to login link */}
            <div className="mt-6 text-center">
              <button
                onClick={onBackToLogin}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
