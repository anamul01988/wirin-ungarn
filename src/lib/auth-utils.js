import Cookies from "js-cookie";

// Token storage keys
export const TOKEN_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  REFRESH_TOKEN: "refresh_token",
};

// Token storage utilities
export const tokenStorage = {
  getItem: (key) => {
    try {
      return Cookies.get(key);
    } catch (error) {
      console.error("Error getting item from storage:", error);
      return null;
    }
  },

  setItem: (key, value, options = {}) => {
    try {
      const defaultOptions = {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        ...options,
      };
      Cookies.set(key, value, defaultOptions);
    } catch (error) {
      console.error("Error setting item in storage:", error);
    }
  },

  removeItem: (key) => {
    try {
      Cookies.remove(key);
    } catch (error) {
      console.error("Error removing item from storage:", error);
    }
  },

  clear: () => {
    try {
      Object.values(TOKEN_KEYS).forEach((key) => {
        Cookies.remove(key);
      });
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // Decode JWT token (basic check)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is expired (with 5 minute buffer)
    return payload.exp < currentTime + 300;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Generate a random secret for NextAuth
export const generateSecret = () => {
  return require("crypto").randomBytes(32).toString("hex");
};
