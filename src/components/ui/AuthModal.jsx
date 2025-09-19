import React, { useState } from "react";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { useAuth } from "../../lib/auth-context";

const AuthModal = ({ isOpen, onClose }) => {
  const { isAuthenticated, user } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(true);

  if (!isOpen) return null;

  const handleLoginSuccess = (user) => {
    setShowLoginForm(false);
    // Modal will show user profile after successful login
  };

  const handleBackToLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {isAuthenticated ? "User Profile" : "Authentication"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          {isAuthenticated ? (
            <div>
              <UserProfile />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              {showLoginForm ? (
                <LoginForm onSuccess={handleLoginSuccess} onCancel={onClose} />
              ) : (
                <div className="text-center">
                  <p className="text-green-600 mb-4">Login successful!</p>
                  <button
                    onClick={handleBackToLogin}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
