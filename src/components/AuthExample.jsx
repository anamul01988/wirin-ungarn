"use client";

import React, { useState, useEffect } from "react";
import { useAuth, apolloClient } from "../lib/auth-context";
import { GET_USER_PROFILE, GET_USER_POSTS } from "../lib/auth-queries";

const AuthExample = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [showUserData, setShowUserData] = useState(false);

  // Example of using GraphQL queries with authentication
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // Load user profile
      setProfileLoading(true);
      apolloClient
        .query({ query: GET_USER_PROFILE })
        .then((result) => {
          setUserProfile(result.data);
          setProfileLoading(false);
        })
        .catch((error) => {
          console.error("Profile query error:", error);
          setProfileLoading(false);
        });

      // Load user posts
      setPostsLoading(true);
      apolloClient
        .query({ query: GET_USER_POSTS })
        .then((result) => {
          setUserPosts(result.data);
          setPostsLoading(false);
        })
        .catch((error) => {
          console.error("Posts query error:", error);
          setPostsLoading(false);
        });
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Authentication Example
      </h2>

      {!isAuthenticated ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Please log in to see your profile and posts.
          </p>
          <p className="text-sm text-gray-500">
            Use the login button in the navbar to authenticate.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Authentication Status
            </h3>
            <p className="text-green-700">
              Successfully authenticated as:{" "}
              <strong>{user?.displayName || user?.username}</strong>
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowUserData(!showUserData)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {showUserData ? "Hide" : "Show"} User Data
            </button>
          </div>

          {showUserData && (
            <div className="space-y-4">
              {/* Basic User Info */}
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Basic User Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <p className="text-gray-900">{user?.username}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-gray-900">{user?.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Display Name
                    </label>
                    <p className="text-gray-900">
                      {user?.displayName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      User ID
                    </label>
                    <p className="text-gray-900">{user?.id}</p>
                  </div>
                </div>
              </div>

              {/* GraphQL User Profile Query */}
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  GraphQL User Profile Query
                </h4>
                {profileLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-gray-600">Loading profile...</span>
                  </div>
                ) : userProfile?.viewer ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Description:</strong>{" "}
                      {userProfile.viewer.description || "N/A"}
                    </p>
                    <p>
                      <strong>Avatar:</strong>{" "}
                      {userProfile.viewer.avatar?.url ? "Available" : "N/A"}
                    </p>
                    {userProfile.viewer.roles?.nodes && (
                      <div>
                        <strong>Roles:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {userProfile.viewer.roles.nodes.map((role, index) => (
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
                ) : (
                  <p className="text-gray-500">No profile data available</p>
                )}
              </div>

              {/* User Posts Query */}
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  User Posts Query
                </h4>
                {postsLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-gray-600">Loading posts...</span>
                  </div>
                ) : userPosts?.viewer?.posts?.nodes ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Total Posts:</strong>{" "}
                      {userPosts.viewer.posts.nodes.length}
                    </p>
                    {userPosts.viewer.posts.nodes.length > 0 ? (
                      <div className="space-y-2">
                        <p>
                          <strong>Recent Posts:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          {userPosts.viewer.posts.nodes
                            .slice(0, 3)
                            .map((post, index) => (
                              <li key={index} className="text-sm">
                                <strong>{post.title}</strong> - {post.status} (
                                {post.date})
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500">No posts found</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No posts data available</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthExample;
