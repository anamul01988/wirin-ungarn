import React, { useEffect, useState } from "react";
import { GetKontactPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";

const KontactDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetKontactPages();
        setData(apiData);
      } catch (err) {
        setError("Fehler beim Laden der Kontakt-Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (
    <div>
      <DefaultSpinner />
    </div>
  );
  if (error) return <div>{error}</div>;
  if (!data || !data.data || !data.data.page) return <div>Keine Kontakt-Daten gefunden.</div>;

  const { title, content } = data.data.page;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      {/* You can add your contact form below if you want to keep it */}
    </div>
  );
};

export default KontactDetails;
