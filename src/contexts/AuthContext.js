"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { tokenStorage, TOKEN_KEYS, isTokenExpired } from "@/lib/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = tokenStorage.getItem(TOKEN_KEYS.AUTH_TOKEN);
        const userData = tokenStorage.getItem(TOKEN_KEYS.USER_DATA);

        if (token && userData && !isTokenExpired(token)) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else if (token && isTokenExpired(token)) {
          // Token is expired, try to refresh
          refreshAuthToken();
        } else {
          // No valid token, clear any invalid data
          tokenStorage.clear();
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // Clear invalid data
        tokenStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("https://wir-in-ungarn.hu/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation Login($input: LoginInput!) {
              login(input: $input) {
                authToken
                refreshToken
                user {
                  id
                  name
                  email
                }
              }
            }
          `,
          variables: {
            input: {
              clientMutationId: "testLogin",
              username: username,
              password: password,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "Login failed");
      }

      if (result.data?.login) {
        const { authToken, refreshToken, user: userData } = result.data.login;

        // Store tokens and user data using secure storage
        tokenStorage.setItem(TOKEN_KEYS.AUTH_TOKEN, authToken);
        tokenStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
        tokenStorage.setItem(TOKEN_KEYS.USER_DATA, JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, user: userData };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear all auth data using secure storage
    tokenStorage.clear();

    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch("https://wir-in-ungarn.hu/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation RegisterUser($input: RegisterUserInput!) {
              registerUser(input: $input) {
                user {
                  jwtAuthToken
                  jwtRefreshToken
                }
              }
            }
          `,
          variables: {
            input: {
              clientMutationId: "testRegister",
              username: username,
              email: email,
              password: password,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "Registration failed");
      }

      if (result.data?.registerUser?.user) {
        const { jwtAuthToken, jwtRefreshToken } = result.data.registerUser.user;

        // Store tokens using the same keys as login
        tokenStorage.setItem(TOKEN_KEYS.AUTH_TOKEN, jwtAuthToken);
        tokenStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, jwtRefreshToken);
        tokenStorage.setItem(
          TOKEN_KEYS.USER_DATA,
          JSON.stringify({
            id: "temp_" + Date.now(),
            name: username,
            email: email,
          })
        );

        // Set user as authenticated
        setUser({
          id: "temp_" + Date.now(),
          name: username,
          email: email,
        });
        setIsAuthenticated(true);

        return {
          success: true,
          message: "Registration successful! You are now logged in.",
          user: {
            id: "temp_" + Date.now(),
            name: username,
            email: email,
          },
        };
      } else {
        throw new Error("Registration failed - no user data returned");
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = tokenStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch("https://wir-in-ungarn.hu/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation RefreshAuthToken($input: RefreshAuthTokenInput!) {
              refreshAuthToken(input: $input) {
                authToken
                refreshToken
              }
            }
          `,
          variables: {
            input: {
              refreshToken: refreshToken,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "Token refresh failed");
      }

      if (result.data?.refreshAuthToken) {
        const { authToken, refreshToken: newRefreshToken } =
          result.data.refreshAuthToken;

        tokenStorage.setItem(TOKEN_KEYS.AUTH_TOKEN, authToken);
        tokenStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, newRefreshToken);

        return { success: true };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      // If refresh fails, logout user
      logout();
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
