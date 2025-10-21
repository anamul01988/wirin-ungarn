"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import DialogContent from "@/components/_components/DialogContent";
import { GetDynamicContent, GetDynamicContentV2 } from "@/lib/getAllPages";

export default function DynamicPageClient({ slug }) {
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detectedPrefix, setDetectedPrefix] = useState(null);

  // Get routePrefix from Redux
  const routePrefix = useSelector((state) => state.route.routePrefix);

  useEffect(() => {
    async function fetchContent() {
      try {
        console.log("Fetching content with routePrefix:", routePrefix);

        let data;
        // Detect liedtexte or sprachkurs in the URL if routePrefix is not set
        const currentUrl = window.location.pathname;
        const currentPrefix =
          !routePrefix && currentUrl.includes("/liedtexte/")
            ? "liedtexte"
            : !routePrefix && currentUrl.includes("/sprachkurs/")
            ? "sprachkurs"
            : !routePrefix && currentUrl.includes("/kategorien/")
            ? "kategorien"
            : !routePrefix && currentUrl.includes("/wissenswert/")
            ? "wissenswert"
            : !routePrefix && currentUrl.includes("/shorts/")
            ? "shorts"
            : routePrefix;

        console.log("66", currentPrefix);

        // Update the detected prefix state
        setDetectedPrefix(currentPrefix);

        // Conditionally call different API functions based on routePrefix
        if (
          currentPrefix === "liedtexte" ||
          currentPrefix === "sprachkurs" ||
          currentPrefix === "kategorien" ||
          currentPrefix === "wissenswert" ||
          currentPrefix === "shorts"
        ) {
          data = await GetDynamicContentV2(slug, currentPrefix);
        } else {
          data = await GetDynamicContent(slug);
        }

        setContentData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err);
        setLoading(false);
      }
    }

    fetchContent();
  }, [slug, routePrefix]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-2">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error || !contentData) {
    return notFound();
  }

  // Handle post content
  if (contentData.type === "post") {
    const { title, content, featuredImage, postContent } =
      contentData.data.data.post;
    const imageUrl = featuredImage?.node?.sourceUrl || null;

    // Pass the custom type if available
    const contentType = contentData.customType || "post";
    console.log("Rendering content of type:", contentType);

    // Special handling for topicsPostContent
    if (contentType === "kategorien" && postContent?.topicsPostContent) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={content}
            imageFeature={imageUrl}
            contentType={contentType}
            routePrefix={routePrefix || detectedPrefix}
            customFields={{
              topicsPostContent: postContent.topicsPostContent,
              shortTitle: postContent.shortTitle,
              postOrder: postContent.postOrder,
            }}
          />
        </div>
      );
    }

    // Special handling for sprachkurs content
    if (contentType === "sprachkurs") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            title={title}
            content={content}
            imageFeature={imageUrl}
            contentType={contentType}
            routePrefix={routePrefix || detectedPrefix}
            postContent={postContent} // Pass the entire postContent object for sprachkursContent
          />
        </div>
      );
    }

    // Special handling for wissenswert content
    if (contentType === "wissenswert") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            postId={contentData.data.data.post.postId}
            title={title}
            content={content === null ? postContent?.introText : content}
            imageFeature={imageUrl}
            singlePostContent={
              postContent?.postContent?.length > 0
                ? postContent?.postContent
                : []
            }
            contentType="wissenswert"
            routePrefix={routePrefix || detectedPrefix}
          />
        </div>
      );
    }

    // Special handling for shorts content
    if (contentType === "shorts") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <DialogContent
            postId={contentData.data.data.post.postId}
            title={title}
            content={
              content === null ? postContent?.shortsPostContent : content
            }
            imageFeature={imageUrl}
            contentType="shorts"
            routePrefix={routePrefix || detectedPrefix}
            nextPostSlug={contentData.nextPostSlug}
            prevPostSlug={contentData.prevPostSlug}
          />
        </div>
      );
    }

    // Default handling for other post types
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent
          title={title}
          content={content === null ? postContent?.shortsPostContent : content}
          imageFeature={imageUrl}
          contentType={contentType}
          routePrefix={routePrefix || detectedPrefix}
        />
      </div>
    );
  }

  // Handle page content
  if (contentData.type === "page") {
    const { title, content } = contentData.data.data.page;

    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent
          title={title}
          content={content}
          contentType="page"
          routePrefix={routePrefix}
        />
      </div>
    );
  }

  return notFound();
}
