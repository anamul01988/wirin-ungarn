import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 10) {
      edges {
        node {
          id
          title
        }
        cursor
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query GetSinglePost($id: ID!) {
    post(id: $id) {
      id
      title
      content
    }
  }
`;
