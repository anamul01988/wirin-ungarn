import { GET_PAGE_COOKIE } from "./queries";

export async function getAllPages() {
  try {
    const res = await fetch("https://151.hu/ruf/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PAGE_COOKIE })
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export default getAllPages;