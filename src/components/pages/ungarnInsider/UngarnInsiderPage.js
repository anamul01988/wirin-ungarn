"use client";
import React, { useEffect, useState } from "react";
import { GetAllUngarnInsider } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import "./UngarnInsiderPage.css";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

const UngarnInsiderPage = () => {
  const [pageData, setPageData] = useState(null);
  const [insiders, setInsiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInsiders, setFilteredInsiders] = useState([]);
  const [reportPopupOpen, setReportPopupOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [reportMessage, setReportMessage] = useState("");
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const itemsPerPage = 10;

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return { month: "", day: "", year: "", time: "" };
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];
    return {
      month: months[date.getMonth()],
      day: date.getDate().toString(),
      year: date.getFullYear().toString(),
      time: date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // Get language flag image
  const getLanguageFlag = (language) => {
    if (!language || !Array.isArray(language) || language.length === 0) {
      return "https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/DE_80.png";
    }
    const lang = language[0];
    if (lang === "HU") {
      return "https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/HU_80.png";
    }
    return "https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/DE_80.png";
  };

  // Get category image (placeholder - you may need to adjust based on actual data)
  const getCategoryImage = (category) => {
    // This is a placeholder - adjust based on your actual category data
    return "https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/insider-cat/politik.png";
  };

  // Check if content is locked
  const isLocked = (lockedContent) => {
    if (!lockedContent || !Array.isArray(lockedContent)) return false;
    return !lockedContent.includes("no");
  };

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const apiData = await GetAllUngarnInsider(100, null);
        console.log("Ungarn Insider data:", apiData);

        if (apiData?.data) {
          // Set page data
          if (apiData.data.pages?.nodes?.length > 0) {
            setPageData(apiData.data.pages.nodes[0]);
          }

          // Set insiders data
          if (apiData.data.ungarnInsiders?.nodes) {
            setInsiders(apiData.data.ungarnInsiders.nodes);
            setFilteredInsiders(apiData.data.ungarnInsiders.nodes);
          }

          // Set pagination info
          if (apiData.data.ungarnInsiders?.pageInfo) {
            setPageInfo(apiData.data.ungarnInsiders.pageInfo);
          }
        }
      } catch (err) {
        console.error("Error fetching Ungarn Insider data:", err);
        setError("Fehler beim Laden der Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter insiders based on category and search
  useEffect(() => {
    let filtered = [...insiders];

    // Filter by category (if you have category data)
    if (selectedCategory) {
      // Adjust this based on your actual category field
      // filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.content?.toLowerCase().includes(query) ||
          item.ungarnInsiderFields?.insiderComment
            ?.toLowerCase()
            .includes(query)
      );
    }

    setFilteredInsiders(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, insiders]);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && window.innerWidth <= 768) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pagination
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredInsiders.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredInsiders.length / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle report popup
  const handleReportClick = (postId) => {
    setSelectedPostId(postId);
    setReportPopupOpen(true);
  };

  const handleReportSubmit = () => {
    // Handle report submission here
    console.log("Report submitted for post:", selectedPostId, reportMessage);
    setReportPopupOpen(false);
    setReportMessage("");
    setSelectedPostId(null);
    // You can add a success message here
  };

  if (loading) {
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="insider-page">{error}</div>;
  }

  const { title, content } = pageData || {};
  const currentItems = getCurrentPageItems();
  const totalPages = getTotalPages();

  return (
    <div className="insider-page">
      {/* Sticky Mobile Header */}
      <div
        className={`ui-sticky-header ${showStickyHeader ? "ui-scrolled" : ""}`}
      >
        <div className="ui-container">
          <a href="/ungarn-insider">
            <img
              className="ui-sticky-logo"
              src="https://via.placeholder.com/200x60/436f4d/ffffff?text=Ungarn-Insider"
              alt="Ungarn Insider Logo"
            />
          </a>
        </div>
      </div>

      {/* Page Title */}
      {/* <h1 className="insider-page__title">{title || "Ungarn-Insider"}</h1> */}
      <div className="w-full relative flex items-center justify-center mb-3">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/Ungarn-Insider.jpg"
          imageAlt="Ungarn Insider"
        />
      </div>

      {/* Intro Section */}
      {content && (
        <div
          className="insider-intro"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* Liability Notice */}
      <div className="insider-notice insider-notice--liability">
        <p>
          <span className="insider-notice__label">Haftung für Links:</span>
          Wir übernehmen keine Gewähr für externe Inhalte. Für diese sind allein
          die jeweiligen Anbieter verantwortlich. Sobald wir von rechtswidrigen
          Inhalten erfahren, die mit dem Button gemeldet werden können,
          entfernen wir den betreffenden Link umgehend.
        </p>
      </div>

      {/* Telegram CTA */}
      <div className="insider-cta insider-cta--telegram">
        <a
          href="https://t.me/ungarn_insider"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230088cc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z'/%3E%3C/svg%3E"
            alt="Telegram logo"
          />
          <p>
            Immer die neuesten Beiträge direkt auf dein Handy: Tritt unserem
            Telegram-Kanal bei!
          </p>
        </a>
      </div>

      {/* Contributor CTA */}
      <div className="insider-cta insider-cta--contributor">
        <p>
          Gestalte Ungarn-Insider aktiv mit! Teile deine Entdeckungen und
          Empfehlungen.{" "}
          <a
            href="https://wir-in-ungarn.hu/mach-mit-beim-ungarn-insider/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Klicke hier
          </a>
          , um mehr zu erfahren und wie du mitmachen kannst!
        </p>
      </div>

      {/* Filter Section */}
      <div className="insider-filter">
        <div className="insider-filter__group">
          <label htmlFor="insider_category" className="insider-filter__label">
            Kategorien
          </label>
          <select
            id="insider_category"
            className="insider-filter__select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Kategorie auswählen</option>
            <option value="politik">Politik</option>
            <option value="wirtschaft">Wirtschaft</option>
            <option value="kultur">Kultur</option>
            <option value="reisen">Reisen</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="insider-filter__group">
          <label htmlFor="insider_search" className="insider-filter__label">
            Suche
          </label>
          <input
            type="text"
            id="insider_search"
            className="insider-filter__input"
            placeholder="..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add New Button */}
        <div className="insider-filter__group insider-filter__group--add">
          <a
            href="https://wir-in-ungarn.hu/ungarn-insider-eintrag-einreichen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23436f4d'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3C/svg%3E"
              alt="Add new insider"
            />
          </a>
        </div>

        <div className="clearfix"></div>
      </div>

      {/* Insider List Container */}
      <div className={`insider-list ${loading ? "loading" : ""}`}>
        {currentItems.length === 0 ? (
          <div className="text-center py-8">
            <p>Keine Beiträge gefunden.</p>
          </div>
        ) : (
          currentItems.map((insider) => {
            const dateInfo = formatDate(insider.date);
            const language = insider.ungarnInsiderFields?.language || [];
            const locked = isLocked(insider.ungarnInsiderFields?.lockedContent);
            const outgoingLink =
              insider.ungarnInsiderFields?.outgoingLink || "";
            const comment = insider.ungarnInsiderFields?.insiderComment || "";

            return (
              <article
                key={insider.id}
                className="insider-item insider-item--published"
                data-postid={insider.databaseId}
                id={insider.databaseId}
              >
                <div className="insider-date">
                  <div className="insider-date__items">
                    <span className="insider-date__month">
                      {dateInfo.month}
                    </span>
                    <span className="insider-date__day">{dateInfo.day}</span>
                    <span className="insider-date__year">{dateInfo.year}</span>
                    <span className="insider-date__time">{dateInfo.time}</span>
                  </div>

                  <div className="insider-meta insider-meta--category">
                    <div
                      className="insider-meta__image"
                      data-tooltip="Kategorie"
                    >
                      <img src={getCategoryImage()} alt="Kategorie" />
                    </div>
                  </div>

                  <div className="insider-meta insider-meta--author">
                    <div className="insider-meta__image">
                      <img
                        src="https://secure.gravatar.com/avatar/3fe1f16e7ca2bab216ce52edbd66d39f?s=48&d=mm&r=g"
                        srcSet="https://secure.gravatar.com/avatar/3fe1f16e7ca2bab216ce52edbd66d39f?s=96&d=mm&r=g 2x"
                        alt="Author"
                        className="avatar avatar-48 photo"
                        width="48"
                        height="48"
                      />
                    </div>
                    <div className="insider-meta__name">Author</div>
                  </div>
                </div>

                <div className="insider-content">
                  <h3 className="insider-content__title">{insider.title}</h3>

                  {outgoingLink && (
                    <p className="insider-content__link">
                      <a
                        href={outgoingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {outgoingLink}
                      </a>
                    </p>
                  )}

                  {comment && (
                    <blockquote className="insider-content__comment">
                      {comment}
                    </blockquote>
                  )}

                  <div className="insider-actions">
                    <div className="insider-actions__left">
                      <div className="insider-flag">
                        <img
                          src={getLanguageFlag(language)}
                          alt={language[0] || "DE"}
                        />
                      </div>
                      {locked && (
                        <div
                          className="insider-badge insider-badge--locked"
                          data-tooltip="Gesperrter Inhalt"
                        >
                          <img
                            src="https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/lock.png"
                            alt="Locked"
                          />
                          <span>Gesperrt</span>
                        </div>
                      )}
                    </div>

                    <div className="insider-actions__right">
                      {outgoingLink && (
                        <a
                          href={outgoingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="insider-btn insider-btn--primary"
                        >
                          ZUR SEITE
                        </a>
                      )}

                      <div className="insider-interactions">
                        <button
                          className="insider-interactions__btn insider-interactions__btn--like"
                          data-tooltip="Gefällt mir"
                        >
                          <img
                            src="https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/like_unchecked.png"
                            alt="Like"
                          />
                        </button>
                        <button
                          className="insider-interactions__btn insider-interactions__btn--report"
                          data-tooltip="Beitrag melden"
                          onClick={() => handleReportClick(insider.databaseId)}
                        >
                          <img
                            src="https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/report.png"
                            alt="Report"
                          />
                        </button>
                      </div>

                      <div className="insider-admin">
                        <a
                          href={`https://wir-in-ungarn.hu/wiuadmin/post.php?post=${insider.databaseId}&action=edit`}
                          className="insider-admin__btn insider-admin__btn--edit"
                          data-tooltip="Bearbeiten"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://wir-in-ungarn.hu/wiucontent/themes/grimag-child-theme/assets/images/edit_insider.png"
                            alt="Edit"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {(totalPages > 1 ||
        pageInfo?.hasNextPage ||
        pageInfo?.hasPreviousPage ||
        (filteredInsiders.length === itemsPerPage &&
          pageInfo?.hasNextPage)) && (
        <nav className="insider-pagination" aria-label="Pagination">
          <ul className="insider-pagination__list">
            <li className="insider-pagination__item">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`insider-pagination__link insider-pagination__link--prev ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                «
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => {
                const showPage =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);
                const showEllipsis =
                  (pageNum === currentPage - 3 && currentPage > 4) ||
                  (pageNum === currentPage + 3 && currentPage < totalPages - 3);

                if (showEllipsis) {
                  return (
                    <li key={pageNum} className="insider-pagination__item">
                      <span className="insider-pagination__link insider-pagination__link--dots">
                        ...
                      </span>
                    </li>
                  );
                }

                if (!showPage) return null;

                return (
                  <li key={pageNum} className="insider-pagination__item">
                    <button
                      onClick={() => handlePageChange(pageNum)}
                      className={`insider-pagination__link ${
                        pageNum === currentPage
                          ? "insider-pagination__link--current"
                          : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              }
            )}
            <li className="insider-pagination__item">
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`insider-pagination__link insider-pagination__link--next ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Report Popup */}
      {reportPopupOpen && (
        <div className="insider-popup active" id="reportPopup">
          <span
            className="insider-popup__close"
            onClick={() => setReportPopupOpen(false)}
          >
            &times;
          </span>
          <h3 className="insider-popup__title">Beitrag melden</h3>
          <p className="insider-popup__text">
            Warum möchten Sie diesen Beitrag melden?
          </p>
          <textarea
            className="insider-popup__textarea"
            placeholder="Grund angeben..."
            value={reportMessage}
            onChange={(e) => setReportMessage(e.target.value)}
          />
          <button
            className="insider-popup__submit"
            onClick={handleReportSubmit}
          >
            Absenden
          </button>
          <div className="insider-popup__message"></div>
        </div>
      )}
    </div>
  );
};

export default UngarnInsiderPage;
