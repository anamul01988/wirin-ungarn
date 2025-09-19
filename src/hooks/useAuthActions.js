import { useMutation } from "@apollo/client";
import { useAuth, apolloClient } from "../lib/auth-context";
import {
  LOGIN_MUTATION,
  REFRESH_TOKEN_MUTATION,
  LOGOUT_MUTATION,
} from "../lib/auth-queries";

export const useAuthActions = () => {
  const { user, isAuthenticated, loading } = useAuth();

  const [loginMutation, { loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  const login = async (username, password) => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });
      return data.login;
    } catch (error) {
      throw error;
    }
  };

  const refreshToken = async (refreshToken) => {
    try {
      const { data } = await refreshTokenMutation({
        variables: { refreshToken },
      });
      return data.refreshJwtAuthToken;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    refreshToken,
    logout,
    loginLoading,
    loginError,
  };
};
