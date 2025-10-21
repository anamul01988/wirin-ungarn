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

export const GET_POST_WITH_NAVIGATION = `
  query GetPostWithNavigation($slug: ID!) {
    post(id: $slug, idType: SLUG) {
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

export const GET_NEXT_PREVIOUS_POSTS = `
  query GetNextPreviousPosts($currentDate: String!, $postType: String = "informative") {
    nextPosts: posts(
      first: 1
      where: {
        metaQuery: {
          relation: AND
          metaArray: [
            {
              key: "post_layout"
              value: $postType
              compare: EQUAL_TO
            }
          ]
        }
        dateQuery: {
          after: $currentDate
        }
        orderby: { field: DATE, order: ASC }
      }
    ) {
      nodes {
        id
        title
        slug
        postId
        link
        date
        postContent {
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
    
    previousPosts: posts(
      first: 1
      where: {
        metaQuery: {
          relation: AND
          metaArray: [
            {
              key: "post_layout"
              value: $postType
              compare: EQUAL_TO
            }
          ]
        }
        dateQuery: {
          before: $currentDate
        }
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        id
        title
        slug
        postId
        link
        date
        postContent {
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
  }
`;

