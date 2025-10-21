import { fetchPage } from "./getAllPages";

/**
 * Get the next post details based on current post slug
 * This function will help you implement next/previous navigation
 */
export async function getNextPostDetails(currentSlug, postType = "informative") {
  try {
    // First, get the current post to know its date
    const currentPostQuery = `
      query GetCurrentPost {
        post(id: "${currentSlug}", idType: SLUG) {
          id
          title
          slug
          postId
          date
        }
      }
    `;

    const currentPostData = await fetchPage(currentPostQuery);
    const currentPost = currentPostData?.data?.post;

    if (!currentPost) {
      console.log("Current post not found");
      return { next: null, previous: null };
    }

    // Now get the next and previous posts based on the current post's date
    const currentDate = new Date(currentPost.date);
    const currentDateString = currentDate.toISOString();

    const navigationQuery = `
      query GetNavigationPosts {
        # Get next post (newer than current)
        nextPosts: posts(
          first: 1
          where: {
            metaQuery: {
              relation: AND
              metaArray: [
                {
                  key: "post_layout"
                  value: "${postType}"
                  compare: EQUAL_TO
                }
              ]
            }
            dateQuery: {
              after: "${currentDateString}"
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
        
        # Get previous post (older than current)
        previousPosts: posts(
          first: 1
          where: {
            metaQuery: {
              relation: AND
              metaArray: [
                {
                  key: "post_layout"
                  value: "${postType}"
                  compare: EQUAL_TO
                }
              ]
            }
            dateQuery: {
              before: "${currentDateString}"
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

    const navigationData = await fetchPage(navigationQuery);
    
    return {
      next: navigationData?.data?.nextPosts?.nodes?.[0] || null,
      previous: navigationData?.data?.previousPosts?.nodes?.[0] || null,
      current: currentPost
    };

  } catch (error) {
    console.error("Error fetching next post details:", error);
    return { next: null, previous: null, current: null };
  }
}

/**
 * Alternative approach: Get all posts and determine navigation client-side
 * This is more reliable but less efficient for large numbers of posts
 */
export async function getAllPostsForNavigation(postType = "informative", limit = 50) {
  try {
    const query = `
      query GetAllPostsForNavigation {
        posts(
          first: ${limit}
          where: {
            metaQuery: {
              relation: AND
              metaArray: [
                {
                  key: "post_layout"
                  value: "${postType}"
                  compare: EQUAL_TO
                }
              ]
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
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }
    `;

    const data = await fetchPage(query);
    return data?.data?.posts || null;

  } catch (error) {
    console.error("Error fetching all posts for navigation:", error);
    return null;
  }
}

/**
 * Get navigation for current post from a list of posts
 */
export function getNavigationFromPostList(posts, currentSlug) {
  if (!posts || !Array.isArray(posts)) {
    return { next: null, previous: null };
  }

  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { next: null, previous: null };
  }
  
  return {
    next: posts[currentIndex - 1] || null, // Previous in array is newer (next)
    previous: posts[currentIndex + 1] || null, // Next in array is older (previous)
  };
}

/**
 * Simple query to test if you can get the next post
 * Use this to test your GraphQL endpoint
 */
export async function testNextPostQuery(currentSlug = "todesfall-in-ungarn") {
  try {
    const query = `
      query TestNextPost {
        # Get all posts to see what's available
        posts(
          first: 10
          where: {
            metaQuery: {
              relation: AND
              metaArray: [
                {
                  key: "post_layout"
                  value: "informative"
                  compare: EQUAL_TO
                }
              ]
            }
            orderby: { field: DATE, order: DESC }
          }
        ) {
          nodes {
            id
            title
            slug
            postId
            date
          }
        }
      }
    `;

    const data = await fetchPage(query);
    const posts = data?.data?.posts?.nodes || [];
    
    console.log("Available posts:", posts.map(p => ({ title: p.title, slug: p.slug, date: p.date })));
    
    // Find current post and get next
    const currentIndex = posts.findIndex(post => post.slug === currentSlug);
    const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const previousPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    
    console.log("Current post index:", currentIndex);
    console.log("Next post:", nextPost ? { title: nextPost.title, slug: nextPost.slug } : "None");
    console.log("Previous post:", previousPost ? { title: previousPost.title, slug: previousPost.slug } : "None");
    
    return {
      posts,
      currentIndex,
      next: nextPost,
      previous: previousPost
    };

  } catch (error) {
    console.error("Error in test query:", error);
    return null;
  }
}