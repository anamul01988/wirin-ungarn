import React from "react";
import { useAuth } from "../lib/auth-context";
import LoginForm from "./ui/LoginForm";

const ProtectedRoute = ({ children, fallback }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Authentication Required
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please log in to access this content
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      )
    );
  }

  return children;
};

export default ProtectedRoute;
