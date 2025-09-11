// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:4000/graphql", // your GraphQL API
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: typeof window === "undefined", // Enable SSR mode for server
  link: new HttpLink({
    // uri: "http://localhost:4000/graphql",
    uri: "https://151.hu/ruf/graphql",
    fetchOptions: {
      credentials: "same-origin",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
