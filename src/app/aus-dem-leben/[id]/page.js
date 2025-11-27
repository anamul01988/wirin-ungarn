"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DialogContent from "@/components/_components/DialogContent";
import HistoryTracker from "@/components/_components/HistoryTracker";

export default function AusDemLebenSinglePage({ params }) {
  const router = useRouter();
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read data from localStorage
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("ausDemLebenCurrentData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setContentData(parsedData);
        } else {
          // If no data in localStorage, redirect back
          router.push("/aus-dem-leben");
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        router.push("/aus-dem-leben");
      } finally {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>No content found</div>
      </div>
    );
  }

  return (
    <>
      <HistoryTracker />
      <div className="min-h-screen flex items-center justify-center">
        <DialogContent
          title={contentData.title}
          content={contentData.content}
          imageFeature={contentData.image}
          imageAlt={contentData.title}
          contentType="aus-dem-leben"
          routePrefix="aus-dem-leben"
          isSinglePage={true}
        />
      </div>
    </>
  );
}
