import React, { useEffect, useState } from "react";
import { GetCookiesPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";

const CookieDetails = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetCookiesPages();
        setCookieData(apiData);
      } catch (err) {
        setError("Fehler beim Laden der Cookie-Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>
    <DefaultSpinner/>
  </div>;
  if (error) return <div>{error}</div>;
  if (!cookieData || !cookieData.data || !cookieData.data.page) return <div>Keine Cookie-Daten gefunden.</div>;

  const { title, content } = cookieData.data.page;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default CookieDetails;
