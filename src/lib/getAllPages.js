import {
  GET_PAGE_COOKIE,
  GET_PAGE_DATENSCHUTZ,
  GET_PAGE_IMPRESSUM,
  GET_PAGE_KONTAKT,
  GET_PAGE_LIEDTEXTE,
} from "./queries";
import { BASE_URL } from "./routes";

// export async function fetchPage(query) {
//   try {
//     const res = await fetch(BASE_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//     });

//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching pages:", error);
//     return null;
//   }
// }
async function fetchPage(query, variables = {}) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

export function GetCookiesPages() {
  return fetchPage(GET_PAGE_COOKIE);
}
// export function GetLiedTextePages() {
//   return fetchPage(GET_PAGE_LIEDTEXTE);
// }
export function GetLiedTextePages(search = "") {
  const SEARCH_QUERY = `
    query GetLiedtextePageAndPosts($search: String) {
      pages(where: { name: "liedtexte" }) {
        nodes {
          title
          status
          slug
          uri
          content
          contentTypeName
          date
          id
          featuredImage {
            node {
              sourceUrl
              altText
              title
              uri
            }
          }
        }
      }

      liedtexte(first: 50, where: { search: $search }) {
        nodes {
          id
          title
          date
          slug
          postContentLyrik {
            introText
            postContent {
              content
              icon
              title
            }
            shortTitle
          }
          content
          featuredImage {
            node {
              sourceUrl
              altText
              title
              uri
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { search });
}

// Dynamic page fetch
export function GetDynamicCookiesPages(slug) {
  const DYNAMIC_PAGE_QUERY = `
    {
      page(id: "${slug}", idType: URI) {
        id
        title
        slug
        content
      }
    }
  `;
  return fetchPage(DYNAMIC_PAGE_QUERY);
}

export async function GetDynamicContent(slug) {
  try {
    // Try to fetch as a post first
    const postQuery = `
      query {
        post(id: "${slug}", idType: SLUG) {
          id
          title
          slug
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    `;

    const postData = await fetchPage(postQuery);

    // If post exists, return it with a type indicator
    if (postData?.data?.post) {
      return {
        type: "post",
        data: postData,
      };
    }

    // If post doesn't exist, try as a page
    const pageData = await GetDynamicCookiesPages(slug);

    if (pageData?.data?.page) {
      return {
        type: "page",
        data: pageData,
      };
    }

    // Neither post nor page exists
    return null;
  } catch (error) {
    console.error("Error fetching dynamic content:", error);
    return null;
  }
}
export function GetDatenschutzPages() {
  return fetchPage(GET_PAGE_DATENSCHUTZ);
}

export function GetImpressumPages() {
  return fetchPage(GET_PAGE_IMPRESSUM);
}

// export function GetAllPosts() {
//   const ALL_POSTS_QUERY = `
//     {
//       posts(first: 50) {
//         nodes {
//           id
//           title
//           date
//           slug
//           featuredImage { node { sourceUrl } }
//           author {
//             node {
//               name
//             }
//           }
//           postContent {
//             introText
//             postOrder
//             shortTitle
//             shortsPostContent
//           }
//         }
//         pageInfo {
//           hasNextPage
//           hasPreviousPage
//         }
//       }
//     }
//   `;
//   return fetchPage(ALL_POSTS_QUERY);
// }
export async function GetAllPosts({ first = 10, after = null } = {}) {
  const ALL_POSTS_QUERY = `
    query GetPosts($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        nodes {
          id
          title
          date
          slug
          featuredImage { node { sourceUrl } }
          author { node { name } }
          postContent {
            introText
            postOrder
            shortTitle
            shortsPostContent
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
  `;
  return fetchPage(ALL_POSTS_QUERY, { first, after });
}

export function GetKontactPages() {
  return fetchPage(GET_PAGE_KONTAKT);
}
