# Authentication System

This document describes the authentication system implemented for the Wir-in-Ungarn application.

## Features

- **Login Modal**: Clean, responsive login form with username/password fields
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Registration Modal**: Complete registration form with validation
- **Profile Dropdown**: User profile with avatar, name, and menu options
- **Token Management**: Secure token storage with automatic refresh
- **State Management**: React Context for global authentication state
- **GraphQL Integration**: Uses existing GraphQL endpoint for authentication

## Components

### 1. AuthContext (`/src/contexts/AuthContext.js`)

- Provides authentication state and methods throughout the app
- Handles login, logout, and token refresh
- Manages user data and authentication status

### 2. LoginModal (`/src/components/_components/LoginModal.js`)

- Modal dialog for user login
- Username and password input fields
- Password visibility toggle
- Link to registration form
- Error handling and loading states

### 3. RegisterModal (`/src/components/_components/RegisterModal.js`)

- Modal dialog for user registration
- Username, email, password, and confirm password fields
- Form validation
- Link to login form

### 4. ProfileDropdown (`/src/components/_components/ProfileDropdown.js`)

- User profile dropdown menu
- Shows user avatar (with initials fallback)
- User name and email display
- Menu options (Profile Settings, Preferences, Help)
- Logout functionality

### 5. Auth Utilities (`/src/lib/auth.js`)

- Secure token storage management
- Token expiration checking
- HTTP headers for authenticated requests
- GraphQL request helper

## GraphQL Mutations

### Login Mutation

```graphql
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
```

### Registration Mutation

```graphql
mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    user {
      jwtAuthToken
      jwtRefreshToken
    }
  }
}
```

**Input Variables:**

```javascript
{
  input: {
    clientMutationId: "testRegister",
    username: "user123",
    email: "user@example.com",
    password: "password123"
  }
}
```

**Expected Response:**

```javascript
{
  "data": {
    "registerUser": {
      "user": {
        "jwtAuthToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "jwtRefreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
      }
    }
  }
}
```

### Token Refresh Mutation

```graphql
mutation RefreshAuthToken($input: RefreshAuthTokenInput!) {
  refreshAuthToken(input: $input) {
    authToken
    refreshToken
  }
}
```

## Usage

### Basic Authentication Check

```javascript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, user, login, register, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user.name}!</div>;
  }

  return <div>Please log in</div>;
}
```

### User Registration

```javascript
import { useAuth } from "@/contexts/AuthContext";

function RegisterComponent() {
  const { register } = useAuth();

  const handleRegister = async (username, email, password) => {
    const result = await register(username, email, password);

    if (result.success) {
      console.log("Registration successful:", result.message);
    } else {
      console.error("Registration failed:", result.error);
    }
  };

  return (
    // Your registration form JSX
  );
}
```

### Making Authenticated Requests

```javascript
import { makeAuthenticatedRequest } from "@/lib/auth";

const query = `
  query GetUserData {
    user {
      id
      name
      email
    }
  }
`;

const result = await makeAuthenticatedRequest(query);
```

## Security Features

1. **Token Storage**: Uses localStorage with error handling
2. **Token Expiration**: Automatic token expiration checking
3. **Auto Refresh**: Automatic token refresh when expired
4. **Secure Headers**: Proper authorization headers for API requests
5. **Error Handling**: Comprehensive error handling throughout

## State Management

The authentication state is managed through React Context and includes:

- `user`: Current user object with id, name, email
- `isAuthenticated`: Boolean indicating if user is logged in
- `loading`: Boolean indicating if auth check is in progress
- `login(username, password)`: Function to log in user
- `register(username, email, password)`: Function to register new user
- `logout()`: Function to log out user
- `refreshAuthToken()`: Function to refresh expired tokens

## Integration

The authentication system is integrated into the main app through:

1. `AuthProvider` wraps the entire app in `layout.js`
2. Header component shows login button or profile dropdown based on auth state
3. All components can access auth state through `useAuth()` hook

## Future Enhancements

- HTTP-only cookies for production security
- Remember me functionality
- Password reset functionality
- Social login integration
- Role-based access control
- Session timeout handling
