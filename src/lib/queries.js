export const GET_PAGE_COOKIE = `
  query {
    page(id: "cookie-richtlinie-eu", idType: URI) {
      id
      title
      slug
      content
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
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
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
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
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
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
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
    }
  }
`;

export const GET_PAGE_PHILOSOPHIE = `
  query {
    page(id: "philosophie", idType: URI) {
      id
      title
      slug
      content
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
    }
  }
`;

export const GET_PAGE_KARRIERE = `
  query {
    page(id: "karriere", idType: URI) {
      id
      title
      slug
      content
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
      }
    }
  }
`;
export const GET_PAGE_LIEDTEXTE = `query GetLiedtextePageAndPosts {
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

  liedtexte(first: 50) {
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
