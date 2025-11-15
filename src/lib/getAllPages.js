import {
  GET_PAGE_COOKIE,
  GET_PAGE_DATENSCHUTZ,
  GET_PAGE_IMPRESSUM,
  GET_PAGE_KONTAKT,
} from "./queries";
import { BASE_URL } from "./routes";

export async function fetchPage(query, variables = {}) {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 508) {
        throw new Error("Server timeout - GraphQL query too complex");
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Check for GraphQL errors
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(
        `GraphQL error: ${data.errors[0]?.message || "Unknown error"}`
      );
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout:", error);
      throw new Error("Request timeout - server took too long to respond");
    }
    console.error("Error fetching pages:", error);
    throw error; // Re-throw to let calling functions handle it
  }
}

export function GetCookiesPages() {
  return fetchPage(GET_PAGE_COOKIE);
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

export function GetLiedTextePages(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetLiedTexte($first: Int = 1000, $after: String) {
      pages(where: { name: "liedtexte" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      liedtexte(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            date
            postContentLyrik {
              postContent {
                content
                title
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
                title
                uri
              }
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }
        }
      }
    }
  `;
  return fetchPage(SEARCH_QUERY, { first, after });
}

// export function GetLiedTextePages(search = "") {
//   const SEARCH_QUERY = `
//       query GetLiedtextePageAndPosts($search: String) {
//         pages(where: { name: "liedtexte" }) {
//           nodes {
//             title
//             status
//             slug
//             uri
//             content
//             contentTypeName
//             date
//             id
//             featuredImage {
//               node {
//                 sourceUrl
//                 altText
//                 title
//                 uri
//               }
//             }
//           }
//         }

//         liedtexte(first: 50, where: { search: $search }) {
//           nodes {
//             id
//             title
//             date
//             slug
//             postContentLyrik {
//               introText
//               postContent {
//                 content
//                 icon
//                 title
//               }
//               shortTitle
//             }
//             content
//             featuredImage {
//               node {
//                 sourceUrl
//                 altText
//                 title
//                 uri
//               }
//             }
//           }
//           pageInfo {
//             hasNextPage
//             hasPreviousPage
//             endCursor
//             startCursor
//           }
//         }
//       }
//     `;

//   return fetchPage(SEARCH_QUERY, { search });
// }

export function GetShortPages(first = 10, after = null) {
  const SEARCH_QUERY = `
  query GetShortsPosts($first: Int = 10, $after: String) {
  pages(where: { name: "shorts" }) {
    nodes {
      id
      title
      isContentNode
      slug
      content
      status
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
    }
  }

  posts(
    first: $first
    after: $after
    where: {
      metaQuery: {
        relation: AND
        metaArray: [
          {
            key: "post_layout"
            value: "shorts"
            compare: EQUAL_TO
          }
        ]
      }
    }
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        id
        title
        slug
        postId
        link
        date
        featuredImage {
          node {
            sourceUrl
            altText
            title
            uri
          }
        }
        postContent {
          introText
          shortTitle
          shortsPostContent
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
        }
      }
    }
  }
}

  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}
export function GetKategorienPages(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetShortsPosts($first: Int = 1000, $after: String) {
      pages(where: { name: "kategorien" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }
      posts(
        first: $first
        after: $after
        where: {
         metaQuery: {
          relation: AND
          metaArray: [
          {
            key: "post_layout"
            value: "topics"
            compare: EQUAL_TO
          }
        ]
      }
    }
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            postId
            link
            date
            postContent {
              topicsPostContent {
                title
                content
              }
              postOrder
              shortTitle
            }
            featuredImage {
              node {
                sourceUrl
                altText
                title
                uri
              }
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetWessenwertPages(first = 5, after = null, categoryId = null) {
  // Build the where clause conditionally
  const whereClause = categoryId
    ? `where: {
        categoryId: $categoryId
        metaQuery: {
          relation: OR
          metaArray: [
            {
              key: "post_layout"
              value: "informative"
              compare: EQUAL_TO
            }
            {
              key: "post_layout"
              value: "shorts"
              compare: EQUAL_TO
            }
          ]
        }
      }`
    : `where: {
        metaQuery: {
          relation: OR
          metaArray: [
            {
              key: "post_layout"
              value: "informative"
              compare: EQUAL_TO
            }
            {
              key: "post_layout"
              value: "shorts"
              compare: EQUAL_TO
            }
          ]
        }
      }`;

  const SEARCH_QUERY = `
    query GetWessenwertPosts($first: Int = 5, $after: String${
      categoryId ? ", $categoryId: Int" : ""
    }) {
      pages(where: { name: "wissenswert" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }
      posts(
        first: $first
        after: $after
        ${whereClause}
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            postId
            link
            date
            postContent {
              postContent {
                title
                icon
                content
              }
              postOrder
              shortTitle
            }
            featuredImage {
              node {
                sourceUrl
                altText
                title
                uri
              }
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }
        }
      }
    }
  `;

  // Only pass categoryId if it's not null
  const variables = { first, after };
  if (categoryId !== null) {
    variables.categoryId = categoryId;
  }

  return fetchPage(SEARCH_QUERY, variables);
}

export function GetEinFachPages(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetEinFachPage($first: Int = 1000, $after: String) {
      pages(where: { name: "Einfach Lesen" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      einfacheLesungen(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            content
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
                title
                uri
              }
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetAusflugszielePages(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetAusflugsziele($first: Int = 1000, $after: String) {
      # Get the ausflugsziele Page
      pages(where: { title: "ausflugsziele" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      # Get Listings CPT
      listings(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            date
            listingFieldGroup {
              subtitle
              description
              subcategory
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }

        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetListingsVeranstaltungen(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetListingsVeranstaltungen($first: Int = 1000, $after: String) {
      pages(where: { title: "Veranstaltungskalender" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }
      listings(
        first: $first
        after: $after
        where: {
          metaQuery: {
            relation: AND
            metaArray: [
              {
                key: "category"
                value: "Veranstaltungen"
                compare: EQUAL_TO
              }
            ]
          }
        }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            title
            date
            listingFieldGroup {
              subtitle
              description
            }
            featuredImage {
              node {
                sourceUrl
                altText
                title
                uri
              }
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}
export function GetKreuzwortratsel(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetKreuzwortratsel($first: Int = 1000, $after: String) {
  pages(where: { title: "Kreuzworträtsel" }) {
    nodes {
      id
      title
      isContentNode
      slug
      content
      status
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
    }
  }
  crosswords(
    first: $first
    after: $after
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        id
        title
        slug
        # content
        date
        
        postContentCrosswords {
          excerpt
        } 

        featuredImage {
            node {
              sourceUrl
              altText
              title
              uri
            }
          }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
        }
      }
    }
  }
}
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

// export function GetSprachkursPages(search = "") {
//   const SEARCH_QUERY = `
//       query GetSprachkursPageAndPosts($search: String) {
//         pages(where: { name: "sprachkurs" }) {
//           nodes {
//             title
//             status
//             slug
//             uri
//             content
//             contentTypeName
//             date
//             id
//             featuredImage {
//               node {
//                 sourceUrl
//                 altText
//                 title
//                 uri
//               }
//             }
//           }
//         }

//         sprachkurs(first: 50, where: { search: $search }) {
//           nodes {
//             id
//             title
//             date
//             slug
//             content
//             featuredImage {
//               node {
//                 sourceUrl
//                 altText
//                 title
//                 uri
//               }
//             }
//           }
//           pageInfo {
//             hasNextPage
//             hasPreviousPage
//             endCursor
//             startCursor
//           }
//         }
//       }
//     `;

//   return fetchPage(SEARCH_QUERY, { search });
// }
export function GetAllSprachkursPages(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetAllSprachkursPages($first: Int = 1000, $after: String) {
      # Get the "kulinarische" Page
      pages(where: { name: "sprachkurs" }) {
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
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
        }
      }

      # Get Listings CPT
      sprachkurs(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            date
            slug
            content
            postContentSprachlektion {
              postContent {
                icon
                title
                content
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
                title
                uri
              }
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}
export function GetKulinarischeSeelePages(first = 1000, after = null) {
  const SEARCH_QUERY = `
    query GetKulinarischeSeelePages($first: Int = 1000, $after: String) {
      # Get the "kulinarische" Page
      pages(where: { title: "Ungarns kulinarische Seele" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      # Get Listings CPT
      recipes(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            date
            featuredImage {
            node {
              sourceUrl
              altText
              title
              uri
            }
           }
            postContentRecipe{
              introText
            }
            seo {
              title
              metaDesc
              opengraphTitle
              opengraphDescription
            }
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetAllUngarnInsider(first = 100, after = null) {
  const SEARCH_QUERY = `
    query GetAllUngarnInsider($first: Int = 100, $after: String) {
      # Get the "Ungarn-Insider" Page
      pages(where: { title: "Ungarn-Insider" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      # Get UngarnInsider CPT
      ungarnInsiders(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
           startCursor
        }
        nodes {
          id
          databaseId
          title
          date
          slug
          content
          ungarnInsiderFields {
            outgoingLink
            insiderComment
            lockedContent
            language
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetAllKnowledges(first = 500, after = null) {
  const SEARCH_QUERY = `
    query GetAllKnowledges($first: Int = 500, $after: String) {
      # Get the main "Knowledge" Page
      pages(where: { title: "kurz & knapp" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      # Get Knowledges CPT
      knowledges(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        nodes {
          id
          databaseId
          title
          date
          slug
          content
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetAllAusDemLebens(first = 50, after = null) {
  const SEARCH_QUERY = `
    query GetAllAusDemLebens($first: Int = 50, $after: String) {
      # Get the "Aus dem Lebens" Page
      pages(where: { title: "Aus dem Lebens" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      # Get ausDemLebens CPT
      ausDemLebens(first: $first, after: $after, where: { stati: [PUBLISH, DRAFT] }) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        nodes {
          id
          databaseId
          title
          date
          slug
          content
          status
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetAllVerbariums(first = 500, after = null) {
  const SEARCH_QUERY = `
    query GetAllVerbarium($first: Int = 500, $after: String) {
      # Get the "Verbarium" Page
      pages(where: { title: "Verbarium" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      # Get verbarium CPT
      verbariums(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        nodes {
          id
          databaseId
          title
          date
          slug
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

export function GetAllVerbarium(first = 500, after = null) {
  const SEARCH_QUERY = `
    query GetAllVerbarium($first: Int = 500, $after: String) {
      # Get the "Verbarium" Page
      pages(where: { title: "Verbarium" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
          }
        }
      }

      # Get verbarium CPT
      verbariums(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        nodes {
          id
          databaseId
          title
          date
          slug
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { first, after });
}

// Function to fetch all recipes by paginating through all pages
export async function GetAllKulinarischeSeeleRecipes() {
  const SEARCH_QUERY = `
    query GetKulinarischeSeelePages($first: Int = 100, $after: String) {
      # Get the "kulinarische" Page
      pages(where: { title: "Ungarns kulinarische Seele" }) {
        nodes {
          id
          title
          isContentNode
          slug
          content
          status
        }
      }

      # Get Listings CPT
      recipes(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            date
            featuredImage {
            node {
              sourceUrl
              altText
              title
              uri
            }
           }
            postContentRecipe{
              introText
            }

          }
        }
      }
    }
  `;

  let allRecipes = [];
  let hasNextPage = true;
  let after = null;
  let pageData = null;

  try {
    // First fetch to get page info
    const firstFetch = await fetchPage(SEARCH_QUERY, {
      first: 100,
      after: null,
    });
    pageData = firstFetch.data.pages;
    allRecipes = [...(firstFetch.data.recipes?.edges || [])];
    hasNextPage = firstFetch.data.recipes?.pageInfo?.hasNextPage || false;
    after = firstFetch.data.recipes?.pageInfo?.endCursor || null;

    // Continue fetching until all pages are loaded
    while (hasNextPage && after) {
      const nextFetch = await fetchPage(SEARCH_QUERY, { first: 100, after });
      const nextRecipes = nextFetch.data.recipes?.edges || [];
      allRecipes = [...allRecipes, ...nextRecipes];
      hasNextPage = nextFetch.data.recipes?.pageInfo?.hasNextPage || false;
      after = nextFetch.data.recipes?.pageInfo?.endCursor || null;
    }

    return {
      data: {
        pages: pageData,
        recipes: {
          edges: allRecipes,
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            endCursor: null,
            startCursor: null,
          },
        },
      },
    };
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    throw error;
  }
}

export function SearchAllPosts(
  search = "",
  first = 10,
  after = null,
  postType = null
) {
  // Build the where clause based on whether postType is provided
  let whereClause = `search: $search`;

  // Add post type filter if provided
  if (postType) {
    whereClause += `, postTypeIn: ${postType.toUpperCase()}`;
  }

  const SEARCH_QUERY = `
    query SearchAllPosts($search: String, $first: Int = 10, $after: String) {
      posts(
        first: $first
        after: $after
        where: {
          ${whereClause}
        }
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            postId
            link
            date
            
          }
        }
      }
    }
  `;

  return fetchPage(SEARCH_QUERY, { search, first, after });
}

export function GetSprachkursPages(search = "") {
  const SEARCH_QUERY = `
      query GetSprachkursPageAndPosts($search: String) {
        pages(where: { name: "sprachkurs" }) {
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

        sprachkurs(first: 50, where: { search: $search }) {
          nodes {
            id
            title
            date
            slug
            content
            postContentSprachlektion {
              postContent {
                title
                icon
                content
              }
            }
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

// Configuration for custom post types and their specific fields
const CUSTOM_POST_TYPES_CONFIG = {
  liedtexte: {
    customFields: `
        postContentLyrik {
          introText
          postContent {
            content
            icon
            title
          }
          shortTitle
        }
      `,
  },
  sprachkurs: {
    customFields: `
        # Add specific fields for sprachkurs if needed
      `,
  },
  // Add more custom post types here as needed
  // example: {
  //   customFields: `
  //     customField1
  //     customField2
  //   `
  // }
};

// Generic function to get all custom post types
export async function getAllCustomPostTypes() {
  // Return only the confirmed working custom post types
  const workingCustomPostTypes = ["liedtexte", "sprachkurs"];

  console.log("Returning working custom post types:", workingCustomPostTypes);
  return workingCustomPostTypes;
}

// export async function GetDynamicContent(slug) {
//   console.log("Fetching dynamic content for slug:", slug);

//   try {
//     // Use only the confirmed working custom post types
//     // const workingCustomPostTypes = ["liedtexte", "sprachkurs"];

//     // console.log("Trying working custom post types:", workingCustomPostTypes);

//     // Try to fetch as a regular post first
//     const postQuery = `
//       query {
//         post(id: "${slug}", idType: SLUG) {
//           id
//           title
//           slug
//           content
//           featuredImage {
//             node {
//               sourceUrl
//               altText
//               title
//             }
//           }
//           author {
//             node {
//               name
//               slug
//             }
//           }
//           categories {
//             nodes {
//               name
//               slug
//             }
//           }
//           tags {
//             nodes {
//               name
//               slug
//             }
//           }
//         }
//       }
//     `;

//     const postData = await fetchPage(postQuery, { slug });

//     if (postData?.data?.post) {
//       return {
//         type: "post",
//         data: postData,
//       };
//     }

//     // Try to fetch as a page
//     const pageQuery = `
//       query GetPageBySlug($slug: ID!) {
//         page(id: $slug, idType: URI) {
//           id
//           title
//           slug
//           content
//           excerpt
//           date
//           modified
//           featuredImage {
//             node {
//               sourceUrl
//               altText
//               title
//             }
//           }
//         }
//       }
//     `;

//     const pageData = await fetchPage(pageQuery, { slug });

//     if (pageData?.data?.page) {
//       return {
//         type: "page",
//         data: pageData,
//       };
//     }

//     // Try to fetch as custom post types using static queries
//     for (const postType of workingCustomPostTypes) {
//       try {
//         let customPostQuery;

//         if (postType === "sprachkurs") {
//           customPostQuery = `
//             query GetSprachkursBySlug($slug: ID!) {
//               sprachkurs(id: $slug, idType: SLUG) {
//                 id
//                 title
//                 slug
//                 date
//               }
//             }
//           `;
//         } else if (postType === "liedtexte") {
//           customPostQuery = `
//             query GetLiedtexteBySlug($slug: ID!) {
//               liedtexte(id: $slug, idType: SLUG) {
//                 id
//                 title
//                 slug
//                 date
//                 postContentLyrik {
//                   introText
//                   postContent {
//                     content
//                     icon
//                     title
//                   }
//                   shortTitle
//                 }
//               }
//             }
//           `;
//         } else {
//           continue; // Skip unknown post types
//         }

//         const customPostData = await fetchPage(customPostQuery, { slug });

//         if (customPostData?.data?.[postType]) {
//           console.log(`Found content in custom post type: ${postType}`);
//           return {
//             type: postType,
//             data: customPostData,
//           };
//         }
//       } catch (error) {
//         // Continue to next post type if this one fails
//         console.log(`Failed to fetch from ${postType}:`, error.message);
//         continue;
//       }
//     }

//     // No content found
//     console.log(`No content found for slug: ${slug}`);
//     return null;
//   } catch (error) {
//     console.error("Error fetching dynamic content:", error);
//     return null;
//   }
// }
// Enhanced version that accepts routePrefix parameter
export async function GetDynamicContentV2(slug, routePrefix) {
  console.log(
    "GetDynamicContentV2 called with slug:",
    slug,
    "and routePrefix:",
    routePrefix
  );

  try {
    // Handle wissenswert content
    if (routePrefix === "wissenswert") {
      const wissenswertQuery = `
      query {
        post(id: "${slug}", idType: SLUG) {
          id
          title
          slug
          postId
          link
          date
          content
          postContent {
            postContent {
              title
              icon
              content
            }
            postOrder
            shortTitle
            introText
            shortsPostContent
          }
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
    `;

      const wissenswertData = await fetchPage(wissenswertQuery);
      console.log("Wissenswert data:", wissenswertData);

      if (wissenswertData?.data?.post) {
        return {
          type: "post",
          data: wissenswertData,
          customType: "wissenswert",
        };
      }
    }

    // Handle shorts content
    if (routePrefix === "shorts") {
      // First, get all shorts posts to find the current post's position
      const allShortsQuery = `
        query {
          posts(
            first: 100
            where: {
              metaQuery: {
                relation: AND
                metaArray: [
                  {
                    key: "post_layout"
                    value: "shorts"
                    compare: EQUAL_TO
                  }
                ]
              }
              orderby: { field: DATE, order: DESC }
            }
          ) {
            edges {
              node {
                id
                title
                slug
                date
              }
            }
          }
        }
      `;

      const shortsQuery = `
        query {
          post(id: "${slug}", idType: SLUG) {
            id
            title
            slug
            postId
            link
            date
            content
            postContent {
              shortsPostContent
              introText
              shortTitle
            }
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
      `;

      // Fetch both queries
      const [shortsData, allShortsData] = await Promise.all([
        fetchPage(shortsQuery),
        fetchPage(allShortsQuery),
      ]);
      if (shortsData?.data?.post) {
        let nextPostSlug = null;
        let prevPostSlug = null;

        // Find the next and previous post in the list
        const allShortsPosts = allShortsData?.data?.posts?.edges || [];
        const currentIndex = allShortsPosts.findIndex(
          (edge) => edge.node.slug === slug
        );

        // Get the next post (which is the one after current index)
        if (currentIndex !== -1 && currentIndex < allShortsPosts.length - 1) {
          nextPostSlug = allShortsPosts[currentIndex + 1].node.slug;
        }

        // Get the previous post (which is the one before current index)
        if (currentIndex > 0) {
          prevPostSlug = allShortsPosts[currentIndex - 1].node.slug;
        }
        return {
          type: "post",
          data: shortsData,
          customType: "shorts",
          nextPostSlug: nextPostSlug,
          prevPostSlug: prevPostSlug,
        };
      }
    }

    // Handle post with topicsPostContent (e.g. kategorien)
    if (routePrefix === "kategorien") {
      const topicsQuery = `
        query GetTopicsPostBySlug {
          post(id: "${slug}", idType: SLUG) {
            id
            title
            slug
            date
            content
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            postContent {
              topicsPostContent {
                title
                content
                linkTitle
                linkSubtitle
                postLink {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
              postOrder
              shortTitle
            }
          }
        }
      `;

      const topicsData = await fetchPage(topicsQuery);

      if (topicsData?.data?.post) {
        return {
          type: "post",
          data: topicsData,
          customType: "kategorien",
        };
      }
    }

    // If it's a specific custom post type, use specialized query
    if (routePrefix === "liedtexte") {
      const customQuery = `
        query GetLiedtexteBySlug {
          lyrik(id: "${slug}", idType: SLUG) {
            id
            title
            slug
            content
            date
            featuredImage {
              node {
                sourceUrl
                altText
                title
              }
            }
            postContentLyrik {
              introText
              postContent {
                content
                title
                icon
              }
              shortTitle
            }
          }
        }
      `;

      // First, get all liedtexte posts to find the current post's position
      const allLiedtexteQuery = `
        query GetAllLiedtextePages {
          pages(where: { name: "liedtexte" }) {
            nodes {
              title
              slug
              content
              date
              id
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
          liedtexte(
            first: 100
            where: {
              orderby: { field: DATE, order: DESC }
            }
          ) {
            edges {
              node {
                id
                title
                slug
                date
              }
            }
          }
        }
      `;

      // Fetch both queries
      const [customData, allLiedtexteData] = await Promise.all([
        fetchPage(customQuery),
        fetchPage(allLiedtexteQuery),
      ]);

      console.log("liedtexte data:", customData);

      if (customData?.data?.lyrik) {
        let nextPostSlug = null;
        let prevPostSlug = null;
        let nextPostTitle = null;
        let prevPostTitle = null;

        // Find the next and previous post in the list
        const allLiedtextePosts =
          allLiedtexteData?.data?.liedtexte?.edges || [];
        const currentIndex = allLiedtextePosts.findIndex(
          (edge) => edge.node.slug === slug
        );

        // Get the next post (which is the one after current index)
        if (
          currentIndex !== -1 &&
          currentIndex < allLiedtextePosts.length - 1
        ) {
          nextPostSlug = allLiedtextePosts[currentIndex + 1].node.slug;
          nextPostTitle = allLiedtextePosts[currentIndex + 1].node.title;
        }

        // Get the previous post (which is the one before current index)
        if (currentIndex > 0) {
          prevPostSlug = allLiedtextePosts[currentIndex - 1].node.slug;
          prevPostTitle = allLiedtextePosts[currentIndex - 1].node.title;
        }

        return {
          type: "post",
          data: {
            data: {
              post: {
                ...customData.data.lyrik,
                postContent: {
                  liedtexteContent: customData.data.lyrik.postContentLyrik,
                  shortsPostContent: customData.data.lyrik.content,
                },
              },
            },
          },
          customType: "liedtexte",
          nextPostSlug: nextPostSlug,
          prevPostSlug: prevPostSlug,
          nextPostTitle: nextPostTitle,
          prevPostTitle: prevPostTitle,
        };
      }
    }

    if (routePrefix === "sprachkurs") {
      const customQuery = `
query sprachlektionByID {
  sprachlektion(id: "${slug}", idType: SLUG) {
    id
    databaseId
    title
    date
    slug
    postContentSprachlektion {
      postContent {
        icon
        title
        content
      }
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
  }
}
      `;

      // First, get all sprachkurs posts to find the current post's position
      const allSprachkursQuery = `
        query GetAllSprachkursPages {
          pages(where: { name: "sprachkurs" }) {
            nodes {
              title
              slug
              content
              date
              id
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
          sprachkurs(
            first: 100
            where: {
              orderby: { field: DATE, order: DESC }
            }
          ) {
            edges {
              node {
                id
                title
                slug
                date
              }
            }
          }
        }
      `;

      // Fetch both queries
      const [customData, allSprachkursData] = await Promise.all([
        fetchPage(customQuery),
        fetchPage(allSprachkursQuery),
      ]);

      console.log("33333333", customData);

      if (customData?.data?.sprachlektion) {
        let nextPostSlug = null;
        let prevPostSlug = null;
        let nextPostTitle = null;
        let prevPostTitle = null;

        // Find the next and previous post in the list
        const allSprachkursPosts =
          allSprachkursData?.data?.sprachkurs?.edges || [];
        const currentIndex = allSprachkursPosts.findIndex(
          (edge) => edge.node.slug === slug
        );

        // Get the next post (which is the one after current index)
        if (
          currentIndex !== -1 &&
          currentIndex < allSprachkursPosts.length - 1
        ) {
          nextPostSlug = allSprachkursPosts[currentIndex + 1].node.slug;
          nextPostTitle = allSprachkursPosts[currentIndex + 1].node.title;
        }

        // Get the previous post (which is the one before current index)
        if (currentIndex > 0) {
          prevPostSlug = allSprachkursPosts[currentIndex - 1].node.slug;
          prevPostTitle = allSprachkursPosts[currentIndex - 1].node.title;
        }

        return {
          type: "post",
          data: {
            data: {
              post: {
                ...customData.data.sprachlektion,
                // Make the structure match what the DialogContent component expects
                content:
                  customData.data.sprachlektion.postContentSprachlektion
                    ?.postContent?.[0]?.content || "",
                postContent: {
                  sprachkursContent:
                    customData.data.sprachlektion.postContentSprachlektion
                      ?.postContent || [],
                  shortsPostContent:
                    customData.data.sprachlektion.postContentSprachlektion
                      ?.postContent?.[0]?.content || "",
                },
              },
            },
          },
          customType: "sprachkurs",
          nextPostSlug: nextPostSlug,
          prevPostSlug: prevPostSlug,
          nextPostTitle: nextPostTitle,
          prevPostTitle: prevPostTitle,
        };
      }
    }

    if (routePrefix === "kategorien") {
      const customQuery = `
        query GetKategorienBySlug {
          post(id: "${slug}", idType: SLUG) {
    id
    title
    date
    slug
    author {
      node {
        name
      }
    }
    postContent {
      topicsPostContent {
        title
        content
      }
      postOrder
      shortTitle
    }
  }
        }
      `;

      const customData = await fetchPage(customQuery);

      console.log("444444444", customData);

      if (customData?.data?.post) {
        return {
          type: "post",
          data: {
            data: {
              post: {
                ...customData.data.post,
                postContent: {
                  shortsPostContent:
                    customData?.data?.post?.postContent?.topicsPostContent,
                },
              },
            },
          },
          customType: "sprachkurs",
        };
      }
    }

    if (routePrefix === "ausflugsziele") {
      const customQuery = `
        query {
        listing(id: "${slug}", idType: URI) {
          id
          databaseId
          title
          date
          slug
          content
        }
      }
      `;

      const customData = await fetchPage(customQuery);

      console.log("444444444", customData);

      if (customData?.data?.post) {
        return {
          type: "post",
          data: {
            data: {
              post: {
                ...customData.data.post,
                postContent: {
                  shortsPostContent:
                    customData?.data?.post?.postContent?.topicsPostContent,
                },
              },
            },
          },
          customType: "sprachkurs",
        };
      }
    }

    // Handle einfach-lesen content
    if (routePrefix === "einfach-lesen") {
      const customQuery = `
        query GetEinfachLesenBySlug {
          einfachLesen(id: "${slug}", idType: URI) {
            id
            databaseId
            title
            date
            slug
            content
            featuredImage {
              node {
                sourceUrl
                title
              }
            }
          einfachLesenFields {
            germanTitle
            levelContents {
              levelTitle
              levelContent
              audioFile {
                node {
                  mediaItemUrl
                  title
                  id
                  fileSize
                  mimeType
                }
              }
            }
           }
          }
        }
      `;

      // First, get all einfach lesen posts to find the current post's position
      const allEinfachLesenQuery = `
        query GetAllEinfachLesenPages {
          pages(where: { name: "Einfach Lesen" }) {
            nodes {
              title
              slug
              content
              date
              id
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
          einfacheLesungen(
            first: 100
            where: {
              orderby: { field: DATE, order: DESC }
            }
          ) {
            edges {
              node {
                id
                title
                slug
                date
              }
            }
          }
        }
      `;

      // Fetch both queries
      const [customData, allEinfachLesenData] = await Promise.all([
        fetchPage(customQuery),
        fetchPage(allEinfachLesenQuery),
      ]);

      console.log("einfach-lesen data:", customData);

      if (customData?.data?.einfachLesen) {
        let nextPostSlug = null;
        let prevPostSlug = null;
        let nextPostTitle = null;
        let prevPostTitle = null;

        // Find the next and previous post in the list
        const allEinfachLesenPosts =
          allEinfachLesenData?.data?.einfacheLesungen?.edges || [];
        const currentIndex = allEinfachLesenPosts.findIndex(
          (edge) => edge.node.slug === slug
        );

        // Get the next post (which is the one after current index)
        if (
          currentIndex !== -1 &&
          currentIndex < allEinfachLesenPosts.length - 1
        ) {
          nextPostSlug = allEinfachLesenPosts[currentIndex + 1].node.slug;
          nextPostTitle = allEinfachLesenPosts[currentIndex + 1].node.title;
        }

        // Get the previous post (which is the one before current index)
        if (currentIndex > 0) {
          prevPostSlug = allEinfachLesenPosts[currentIndex - 1].node.slug;
          prevPostTitle = allEinfachLesenPosts[currentIndex - 1].node.title;
        }

        return {
          type: "post",
          data: {
            data: {
              post: {
                ...customData.data.einfachLesen,
                postContent: {
                  shortsPostContent: customData.data.einfachLesen.content,
                },
              },
            },
          },
          customType: "einfach-lesen",
          nextPostSlug: nextPostSlug,
          prevPostSlug: prevPostSlug,
          nextPostTitle: nextPostTitle,
          prevPostTitle: prevPostTitle,
        };
      }
    }

    // Fall back to regular GetDynamicContent if no specialized handling
    return GetDynamicContent(slug);
  } catch (error) {
    console.error("Error in GetDynamicContentV2:", error);
    // Fall back to regular GetDynamicContent
    return GetDynamicContent(slug);
  }
}

export async function GetDynamicContent(slug) {
  console.log("GetDynamicContent called with slug:", slug);
  try {
    // Try to detect if this is a post with extended fields (wissenswert or shorts)
    const extendedPostQuery = `
      query {
        post(id: "${slug}", idType: SLUG) {
          id
          title
          slug
          postId
          link
          date
          content
          postContent {
            postContent {
              title
              icon
              content
            }
            postOrder
            shortTitle
            introText
            shortsPostContent
          }
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
    `;

    const extendedPostData = await fetchPage(extendedPostQuery);
    const post = extendedPostData?.data?.post;

    // Check if this is a wissenswert post by looking at postContent structure
    if (post?.postContent?.postContent?.length > 0) {
      console.log("Detected wissenswert post!");
      return {
        type: "post",
        data: extendedPostData,
        customType: "wissenswert",
      };
    }

    // Check if this is a shorts post
    if (post?.postId && post?.postContent?.shortsPostContent) {
      console.log("Detected shorts post!");
      return {
        type: "post",
        data: extendedPostData,
        customType: "shorts",
      };
    }

    // If not a wissenswert post, try as a regular post
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
              postContent {
                introText
                shortTitle
                shortsPostContent
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
export async function GetWissenswertPostBySlug(slug) {
  console.log("GetWissenswertPostBySlug called with slug:", slug);
  try {
    const postQuery = `
      query {
        post(id: "${slug}", idType: SLUG) {
          id
          title
          slug
          link
          date
          content
          postContent {
            postContent {
              title
              icon
              content
            }
            postOrder
            shortTitle
            introText
            shortsPostContent
          }
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
    `;

    const postData = await fetchPage(postQuery);
    console.log("postData 222222222 checking", postData);

    // If post exists, return it with a type indicator
    if (postData?.data?.post) {
      return {
        type: "post",
        data: postData,
      };
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching wissenswert post by slug:", error);
    return null;
  }
}

export async function GetEinfachLesenPostBySlug(slug) {
  try {
    const postQuery = `
      query {
        einfachLesen(id: "${slug}", idType: URI) {
          id
          databaseId
          title
          date
          slug
          content
          featuredImage {
            node {
              sourceUrl
              title
            }
          }

          einfachLesenFields {
            germanTitle
            levelContents {
              levelTitle
              levelContent
              audioFile {
                node {
                  mediaItemUrl
                  title
                  id
                  fileSize
                  mimeType
                }
              }
            }
          }


        }
      }
    `;

    const postData = await fetchPage(postQuery);
    console.log("postData 222222222", postData);
    console.log("einfachLesen exists:", !!postData?.data?.einfachLesen);

    // If post exists, return it with a type indicator
    if (postData?.data?.einfachLesen) {
      const result = {
        type: "post",
        data: postData,
      };
      console.log("Returning result:", result);
      return result;
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching einfach lesen post by slug:", error);
    return null;
  }
}

export async function GetAusflugszielePostBySlug(slug) {
  try {
    const postQuery = `
      query {
        listing(id: "${slug}", idType: URI) {
          id
          databaseId
          title
          date
          slug
          content
        }
      }
    `;

    const postData = await fetchPage(postQuery);
    console.log("postData 222222222", postData);
    console.log("listing exists:", !!postData?.data?.listing);

    // If post exists, return it with a type indicator
    if (postData?.data?.listing) {
      const result = {
        type: "post",
        data: postData,
      };
      console.log("Returning result:", result);
      return result;
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching ausflugsziele post by slug:", error);
    return null;
  }
}

export async function GetkreuzwortraetselSinglePostBySlug(slug) {
  try {
    const postQuery = `
      query {
        crossword(id: "${slug}", idType: SLUG) {
          id
          databaseId
          title
          date
          slug
          postContentCrosswords {
            excerpt
          } 
        }
      }
    `;

    const postData = await fetchPage(postQuery);

    // If post exists, return it with a type indicator
    if (postData?.data?.crossword) {
      const result = {
        type: "post",
        data: postData,
      };
      console.log("Returning result:", result);
      return result;
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching ausflugsziele post by slug:", error);
    return null;
  }
}

export async function GetLiedtexteSinglePostBySlug(slug) {
  try {
    const postQuery = `
      query {
        lyrik(id: "${slug}", idType: SLUG) {
          id
          title
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
              title
            }  
          }
          postContentLyrik{
            introText
            postContent{
              icon
              content
            }
          }
        }
      }
    `;

    const postData = await fetchPage(postQuery);

    // If post exists, return it with a type indicator
    if (postData?.data?.lyrik) {
      const result = {
        type: "post",
        data: postData,
      };
      console.log("Returning result:", result);
      return result;
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching ausflugsziele post by slug:", error);
    return null;
  }
}

export async function GetkulinarischeSinglePostBySlug(slug) {
  try {
    const postQuery = `
      query {
        recipe(id: "${slug}", idType: SLUG) {
          id
          title
          date
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          postContentRecipe{
            introText
            postContent{
              icon
              title
              content
            }
          }
        }
      }
    `;

    const postData = await fetchPage(postQuery);

    // If post exists, return it with a type indicator
    if (postData?.data?.recipe) {
      const result = {
        type: "post",
        data: postData,
      };
      console.log("Returning result:", result);
      return result;
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching ausflugsziele post by slug:", error);
    return null;
  }
}
export async function GetkurzUndKnappPostBySlug(slug) {
  try {
    const postQuery = `
      query {
        knowledge (id: "${slug}", idType: SLUG) {
          id
          title
          slug
          link
          date
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
      }
    `;

    const postData = await fetchPage(postQuery);

    // If post exists, return it with a type indicator
    if (postData?.data?.recipe) {
      const result = {
        type: "post",
        data: postData,
      };
      console.log("Returning result:", result);
      return result;
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching kurzknapp post by slug:", error);
    return null;
  }
}
export async function GetShortsPostBySlug(slug) {
  try {
    const postQuery = `
      query {
        post(id: "${slug}", idType: SLUG) {
          id
          title
          slug
          postId
          link
          date
          content
          postContent {
            shortsPostContent
            introText
            shortTitle
          }
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
    `;

    const postData = await fetchPage(postQuery);
    console.log("Shorts postData:", postData);

    // If post exists, return it with a type indicator
    if (postData?.data?.post) {
      return {
        type: "post",
        data: postData,
      };
    }

    // Post doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching shorts post by slug:", error);
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
export async function GetAllPosts({
  first = 10,
  after = null,
  search = "",
} = {}) {
  const ALL_POSTS_QUERY = `
      query GetPosts($first: Int, $after: String, $search: String) {
        posts(first: $first, after: $after, where: { search: $search }) {
          nodes {
            id
            title
            date
            slug
            excerpt
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
  return fetchPage(ALL_POSTS_QUERY, { first, after, search });
}

export function GetKontactPages() {
  return fetchPage(GET_PAGE_KONTAKT);
}

// Specific functions for confirmed working custom post types
export async function getAllLiedtextePosts(options = {}) {
  const { first = 50, after = null } = options;

  const query = `
      query GetAllLiedtexte($first: Int, $after: String) {
        liedtexte(first: $first, after: $after) {
          nodes {
            id
            title
            date
            slug
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

  try {
    const data = await fetchPage(query, { first, after });
    return {
      success: true,
      data: data?.data?.liedtexte || null,
      postType: "liedtexte",
    };
  } catch (error) {
    console.error("Error fetching liedtexte posts:", error);
    return {
      success: false,
      data: null,
      postType: "liedtexte",
      error: error.message,
    };
  }
}

export async function getAllSprachkursPosts(options = {}) {
  const { first = 50, after = null } = options;

  const query = `
      query GetAllSprachkurs($first: Int, $after: String) {
        sprachkurs(first: $first, after: $after) {
          nodes {
            id
            title
            date
            slug
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

  try {
    const data = await fetchPage(query, { first, after });
    return {
      success: true,
      data: data?.data?.sprachkurs || null,
      postType: "sprachkurs",
    };
  } catch (error) {
    console.error("Error fetching sprachkurs posts:", error);
    return {
      success: false,
      data: null,
      postType: "sprachkurs",
      error: error.message,
    };
  }
}

// Generic function to get all posts from any custom post type
export async function getAllCustomPostTypePosts(postType, options = {}) {
  const { first = 50, after = null } = options;

  try {
    // Use the exact static query structure that you confirmed is working
    const query = `
        query GetCustomPostTypePosts($first: Int, $after: String) {
          ${postType}(first: $first, after: $after) {
            nodes {
              id
              title
              date
              slug
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;

    const data = await fetchPage(query, {
      first,
      after,
    });

    return {
      success: true,
      data: data?.data?.[postType] || null,
      postType,
    };
  } catch (error) {
    console.error(`Error fetching ${postType} posts:`, error);
    return {
      success: false,
      data: null,
      postType,
      error: error.message,
    };
  }
}

// Function to get all available custom post types with their post counts
export async function getCustomPostTypesWithCounts() {
  try {
    const customPostTypes = await getAllCustomPostTypes();
    const results = [];

    for (const postType of customPostTypes) {
      try {
        const query = `
            query GetCustomPostTypeCount($postType: String!) {
              ${postType}(first: 1) {
                pageInfo {
                  hasNextPage
                }
              }
            }
          `;

        const data = await fetchPage(query);
        results.push({
          name: postType,
          available: !!data?.data?.[postType],
          hasPosts: data?.data?.[postType]?.pageInfo?.hasNextPage || false,
        });
      } catch (error) {
        results.push({
          name: postType,
          available: false,
          hasPosts: false,
          error: error.message,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Error getting custom post types with counts:", error);
    return [];
  }
}

// Helper function to get all available content types
export function getAvailableContentTypes() {
  return {
    posts: "Regular WordPress posts",
    pages: "WordPress pages",
    customPostTypes: Object.keys(CUSTOM_POST_TYPES_CONFIG),
  };
}

// Helper function to add a new custom post type
export function addCustomPostType(postType, customFields) {
  CUSTOM_POST_TYPES_CONFIG[postType] = {
    customFields: customFields,
  };
}

// Example usage function - you can call this to add more custom post types
export function initializeCustomPostTypes() {
  // Add sprachkurs with specific fields if needed
  addCustomPostType(
    "sprachkurs",
    `
      # Add specific fields for sprachkurs here
      # Example:
      # courseLevel
      # duration
      # instructor
    `
  );

  // Add more custom post types as needed
  // addCustomPostType('anotherCustomType', `
  //   field1
  //   field2 {
  //     subField1
  //     subField2
  //   }
  // `);
}

// Function to get content by type and slug (alternative approach)
export async function getContentByType(type, slug) {
  try {
    let query = "";
    let variables = { slug };

    switch (type) {
      case "post":
        query = `
            query GetPostBySlug($slug: ID!) {
              post(id: $slug, idType: SLUG) {
                id
                title
                slug
                content
                excerpt
                date
                modified
                featuredImage {
                  node {
                    sourceUrl
                    altText
                    title
                  }
                }
                author {
                  node {
                    name
                    slug
                  }
                }
                categories {
                  nodes {
                    name
                    slug
                  }
                }
                tags {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          `;
        break;

      case "page":
        query = `
            query GetPageBySlug($slug: ID!) {
              page(id: $slug, idType: URI) {
                id
                title
                slug
                content
                excerpt
                date
                modified
                featuredImage {
                  node {
                    sourceUrl
                    altText
                    title
                  }
                }
              }
            }
          `;
        break;

      default:
        // Handle custom post types
        const config = CUSTOM_POST_TYPES_CONFIG[type];
        if (!config) {
          throw new Error(`Unknown content type: ${type}`);
        }

        query = `
            query GetCustomPostBySlug($slug: ID!) {
              ${type}(id: $slug, idType: SLUG) {
                id
                title
                slug
                content
                excerpt
                date
                modified
                featuredImage {
                  node {
                    sourceUrl
                    altText
                    title
                  }
                }
                ${config.customFields}
              }
            }
          `;
        break;
    }

    const data = await fetchPage(query, variables);

    if (data?.data?.[type]) {
      return {
        type,
        data,
        success: true,
      };
    }

    return {
      type,
      data: null,
      success: false,
      error: "Content not found",
    };
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    return {
      type,
      data: null,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create a comment for a post
 * @param {string} author - The name of the comment author
 * @param {string} authorEmail - The email of the comment author
 * @param {string} content - The comment content
 * @param {number} commentOn - The post ID to comment on
 * @returns {Promise<Object>} - The response data containing success status and comment info
 */
export async function createComment(author, authorEmail, content, commentOn) {
  const CREATE_COMMENT_MUTATION = `
    mutation CreateComment(
      $author: String!,
      $authorEmail: String!,
      $content: String!,
      $commentOn: Int!
    ) {
      createComment(
        input: {
          author: $author,
          authorEmail: $authorEmail,
          content: $content,
          commentOn: $commentOn
        }
      ) {
        success
        comment {
          id
          content
          author {
            node {
              name
            }
          }
          date
        }
      }
    }
  `;

  try {
    const response = await fetchPage(CREATE_COMMENT_MUTATION, {
      author,
      authorEmail,
      content,
      commentOn: parseInt(commentOn, 10),
    });

    return response;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}
