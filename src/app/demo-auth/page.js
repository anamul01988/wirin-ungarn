"use client";

import React from "react";
import { useAuth } from "../../lib/auth-context";
import ProtectedRoute from "../../components/ProtectedRoute";
import AuthExample from "../../components/AuthExample";
import { Navbar } from "../../components/ui";

export default function DemoAuthPage() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar>
        <a
          href="/"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </a>
        <a
          href="/demo-auth"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Auth Demo
        </a>
      </Navbar>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Authentication Demo
          </h1>
          <p className="text-gray-600 mb-6">
            This page demonstrates the WordPress headless authentication system.
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : isAuthenticated ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    You are logged in!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Welcome, {user?.displayName || user?.username}!</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Not logged in
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Use the login button in the navbar to authenticate.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <ProtectedRoute>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Protected Content
              </h2>
              <p className="text-gray-600 mb-4">
                This content is only visible to authenticated users.
              </p>

              {user && (
                <div className="bg-gray-50 rounded-md p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    User Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <p className="text-gray-900">{user.username}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="text-gray-900">{user.email || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Display Name
                      </label>
                      <p className="text-gray-900">
                        {user.displayName || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        User ID
                      </label>
                      <p className="text-gray-900">{user.id}</p>
                    </div>
                  </div>

                  {user.roles &&
                    user.roles.nodes &&
                    user.roles.nodes.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Roles
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {user.roles.nodes.map((role, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {role.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Advanced Authentication Example */}
            <AuthExample />
          </div>
        </ProtectedRoute>
      </div>
    </div>
  );
}
