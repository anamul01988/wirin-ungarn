# WordPress Headless Login Verification Guide

## 🔍 Step-by-Step Verification Process

### Step 1: Environment Variables Setup

1. **Create `.env.local` file** in your project root:

   ```bash
   # Create the file
   touch .env.local
   ```

2. **Add your WordPress URL** to `.env.local`:

   ```env
   NEXT_PUBLIC_WORDPRESS_URL=https://your-actual-wordpress-site.com
   NEXT_PUBLIC_DEBUG_AUTH=false
   ```

3. **Replace the placeholder** with your actual WordPress site URL:

   - ✅ Good: `https://mysite.com`
   - ✅ Good: `https://wordpress.mydomain.com`
   - ❌ Bad: `https://your-wordpress-site.com` (placeholder)

4. **Restart your Next.js server** after creating the file:
   ```bash
   npm run dev
   ```

### Step 2: WordPress Plugin Installation

1. **Download the plugin**:

   - Go to: https://github.com/wp-graphql/wp-graphql-headless-login
   - Download the latest release ZIP file

2. **Install in WordPress**:

   - Go to WordPress Admin → Plugins → Add New
   - Click "Upload Plugin"
   - Upload the ZIP file
   - Click "Install Now"

3. **Activate the plugin**:

   - Go to Plugins → Installed Plugins
   - Find "WPGraphQL Headless Login"
   - Click "Activate"

4. **Configure the plugin** (if needed):
   - Go to GraphQL → Settings
   - Configure JWT settings
   - Set CORS if needed

### Step 3: Verify Installation

1. **Visit the verification page**:

   ```
   http://localhost:3000/verify-setup
   ```

2. **Run the tests**:

   - Click "Run Full Verification"
   - Check all tests pass

3. **Test authentication**:
   - Go to `/demo-auth`
   - Try logging in with WordPress credentials

### Step 4: Manual Verification

#### Check WordPress GraphQL Endpoint

1. **Test GraphQL endpoint directly**:

   ```bash
   curl -X POST https://your-wordpress-site.com/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ __schema { queryType { name } } }"}'
   ```

2. **Expected response**:
   ```json
   {
     "data": {
       "__schema": {
         "queryType": {
           "name": "RootQuery"
         }
       }
     }
   }
   ```

#### Check Authentication Mutations

1. **Test for login mutation**:

   ```bash
   curl -X POST https://your-wordpress-site.com/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ __type(name: \"RootMutation\") { fields { name } } }"}'
   ```

2. **Look for these mutations**:
   - `login`
   - `logout`
   - `refreshJwtAuthToken`

### Step 5: Common Issues & Solutions

#### Issue: "GraphQL endpoint not accessible"

**Solutions:**

- Check if WordPress site is running
- Verify the URL is correct
- Check if GraphQL plugin is installed
- Test with browser: `https://yoursite.com/graphql`

#### Issue: "No authentication mutations found"

**Solutions:**

- Ensure wp-graphql-headless-login is installed
- Check if plugin is activated
- Verify plugin version compatibility

#### Issue: "CORS errors"

**Solutions:**

- Configure CORS in WordPress
- Add your domain to allowed origins
- Check browser developer tools for specific errors

#### Issue: "Environment variables not loading"

**Solutions:**

- Restart Next.js development server
- Check file name is exactly `.env.local`
- Verify no typos in variable names
- Check file is in project root directory

### Step 6: Test Authentication Flow

1. **Start your Next.js app**:

   ```bash
   npm run dev
   ```

2. **Visit the demo page**:

   ```
   http://localhost:3000/demo-auth
   ```

3. **Test login**:

   - Click "Login" button
   - Enter WordPress credentials
   - Verify successful login

4. **Test protected content**:
   - Check if user profile loads
   - Verify GraphQL queries work
   - Test logout functionality

### Step 7: Production Checklist

Before deploying to production:

- [ ] Environment variables set in production
- [ ] WordPress site is accessible
- [ ] Plugin is installed and activated
- [ ] CORS configured for production domain
- [ ] HTTPS enabled on WordPress site
- [ ] Test authentication flow works
- [ ] Check browser console for errors

## 🚨 Quick Verification Commands

```bash
# Check if .env.local exists and has correct content
cat .env.local

# Test GraphQL endpoint
curl -X POST https://your-wordpress-site.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { queryType { name } } }"}'

# Start Next.js and test
npm run dev
# Then visit: http://localhost:3000/verify-setup
```

## 📞 Need Help?

If you encounter issues:

1. Check the verification page: `/verify-setup`
2. Check browser console for errors
3. Verify WordPress site accessibility
4. Test GraphQL endpoint directly
5. Check plugin installation status

The verification page will guide you through each step and show exactly what's working and what needs to be fixed.
