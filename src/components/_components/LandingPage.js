"use client";
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import ImpressumtModal from "../ui/ImpressumModal";
import { commonCardChipData, footerLinks } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import algoliasearch from "algoliasearch/lite";
import { toggleFavorite } from "@/lib/utils/favoritesManager";
import CommonCardChip from "../ui/CommonCardChip";

class ListSearch {
  constructor(config) {
    this.client = algoliasearch(config.appId, config.apiKey);
    this.index = this.client.initIndex(config.indexName);
    this.state = {
      query: "",
      page: 0,
      hitsPerPage: 20,
      postTypeFilter: config.postTypeFilter || null,
    };
    this.searchInput = document.getElementById("search-input");
    this.searchBtn = document.getElementById("search-btn");
    this.resultsContainer = document.getElementById("results-container");
    this.paginationContainer = document.getElementById("pagination-container");
    this.init();
  }
  init() {
    this.searchBtn.addEventListener("click", () => this.performSearch());
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch();
      }
    });

    let debounceTimer;
    this.searchInput.addEventListener("input", (e) => {
      // Clear any pending debounce
      clearTimeout(debounceTimer);

      // Get current query value
      const query = e.target.value;

      // Always update the state with the latest query
      this.state.query = query;

      // Clear results immediately if query is empty
      if (query.trim() === "") {
        this.clearResults();
        return;
      }

      // Debounce the search
      debounceTimer = setTimeout(() => {
        this.state.page = 0;
        this.search();
      }, 300);
    });
  }
  performSearch() {
    this.state.query = this.searchInput.value;
    this.state.page = 0;

    // Handle empty query case
    if (this.state.query.trim() === "") {
      this.clearResults();
      return;
    }

    this.search();
  }
  async search() {
    // If query is empty, clear results and return
    if (this.state.query.trim() === "") {
      this.clearResults();
      return;
    }

    this.showLoading();
    try {
      const searchParams = {
        page: this.state.page,
        hitsPerPage: this.state.hitsPerPage,
        attributesToRetrieve: ["objectID", "post_title", "permalink"],
        attributesToHighlight: ["post_title"],
        highlightPreTag: "<mark>",
        highlightPostTag: "</mark>",
      };
      if (this.state.postTypeFilter) {
        searchParams.filters = `post_type_label:"${this.state.postTypeFilter}"`;
      }
      const response = await this.index.search(this.state.query, searchParams);
      this.renderResults(response.hits);
      this.renderPagination(response);
    } catch (error) {
      console.error("Search error:", error);
      this.showError();
    }
  }

  clearResults() {
    // Clear the results container
    this.resultsContainer.innerHTML = "";
    // Clear pagination
    this.paginationContainer.innerHTML = "";
  }
  showLoading() {
    this.resultsContainer.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>Searching...</p>
      </div>
    `;
  }
  renderResults(hits) {
    if (hits.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="no-results">
          <h3>No results found</h3>
          <p>Try different keywords</p>
        </div>
      `;
      return;
    }
    const html = hits.map((hit) => this.createResultItem(hit)).join("");
    this.resultsContainer.innerHTML = html;
  }
  createResultItem(hit) {
    const title =
      hit._highlightResult?.post_title?.value || hit.post_title || "Untitled";
    const link = hit.permalink || "#";
    return `
      <a href="${link}" class="result-item">
        <div class="result-title">${title}</div>
        <div class="result-meta">${link}</div>
      </a>
    `;
  }
  renderPagination(response) {
    const { page, nbPages } = response;
    if (nbPages <= 1) {
      this.paginationContainer.innerHTML = "";
      return;
    }
    let html = "";
    if (page > 0) {
      html += `<button class="pagination-btn" onclick="listSearch.goToPage(${
        page - 1
      })">← Previous</button>`;
    }
    const maxPages = 7;
    let startPage = Math.max(0, page - Math.floor(maxPages / 2));
    let endPage = Math.min(nbPages, startPage + maxPages);
    if (endPage - startPage < maxPages) {
      startPage = Math.max(0, endPage - maxPages);
    }
    for (let i = startPage; i < endPage; i++) {
      const activeClass = i === page ? "active" : "";
      html += `
        <button
          class="pagination-btn ${activeClass}"
          onclick="listSearch.goToPage(${i})"
          ${i === page ? "disabled" : ""}
        >
          ${i + 1}
        </button>
      `;
    }
    if (page < nbPages - 1) {
      html += `<button class="pagination-btn" onclick="listSearch.goToPage(${
        page + 1
      })">Next →</button>`;
    }
    this.paginationContainer.innerHTML = html;
  }
  goToPage(page) {
    this.state.page = page;
    this.search();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  showError() {
    this.resultsContainer.innerHTML = `
      <div class="no-results">
        <h3>Something went wrong</h3>
        <p>Please try again</p>
      </div>
    `;
  }
}

const LandingPage = () => {
  const [tickerClosed, setTickerClosed] = useState(false);
  const [allowImpressumModal, setAllowImpressumModal] = useState(false);
  const [allowPostSlider, setAllowPostSlider] = useState(false);
  const [postSliderDetails, setPostSliderDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAiBtn, setOpenAiBtn] = useState(false);
  const [listSearchInstance, setListSearchInstance] = useState(null);
  const [postCards, setPostCards] = useState(commonCardChipData);
  const primaryLinks = footerLinks.filter((link) => link.primary);
  const secondaryLinks = footerLinks.filter((link) => !link.primary);
  const handleOpen = () => setOpen(!open);
  const route = useRouter();
  const cardsContainerRef = useRef(null);

  // Helper function to split array into chunks of specified size
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const routerServerGlobal = () => {
    setAllowImpressumModal(true);
    handleOpen();
  };

  useEffect(() => {
    // Check ticker status and reset daily if needed
    resetTickerDaily();

    // Register GSAP ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Card data object for modal content (if needed)
      const cardData = [
        { title: "Zahlentrainer", description: "Übe Zahlen auf Ungarisch" },
        {
          title: "Uhrzeittrainer",
          description: "Lerne die Uhrzeit auf Ungarisch",
        },
        {
          title: "Kulinarische Seele",
          description: "Entdecke die ungarische Küche",
        },
        { title: "Rätsel", description: "Teste dein Wissen mit Rätseln" },
        { title: "Ungarn Insider", description: "Insider-Tipps für Ungarn" },
        {
          title: "Zustand in einem Wort",
          description: "Lerne ungarische Ausdrücke",
        },
        {
          title: "Plural",
          description: "Lerne die Pluralbildung im Ungarischen",
        },
        {
          title: "Makler-Tricks",
          description: "Worauf du bei Maklern achten solltest",
        },
        {
          title: "Aus dem Leben",
          description: "Geschichten aus dem ungarischen Alltag",
        },
        { title: "Itt-Ott", description: "Hier und da in Ungarn" },
      ];

      // Animation for hero section
      gsap
        .timeline()
        .to(".hero-title", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          ".hero-subtitle",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .to(".scroll-indicator", { opacity: 0.7, duration: 1 }, "-=0.3");

      // Add hover buttons to cards
      const cardWrappers = gsap.utils.toArray(".card-wrapper");
      console.log("Initial card wrappers found:", cardWrappers.length);

      cardWrappers.forEach((wrapper, index) => {
        const card = wrapper.querySelector(".card");
        const hoverButtons = document.createElement("div");
        hoverButtons.className = "hover-buttons";

        // Get the route for this card
        const cardRoutes = [
          "/zahlentrainer",
          "/wie-spaet-ist-es",
          "/kulinarische-seele",
          "/kreuzwortraetsel",
          "/wissenswert",
          "/einfach-lesen",
          "/sprachkurs",
          "/wissenswert",
          "/aus-dem-leben",
          "/einfach-lesen",
        ];

        // Check if this route is already favorited
        let isFavorited = false;
        try {
          const existingFavoritesStr =
            localStorage.getItem("favouritePosts") || "[]";
          const existingFavorites = JSON.parse(existingFavoritesStr);
          isFavorited = existingFavorites.some(
            (fav) => fav.route === cardRoutes[index]
          );
        } catch (error) {
          console.error("Error checking favorites:", error);
        }

        // Always use the same icon regardless of favorite status
        hoverButtons.innerHTML = `
          <button class="hover-plus"><img src="/assets/plus-icon.png" alt="+ button" style="width:40px; height:40px;"></button>
          <button class="hover-close"><img src="/assets/x-icon.png" alt="x button" style="width:40px; height:40px;"></button>
        `;
        card.appendChild(hoverButtons);

        const plusBtn = hoverButtons.querySelector(".hover-plus");
        plusBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          // Get the card data to save to favorites
          const cardIndex = Array.from(cardWrappers).indexOf(wrapper);
          const cardData = [
            {
              image: "/assets/tl-Zahlentrainer.avif",
              title: "Zahlentrainer",
              route: "/zahlentrainer",
            },
            {
              image: "/assets/tl-Uhrzeittrainer.avif",
              title: "Uhrzeittrainer",
              route: "/wie-spaet-ist-es",
            },
            {
              image: "/assets/tl-kulinarische-Selle.avif",
              title: "Kulinarische Seele",
              route: "/kulinarische-seele",
            },
            {
              image: "/assets/tl-Raetsel.avif",
              title: "Rätsel",
              route: "/kreuzwortraetsel",
            },
            {
              image: "/assets/tl-Ungarn-Insider.avif",
              title: "Ungarn Insider",
              route: "/wissenswert",
            },
            {
              image: "/assets/tl-Zustand-in-einem-Wort.avif",
              title: "Zustand in einem Wort",
              route: "/einfach-lesen",
            },
            {
              image: "/assets/tl-Plural.avif",
              title: "Plural",
              route: "/sprachkurs",
            },
            {
              image: "/assets/tl-Makler-Tricks.avif",
              title: "Makler Tricks",
              route: "/wissenswert",
            },
            {
              image: "/assets/tl-aus-dem-leben.avif",
              title: "Aus dem Leben",
              route: "/aus-dem-leben",
            },
            {
              image: "/assets/tl-itt-ott.avif",
              title: "Itt-Ott",
              route: "/einfach-lesen",
            },
          ][cardIndex];

          // Use the toggleFavorite utility which will show toasts
          toggleFavorite(cardData.route, cardData.title);
        });

        const closeBtn = hoverButtons.querySelector(".hover-close");
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          // Hide the card with smooth animation
          gsap.to(wrapper, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
              wrapper.style.display = "none";
            },
          });
        });
      });

      // Function to determine start positions for cards
      function getStartPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const startX = Math.random() * (viewportWidth + 800) - 400;
        const startY = viewportHeight + 400;

        return { startX, startY };
      }

      // Load and process card images
      const imagePromises = [];
      cardWrappers.forEach((wrapper) => {
        const imageDiv = wrapper.querySelector(".card-image");
        if (imageDiv) {
          const styleAttr = imageDiv.getAttribute("style");
          const urlMatch = styleAttr
            ? styleAttr.match(/url\(['"]?([^'"]+)['"]?\)/)
            : null;
          if (urlMatch) {
            const url = urlMatch[1];
            imagePromises.push(
              new Promise((resolve) => {
                const img = document.createElement("img");
                img.src = url;
                img.onload = () => {
                  const aspectRatio = img.naturalHeight / img.naturalWidth;
                  const containerWidth = 450;
                  const newHeight = aspectRatio * containerWidth;
                  imageDiv.style.height = `${newHeight}px`;
                  resolve();
                };
                img.onerror = resolve;
              })
            );
          } else {
            // If no image URL found, still resolve the promise
            imagePromises.push(Promise.resolve());
          }
        } else {
          // If no image div found, still resolve the promise
          imagePromises.push(Promise.resolve());
        }
      });

      // If no images to load, add a timeout to ensure DOM is ready
      if (imagePromises.length === 0) {
        imagePromises.push(new Promise((resolve) => setTimeout(resolve, 100)));
      }

      // Set up card animations after images load
      Promise.all(imagePromises)
        .then(() => {
          console.log("Images loaded, setting up card animations");
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const horizontalMargin = 0.06;
          const verticalMargin = 0.02;

          const areaWidth = viewportWidth * (1 - 2 * horizontalMargin);
          const areaHeight = viewportHeight * (1 - 2 * verticalMargin);
          const startAreaX = viewportWidth * horizontalMargin;
          const startAreaY = viewportHeight * verticalMargin;

          const finalPositions = [];
          const minDist = 300;

          // Function to find non-overlapping positions for cards
          function findGoodPosition(cardHeight) {
            const maxX = Math.max(0, areaWidth - 450);
            const maxY = Math.max(0, areaHeight - cardHeight);
            for (let attempts = 0; attempts < 50; attempts++) {
              const x = startAreaX + Math.random() * maxX;
              const y = startAreaY + Math.random() * maxY;
              let tooClose = false;
              for (let pos of finalPositions) {
                const dx = x - pos.x;
                const dy = y - pos.y;
                if (Math.sqrt(dx * dx + dy * dy) < minDist) {
                  tooClose = true;
                  break;
                }
              }
              if (!tooClose) {
                return { x, y };
              }
            }
            return {
              x: startAreaX + Math.random() * Math.max(0, maxX),
              y: startAreaY + Math.random() * Math.max(0, maxY),
            };
          }

          // Re-query card wrappers to ensure we have the latest elements
          const currentCardWrappers =
            document.querySelectorAll(".card-wrapper");
          console.log("Found card wrappers:", currentCardWrappers.length);

          if (currentCardWrappers.length === 0) {
            console.warn("No card wrappers found for animation");
            return;
          }

          // Create scroll-triggered animation timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".content-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
              onUpdate: (self) => {
                console.log("ScrollTrigger progress:", self.progress);
              },
            },
          });

          // Animate each card wrapper
          currentCardWrappers.forEach((wrapper, index) => {
            const cardHeight = wrapper.clientHeight || 400;
            const pos = findGoodPosition(cardHeight);
            finalPositions.push(pos);
            const { startX, startY } = getStartPosition();

            console.log(`Setting up card ${index}:`, {
              startX,
              startY,
              finalPos: pos,
            });

            gsap.set(wrapper, {
              x: startX,
              y: startY,
              opacity: 0,
              zIndex: index + 10,
            });

            tl.to(
              wrapper,
              {
                opacity: 1,
                duration: 2,
                ease: "power2.out",
              },
              index * 1.5
            );

            tl.to(
              wrapper,
              {
                x: pos.x,
                y: pos.y,
                duration: 4,
                ease: "power2.out",
              },
              index * 1.5
            );
          });

          // Refresh ScrollTrigger after setup
          ScrollTrigger.refresh();

          // Add window resize handler
          window.addEventListener("resize", () => {
            ScrollTrigger.refresh();
          });
        })
        .catch((error) => {
          console.error("Error setting up card animations:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (openAiBtn) {
      // Initialize search if it doesn't exist yet or reinitialize it
      const config = {
        appId: "4BNRIJHLXZ",
        apiKey: "0707974c58f2e7c53a70e1e58eeec381",
        indexName: "wp_searchable_posts",
        postTypeFilter: null,
      };

      // Clean up any previous instance
      if (listSearchInstance) {
        // No need to do anything for cleanup with current implementation
      }

      // Initialize new search instance
      const ls = new ListSearch(config);
      window.listSearch = ls;
      setListSearchInstance(ls);
      console.log("List search initialized");

      // Focus on the search input
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    } else {
      // Clean up when search is closed
      if (listSearchInstance) {
        window.listSearch = null;
        setListSearchInstance(null);
      }
    }
  }, [openAiBtn]);

  const handleCloseTicker = () => {
    setTickerClosed(true);
    localStorage.setItem("tickerClosed", "true");
  };

  // Function to reset ticker visibility daily
  const resetTickerDaily = () => {
    if (typeof window !== "undefined") {
      const lastReset = localStorage.getItem("tickerLastReset");
      const today = new Date().toDateString();
      if (lastReset !== today) {
        localStorage.removeItem("tickerClosed");
        localStorage.setItem("tickerLastReset", today);
        setTickerClosed(false);
      } else {
        // Check if ticker was previously closed
        const wasClosed = localStorage.getItem("tickerClosed");
        if (wasClosed === "true") {
          setTickerClosed(true);
        }
      }
    }
  };

  return (
    <div
      className="landing-page__container"
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: "url(/assets/pattern-bg.jpg)",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <style>{`
        .algolia-list-search {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .search-box {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-box input[type="text"] {
          flex-grow: 1;
          padding: 8px;
          font-size: 16px;
        }
        .search-box button {
          padding: 8px 16px;
          font-size: 16px;
        }
        .results-list {
          list-style: none;
          padding: 0;
        }
        .result-item {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #eee;
          text-decoration: none;
          color: #333;
        }
        .result-item:hover {
          background-color: #f5f5f5;
        }
        .result-title {
          font-weight: bold;
        }
        .result-meta {
          color: #666;
          font-size: 14px;
        }
        .pagination-container {
          display: flex;
          gap: 5px;
          justify-content: center;
        }
        .pagination-btn {
          padding: 5px 10px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
        }
        .pagination-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
        .pagination-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .loading, .no-results {
          text-align: center;
          padding: 20px;
        }
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="aiBtn bg-[#4a7c59] rounded-md text-lg text-white hover:bg-[#426e4f]">
        {!openAiBtn && (
          <button
            onClick={() => setOpenAiBtn(true)}
            className="flex items-center gap-2 bg-[#4a7c59] text-white font-bold rounded-md px-4 py-2 shadow-lg hover:bg-[#426e4f] transition"
          >
            AI{" "}
            <Image
              src="/assets/search-icon-white.png"
              alt="AI Icon"
              width={24}
              height={24}
            />
          </button>
        )}

        {openAiBtn && (
          <>
            <div
              className="flex items-center bg-[#4a7c59] rounded-md shadow-lg overflow-hidden"
              style={{ width: "600px" }}
            >
              <div className="relative" style={{ width: "520px" }}>
                <input
                  id="search-input"
                  type="text"
                  placeholder="SCHREIBE HIER WAS DU SUCHST, GERNE AUCH ALS FRAGE"
                  className="px-4 py-2 text-white placeholder-white bg-transparent outline-none"
                  style={{ width: "520px" }}
                  onChange={(e) => {
                    if (listSearchInstance) {
                      // This will trigger the input event listener in the ListSearch class
                      // which handles the debounced search
                    }
                  }}
                />
              </div>
              <button
                id="search-btn"
                className="bg-[#4a7c59] hover:bg-[#426e4f] px-2 py-2 text-white flex-shrink-0"
              >
                <Image
                  src="/assets/search-icon-white.png"
                  alt="Search Icon"
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={() => {
                  // Reset the search when closing
                  if (listSearchInstance) {
                    const searchInput = document.getElementById("search-input");
                    if (searchInput) {
                      searchInput.value = "";
                      // Manually trigger input event to clear results
                      const event = new Event("input", { bubbles: true });
                      searchInput.dispatchEvent(event);
                    }
                    listSearchInstance.clearResults();
                  }
                  setOpenAiBtn(false);
                }}
                className="bg-[#4a7c59] hover:bg-[#426e4f] px-3 py-2 text-white flex-shrink-0"
              >
                ✕
              </button>
            </div>
            <div
              id="results-container"
              className="results-list bg-white p-4 rounded-md mt-4"
              style={{ width: "600px" }}
            ></div>
            <div
              id="pagination-container"
              className="pagination-container"
            ></div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <nav className="sidebar">
        {[
          {
            title: "Information",
            text: "alles über Ungarn",
            slug: "information",
            menu: [
              {
                menuName: "WISSEENWERT",
                menuRoute: "/wissenswert",
              },
              // {
              //   menuName: "SHORTS",
              //   menuRoute: "/shorts",
              // },
              {
                menuName: "KATEGORIEN",
                menuRoute: "/kategorien",
              },
            ],
          },
          {
            title: "Sprache",
            text: "einfach lernen",
            slug: "sprache",
            menu: [
              {
                menuName: "GRAMMATIKKURS",
                menuRoute: "/sprachkurs",
              },
              {
                menuName: "Kreuzworträtsel",
                menuRoute: "/kreuzwortraetsel",
              },
              // {
              //   menuName: "Ungarisch-Impulse",
              //   menuRoute: "/ungarisch-impulse",
              // },
              {
                menuName: "SuffixHero",
                menuRoute: "/suffixhero",
              },
              // {
              //   menuName: "Zahlentrainer",
              //   menuRoute: "/zahlentrainer",
              // },
              {
                menuName: "memória",
                menuRoute: "/memoria",
              },
              {
                menuName: "Vokabel-Aufkleber",
                menuRoute: "/vokabel-aufkleber",
              },
              {
                menuName: "LIEDTEXTE",
                menuRoute: "/liedtexte",
              },
              // {
              //   menuName: "KulTour Ungarn",
              //   menuRoute: "/kultour-ungarn",
              // },
              // {
              //   menuName: "Vokabel-Entdecker",
              //   menuRoute: "/ungarisch-lernen/vokabel-entdecker",
              // },
              {
                menuName: "aus dem Leben",
                menuRoute: "/aus-dem-leben",
              },
              {
                menuName: "EINFACH LESEN",
                menuRoute: "/einfach-lesen",
              },
              {
                menuName: "Wie spät ist es?",
                menuRoute: "/wie-spaet-ist-es",
              },
              // {
              //   menuName: "Verbarium",
              //   menuRoute: "/verbarium",
              // },
              {
                menuName: "Ungarisch lernen",
                menuRoute: "/ungarisch-lernen",
              },
              {
                menuName: "Zahlentrainer",
                menuRoute: "/zahlentrainer",
              },
              {
                menuName: "Kultour ungarn",
                menuRoute: "/kultour-ungarn",
              },
              // {
              //   menuName: "Anki-karten",
              //   menuRoute: "/anki-karten",
              // },
            ],
          },
          {
            title: "Ungarn",
            text: "Land & Leute",
            slug: "ungarn",
            menu: [
              // {
              //   menuName: "Land & Leute",
              //   menuRoute: "/land-leute",
              // },
              {
                menuName: "Ungarn-insider",
                menuRoute: "insider_custom",
              },
              {
                menuName: "kulinarische Seele",
                menuRoute: "/kulinarische-seele",
              },
              {
                menuName: "AUSFLUGSZIELE",
                menuRoute: "/ausflugsziele",
              },
              {
                menuName: "Veranstaltungskalender",
                menuRoute: "/veranstaltungen",
              },
            ],
          },
          {
            title: "Community",
            text: "Gemeinsam",
            slug: "community",
            menu: [
              // {
              //   menuName: "Gemeinsam",
              //   menuRoute: "/gemeinsam",
              // },
            ],
          },
        ].map((item, i) => (
          <div key={i} className="nav-item">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.slug !== "community" && (
              <div className="hover-menu">
                {chunkArray(item.menu, 6).map((column, columnIndex) => (
                  <div key={columnIndex} className="menu-column">
                    {column.map((menuItem, j) => (
                      <div
                        key={j}
                        className="menu-item cursor-pointer"
                        {...(menuItem.menuRoute === "insider_custom"
                          ? { onClick: routerServerGlobal }
                          : { onClick: () => route.push(menuItem.menuRoute) })}
                      >
                        {item.slug === "sprache"
                          ? menuItem.menuName
                          : menuItem.menuName}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Cards */}
      {/* <div>
        <div className="cards cursor-pointer" onClick={routerServerGlobal}>
          Cards will go here...
        </div>
      </div> */}

      <div className="hero-section">
        <div className="panel">
          <h1 className="top-text">Schön, dass du hier bist bei</h1>

          <div className="hero_logo">
            <img src="/assets/WIU-logo.png" alt="Main Logo" />
            <div className="clearfix"></div>
          </div>
          <div className="clearfix"></div>

          <p className="subtitle">
            Entdecke einen Stapel voller Inspiration und Wissen und viele
            Themen, die deinen Alltag in Ungarn bereichern werden. Scrolle
            einfach nach unten und lass dich überraschen. Oder nutze
            traditionell die Navigation hier links.
          </p>

          <p className="body-text">
            Jede Karte ist ein eigenes Thema – klicke sie an um die Inhalte dazu
            aufzurufen. Mit dem <span className="x_icon"></span> blendest du
            aus, was du schon kennst oder Dich nicht interessiert und mit dem{" "}
            <span className="plus_icon"></span> bekommst Du mehr aus diesem
            Themenbereich. Und wenn du etwas ganz Bestimmtes wissen möchtest:
            Die Suche oben rechts beantwortet dir auch komplette Fragen.
          </p>
        </div>
      </div>

      <div
        className="cards-container"
        id="cardsContainer"
        ref={cardsContainerRef}
      >
        {postCards.map((card, index) => (
          <div key={index} className="card-wrapper">
            <div
              className="card"
              onClick={() => {
                if (allowImpressumModal === true) {
                  setAllowImpressumModal(false);
                }
                setAllowPostSlider(true);
                setPostSliderDetails(card);
                handleOpen();
                //   const modal = document.getElementById("modal");
                //   document.getElementById(
                //     "modalTitle"
                //   ).textContent = `${card.title}`;
                //   document.getElementById(
                //     "modalText"
                //   ).textContent = `Klicken Sie auf "Zur Seite", um mehr über ${card.title} zu erfahren.`;
                //   // Add a button to navigate to the page
                //   const buttonContainer =
                //     modal.querySelector(".modal-content div");
                //   if (buttonContainer) {
                //     // Clear existing buttons first
                //     const existingNavigateBtn =
                //       buttonContainer.querySelector(".navigate-btn");
                //     if (existingNavigateBtn) {
                //       existingNavigateBtn.remove();
                //     }
                //     // Create and add the navigation button
                //     const navigateBtn = document.createElement("button");
                //     navigateBtn.className = "close-modal navigate-btn";
                //     navigateBtn.style.backgroundColor = "#4a7c59";
                //     navigateBtn.textContent = "Zur Seite";
                //     navigateBtn.onclick = () => {
                //       route.push(card.route);
                //     };
                //     buttonContainer.appendChild(navigateBtn);
                //   }
                //   modal.style.display = "flex";
              }}
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url('${card.image}')` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="content-section"
        style={{ minHeight: "300vh", position: "relative", zIndex: 2 }}
      ></div>

      {/* Modal for card details */}
      <div className="modal" id="modal" style={{ display: "none" }}>
        <div className="modal-content">
          <h2
            id="modalTitle"
            style={{
              color: "#4a7c59",
              fontFamily: "'Roboto Condensed', sans-serif",
              marginBottom: "15px",
            }}
          >
            Card Title
          </h2>
          <p
            id="modalText"
            style={{
              marginBottom: "20px",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            Card details will appear here
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button
              className="close-modal"
              onClick={() => {
                document.getElementById("modal").style.display = "none";
              }}
              style={{ backgroundColor: "#4a7c59", marginRight: "10px" }}
            >
              Schließen
            </button>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="main-logo">
        <img src="/assets/WIU-logo.png" alt="Wir In Ungarn Logo" />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* Ticker */}
          {!tickerClosed && (
            <div
              className="ticker-container"
              style={{
                margin: "0",
                outline: "5px solid #ffffff",
              }}
            >
              <div className="ticker-label">UNGARN-INSIDER</div>
              <div className="ticker-content">
                <div className="ticker-wrapper">
                  {[
                    "Neue Soros-Netzwerk Enthüllungen",
                    "300% Preisunterschied: Warenkorb im Europa-Vergleich",
                    "Streit um Smalltalk: Was Ungarn wirklich denken",
                    "EU-Kommission kritisiert ungarische Mediengesetze",
                    "Budapest: Neue Entwicklungen am Immobilienmarkt",
                  ].map((news, i, arr) => (
                    <React.Fragment key={i}>
                      <span className="ticker-item">
                        <a href="#" className="news-link">
                          {news}
                        </a>
                      </span>
                      {i < arr.length - 1 && (
                        <span className="ticker-separator">|</span>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Duplicate for smooth scroll */}
                  {[
                    "Neue Soros-Netzwerk Enthüllungen",
                    "300% Preisunterschied: Warenkorb im Europa-Vergleich",
                    "Streit um Smalltalk: Was Ungarn wirklich denken",
                    "EU-Kommission kritisiert ungarische Mediengesetze",
                    "Budapest: Neue Entwicklungen am Immobilienmarkt",
                  ].map((news, i, arr) => (
                    <React.Fragment key={"dup-" + i}>
                      <span className="ticker-item">
                        <a href="#" className="news-link">
                          {news}
                        </a>
                      </span>
                      {i < arr.length - 1 && (
                        <span className="ticker-separator">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button
                className="close-button"
                onClick={handleCloseTicker}
                aria-label="Schließen"
              >
                ✕
              </button>
            </div>
          )}

          {/* <div>
            <div className="cards cursor-pointer" onClick={routerServerGlobal}>
              Cards will go here...
            </div>
          </div> */}

          {/* Footer Links */}

          <div className="relative">
            {/* Main Footer Links */}
            <div className="bg-[#4a7c59] p-3 rounded-lg border-[5px] border-white shadow-lg">
              <div className="flex flex-wrap items-center">
                {primaryLinks.map((link, index) => (
                  <React.Fragment key={link.key}>
                    <Link
                      href={link.endpoint}
                      className="text-white hover:text-gray-200 transition-colors text-sm font-medium px-1 whitespace-nowrap"
                    >
                      {link.title}
                    </Link>
                    {index < primaryLinks.length - 1 && (
                      <span className="text-white">|</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-white">|</span>

                {/* More Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-gray-200 transition-colors text-sm font-medium flex items-center gap-1 px-1"
                  >
                    more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                      />

                      {/* Menu */}
                      <div className="absolute bottom-full right-0 mb-2 bg-[#e3e3e3] rounded-lg shadow-xl border-[3px] border-white py-2 min-w-[220px] z-20">
                        {secondaryLinks.map((link) => (
                          <Link
                            key={link.key}
                            href={link.endpoint}
                            className="block px-4 py-2.5 text-sm font-semibold hover:bg-[#d2d0d0] transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {allowPostSlider && (
        <CommonCardChip
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          postDetails={postSliderDetails}
        />
      )}

      {/* Impressum Modal */}
      {allowImpressumModal && (
        <ImpressumtModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
        />
      )}
    </div>
  );
};

export default LandingPage;
