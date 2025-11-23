"use client";
import React, { useEffect, useState } from "react";
import { GetAllKnowledges } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { useRouter } from "next/navigation";
import "./KurzKnappPage.css";

const KurzKnappPage = () => {
  const [pageData, setPageData] = useState(null);
  const [knowledges, setKnowledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKnowledges, setFilteredKnowledges] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This should be checked from auth context
  const router = useRouter();

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const apiData = await GetAllKnowledges(500, null);
        console.log("Kurz und Knapp data:", apiData);

        if (apiData?.data) {
          // Set page data
          if (apiData.data.pages?.nodes?.length > 0) {
            setPageData(apiData.data.pages.nodes[0]);
          }

          // Set knowledges data
          if (apiData.data.knowledges?.nodes) {
            setKnowledges(apiData.data.knowledges.nodes);
            setFilteredKnowledges(apiData.data.knowledges.nodes);
          }
        }
      } catch (err) {
        console.error("Error fetching Kurz und Knapp data:", err);
        setError("Fehler beim Laden der Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter knowledges based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredKnowledges(knowledges);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = knowledges.filter(
      (item) =>
        item.title?.toLowerCase().includes(query) ||
        item.content?.toLowerCase().includes(query)
    );

    setFilteredKnowledges(filtered);
  }, [searchQuery, knowledges]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle question popup
  const handleShowQuestionPopup = () => {
    if (isLoggedIn) {
      setShowQuestionPopup(true);
    } else {
      setShowLoginPopup(true);
    }
  };

  // Handle question submission
  const handleSubmitQuestion = () => {
    // Handle question submission here
    console.log("Question submitted:", questionText);
    setQuestionText("");
    setShowQuestionPopup(false);
    // You can add a success message here
    alert("Frage wurde erfolgreich eingereicht!");
  };

  // Close popups
  const closePopups = () => {
    setShowLoginPopup(false);
    setShowQuestionPopup(false);
  };

  // Handle knowledge item click - navigate to detail page
  const handleKnowledgeClick = (slug) => {
    router.push(`/kurz-und-knapp/${slug}`);
  };

  if (loading) {
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="knowledge-page">{error}</div>;
  }

  const { title, content } = pageData || {};
  const hasNoResults = searchQuery.trim() && filteredKnowledges.length === 0;

  return (
    <div className="knowledge-page">
      {/* Page Title */}
      {title && (
        <p className="text-[30px] font-medium text-[#494158] leading-[1.9em] py-2 -ml-[0.05em] -mt-2 not-italic tracking-[-0.04em]">
          {title}
        </p>
      )}
      {/* Page Content */}
      {content && (
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
      )}

      {/* Search Section */}
      <div className="knowledge-search">
        <p className="knowledge-search__label">Diese Seite durchsuchen</p>
        <form
          className="knowledge-search__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="knowledge"
            id="knowledge_input"
            className="knowledge-search__input"
            placeholder="Suche..."
            autoComplete="off"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {/* Info Message */}
      <div className="knowledge-info">
        <p className="knowledge-info__text">
          Gib den gewünschten Suchbegriff ein und finde einfach die Fragen und
          Antworten
        </p>
      </div>

      {/* Knowledge Listings */}
      <div
        className={`knowledge-listings ${
          loading ? "knowledge-listings--loading" : ""
        }`}
      >
        {hasNoResults ? (
          <div className="knowledge-list--empty show" id="no-results">
            Keine Ergebnisse gefunden. Bitte versuchen Sie einen anderen
            Suchbegriff.
          </div>
        ) : (
          <ul className="knowledge-list" id="knowledge-list">
            {filteredKnowledges.map((knowledge) => (
              <li
                key={knowledge.id}
                className="knowledge-list__item"
                onClick={() => handleKnowledgeClick(knowledge.slug)}
              >
                <a
                  href={`/kurz-und-knapp/${knowledge.slug}`}
                  className="knowledge-list__link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleKnowledgeClick(knowledge.slug);
                  }}
                >
                  {knowledge.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Action Section */}
      <div className="knowledge-action">
        {/* For Logged In Users */}
        {isLoggedIn ? (
          <div className="knowledge-action__button" id="logged-in-action">
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleShowQuestionPopup}
            >
              eine Frage stellen
            </button>
          </div>
        ) : (
          /* For Non-Logged In Users */
          <div className="knowledge-action__login" id="logged-out-action">
            <a
              href="#"
              className="btn btn--text"
              onClick={(e) => {
                e.preventDefault();
                handleShowQuestionPopup();
              }}
            >
              Ich möchte eine Frage stellen ...
            </a>
          </div>
        )}
      </div>

      {/* Popup Overlay */}
      {(showLoginPopup || showQuestionPopup) && (
        <div
          className="popup-overlay popup-overlay--visible"
          onClick={closePopups}
        ></div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div id="login-popup" className="popup popup--visible">
          <span className="popup__close" onClick={closePopups}>
            &times;
          </span>
          <div className="popup__message">
            Bitte melde dich an oder registriere ein Nutzerkonto und komm dann
            auf diese Seite zurück, um deine Frage zu stellen.
          </div>
          <div className="popup__action">
            <a
              href="https://wir-in-ungarn.hu/login"
              className="btn btn--primary"
            >
              jetzt anmelden oder registrieren
            </a>
          </div>
        </div>
      )}

      {/* Question Popup (for logged in users) */}
      {showQuestionPopup && (
        <div id="question-popup" className="popup popup--visible">
          <span className="popup__close" onClick={closePopups}>
            &times;
          </span>
          <div className="popup__message">
            <strong>Stellen Sie Ihre Frage:</strong>
            <textarea
              style={{
                width: "100%",
                height: "100px",
                marginTop: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
              placeholder="Ihre Frage hier eingeben..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          <div className="popup__action">
            <button className="btn btn--primary" onClick={handleSubmitQuestion}>
              Frage absenden
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KurzKnappPage;
