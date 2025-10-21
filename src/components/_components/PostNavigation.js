"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { getNextPostDetails } from "@/lib/navigationQueries";

const PostNavigation = ({ 
  currentSlug, 
  postType = "informative", 
  routePrefix = "wissenswert",
  className = "" 
}) => {
  const [navigation, setNavigation] = useState({ next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNavigation = async () => {
      if (!currentSlug) return;
      
      setLoading(true);
      try {
        const result = await getNextPostDetails(currentSlug, postType);
        setNavigation(result);
      } catch (error) {
        console.error("Error fetching navigation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, [currentSlug, postType]);

  const handleNavigation = (slug) => {
    if (slug) {
      router.push(`/${routePrefix}/${slug}`);
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-between items-center py-6 ${className}`}>
        <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
      </div>
    );
  }

  return (
    <div className={`flex justify-between items-center py-6 border-t border-gray-200 ${className}`}>
      {/* Previous Post Button */}
      <div className="flex-1">
        {navigation.previous ? (
          <Button
            variant="outlined"
            color="gray"
            onClick={() => handleNavigation(navigation.previous.slug)}
            className="flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-500">Vorheriger Artikel</div>
              <div className="font-medium truncate max-w-[200px]">
                {navigation.previous.postContent?.shortTitle || navigation.previous.title}
              </div>
            </div>
          </Button>
        ) : (
          <div></div>
        )}
      </div>

      {/* Next Post Button */}
      <div className="flex-1 flex justify-end">
        {navigation.next ? (
          <Button
            variant="outlined"
            color="gray"
            onClick={() => handleNavigation(navigation.next.slug)}
            className="flex items-center gap-2 text-sm"
          >
            <div className="text-right">
              <div className="text-xs text-gray-500">Nächster Artikel</div>
              <div className="font-medium truncate max-w-[200px]">
                {navigation.next.postContent?.shortTitle || navigation.next.title}
              </div>
            </div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

// Alternative compact version
export const CompactPostNavigation = ({ 
  currentSlug, 
  postType = "informative", 
  routePrefix = "wissenswert",
  className = "" 
}) => {
  const [navigation, setNavigation] = useState({ next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNavigation = async () => {
      if (!currentSlug) return;
      
      setLoading(true);
      try {
        const result = await getNextPostDetails(currentSlug, postType);
        setNavigation(result);
      } catch (error) {
        console.error("Error fetching navigation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, [currentSlug, postType]);

  const handleNavigation = (slug) => {
    if (slug) {
      router.push(`/${routePrefix}/${slug}`);
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center gap-4 py-4 ${className}`}>
        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center gap-4 py-4 ${className}`}>
      <Button
        variant="outlined"
        color="gray"
        size="sm"
        onClick={() => handleNavigation(navigation.previous?.slug)}
        disabled={!navigation.previous}
        className="flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Zurück
      </Button>
      
      <Button
        variant="outlined"
        color="gray"
        size="sm"
        onClick={() => handleNavigation(navigation.next?.slug)}
        disabled={!navigation.next}
        className="flex items-center gap-1"
      >
        Weiter
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
};

export default PostNavigation;