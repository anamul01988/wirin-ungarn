"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  gql,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const AuthContext = createContext();

// Create Apollo Client
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_URL + "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("auth-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

// GraphQL queries for authentication
const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
        username
        email
        firstName
        lastName
        displayName
        roles {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation LogoutUser {
    logout(input: { clientMutationId: "logout" }) {
      status
    }
  }
`;

const GET_VIEWER_QUERY = gql`
  query GetViewer {
    viewer {
      id
      username
      email
      firstName
      lastName
      displayName
      roles {
        nodes {
          name
        }
      }
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = Cookies.get("auth-token");
      if (token) {
        const { data } = await apolloClient.query({
          query: GET_VIEWER_QUERY,
          fetchPolicy: "network-only",
        });

        if (data.viewer) {
          setUser(data.viewer);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear it
          clearAuth();
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      setLoading(true);
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { username, password },
      });

      if (data.login.authToken) {
        // Set cookies
        Cookies.set("auth-token", data.login.authToken, { expires: 7 }); // 7 days
        if (data.login.refreshToken) {
          Cookies.set("refresh-token", data.login.refreshToken, {
            expires: 30,
          }); // 30 days
        }

        setUser(data.login.user);
        setIsAuthenticated(true);
        return { success: true, user: data.login.user };
      } else {
        return { success: false, error: "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please check your credentials.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = Cookies.get("refresh-token");
      if (refreshToken) {
        await apolloClient.mutate({
          mutation: LOGOUT_MUTATION,
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
    }
  };

  const clearAuth = () => {
    Cookies.remove("auth-token");
    Cookies.remove("refresh-token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = Cookies.get("refresh-token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const { data } = await apolloClient.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: { refreshToken },
      });

      if (data.refreshJwtAuthToken.authToken) {
        Cookies.set("auth-token", data.refreshJwtAuthToken.authToken, {
          expires: 7,
        });
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearAuth();
      return false;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { apolloClient };
