import React, { useEffect, useState } from "react";
import { GetCookiesPages, GetLiedTextePages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";

const LiedTextePage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetLiedTextePages();
        console.log("LiedTextePage data:", apiData);
        setCookieData(apiData);
      } catch (err) {
        setError("Fehler beim Laden der Cookie-Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  if (error) return <div>{error}</div>;
  // if (!cookieData || !cookieData.data || !cookieData.data.page)
  //   return <div>Keine Cookie-Daten gefunden.</div>;
  console.log("cookieData 2222:", cookieData.data.pages);
  const { title, content } = cookieData.data.pages?.nodes[0] || {};

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default LiedTextePage;
