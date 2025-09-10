export const GET_PAGE_COOKIE = `
  query {
    page(id: "cookie-richtlinie-eu", idType: URI) {
      id
      title
      slug
      content
    }
  }
`;

export const GET_PAGE_DATENSCHUTZ = `
  query {
    page(id: "datenschutz", idType: URI) {
      id
      title
      slug
      content
    }
  }
`;

export const GET_PAGE_IMPRESSUM = `
  query {
    page(id: "impressum", idType: URI) {
      id
      title
      slug
      content
    }
  }
`;

export const GET_PAGE_KONTAKT = `
  query {
    page(id: "kontakt", idType: URI) {
      id
      title
      slug
      content
    }
  }
`;
