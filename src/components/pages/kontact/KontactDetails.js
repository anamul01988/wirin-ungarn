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

  useEffect(() => {
    if (data && data.data && data.data.page) {
      const form = document.querySelector("form");
      if (form) {
        form.classList.add("mt-5");
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
          input.classList.add(
            "w-full",
            "p-2",
            "border",
            "border-gray-300",
            "rounded-md",
            "mb-4"
          );
        });

        const submitButton = form.querySelector('input[type="submit"]');
        if (submitButton) {
          submitButton.classList.add(
            "bg-red-500",
            "text-white",
            "py-2",
            "px-4",
            "rounded-md",
            "hover:bg-red-600"
          );
        }
      }
    }
  }, [data]);

  if (loading)
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!data || !data.data || !data.data.page)
    return <div>Keine Kontakt-Daten gefunden.</div>;

  const { title, content } = data.data.page;

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default KontactDetails;
