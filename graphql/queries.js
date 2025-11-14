export const GET_ALL_POSTS = `
  query GetAllPosts {
    posts(first: 50) {
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



export const GET_SINGLE_POST = `
  query GetSinglePost($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      title
      slug
      content
      date
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
`;

