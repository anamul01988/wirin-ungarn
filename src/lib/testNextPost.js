// Simple test to get next post details
// You can run this in your browser console or as a Node.js script

import { fetchPage } from "./getAllPages";

export async function getNextPostForCurrentPost(currentSlug = "todesfall-in-ungarn") {
  try {
    console.log(`🔍 Looking for next post after: ${currentSlug}`);
    
    // First, let's get all posts to understand the structure
    const allPostsQuery = `
      query GetAllPosts {
        posts(
          first: 20
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
            postContent {
              shortTitle
              introText
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

    const result = await fetchPage(allPostsQuery);
    const posts = result?.data?.posts?.nodes || [];
    
    console.log(`📄 Found ${posts.length} posts total`);
    
    // Find current post
    const currentIndex = posts.findIndex(post => post.slug === currentSlug);
    console.log(`📍 Current post "${currentSlug}" is at index: ${currentIndex}`);
    
    if (currentIndex === -1) {
      console.log("❌ Current post not found in the list");
      return null;
    }
    
    // Get next and previous posts
    const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const previousPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    
    console.log("\n📊 Navigation Results:");
    console.log("Current post:", posts[currentIndex]?.title);
    console.log("Next post:", nextPost?.title || "None");
    console.log("Previous post:", previousPost?.title || "None");
    
    if (nextPost) {
      console.log("\n✅ Next Post Details:");
      console.log("- Title:", nextPost.title);
      console.log("- Slug:", nextPost.slug);
      console.log("- Short Title:", nextPost.postContent?.shortTitle);
      console.log("- Date:", nextPost.date);
      console.log("- Post ID:", nextPost.postId);
      console.log("- Featured Image:", nextPost.featuredImage?.node?.sourceUrl);
    }
    
    return {
      current: posts[currentIndex],
      next: nextPost,
      previous: previousPost,
      allPosts: posts
    };
    
  } catch (error) {
    console.error("❌ Error fetching next post:", error);
    return null;
  }
}

// Test function you can call directly
export async function testNextPostQuery() {
  const result = await getNextPostForCurrentPost("todesfall-in-ungarn");
  
  if (result?.next) {
    console.log("\n🎉 SUCCESS! Next post found:");
    console.log("Title:", result.next.title);
    console.log("Slug:", result.next.slug);
    console.log("You can navigate to: /wissenswert/" + result.next.slug);
  } else {
    console.log("\n❌ No next post found");
  }
  
  return result;
}

// Export for use in components
export { getNextPostForCurrentPost as default };