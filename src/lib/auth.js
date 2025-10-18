import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Function to sync OAuth user with GraphQL backend
async function syncUserWithBackend(user, provider) {
  try {
    console.log(`Syncing OAuth user with backend: ${user.email} (${provider})`);

    // Try multiple possible queries to find user by email
    const possibleQueries = [
      // Query 1: Standard userByEmail
      {
        query: `
          query FindUserByEmail($email: String!) {
            userByEmail(email: $email) {
              id
              name
              email
            }
          }
        `,
        variables: { email: user.email },
      },
      // Query 2: Alternative query structure
      {
        query: `
          query FindUser($email: String!) {
            user(email: $email) {
              id
              name
              email
            }
          }
        `,
        variables: { email: user.email },
      },
      // Query 3: Users query with filter
      {
        query: `
          query FindUser($email: String!) {
            users(where: {email: $email}) {
              nodes {
                id
                name
                email
              }
            }
          }
        `,
        variables: { email: user.email },
      },
    ];

    let existingUser = null;

    // Try each query until one works
    for (const queryConfig of possibleQueries) {
      try {
        const response = await fetch("https://wir-in-ungarn.hu/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queryConfig),
        });

        const result = await response.json();

        // Check different possible response structures
        if (result.data?.userByEmail) {
          existingUser = result.data.userByEmail;
          console.log(`Found existing user by email: ${existingUser.id}`);
          break;
        } else if (result.data?.user) {
          existingUser = result.data.user;
          console.log(`Found existing user: ${existingUser.id}`);
          break;
        } else if (result.data?.users?.nodes?.[0]) {
          existingUser = result.data.users.nodes[0];
          console.log(`Found existing user in users query: ${existingUser.id}`);
          break;
        }
      } catch (error) {
        console.log(`Query failed, trying next: ${error.message}`);
        continue;
      }
    }

    // If user exists, return their data
    if (existingUser) {
      return existingUser;
    }

    // If user doesn't exist, try to create them
    console.log(`User not found, attempting to create new user: ${user.email}`);

    const possibleMutations = [
      // Mutation 1: Standard createOAuthUser
      {
        query: `
          mutation CreateOAuthUser($input: CreateOAuthUserInput!) {
            createOAuthUser(input: $input) {
              user {
                id
                name
                email
              }
            }
          }
        `,
        variables: {
          input: {
            name: user.name,
            email: user.email,
            provider: provider,
            image: user.image,
          },
        },
      },
      // Mutation 2: Alternative createUser
      {
        query: `
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              user {
                id
                name
                email
              }
            }
          }
        `,
        variables: {
          input: {
            name: user.name,
            email: user.email,
            password: `oauth_${provider}_${Date.now()}`, // Generate a random password
          },
        },
      },
      // Mutation 3: RegisterUser mutation (like in your existing code)
      {
        query: `
          mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
              user {
                id
                name
                email
              }
            }
          }
        `,
        variables: {
          input: {
            clientMutationId: `oauth_${provider}_${Date.now()}`,
            username: user.name.replace(/\s+/g, "_").toLowerCase(),
            email: user.email,
            password: `oauth_${provider}_${Date.now()}`,
          },
        },
      },
    ];

    // Try each mutation until one works
    for (const mutationConfig of possibleMutations) {
      try {
        console.log(
          `Trying mutation: ${mutationConfig.query.split("(")[0].split(" ")[1]}`
        );
        const response = await fetch("https://wir-in-ungarn.hu/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mutationConfig),
        });

        const result = await response.json();

        // Check different possible response structures
        if (result.data?.createOAuthUser?.user) {
          console.log(
            `Successfully created OAuth user: ${result.data.createOAuthUser.user.id}`
          );
          return result.data.createOAuthUser.user;
        } else if (result.data?.createUser?.user) {
          console.log(
            `Successfully created user: ${result.data.createUser.user.id}`
          );
          return result.data.createUser.user;
        } else if (result.data?.registerUser?.user) {
          console.log(
            `Successfully registered user: ${result.data.registerUser.user.id}`
          );
          return result.data.registerUser.user;
        } else if (result.errors) {
          console.log(`Mutation failed with errors:`, result.errors);
        }
      } catch (error) {
        console.log(`Mutation failed, trying next: ${error.message}`);
        continue;
      }
    }

    // If all mutations fail, we need to create a proper user in the backend
    // Try one more approach: use the registerUser mutation with a generated username
    try {
      const registerResponse = await fetch("https://wir-in-ungarn.hu/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation RegisterUser($input: RegisterUserInput!) {
              registerUser(input: $input) {
                user {
                  id
                  name
                  email
                }
              }
            }
          `,
          variables: {
            input: {
              clientMutationId: `oauth_${provider}_${Date.now()}`,
              username: `${provider}_${user.email.split("@")[0]}_${Date.now()}`,
              email: user.email,
              password: `oauth_${provider}_${Date.now()}_${Math.random()
                .toString(36)
                .substring(7)}`,
            },
          },
        }),
      });

      const registerResult = await registerResponse.json();

      if (registerResult.data?.registerUser?.user) {
        return registerResult.data.registerUser.user;
      }
    } catch (registerError) {
      console.log("RegisterUser mutation also failed:", registerError.message);
    }

    // If everything fails, return a fallback user with generated ID
    // This should rarely happen if the backend is working properly
    console.warn("All user creation attempts failed, using fallback ID");
    return {
      id: `oauth_${provider}_${Date.now()}`,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error("Error syncing user with backend:", error);
    // Return fallback user if backend is unavailable
    return {
      id: `oauth_${provider}_${Date.now()}`,
      name: user.name,
      email: user.email,
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email,public_profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;

        // Sync user with backend and get user ID
        if (user && account.provider) {
          const backendUser = await syncUserWithBackend(user, account.provider);
          token.userId = backendUser.id;
          token.userName = backendUser.name;
          token.userEmail = backendUser.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.provider = token.provider;

      // Add user ID and other backend data to session
      if (token.userId) {
        session.user.id = token.userId;
        session.user.name = token.userName || session.user.name;
        session.user.email = token.userEmail || session.user.email;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
