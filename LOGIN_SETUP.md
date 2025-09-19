# WordPress Headless Login Setup

This project now includes a complete authentication system using `wp-graphql-headless-login` for headless WordPress.

## Prerequisites

1. **WordPress Plugin**: Install and activate the `wp-graphql-headless-login` plugin on your WordPress site
2. **WordPress Configuration**: Ensure your WordPress site has GraphQL enabled

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
```

Replace `https://your-wordpress-site.com` with your actual WordPress site URL.

## Features Implemented

### 1. Authentication Context (`src/lib/auth-context.js`)

- User login/logout functionality
- Token management with automatic refresh
- User profile data management
- Authentication state persistence

### 2. Apollo Client Configuration (`src/lib/apollo-client.js`)

- GraphQL client setup with authentication headers
- Automatic token injection for authenticated requests
- Error handling and caching

### 3. UI Components

#### Login Form (`src/components/ui/LoginForm.jsx`)

- Username/email and password input
- Form validation and error handling
- Loading states

#### User Profile (`src/components/ui/UserProfile.jsx`)

- Display user information
- User roles display
- Logout functionality

#### Auth Modal (`src/components/ui/AuthModal.jsx`)

- Modal wrapper for authentication UI
- Handles both login and profile views

#### Updated Navbar (`src/components/ui/Navbar.jsx`)

- Login/logout buttons
- User welcome message
- Profile access

## Usage

### Basic Authentication

```jsx
import { useAuth } from "../lib/auth-context";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user.displayName}!</div>;
  }

  return <div>Please log in</div>;
}
```

### GraphQL Queries with Authentication

```jsx
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_PROTECTED_DATA = gql`
  query GetProtectedData {
    viewer {
      id
      username
    }
    # Add your protected queries here
  }
`;

function ProtectedComponent() {
  const { data, loading, error } = useQuery(GET_PROTECTED_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Your protected content */}</div>;
}
```

## WordPress Plugin Setup

1. Install the `wp-graphql-headless-login` plugin on your WordPress site
2. Configure the plugin settings:
   - Enable JWT authentication
   - Set token expiration times
   - Configure CORS if needed

## Security Notes

- Tokens are stored in HTTP-only cookies for security
- Automatic token refresh prevents session expiration
- All authentication state is managed client-side
- GraphQL queries automatically include authentication headers

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your WordPress site allows requests from your Next.js domain
2. **Token Issues**: Check that the `wp-graphql-headless-login` plugin is properly configured
3. **GraphQL Endpoint**: Verify that your WordPress GraphQL endpoint is accessible

### Debug Mode

To enable debug logging, add this to your `.env.local`:

```env
NEXT_PUBLIC_DEBUG_AUTH=true
```

## Next Steps

1. Set up your WordPress site with the required plugin
2. Configure your environment variables
3. Test the login functionality
4. Customize the UI components as needed
5. Add protected routes and content as required
