/**
 * WordPress Headless Login Setup Verification
 * Run this script to verify your plugin and environment setup
 */

// Check environment variables
export const checkEnvironmentVariables = () => {
  const issues = [];
  const warnings = [];

  // Check if WordPress URL is set
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!wpUrl) {
    issues.push("❌ NEXT_PUBLIC_WORDPRESS_URL is not set");
  } else if (wpUrl === "https://your-wordpress-site.com") {
    issues.push(
      "❌ NEXT_PUBLIC_WORDPRESS_URL is still set to placeholder value"
    );
  } else {
    console.log("✅ NEXT_PUBLIC_WORDPRESS_URL is set:", wpUrl);
  }

  // Check if URL is valid
  if (wpUrl && wpUrl !== "https://your-wordpress-site.com") {
    try {
      new URL(wpUrl);
      console.log("✅ WordPress URL format is valid");
    } catch (error) {
      issues.push("❌ WordPress URL format is invalid");
    }
  }

  // Check for HTTPS
  if (wpUrl && !wpUrl.startsWith("https://")) {
    warnings.push("⚠️  WordPress URL should use HTTPS for security");
  }

  return { issues, warnings };
};

// Test GraphQL endpoint connectivity
export const testGraphQLEndpoint = async () => {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!wpUrl || wpUrl === "https://your-wordpress-site.com") {
    return {
      success: false,
      error: "WordPress URL not configured",
    };
  }

  const graphqlUrl = `${wpUrl}/graphql`;

  try {
    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            __schema {
              queryType {
                name
              }
            }
          }
        `,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.__schema) {
        return {
          success: true,
          message: "GraphQL endpoint is accessible",
        };
      } else {
        return {
          success: false,
          error: "GraphQL endpoint returned invalid response",
        };
      }
    } else {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Network error: ${error.message}`,
    };
  }
};

// Test authentication mutations
export const testAuthMutations = async () => {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!wpUrl || wpUrl === "https://your-wordpress-site.com") {
    return {
      success: false,
      error: "WordPress URL not configured",
    };
  }

  const graphqlUrl = `${wpUrl}/graphql`;

  try {
    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            __type(name: "RootMutation") {
              fields {
                name
                description
              }
            }
          }
        `,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.__type) {
        const fields = data.data.__type.fields || [];
        const authFields = fields.filter(
          (field) =>
            field.name.includes("login") ||
            field.name.includes("logout") ||
            field.name.includes("refresh")
        );

        if (authFields.length > 0) {
          return {
            success: true,
            message: `Found ${authFields.length} authentication mutations`,
            fields: authFields.map((f) => f.name),
          };
        } else {
          return {
            success: false,
            error:
              "No authentication mutations found. Plugin may not be installed.",
          };
        }
      } else {
        return {
          success: false,
          error: "Could not query mutation types",
        };
      }
    } else {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Network error: ${error.message}`,
    };
  }
};

// Main verification function
export const verifySetup = async () => {
  console.log("🔍 Verifying WordPress Headless Login Setup...\n");

  // Check environment variables
  console.log("1. Checking Environment Variables:");
  const envCheck = checkEnvironmentVariables();

  if (envCheck.issues.length > 0) {
    envCheck.issues.forEach((issue) => console.log(issue));
  }

  if (envCheck.warnings.length > 0) {
    envCheck.warnings.forEach((warning) => console.log(warning));
  }

  if (envCheck.issues.length > 0) {
    console.log(
      "\n❌ Environment setup incomplete. Please fix the issues above."
    );
    return false;
  }

  // Test GraphQL endpoint
  console.log("\n2. Testing GraphQL Endpoint:");
  const graphqlTest = await testGraphQLEndpoint();

  if (graphqlTest.success) {
    console.log("✅", graphqlTest.message);
  } else {
    console.log("❌", graphqlTest.error);
    return false;
  }

  // Test authentication mutations
  console.log("\n3. Testing Authentication Mutations:");
  const authTest = await testAuthMutations();

  if (authTest.success) {
    console.log("✅", authTest.message);
    if (authTest.fields) {
      console.log("   Available auth mutations:", authTest.fields.join(", "));
    }
  } else {
    console.log("❌", authTest.error);
    return false;
  }

  console.log(
    "\n🎉 Setup verification complete! Your authentication system should work."
  );
  return true;
};

export default verifySetup;
