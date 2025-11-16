"use client";

import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {notFound, usePathname} from "next/navigation";
import DialogContent from "@/components/_components/DialogContent";
import {GetDynamicContent, GetDynamicContentV2} from "@/lib/getAllPages";
import Loader from "@/components/_components/Loader";
// import { current } from "@reduxjs/toolkit";
// import SuffixHeroGrammarExplanations from "../_components/SuffixHeroStatic";

export default function DynamicPageClient({slug}) {
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detectedPrefix, setDetectedPrefix] = useState(null);
  const pathName = usePathname();
  // Get routePrefix from Redux
  const routePrefix = useSelector((state) => state.route.routePrefix);
  useEffect(() => {
    async function fetchContent() {
      try {
        const currentUrl = window.location.pathname;

        let data;

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
            : currentUrl === "/ungarisch-lernen-interessante-wege/" ||
              currentUrl === "/hauptstadt-und-komitate/" ||
              currentUrl === "/die-edv-als-nuetzlicher-helfer-im-alltag/" ||
              currentUrl ===
                "/das-ungarische-bildungssystem-von-kindergarten-bis-uni/" ||
              currentUrl === "/traditionelle-ungarische-kueche/" ||
              currentUrl === "/immobilie-kaufen-in-ungarn/"
            ? "kategorien"
            : routePrefix;

        setDetectedPrefix(currentPrefix);

        if (
          [
            "liedtexte",
            "sprachkurs",
            "kategorien",
            "wissenswert",
            "shorts",
          ].includes(currentPrefix)
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
        <Loader size="large" text="Loading content..." />
      </div>
    );
  }

  if (error || !contentData) {
    return notFound();
  }

  // Handle post content
  if (contentData.type === "post") {
    const {title, content, featuredImage, postContent} =
      contentData.data.data.post;
    const imageUrl = featuredImage?.node?.sourceUrl || null;

    // Pass the custom type if available
    const contentType = contentData.customType || "post";
    console.log("Rendering content of type:", contentType, contentData);

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
            isSinglePage={true}
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
            nextPostSlug={contentData.nextPostSlug}
            prevPostSlug={contentData.prevPostSlug}
            postId={contentData.data.data.post.postId}
            isSinglePage={true}
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
            isSinglePage={true}
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
            isSinglePage={true}
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
          isSinglePage={true}
        />
      </div>
    );
  }

  // Handle page content
  if (contentData.type === "page") {
    const {title, content} = contentData.data.data.page;

    return (
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent
          title={title}
          content={content}
          contentType="page"
          routePrefix={routePrefix}
          routeName={pathName}
        />
      </div>
    );
  }

  return notFound();
}
