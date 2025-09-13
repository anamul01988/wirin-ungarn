import {
  GET_PAGE_COOKIE,
  GET_PAGE_DATENSCHUTZ,
  GET_PAGE_IMPRESSUM,
  GET_PAGE_KONTAKT,
  GET_PAGE_LIEDTEXTE,
} from "./queries";
import { BASE_URL } from "./routes";

export async function fetchPage(query) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Error fetching pages:", error);
    return null;
  }
}

export function GetCookiesPages() {
  return fetchPage(GET_PAGE_COOKIE);
}
export function GetLiedTextePages() {
  return fetchPage(GET_PAGE_LIEDTEXTE);
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
export function GetDatenschutzPages() {
  return fetchPage(GET_PAGE_DATENSCHUTZ);
}

export function GetImpressumPages() {
  return fetchPage(GET_PAGE_IMPRESSUM);
}

export function GetAllPosts() {
  const ALL_POSTS_QUERY = `
   {
  posts (first: 50) {
    nodes {
      id
      title
      date
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
}
  `;
  return fetchPage(ALL_POSTS_QUERY);
}

export function GetKontactPages() {
  return fetchPage(GET_PAGE_KONTAKT);
}
