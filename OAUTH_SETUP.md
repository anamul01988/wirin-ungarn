# OAuth Setup Guide

## ✅ Fixed Issues

The token storage error has been resolved by creating proper auth utilities in `src/lib/auth-utils.js`.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=1162573049076751
FACEBOOK_CLIENT_SECRET=9db2d916a54d3093cdb978ba1b348f01
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/iam-admin/settings?project=wir-in-ungarn)
2. Navigate to "APIs & Services" > "Credentials"
3. Create OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
5. Copy the Client ID and Client Secret to your `.env.local` file

## Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/apps/1162573049076751/settings/basic/)
2. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook` (development)
   - `https://yourdomain.com/api/auth/callback/facebook` (production)
3. The App ID and App Secret are already provided:
   - App ID: `1162573049076751`
   - App Secret: `9db2d916a54d3093cdb978ba1b348f01`

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Click on the login modal
4. Test both Google and Facebook login buttons

## Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Generate a secure `NEXTAUTH_SECRET` (you can use: `openssl rand -base64 32`)
3. Update OAuth redirect URIs in both Google and Facebook consoles
4. Deploy your application
