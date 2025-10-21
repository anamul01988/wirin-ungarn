// Test file to check next post functionality
// Run this with: node test-next-post.js

import { testNextPostQuery, getNextPostDetails } from './src/lib/navigationQueries.js';

async function testNavigation() {
  console.log("Testing next post navigation...");
  
  try {
    // Test with your current post slug
    const currentSlug = "todesfall-in-ungarn";
    
    console.log(`\n1. Testing with current post: ${currentSlug}`);
    const testResult = await testNextPostQuery(currentSlug);
    
    if (testResult) {
      console.log("\n✅ Test successful!");
      console.log("Available posts found:", testResult.posts.length);
      
      if (testResult.next) {
        console.log("\n📄 Next post found:");
        console.log("- Title:", testResult.next.title);
        console.log("- Slug:", testResult.next.slug);
        console.log("- Date:", testResult.next.date);
      } else {
        console.log("\n❌ No next post found");
      }
      
      if (testResult.previous) {
        console.log("\n📄 Previous post found:");
        console.log("- Title:", testResult.previous.title);
        console.log("- Slug:", testResult.previous.slug);
        console.log("- Date:", testResult.previous.date);
      } else {
        console.log("\n❌ No previous post found");
      }
    } else {
      console.log("❌ Test failed");
    }
    
    console.log("\n2. Testing detailed navigation query...");
    const detailedResult = await getNextPostDetails(currentSlug);
    
    if (detailedResult.next) {
      console.log("\n✅ Next post details:");
      console.log("- Title:", detailedResult.next.title);
      console.log("- Slug:", detailedResult.next.slug);
      console.log("- Short Title:", detailedResult.next.postContent?.shortTitle);
      console.log("- Intro:", detailedResult.next.postContent?.introText?.substring(0, 100) + "...");
    }
    
  } catch (error) {
    console.error("❌ Error testing navigation:", error);
  }
}

// Run the test
testNavigation();