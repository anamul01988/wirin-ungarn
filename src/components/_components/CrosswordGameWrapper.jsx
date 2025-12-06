"use client";

import { useState, useEffect } from "react";
import CrosswordGame from "./CrosswordGame";
import { loadCrosswordData } from "./data/crosswordData";

export default function CrosswordGameWrapper({ slug }) {
  const [xmlData, setXmlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadCrosswordData(slug);
        if (data) {
          setXmlData(data);
        } else {
          setError("Crossword not found");
        }
      } catch (err) {
        console.error("Error loading crossword:", err);
        setError("Failed to load crossword");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading crossword...</div>;
  }

  if (error || !xmlData) {
    return <div>{error || "Crossword not found"}</div>;
  }

  return <CrosswordGame xmlData={xmlData} />;
}
