"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { GetAllVerbariums } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { useRouter } from "next/navigation";
import "./VerbariumPage.css";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

const VerbariumPage = () => {
  const [pageData, setPageData] = useState(null);
  const [verbariums, setVerbariums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVerbs, setFilteredVerbs] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const apiData = await GetAllVerbariums(500, null);
        console.log("Verbarium data:", apiData);

        if (apiData?.data) {
          // Set page data
          if (apiData.data.pages?.nodes?.length > 0) {
            setPageData(apiData.data.pages.nodes[0]);
          }

          // Set verbariums data
          if (apiData.data.verbariums?.nodes?.length > 0) {
            setVerbariums(apiData.data.verbariums.nodes);
            setFilteredVerbs(apiData.data.verbariums.nodes);
          }
        }
      } catch (err) {
        console.error("Error fetching Verbarium data:", err);
        setError("Fehler beim Laden der Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle search input with debouncing
  const handleSearchChange = useCallback(
    (value) => {
      setSearchQuery(value);

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        const normalizedQuery = value.toLowerCase().trim();

        if (normalizedQuery.length === 0) {
          setFilteredVerbs(verbariums);
          setShowSuggestions(false);
          setSuggestions([]);
          return;
        }

        // Filter verbs
        const filtered = verbariums.filter((verb) =>
          verb.title.toLowerCase().includes(normalizedQuery)
        );
        setFilteredVerbs(filtered);

        // Update suggestions
        const suggestionList = filtered.slice(0, 10).map((verb) => ({
          id: verb.id,
          title: verb.title,
          slug: verb.slug,
        }));
        setSuggestions(suggestionList);
        setShowSuggestions(value.length > 0 && suggestionList.length > 0);
      }, 200);
    },
    [verbariums]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        handleSearchChange(searchQuery);
      }
    },
    [searchQuery, handleSearchChange]
  );

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (slug) => {
      router.push(`/verbarium/${slug}`);
    },
    [router]
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show suggestions when input is focused and has value
  const handleInputFocus = useCallback(() => {
    if (searchQuery.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [searchQuery, suggestions.length]);

  // Get total count message
  const getTotalCountMessage = () => {
    if (verbariums.length === 0) return "";
    const total = verbariums.length;
    const shown = filteredVerbs.length;
    if (searchQuery.trim()) {
      return `Gefunden: ${shown} von ${total}`;
    }
    return `Hier eine Liste der ${shown} bedeutendsten aus insgesamt ${total}:`;
  };

  if (loading) {
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  }

  if (error && verbariums.length === 0) {
    return <div className="verbarium-page">{error}</div>;
  }

  const { title } = pageData || {};

  return (
    <div className="verbarium-page">
      <div id="content-holder" className="sidebar-position-right">
        <div
          id="content-box"
          className="wissenwert_search_page themenlayout shortlayout"
        >
          <div className="content-wrapper">
            <div className="content-inner">
              {/* Page Header */}
              <div id="term">
                {/* <div className="term-title">
                  <h1>{title || "Verbarium"}</h1>
                </div> */}
                <div className="w-full relative flex items-center justify-center mb-3">
                  <ArchivePageHeaderImage
                    imageUrl="/headlineImages/Verbarium.jpg"
                    imageAlt="Verbarium"
                  />
                </div>
              </div>

              {/* Page Description */}
              <p className="wissenswert_description">
                Du suchst nach ungarischen Verben und ihren Konjugationen? Hier
                bist du genau richtig: Entdecke unsere vollständige Sammlung
                ungarischer Verben mit allen Konjugationsformen. Nutze die
                Suchfunktion, um schnell das gewünschte Verb zu finden, oder
                stöbere durch unsere systematische Aufbereitung. Mit klaren
                Beispielen und verständlichen Erklärungen machst du dich
                spielend leicht mit der ungarischen Verbkonjugation vertraut.
              </p>

              {/* Search Section */}
              <div className="wissenswert_sf">
                <p className="search-label">Verb suchen</p>

                <form
                  action=""
                  id="search_form_inner_verbarium"
                  method="get"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    name="st"
                    id="verbarium_input"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Suche..."
                    aria-label="Verb suchen"
                  />
                </form>

                {/* Search Suggestions Container */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="all_word_container" ref={suggestionsRef}>
                    {suggestions.map((suggestion) => (
                      <a
                        key={suggestion.id}
                        href={`/verbarium/${suggestion.slug}`}
                        className="verbarium_link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSuggestionClick(suggestion.slug);
                        }}
                      >
                        <div className="verbarium_item hungarian">
                          {suggestion.title}
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {suggestions.length === 0 && searchQuery.trim() && (
                  <div className="all_word_container" ref={suggestionsRef}>
                    <div className="no-results">Keine Ergebnisse gefunden</div>
                  </div>
                )}
              </div>

              {/* Posts Found Notice */}
              {getTotalCountMessage() && (
                <div className="found_posts">
                  <span className="found_posts_notif">
                    {getTotalCountMessage()}
                  </span>
                </div>
              )}

              {/* Verbarium Grid Container */}
              <div className="wissenwert_container liedtexte_container einfach_lesen_container">
                {filteredVerbs.length > 0 ? (
                  filteredVerbs.map((verb) => (
                    <a
                      key={verb.id}
                      href={``}
                      // href={`/verbarium/${verb.slug}`}
                      className="verbarium_link"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   router.push(`/verbarium/${verb.slug}`);
                      // }}
                    >
                      <div className="verbarium_item">{verb.title}</div>
                    </a>
                  ))
                ) : (
                  <div
                    className="no-results"
                    style={{
                      width: "100%",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    Keine Verben gefunden
                  </div>
                )}
              </div>

              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbariumPage;
