"use client";
import React, { useEffect, useState } from "react";
import {
  GetRelatedPostsForKurzKnapp,
  GetKurzKnappPostById,
} from "@/lib/getAllPages";
import { useRouter } from "next/navigation";

const KurzKnappRelatedItem = ({ slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getExcerptFromPost = (post) => {
    if (!post?.postContent) return "";

    const { introText, postContent, shortsPostContent } = post.postContent;

    const sourceHtml =
      introText ||
      (Array.isArray(postContent) && postContent[0]?.content) ||
      shortsPostContent ||
      "";

    if (!sourceHtml) return "";

    const text = sourceHtml
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length <= 260) return text;
    return text.slice(0, 260) + " …";
  };

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchRelatedPosts() {
      try {
        setLoading(true);
        const response = await GetRelatedPostsForKurzKnapp(slug);
        console.log("Related posts response:", response);

        const edges =
          response?.data?.knowledge?.knowledgeFields?.relatedItems?.edges || [];

        const idNodes = edges
          .map((edge) => edge.node)
          .filter((node) => node && node.id);

        console.log("Related post IDs:", idNodes);

        if (idNodes.length === 0) {
          setRelatedPosts([]);
          return;
        }

        // Fetch full post data for each related ID using idType: ID
        const postsResponses = await Promise.all(
          idNodes.map((node) => GetKurzKnappPostById(node.id))
        );

        const resolvedPosts = postsResponses
          .map((res) => res?.data?.post)
          .filter((post) => post && post.id);

        setRelatedPosts(resolvedPosts);
        console.log("Resolved related posts data:", resolvedPosts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedPosts();
  }, [slug]);

  if (loading) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">Lade verwandte Beiträge...</p>
      </div>
    );
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  const handleRelatedClick = (post) => {
    if (post?.link) {
      // Use the absolute link provided by the API
      router.push(post.link);
      return;
    }

    if (post?.slug) {
      // Fallback to internal kurz-und-knapp route if no direct link is available
      router.push(`/kurz-und-knapp/${post.slug}`);
    }
  };

  return (
    <section className="mt-10 border-t border-gray-200 pt-6">
      <p className="text-2xl font-semibold text-[#cc2233] mb-4">
        Artikel, die dieses Thema aufgreifen
      </p>

      <div className="space-y-10">
        {relatedPosts.map((post) => {
          const image = post?.featuredImage?.node;
          const longImage = post?.imageLong?.featuredImageMobile?.node;
          const imageUrl =
            (longImage && longImage.sourceUrl) || image?.sourceUrl;
          const imageAlt =
            (longImage && longImage.altText) || image?.altText || post.title;

          const excerpt = getExcerptFromPost(post);

          return (
            <article
              key={post.id}
              className="flex flex-col md:flex-row md:items-start gap-6 cursor-pointer group"
              onClick={() => handleRelatedClick(post)}
            >
              {imageUrl && (
                <div className="w-full md:w-1/3 lg:w-1/4 overflow-hidden rounded shadow-sm bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-48 md:h-40 lg:h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="w-full md:flex-1">
                <p className="text-lg md:text-xl font-normal text-[#494158] group-hover:text-red-700 group-hover:underline">
                  {post.title}
                </p>

                {excerpt && (
                  <p className="mt-2 text-sm md:text-sm text-gray-700 leading-relaxed">
                    {excerpt}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default KurzKnappRelatedItem;
