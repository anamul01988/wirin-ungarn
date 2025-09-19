"use client";

import React, { useState, useEffect } from "react";
import {
  verifySetup,
  checkEnvironmentVariables,
  testGraphQLEndpoint,
  testAuthMutations,
} from "../../lib/verify-setup";

export default function VerifySetupPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [results, setResults] = useState(null);
  const [envVars, setEnvVars] = useState(null);

  const runVerification = async () => {
    setIsVerifying(true);
    setResults(null);

    try {
      // Check environment variables
      const envCheck = checkEnvironmentVariables();
      setEnvVars(envCheck);

      // Run full verification
      const success = await verifySetup();
      setResults({ success, timestamp: new Date().toISOString() });
    } catch (error) {
      setResults({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const testGraphQL = async () => {
    setIsVerifying(true);
    try {
      const result = await testGraphQLEndpoint();
      setResults((prev) => ({ ...prev, graphqlTest: result }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        graphqlTest: { success: false, error: error.message },
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const testAuth = async () => {
    setIsVerifying(true);
    try {
      const result = await testAuthMutations();
      setResults((prev) => ({ ...prev, authTest: result }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        authTest: { success: false, error: error.message },
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            WordPress Headless Login Setup Verification
          </h1>

          <div className="space-y-6">
            {/* Environment Variables Check */}
            <div className="bg-gray-50 rounded-md p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Environment Variables
              </h2>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    NEXT_PUBLIC_WORDPRESS_URL:
                  </span>
                  <span
                    className={`text-sm ${
                      process.env.NEXT_PUBLIC_WORDPRESS_URL &&
                      process.env.NEXT_PUBLIC_WORDPRESS_URL !==
                        "https://your-wordpress-site.com"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {process.env.NEXT_PUBLIC_WORDPRESS_URL || "Not set"}
                  </span>
                </div>

                {process.env.NEXT_PUBLIC_WORDPRESS_URL ===
                  "https://your-wordpress-site.com" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Please update your .env.local file with your actual
                      WordPress URL
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Required .env.local file:
                </h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`NEXT_PUBLIC_WORDPRESS_URL=https://your-actual-wordpress-site.com
NEXT_PUBLIC_DEBUG_AUTH=false`}
                </pre>
              </div>
            </div>

            {/* WordPress Plugin Check */}
            <div className="bg-gray-50 rounded-md p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. WordPress Plugin Requirements
              </h2>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✅</span>
                  <div>
                    <p className="text-sm font-medium">
                      Install wp-graphql-headless-login plugin
                    </p>
                    <p className="text-xs text-gray-600">
                      Download from:{" "}
                      <a
                        href="https://github.com/wp-graphql/wp-graphql-headless-login"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✅</span>
                  <div>
                    <p className="text-sm font-medium">Activate the plugin</p>
                    <p className="text-xs text-gray-600">
                      Go to WordPress Admin → Plugins → Activate
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="text-green-600">✅</span>
                  <div>
                    <p className="text-sm font-medium">
                      Configure JWT settings
                    </p>
                    <p className="text-xs text-gray-600">
                      Set token expiration and CORS settings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Buttons */}
            <div className="bg-gray-50 rounded-md p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Connection Tests
              </h2>

              <div className="flex space-x-4">
                <button
                  onClick={runVerification}
                  disabled={isVerifying}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isVerifying ? "Testing..." : "Run Full Verification"}
                </button>

                <button
                  onClick={testGraphQL}
                  disabled={isVerifying}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Test GraphQL
                </button>

                <button
                  onClick={testAuth}
                  disabled={isVerifying}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Test Auth
                </button>
              </div>
            </div>

            {/* Results */}
            {results && (
              <div className="bg-gray-50 rounded-md p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Test Results
                </h2>

                <div className="space-y-3">
                  {results.success !== undefined && (
                    <div
                      className={`p-3 rounded-md ${
                        results.success
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          results.success ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {results.success
                          ? "✅ Verification Passed"
                          : "❌ Verification Failed"}
                      </p>
                      {results.error && (
                        <p className="text-sm text-red-600 mt-1">
                          {results.error}
                        </p>
                      )}
                    </div>
                  )}

                  {results.graphqlTest && (
                    <div
                      className={`p-3 rounded-md ${
                        results.graphqlTest.success
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          results.graphqlTest.success
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        GraphQL Test:{" "}
                        {results.graphqlTest.success
                          ? "✅ Passed"
                          : "❌ Failed"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {results.graphqlTest.message ||
                          results.graphqlTest.error}
                      </p>
                    </div>
                  )}

                  {results.authTest && (
                    <div
                      className={`p-3 rounded-md ${
                        results.authTest.success
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          results.authTest.success
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        Auth Mutations Test:{" "}
                        {results.authTest.success ? "✅ Passed" : "❌ Failed"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {results.authTest.message || results.authTest.error}
                      </p>
                      {results.authTest.fields && (
                        <p className="text-xs text-gray-500 mt-1">
                          Found: {results.authTest.fields.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Last tested: {new Date(results.timestamp).toLocaleString()}
                </div>
              </div>
            )}

            {/* Troubleshooting */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Troubleshooting
              </h3>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>
                  <strong>GraphQL endpoint not accessible:</strong> Check if
                  your WordPress site is running and accessible
                </p>
                <p>
                  <strong>No authentication mutations found:</strong> Ensure
                  wp-graphql-headless-login plugin is installed and activated
                </p>
                <p>
                  <strong>CORS errors:</strong> Configure CORS settings in your
                  WordPress plugin
                </p>
                <p>
                  <strong>Environment variables not loading:</strong> Restart
                  your Next.js development server after creating .env.local
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
