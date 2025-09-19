import { gql } from "@apollo/client";

// Authentication mutations
export const LOGIN_MUTATION = gql`
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

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation LogoutUser {
    logout(input: { clientMutationId: "logout" }) {
      status
    }
  }
`;

// User queries
export const GET_VIEWER_QUERY = gql`
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

// Example protected content queries
export const GET_USER_POSTS = gql`
  query GetUserPosts {
    viewer {
      posts(first: 10) {
        nodes {
          id
          title
          date
          slug
          content
          status
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    viewer {
      id
      username
      email
      firstName
      lastName
      displayName
      description
      avatar {
        url
      }
      roles {
        nodes {
          name
          capabilities
        }
      }
    }
  }
`;

// Example of a query that requires authentication
export const GET_PROTECTED_CONTENT = gql`
  query GetProtectedContent {
    viewer {
      id
      username
    }
    # Add your protected content queries here
    # For example, user-specific posts, private pages, etc.
  }
`;
