import React, { useEffect, useState } from "react";
import { GetImpressumPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

const ImpressumDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetImpressumPages();
        setData(apiData);
      } catch (err) {
        setError("Fehler beim Laden der Impressum-Daten.");
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
  if (!data || !data.data || !data.data.page)
    return <div>Keine Impressum-Daten gefunden.</div>;

  const { title, content } = data.data.page;

  return (
    <div className="mx-auto">
      {/* <h1 className="single__page_title mb-3 text-2xl font-bold text-gray-800 pr-12 leading-snug">
        {title}
      </h1> */}
      <div className="w-full relative flex items-center justify-center mb-3">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/Impressum.jpg"
          imageAlt="Impressum"
        />
      </div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ImpressumDetails;
