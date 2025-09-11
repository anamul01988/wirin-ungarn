"use client";

import { useEffect, useState } from "react";
import { GetDynamicCookiesPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";

export default function DynamicPage({ params }) {
  const { dynamicPageroute } = params;
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetDynamicCookiesPages(dynamicPageroute);
        if (!apiData?.data?.page) {
          setError("Page not found");
        } else {
          setPageData(apiData.data.page);
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError("Failed to load page");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dynamicPageroute]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <DefaultSpinner />
      </div>
    );
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{pageData.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: pageData.content }}
      />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600">
        Sorry, the page you are looking for doesn’t exist.
      </p>
    </div>
  );
}
