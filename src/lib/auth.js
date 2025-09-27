// Authentication utilities for token management

export const TOKEN_KEYS = {
  AUTH_TOKEN: "authToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
};

// Secure token storage with fallback
export const tokenStorage = {
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("Error storing token:", error);
    }
  },

  getItem: (key) => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },

  clear: () => {
    try {
      if (typeof window !== "undefined") {
        Object.values(TOKEN_KEYS).forEach((key) => {
          localStorage.removeItem(key);
        });
      }
    } catch (error) {
      console.error("Error clearing tokens:", error);
    }
  },
};

// Check if token is expired (basic check)
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // Decode JWT token (basic implementation)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Get auth headers for API requests
export const getAuthHeaders = () => {
  const token = tokenStorage.getItem(TOKEN_KEYS.AUTH_TOKEN);

  if (!token || isTokenExpired(token)) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// GraphQL request helper with auth
export const makeAuthenticatedRequest = async (query, variables = {}) => {
  const headers = getAuthHeaders();

  const response = await fetch("https://wir-in-ungarn.hu/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "GraphQL error occurred");
  }

  return result;
};
