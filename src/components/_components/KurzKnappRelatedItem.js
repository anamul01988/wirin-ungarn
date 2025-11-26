"use client";
import React, { useEffect, useState } from "react";
import { GetRelatedPostsForKurzKnapp } from "@/lib/getAllPages";
import { useRouter } from "next/navigation";

const KurzKnappRelatedItem = ({ slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
                
                if (response?.data?.knowledge?.knowledgeFields?.relatedItems?.edges) {
                    const posts = response.data.knowledge.knowledgeFields.relatedItems.edges
                        .map(edge => edge.node)
                        .filter(node => node && node.id);
                    setRelatedPosts(posts);
                    console.log("Related posts:", posts);
                }
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

    const handleRelatedClick = (relatedSlug) => {
        if (relatedSlug) {
            router.push(`/kurz-und-knapp/${relatedSlug}`);
        }
    };

    return (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="text-lg font-semibold text-[#436f4d] mb-3">
                Verwandte Themen
            </h3>
            <ul className="space-y-2">
                {relatedPosts.map((post) => (
                    <li key={post.id}>
                        <button
                            onClick={() => handleRelatedClick(post.slug)}
                            className="text-[#436f4d] hover:text-[#5a7a5e] hover:underline text-left w-full text-sm"
                        >
                            {post.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KurzKnappRelatedItem;