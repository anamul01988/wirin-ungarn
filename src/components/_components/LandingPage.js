"use client";
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import ImpressumtModal from "../ui/ImpressumModal";
import { footerLinks, landingCards } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import algoliasearch from "algoliasearch/lite";
import { toggleFavorite, getAllFavorites } from "@/lib/utils/favoritesManager";
import CommonCardChip from "../ui/CommonCardChip";

class ListSearch {
  constructor(config, mobileMode = false) {
    this.client = algoliasearch(config.appId, config.apiKey);
    this.index = this.client.initIndex(config.indexName);
    this.state = {
      query: "",
      page: 0,
      hitsPerPage: 20,
      postTypeFilter: config.postTypeFilter || null,
    };
    this.mobileMode = mobileMode;
    this.searchInput = mobileMode
      ? document.getElementById("mobile-search-input")
      : document.getElementById("search-input");
    this.searchBtn = mobileMode ? null : document.getElementById("search-btn");
    this.resultsContainer = mobileMode
      ? document.getElementById("mobile-results-container")
      : document.getElementById("results-container");
    this.paginationContainer = mobileMode
      ? null
      : document.getElementById("pagination-container");
    this.init();
  }
  init() {
    if (this.searchBtn) {
      this.searchBtn.addEventListener("click", () => this.performSearch());
    }

    if (this.searchInput) {
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
  }
  performSearch() {
    if (this.searchInput) {
      this.state.query = this.searchInput.value;
    }
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
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = "";
    }
    // Clear pagination
    if (this.paginationContainer) {
      this.paginationContainer.innerHTML = "";
    }
  }
  showLoading() {
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = `
        <div class="loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px;">
          <img src="/assets/loader.gif" alt="Loading..." width="80" height="80" />
          <p style="margin-top: 16px; color: #666;">Searching...</p>
        </div>
      `;
    }
  }
  renderResults(hits) {
    if (!this.resultsContainer) return;

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
    if (!this.paginationContainer) return;

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
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = `
        <div class="no-results">
          <h3>Something went wrong</h3>
          <p>Please try again</p>
        </div>
      `;
    }
  }
}

const LandingPage = () => {
  const [tickerClosed, setTickerClosed] = useState(false);
  const [allowImpressumModal, setAllowImpressumModal] = useState(false);
  const [postCards, setPostCards] = useState(landingCards);
  const [allowPostSlider, setAllowPostSlider] = useState(false);
  const [postSliderDetails, setPostSliderDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAiBtn, setOpenAiBtn] = useState(false);
  const [listSearchInstance, setListSearchInstance] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [activeFooterMenu, setActiveFooterMenu] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileFavorites, setMobileFavorites] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [activeDetailPopup, setActiveDetailPopup] = useState(null);
  const [filterBarActive, setFilterBarActive] = useState(false);
  const [filterTags, setFilterTags] = useState([
    "Sprache",
    "Uhrzeit",
    "Zahlen",
  ]);

  const primaryLinks = footerLinks.filter((link) => link.primary);
  const secondaryLinks = footerLinks.filter((link) => !link.primary);
  const [visibleLinks, setVisibleLinks] = useState([...footerLinks]);
  const [hiddenLinks, setHiddenLinks] = useState([]);
  const footerContainerRef = useRef(null);
  const footerLinksRef = useRef([]);
  const handleOpen = () => setOpen(!open);
  const route = useRouter();
  const cardsContainerRef = useRef(null);
  const cardStackRef = useRef(null);

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

  // Dynamic footer links calculation
  useEffect(() => {
    const calculateVisibleLinks = () => {
      if (!footerContainerRef.current) return;

      const container = footerContainerRef.current;
      const containerWidth = container.offsetWidth;
      const moreButtonWidth = 80; // Approximate width for "more" button
      const gap = 8; // Gap between items
      let availableWidth = containerWidth - moreButtonWidth - gap * 2;

      const allLinks = [...footerLinks];
      const visible = [];
      const hidden = [];

      // Calculate actual font size from clamp
      const viewportWidth = window.innerWidth;
      const vwValue = viewportWidth * 0.0073; // 0.73vw
      const fontSize = Math.max(11, Math.min(vwValue, 16));

      // Temporarily measure each link
      let accumulatedWidth = 0;

      allLinks.forEach((link, index) => {
        // Create temporary element to measure with actual computed font size
        const tempElement = document.createElement("span");
        tempElement.style.cssText = `
          position: absolute;
          visibility: hidden;
          white-space: nowrap;
          font-size: ${fontSize}px;
          font-family: "Roboto Condensed", sans-serif;
          padding: 0px 5px;
        `;
        tempElement.textContent = link.title;
        document.body.appendChild(tempElement);
        const linkWidth = tempElement.offsetWidth;
        document.body.removeChild(tempElement);

        if (accumulatedWidth + linkWidth + gap <= availableWidth) {
          visible.push(link);
          accumulatedWidth += linkWidth + gap;
        } else {
          hidden.push(link);
        }
      });

      setVisibleLinks(visible);
      setHiddenLinks(hidden);
    };

    // Small delay to ensure container is properly sized
    const timeoutId = setTimeout(() => {
      calculateVisibleLinks();
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleLinks();
    });

    if (footerContainerRef.current) {
      resizeObserver.observe(footerContainerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // Check ticker status and reset daily if needed
    resetTickerDaily();

    // Zoom detection
    let initialZoom = window.devicePixelRatio;
    let zoomTimeout;

    const handleZoomDetection = () => {
      const currentZoom = window.devicePixelRatio;

      if (Math.abs(currentZoom - initialZoom) > 0.1) {
        const toast = document.getElementById("zoomToast");
        if (toast) {
          toast.classList.add("show");

          clearTimeout(zoomTimeout);
          zoomTimeout = setTimeout(() => {
            toast.classList.remove("show");
          }, 4000);
        }
      }
    };

    window.addEventListener("resize", handleZoomDetection);

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

      // Fade out panel on scroll
      gsap.to(".panel", {
        opacity: 0.3,
        scrollTrigger: {
          trigger: ".content-section",
          start: "top bottom",
          end: "top+=800 bottom",
          scrub: 2,
        },
      });

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
                  // Get actual container width from wrapper element
                  const containerWidth = wrapper.offsetWidth || 450;
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
          // Make minimum distance responsive based on viewport width
          const minDist = Math.max(150, viewportWidth * 0.15);

          // Function to find non-overlapping positions for cards
          function findGoodPosition(cardHeight, cardWidth) {
            const maxX = Math.max(0, areaWidth - cardWidth);
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
            const cardWidth = wrapper.clientWidth || 450;
            const pos = findGoodPosition(cardHeight, cardWidth);
            finalPositions.push(pos);
            const { startX, startY } = getStartPosition();

            console.log(`Setting up card ${index}:`, {
              startX,
              startY,
              finalPos: pos,
              cardWidth,
              cardHeight,
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

          // Add window resize handler to recalculate card dimensions
          let resizeTimeout;
          window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
              // Recalculate card image heights on resize
              const allCardWrappers =
                document.querySelectorAll(".card-wrapper");
              allCardWrappers.forEach((wrapper) => {
                const imageDiv = wrapper.querySelector(".card-image");
                if (imageDiv) {
                  const styleAttr = imageDiv.getAttribute("style");
                  const urlMatch = styleAttr
                    ? styleAttr.match(/url\(['"]?([^'"]+)['"]?\)/)
                    : null;
                  if (urlMatch) {
                    const img = new Image();
                    img.src = urlMatch[1];
                    img.onload = () => {
                      const aspectRatio = img.naturalHeight / img.naturalWidth;
                      const containerWidth = wrapper.offsetWidth || 450;
                      const newHeight = aspectRatio * containerWidth;
                      imageDiv.style.height = `${newHeight}px`;
                    };
                  }
                }
              });
              ScrollTrigger.refresh();
            }, 250);
          });
        })
        .catch((error) => {
          console.error("Error setting up card animations:", error);
        });
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleZoomDetection);
    };
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

  // Initialize mobile search when search bar is active
  useEffect(() => {
    if (searchBarActive && typeof window !== "undefined") {
      // Small delay to ensure DOM elements are ready
      setTimeout(() => {
        const searchInput = document.getElementById("mobile-search-input");
        const resultsContainer = document.getElementById(
          "mobile-results-container"
        );

        if (searchInput && resultsContainer) {
          const config = {
            appId: "4BNRIJHLXZ",
            apiKey: "0707974c58f2e7c53a70e1e58eeec381",
            indexName: "wp_searchable_posts",
            postTypeFilter: null,
          };

          try {
            const ls = new ListSearch(config, true); // Pass true for mobile mode
            window.mobileListSearch = ls;
            console.log("Mobile List search initialized");

            // Focus on the mobile search input
            searchInput.focus();
          } catch (error) {
            console.error("Error initializing mobile search:", error);
          }
        }
      }, 100);
    }

    return () => {
      // Clean up on unmount
      if (window.mobileListSearch) {
        window.mobileListSearch = null;
      }
    };
  }, [searchBarActive]);

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

  // Popup Functions
  const openPopup = (popupId) => {
    setActivePopup(popupId);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeAllPopups = () => {
    setActivePopup(null);
    setActiveDetailPopup(null);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  const openDetailPopup = (detailPopupId) => {
    setActiveDetailPopup(detailPopupId);
  };

  const closeDetailPopup = () => {
    setActiveDetailPopup(null);
  };

  // Filter Bar Functions
  const openFilterBar = (tag = null) => {
    setFilterBarActive(true);
    if (tag && !filterTags.includes(tag)) {
      setFilterTags([...filterTags, tag]);
    }
  };

  const closeFilterBar = () => {
    setFilterBarActive(false);
  };

  const removeTag = (tagToRemove) => {
    setFilterTags(filterTags.filter((tag) => tag !== tagToRemove));
  };

  // Handle Escape key to close popups
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && (activePopup || activeDetailPopup)) {
        closeAllPopups();
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [activePopup, activeDetailPopup]);

  // Load favorites for mobile dropdown
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = getAllFavorites();
      setMobileFavorites(savedFavorites);
    };

    loadFavorites();

    // Add event listener to update favorites when storage changes
    window.addEventListener("storage", loadFavorites);
    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  const scrollbarContainerRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const arrowUpRef = useRef(null);
  const arrowDownRef = useRef(null);

  // Custom Scrollbar implementation
  useEffect(() => {
    const scrollbarContainer = scrollbarContainerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const arrowUp = arrowUpRef.current;
    const arrowDown = arrowDownRef.current;

    if (!scrollbarContainer || !track || !thumb || !arrowUp || !arrowDown)
      return;

    let isDragging = false;
    let startY = 0;
    let startTop = 0;

    const updateScrollbar = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (documentHeight <= viewportHeight) {
        scrollbarContainer.classList.add("hidden");
        return;
      }
      scrollbarContainer.classList.remove("hidden");
    };

    const updateThumbPosition = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight - viewportHeight;

      if (maxScroll <= 0) return;

      const scrollPercent = scrollTop / maxScroll;
      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      const thumbTop = scrollPercent * maxThumbTop;

      thumb.style.top = thumbTop + "px";
      track.setAttribute("aria-valuenow", Math.round(scrollPercent * 100));
    };

    const scrollByPercent = (percent) => {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight - viewportHeight;

      if (maxScroll <= 0) return;

      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollAmount = (maxScroll * percent) / 100;
      const newScrollTop = Math.max(
        0,
        Math.min(currentScroll + scrollAmount, maxScroll)
      );

      window.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
    };

    const startDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();

      isDragging = true;
      thumb.classList.add("dragging");

      const clientY = e.type.includes("touch")
        ? e.touches[0].clientY
        : e.clientY;
      const thumbRect = thumb.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();

      startY = clientY;
      startTop = thumbRect.top - trackRect.top;

      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    };

    const drag = (e) => {
      if (!isDragging) return;

      e.preventDefault();

      const clientY = e.type.includes("touch")
        ? e.touches[0].clientY
        : e.clientY;
      const deltaY = clientY - startY;

      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      let newThumbTop = startTop + deltaY;
      newThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbTop));

      thumb.style.top = newThumbTop + "px";

      const scrollPercent = newThumbTop / maxThumbTop;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight - viewportHeight;
      const newScrollTop = scrollPercent * maxScroll;

      window.scrollTo({
        top: newScrollTop,
        behavior: "auto",
      });
    };

    const stopDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      thumb.classList.remove("dragging");
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    const trackClick = (e) => {
      if (e.target === thumb || thumb.contains(e.target)) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const clickY = e.clientY - trackRect.top;
      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      let newThumbTop = clickY - thumbHeight / 2;
      newThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbTop));

      const scrollPercent = newThumbTop / maxThumbTop;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight - viewportHeight;
      const newScrollTop = scrollPercent * maxScroll;

      window.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
    };

    // Event listeners
    arrowUp.addEventListener("click", (e) => {
      e.preventDefault();
      scrollByPercent(-10);
    });

    arrowDown.addEventListener("click", (e) => {
      e.preventDefault();
      scrollByPercent(10);
    });

    thumb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollByPercent(-5);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollByPercent(5);
      } else if (e.key === "PageUp") {
        e.preventDefault();
        scrollByPercent(-25);
      } else if (e.key === "PageDown") {
        e.preventDefault();
        scrollByPercent(25);
      } else if (e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    });

    thumb.addEventListener("mousedown", (e) => startDrag(e));
    thumb.addEventListener("touchstart", (e) => startDrag(e));
    document.addEventListener("mousemove", (e) => drag(e));
    document.addEventListener("touchmove", (e) => drag(e));
    document.addEventListener("mouseup", () => stopDrag());
    document.addEventListener("touchend", () => stopDrag());
    track.addEventListener("click", (e) => trackClick(e));

    let scrollTimeout;
    const handleScroll = () => {
      if (!isDragging) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          updateThumbPosition();
        }, 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      updateScrollbar();
      updateThumbPosition();
    });

    updateScrollbar();
    updateThumbPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => {
        updateScrollbar();
        updateThumbPosition();
      });
      thumb.removeEventListener("mousedown", startDrag);
      thumb.removeEventListener("touchstart", startDrag);
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("touchmove", drag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
      track.removeEventListener("click", trackClick);
    };
  }, []);

  // Mobile Card Stack Swipe Functionality
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cardStack = cardStackRef.current;
    if (!cardStack) return;

    const cards = Array.from(cardStack.querySelectorAll(".mobile-card"));
    if (cards.length === 0) return;

    const totalCards = 15; // Updated to 15 cards
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let touchStartTime = 0;

    // Card URL mappings
    const cardUrls = {
      2: "/anki-karten/", // Label-03
      4: "/aus-dem-leben/", // Label-05
      7: "/kreuzwortraetsel/", // Label-08
      8: "/suffixhero/", // Label-09
      9: "/kulinarische-seele/", // Label-10
      10: "/vokabel-aufkleber/", // Label-11
      13: "/memoria/", // Label-14
      14: "/wie-spaet-ist-es/", // Label-15
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      currentX = startX;
      currentY = startY;
      isDragging = false;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;

      const touch = e.touches[0];
      currentX = touch.clientX;
      currentY = touch.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      // Only start dragging if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isDragging = true;
        e.preventDefault();

        const activeCard = cards[currentCardIndex];
        const leftIndicator = document.getElementById("swipeLeft");
        const rightIndicator = document.getElementById("swipeRight");

        if (activeCard) {
          const rotation = deltaX * 0.05;
          gsap.set(activeCard, {
            x: deltaX,
            rotation: rotation,
          });

          // Show swipe indicators
          if (leftIndicator && rightIndicator) {
            if (deltaX < -50) {
              leftIndicator.style.opacity = Math.min(Math.abs(deltaX) / 200, 1);
              rightIndicator.style.opacity = 0;
            } else if (deltaX > 50) {
              rightIndicator.style.opacity = Math.min(deltaX / 200, 1);
              leftIndicator.style.opacity = 0;
            } else {
              leftIndicator.style.opacity = 0;
              rightIndicator.style.opacity = 0;
            }
          }
        }
      }
    };

    const handleTouchEnd = (e) => {
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime;
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      const activeCard = cards[currentCardIndex];
      const leftIndicator = document.getElementById("swipeLeft");
      const rightIndicator = document.getElementById("swipeRight");

      if (!activeCard) return;

      // Hide indicators
      if (leftIndicator) leftIndicator.style.opacity = 0;
      if (rightIndicator) rightIndicator.style.opacity = 0;

      // Check if it's a click (not a drag)
      const isClick =
        !isDragging &&
        touchDuration < 300 &&
        Math.abs(deltaX) < 10 &&
        Math.abs(deltaY) < 10;

      if (isClick) {
        // Navigate to URL if this card has one
        const url = cardUrls[currentCardIndex];
        if (url) {
          route.push(url);
        }
        return;
      }

      if (!isDragging) return;

      // Swipe threshold
      const threshold = 100;

      if (Math.abs(deltaX) > threshold) {
        // Card swiped off screen
        const direction = deltaX > 0 ? 1 : -1;
        const exitX = direction * (window.innerWidth + 200);

        gsap.to(activeCard, {
          x: exitX,
          rotation: direction * 45,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            // Move to next card
            const nextIndex = (currentCardIndex + 1) % totalCards;
            setCurrentCardIndex(nextIndex);

            // Reset the swiped card
            gsap.set(activeCard, {
              x: 0,
              rotation: 0,
              opacity: 1,
            });

            // Update card classes
            cards.forEach((card, index) => {
              card.classList.remove("active", "next", "hidden");

              if (index === nextIndex) {
                card.classList.add("active");
              } else if (index === (nextIndex + 1) % cards.length) {
                card.classList.add("next");
              } else {
                card.classList.add("hidden");
              }
            });
          },
        });
      } else {
        // Snap back to center
        gsap.to(activeCard, {
          x: 0,
          rotation: 0,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      }

      isDragging = false;
    };

    // Add event listeners to the card stack
    cardStack.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    cardStack.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    cardStack.addEventListener("touchend", handleTouchEnd, { passive: false });

    // Cleanup
    return () => {
      cardStack.removeEventListener("touchstart", handleTouchStart);
      cardStack.removeEventListener("touchmove", handleTouchMove);
      cardStack.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentCardIndex]);

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
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-logo">
          <img
            src="/assets/WIU-logo.png"
            alt="Wir in Ungarn"
            style={{ width: "200px" }}
          />
        </div>
        <div className="mobile-icons">
          <img
            src="/assets/icons/search-icon.jpeg"
            alt="Search"
            className="search-icon"
            onClick={() => setSearchBarActive(!searchBarActive)}
            style={{ cursor: "pointer", width: "25px", height: "25px" }}
          />

          <img
            src="/assets/icons/hamberger-menu.jpeg"
            alt="Menu"
            className="mobile-menu-btn"
            onClick={() => {
              // Toggle mobile menu to show footer navigation
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{ cursor: "pointer", width: "25px", height: "25px" }}
          />
        </div>

        <div className={`search-bar ${searchBarActive ? "active" : ""}`}>
          <input
            type="text"
            placeholder="Suchen..."
            id="mobile-search-input"
            autoComplete="off"
          />
          <div
            id="mobile-results-container"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          ></div>
        </div>

        {/* Mobile Favorites Dropdown */}
        <div
          className={`mobile-favorites-dropdown ${
            showFavorites ? "active" : ""
          }`}
        >
          {mobileFavorites.length > 0 ? (
            <ul>
              {mobileFavorites.map((favorite, index) => (
                <li
                  key={index}
                  onClick={() => {
                    route.push(favorite.route);
                    setShowFavorites(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {favorite.title.length > 20
                    ? favorite.title.substring(0, 20) + "..."
                    : favorite.title}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", padding: "10px", color: "#666" }}>
              Keine Favoriten
            </p>
          )}
        </div>
      </header>

      {/* Overlay & Slide Menu */}
      <div
        className={`overlay ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      <nav className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <div
          className="menu-close"
          onClick={() => setMobileMenuOpen(false)}
          style={{ cursor: "pointer", fontSize: "24px", textAlign: "right" }}
        >
          ✕
        </div>
        <Link href="/posts/">Neueste Beiträge</Link>
        <Link href="/philosophie/">Philosophie</Link>
        <Link href="/ueber-uns/">Über uns</Link>
        <Link href="/kontakt/">Kontakt</Link>
        <Link href="/impressum/">Impressum</Link>
        <Link href="/datenschutz/">Datenschutz</Link>
      </nav>

      <style>{`
        /* Zoom Toast Notification */
        .zoom-toast {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #c41e3a;
            color: white;
            padding: 20px 40px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            display: none;
            text-align: center;
            outline: 5px solid #ffffff;
            font-family: "Open Sans", sans-serif;
        }

        .zoom-toast.show {
            display: block;
            animation: toastFade 0.3s ease;
        }

        @keyframes toastFade {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        @media screen and (max-width: 1170px) {
    .panel {
        max-width: 760px;
    }
}

        /* Custom Scrollbar Container */
        .scrollbar-container {
            position: fixed;
            right: 20px;
            top: 28%;
            bottom: 12%;
            width: 30px;
            display: flex;
            flex-direction: column;
            z-index: 1000;
        }

        /* Arrow Buttons */
        .arrow-button {
            width: 30px;
            height: 30px;
            background: #2c2c2c;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            z-index: 5;
            transition: background 0.2s;
            border: none;
        }
        
        .arrow-button:hover {
            background: #3c3c3c;
        }

        .arrow-button:active {
            background: #1c1c1c;
        }

        .arrow-button:focus {
            outline: 2px solid #4a7c59;
            outline-offset: 2px;
        }

        .arrow-button.up {
            border-radius: 12px 12px 0 0;
        }

        .arrow-button.down {
            border-radius: 0 0 12px 12px;
        }

        /* Arrow Icons */
        .arrow-icon {
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }

        .arrow-icon.up {
            border-bottom: 8px solid #ffffff;
        }

        .arrow-icon.down {
            border-top: 8px solid #ffffff;
        }

        .arrow-button:hover .arrow-icon.up {
            border-bottom-color: #4a7c59;
        }

        .arrow-button:hover .arrow-icon.down {
            border-top-color: #c41e3a;
        }

        @media screen and (max-width: 1290px) {
            .arrow-button {
                width: 22px !important;
                height: 30px !important;
            }

            .scrollbar-container {
                width: 30px !important;
            }

            .scrollbar-track {
                width: 22px !important;
            }

            .scrollbar-thumb {
                width: 35px !important;
                min-height: 35px !important;
            }

            .header-btn {
                padding-bottom: 8px;
            }

            .scrollbar-container {
                top: 26% !important;
                bottom: 14% !important;
            }
        }

        @media (max-width: 768px) {
          .scrollbar-container {
            display: none !important;
          }
        }

        /* Scrollbar Track */
        .scrollbar-track {
            flex: 1;
            width: 30px;
            background: #ffffff;
            border-left: 3px solid #2c2c2c;
            border-right: 3px solid #2c2c2c;
            position: relative;
            cursor: pointer;
            box-shadow: 
                inset 0 2px 4px rgba(0, 0, 0, 0.1),
                0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: visible;
        }

        /* Scrollbar Thumb with Image - Wider than track */
        .scrollbar-thumb {
            position: absolute;
            width: 50px;
            min-height: 50px;
            cursor: grab;
            left: 50%;
            transform: translateX(-50%);
            transition: opacity 0.2s;
            background-image: url(/assets/sliderbutton.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 10;
        }

        .scrollbar-thumb:hover {
            opacity: 1;
        }

        .scrollbar-thumb:active {
            cursor: grabbing;
        }

        .scrollbar-thumb.dragging {
            cursor: grabbing;
            opacity: 1;
        }

        /* Hide scrollbar when content doesn't overflow */
        .scrollbar-container.hidden {
            display: none;
        }

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
        
        /* Mobile search results styling */
        #mobile-results-container {
          border: 2px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        #mobile-results-container .result-item {
          display: block;
          padding: 12px;
          border-bottom: 1px solid #eee;
          text-decoration: none;
          color: #333;
          transition: background-color 0.2s;
        }
        
        #mobile-results-container .result-item:hover {
          background-color: #f5f5f5;
        }
        
        #mobile-results-container .result-item:last-child {
          border-bottom: none;
        }
        
        #mobile-results-container .result-title {
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        #mobile-results-container .result-meta {
          color: #666;
          font-size: 12px;
        }
        
        #mobile-results-container .loading,
        #mobile-results-container .no-results {
          text-align: center;
          padding: 20px;
          color: #666;
        }
        
        #mobile-results-container .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #4a7c59;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
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
              loading="lazy"
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
                  loading="lazy"
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
      <nav className="sidebar" aria-label="Hauptnavigation">
        <ul>
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
                {
                  menuName: "Kurz und knapp",
                  menuRoute: "/kurz-und-knapp",
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
                {
                  menuName: "Ungarisch-Impulse",
                  menuRoute: "/ungarisch-impulse",
                },
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
                {
                  menuName: "Vokabel-Entdecker",
                  menuRoute: "/ungarisch-lernen/vokabel-entdecker",
                },
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
                {
                  menuName: "Verbarium",
                  menuRoute: "/verbarium",
                },
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
                {
                  menuName: "Anki-karten",
                  menuRoute: "/anki-karten",
                },
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
                // {
                //   menuName: "Ungarn-insider",
                //   menuRoute: "insider_custom",
                // },
                {
                  menuName: "Ungarn-insider",
                  menuRoute: "/ungarn-insider",
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
            <li key={i}>
              <div
                type="button"
                className="nav-item"
                aria-expanded="false"
                aria-controls={
                  item.slug !== "community" ? `${item.slug}-menu` : undefined
                }
                aria-label={
                  item.slug === "community"
                    ? `${item.title} - ${item.text}`
                    : undefined
                }
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.slug !== "community" && (
                  <ul className="hover-menu" id={`${item.slug}-menu`}>
                    {chunkArray(item.menu, 6).map((column, columnIndex) => (
                      <div key={columnIndex} className="menu-column">
                        {column.map((menuItem, j) => (
                          <li key={j} className="menu-item">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (menuItem.menuRoute === "insider_custom") {
                                  routerServerGlobal();
                                } else {
                                  route.push(menuItem.menuRoute);
                                }
                              }}
                            >
                              {menuItem.menuName}
                            </button>
                          </li>
                        ))}
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cards */}
      {/* <div>
        <div className="cards cursor-pointer" onClick={routerServerGlobal}>
          Cards will go here...
        </div>
      </div> */}
      <main id="main-content">
        <section className="hero-section" aria-label="Willkommensbereich">
          <div className="panel">
            {/* <h1 className="top-text">Schön, dass du hier bist bei</h1>

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
          </p> */}

            <img
              src="/assets/startmessage-creative-stack.png"
              alt="Kreatives Kartenstapel Bild - Willkommen bei Wir in Ungarn"
            />
          </div>
        </section>

        <div
          className="cards-container"
          id="cardsContainer"
          ref={cardsContainerRef}
          role="region"
          aria-label="Themen Karten"
        >
          {[
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
            // {
            //   image: "/assets/tl-Ungarn-Insider.avif",
            //   title: "Ungarn Insider",
            //   route: "/wissenswert",
            // },
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
          ].map((card, index) => (
            <article key={index} className="card-wrapper">
              <div
                className="card"
                tabIndex={0}
                role="button"
                aria-label={`${card.title} Karte öffnen`}
                onClick={() => {
                  // const modal = document.getElementById("modal");
                  // document.getElementById(
                  //   "modalTitle"
                  // ).textContent = `${card.title}`;
                  // document.getElementById(
                  //   "modalText"
                  // ).textContent = `Klicken Sie auf "Zur Seite", um mehr über ${card.title} zu erfahren.`;

                  // // Add a button to navigate to the page
                  // const buttonContainer =
                  //   modal.querySelector(".modal-content div");
                  // if (buttonContainer) {
                  //   // Clear existing buttons first
                  //   const existingNavigateBtn =
                  //     buttonContainer.querySelector(".navigate-btn");
                  //   if (existingNavigateBtn) {
                  //     existingNavigateBtn.remove();
                  //   }

                  //   // Create and add the navigation button
                  //   const navigateBtn = document.createElement("button");
                  //   navigateBtn.className = "close-modal navigate-btn";
                  //   navigateBtn.style.backgroundColor = "#4a7c59";
                  //   navigateBtn.textContent = "Zur Seite";
                  //   navigateBtn.onclick = () => {
                  //     route.push(card.route);
                  //   };
                  //   buttonContainer.appendChild(navigateBtn);
                  // }

                  // modal.style.display = "flex";
                  if (allowImpressumModal === true) {
                    setAllowImpressumModal(false);
                  }
                  setAllowPostSlider(true);
                  setPostSliderDetails(card);
                  handleOpen();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.click();
                  }
                }}
              >
                <div
                  className="card-image"
                  style={{ backgroundImage: `url('${card.image}')` }}
                  role="img"
                  aria-label={card.title}
                ></div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="content-section"
          style={{ minHeight: "300vh", position: "relative", zIndex: 2 }}
        ></div>
      </main>

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
      <aside className="main-logo" aria-label="Website Logo">
        <img src="/assets/WIU-logo.png" alt="Wir In Ungarn Hauptlogo" />
      </aside>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* Ticker */}
          <div className="footer-ticker">
            {!tickerClosed && (
              <aside
                className="ticker-container"
                id="newsTickerContainer"
                aria-label="Nachrichten Ticker"
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
                        <span className="ticker-separator" aria-hidden="true">
                          |
                        </span>
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
                        <span className="ticker-separator" aria-hidden="true">
                          |
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="close-button"
                  onClick={handleCloseTicker}
                  aria-label="Ticker schließen"
                >
                  ✕
                </button>
              </aside>
            )}
          </div>

          {/* <div>
            <div className="cards cursor-pointer" onClick={routerServerGlobal}>
              Cards will go here...
            </div>
          </div> */}

          {/* Footer Links */}

          <nav
            aria-label="Footer Navigation"
            className="relative desktop-footer-nav"
          >
            {/* Main Footer Links */}
            <div className="footer-links-container" ref={footerContainerRef}>
              <div className="footer-links-wrapper">
                {visibleLinks.map((link, index) => (
                  <React.Fragment key={link.key}>
                    <Link
                      href={link.endpoint}
                      className="footer-link-item"
                      ref={(el) => (footerLinksRef.current[index] = el)}
                    >
                      {link.title}
                    </Link>
                  </React.Fragment>
                ))}

                {/* More Button - Only show if there are hidden links */}
                {hiddenLinks.length > 0 && (
                  <div className="relative footer-more-wrapper">
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="footer-link-item footer-more-btn"
                      aria-expanded={isOpen}
                      aria-label="Weitere Links anzeigen"
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
                        aria-hidden="true"
                        style={{ marginLeft: "4px" }}
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
                          aria-hidden="true"
                        />

                        {/* Menu */}
                        <div className="absolute bottom-full right-0 mb-2 bg-[#e3e3e3] rounded-lg shadow-xl border-[3px] border-white py-2 min-w-[220px] z-20">
                          {hiddenLinks.map((link) => (
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
                )}
              </div>
            </div>
          </nav>
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

      {/* Custom Scrollbar */}
      <aside
        className="scrollbar-container"
        id="scrollbarContainer"
        ref={scrollbarContainerRef}
        aria-label="Custom Scrollbar"
      >
        <button
          type="button"
          className="arrow-button up"
          id="arrowUp"
          ref={arrowUpRef}
          aria-label="Nach oben scrollen"
        >
          <span className="arrow-icon up" aria-hidden="true"></span>
        </button>
        <div
          className="scrollbar-track"
          id="track"
          ref={trackRef}
          role="scrollbar"
          aria-controls="main-content"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="scrollbar-thumb"
            id="thumb"
            ref={thumbRef}
            tabIndex={0}
            aria-label="Scroll-Position"
          ></div>
        </div>
        <button
          type="button"
          className="arrow-button down"
          id="arrowDown"
          ref={arrowDownRef}
          aria-label="Nach unten scrollen"
        >
          <span className="arrow-icon down" aria-hidden="true"></span>
        </button>
      </aside>

      {/* Zoom Toast Message */}
      <div
        className="zoom-toast"
        id="zoomToast"
        role="alert"
        aria-live="polite"
      >
        Bitte laden Sie die Seite neu (F5)
        <br />
        für die perfekte Ansicht
      </div>

      {/* Tablet Intro Image */}
      <div className="tablet_intro_image">
        <div className="intro_image_cnt">
          <img
            src="/assets/welcome-message-tablet.png"
            alt="tablet welcome image"
          />
        </div>
      </div>

      {/* Discovery Deck - Mobile Card Stack */}
      <div className="discovery-deck">
        <div className="card-stack" id="cardStack" ref={cardStackRef}>
          {/* Swipe Indicators */}
          <div className="swipe-indicator left" id="swipeLeft">
            ❌
          </div>
          <div className="swipe-indicator right" id="swipeRight">
            ✓
          </div>

          {/* Card 1 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 0
                ? "active"
                : currentCardIndex === 1
                ? "next"
                : "hidden"
            }`}
            data-index={0}
            data-rotation="2"
          >
            <img
              src="/assets/Label-01.png"
              alt="Zahlentrainer"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 2 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 1
                ? "active"
                : currentCardIndex === 2
                ? "next"
                : "hidden"
            }`}
            data-index={1}
            data-rotation="-1"
          >
            <img
              src="/assets/Label-02.png"
              alt="Wir-erklären-ungarisch"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 3 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 2
                ? "active"
                : currentCardIndex === 3
                ? "next"
                : "hidden"
            }`}
            data-index={2}
            data-rotation="1.5"
          >
            <img
              src="/assets/Label-03.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 4 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 3
                ? "active"
                : currentCardIndex === 4
                ? "next"
                : "hidden"
            }`}
            data-index={3}
            data-rotation="-2.5"
          >
            <img
              src="/assets/Label-04.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 5 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 4
                ? "active"
                : currentCardIndex === 5
                ? "next"
                : "hidden"
            }`}
            data-index={4}
            data-rotation="0.5"
          >
            <img
              src="/assets/Label-05.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 6 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 5
                ? "active"
                : currentCardIndex === 6
                ? "next"
                : "hidden"
            }`}
            data-index={5}
            data-rotation="-1.8"
          >
            <img
              src="/assets/Label-06.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 7 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 6
                ? "active"
                : currentCardIndex === 7
                ? "next"
                : "hidden"
            }`}
            data-index={6}
            data-rotation="2.8"
          >
            <img
              src="/assets/Label-07.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 8 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 7
                ? "active"
                : currentCardIndex === 8
                ? "next"
                : "hidden"
            }`}
            data-index={7}
            data-rotation="-0.8"
          >
            <img
              src="/assets/Label-08.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 9 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 8
                ? "active"
                : currentCardIndex === 9
                ? "next"
                : "hidden"
            }`}
            data-index={8}
            data-rotation="1.2"
          >
            <img
              src="/assets/Label-09.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 10 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 9
                ? "active"
                : currentCardIndex === 10
                ? "next"
                : "hidden"
            }`}
            data-index={9}
            data-rotation="-1"
          >
            <img
              src="/assets/Label-10.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 11 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 10
                ? "active"
                : currentCardIndex === 11
                ? "next"
                : "hidden"
            }`}
            data-index={10}
            data-rotation="1.5"
          >
            <img
              src="/assets/Label-11.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 12 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 11
                ? "active"
                : currentCardIndex === 12
                ? "next"
                : "hidden"
            }`}
            data-index={11}
            data-rotation="-0.8"
          >
            <img
              src="/assets/Label-12.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 13 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 12
                ? "active"
                : currentCardIndex === 13
                ? "next"
                : "hidden"
            }`}
            data-index={12}
            data-rotation="2.8"
          >
            <img
              src="/assets/Label-13.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 14 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 13
                ? "active"
                : currentCardIndex === 14
                ? "next"
                : "hidden"
            }`}
            data-index={13}
            data-rotation="-1.5"
          >
            <img
              src="/assets/Label-14.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>

          {/* Card 15 */}
          <div
            className={`mobile-card ${
              currentCardIndex === 14
                ? "active"
                : currentCardIndex === 0
                ? "next"
                : "hidden"
            }`}
            data-index={14}
            data-rotation="-0.8"
          >
            <img
              src="/assets/Label-15.png"
              alt="Insider"
              className="card-image"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Button Bar */}
      <div className="mobile-btm-button">
        <button
          className="profile-btn"
          onClick={() => openPopup("profilePopup")}
        >
          MEIN PROFIL
        </button>
        <button className="widget-btn" onClick={() => openPopup("widgetPopup")}>
          WERKZEUGE
        </button>
      </div>

      {/* Popup Overlay */}
      <div
        className={`popup-overlay ${activePopup ? "active" : ""}`}
        onClick={closeAllPopups}
      ></div>

      {/* MEIN PROFIL Popup */}
      <div
        className={`popup-panel ${
          activePopup === "profilePopup" ? "active" : ""
        }`}
        id="profilePopup"
      >
        <button className="popup-close" onClick={closeAllPopups}>
          ✕
        </button>
        <div className="popup-content">
          <p className="text-[#4a7c59] text-2xl uppercase font-bold mb-6">
            Mein Profil
          </p>

          {/* Login Form */}
          <div className="login-form" id="loginForm">
            <form>
              <div className="form-group">
                <label htmlFor="email">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Ihre E-Mail-Adresse"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Passwort</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Ihr Passwort"
                />
              </div>
              <button type="submit" className="btn-submit">
                Anmelden
              </button>
              <a href="#" className="forgot-password">
                Passwort vergessen?
              </a>
            </form>
          </div>
        </div>
      </div>

      {/* WERKZEUGE Popup */}
      <div
        className={`popup-panel ${
          activePopup === "widgetPopup" ? "active" : ""
        }`}
        id="widgetPopup"
      >
        <button className="popup-close" onClick={closeAllPopups}>
          ✕
        </button>
        <div className="popup-content">
          {/* <h2>Werkzeuge</h2> */}

          <p className="text-[#4a7c59] text-2xl font-bold uppercase mb-6">
            Werkzeuge
          </p>

          <div className="widget-grid">
            {/* Currency Converter */}
            <div
              className="widget-item"
              onClick={() => openDetailPopup("currencyPopup")}
            >
              <i className="fas fa-exchange-alt"></i>
              <h3>Währungsrechner</h3>
              <p>EUR ⇔ HUF</p>
            </div>

            {/* Calendar */}
            <div
              className="widget-item"
              onClick={() => openDetailPopup("calendarPopup")}
            >
              <i className="fas fa-calendar-alt"></i>
              <h3>Kalender</h3>
              <p>Ungarische Namenstage</p>
            </div>

            {/* Favorites */}
            <div
              className="widget-item"
              onClick={() => openDetailPopup("favoritesPopup")}
            >
              <i className="fas fa-star"></i>
              <h3>Favoriten</h3>
              <p>Gespeicherte Inhalte</p>
            </div>

            {/* History */}
            <div
              className="widget-item"
              onClick={() => openDetailPopup("historyPopup")}
            >
              <i className="fas fa-history"></i>
              <h3>Verlauf</h3>
              <p>Besuchte Seiten</p>
            </div>
          </div>
        </div>
      </div>

      {/* Currency Converter Detail Popup */}
      <div
        className={`detail-popup ${
          activeDetailPopup === "currencyPopup" ? "active" : ""
        }`}
        id="currencyPopup"
      >
        <div className="detail-header">
          <button className="detail-back" onClick={closeDetailPopup}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[#4a7c59] text-2xl uppercase font-bold">
            Währungsrechner
          </h2>
          <button className="popup-close" onClick={closeAllPopups}>
            ✕
          </button>
        </div>
        <div className="detail-content">
          <div className="currency-converter">
            <div className="converter-group">
              <label>Euro (EUR)</label>
              <input
                type="number"
                id="eurInput"
                placeholder="0.00"
                defaultValue="100"
              />
            </div>

            <div className="converter-icon">
              <i className="fas fa-exchange-alt"></i>
            </div>

            <div className="converter-group">
              <label>Forint (HUF)</label>
              <input type="number" id="hufInput" placeholder="0.00" readOnly />
            </div>

            <div className="exchange-rate">
              <p>Aktueller Kurs: 1 EUR = 395.50 HUF</p>
              <p className="rate-date">Stand: 13.11.2025</p>
            </div>

            <button className="btn-convert">Umrechnen</button>
          </div>
        </div>
      </div>

      {/* Calendar Detail Popup */}
      <div
        className={`detail-popup ${
          activeDetailPopup === "calendarPopup" ? "active" : ""
        }`}
        id="calendarPopup"
      >
        <div className="detail-header">
          <button className="detail-back" onClick={closeDetailPopup}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[#4a7c59] text-2xl uppercase font-bold">
            Kalender
          </h2>
          <button className="popup-close" onClick={closeAllPopups}>
            ✕
          </button>
        </div>
        <div className="detail-content">
          <div className="calendar-widget">
            <div className="calendar-current">
              <h3>Heute</h3>
              <div className="today-info">
                <p className="today-date">13. November 2025</p>
                <p className="today-name">Namenstag: Szilvia</p>
              </div>
            </div>

            <div className="upcoming-names">
              <h4>Kommende Namenstage</h4>
              <div className="name-list">
                <div className="name-item">
                  <span className="date">14.11.</span>
                  <span className="name">Aliz</span>
                </div>
                <div className="name-item">
                  <span className="date">15.11.</span>
                  <span className="name">Albert, Lipót</span>
                </div>
                <div className="name-item">
                  <span className="date">16.11.</span>
                  <span className="name">Ödön</span>
                </div>
                <div className="name-item">
                  <span className="date">17.11.</span>
                  <span className="name">Gergő, Hortenzia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Detail Popup */}
      <div
        className={`detail-popup ${
          activeDetailPopup === "favoritesPopup" ? "active" : ""
        }`}
        id="favoritesPopup"
      >
        <div className="detail-header">
          <button className="detail-back" onClick={closeDetailPopup}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[#4a7c59] text-2xl uppercase font-bold">
            Favoriten
          </h2>

          <button className="popup-close" onClick={closeAllPopups}>
            ✕
          </button>
        </div>
        <div className="detail-content">
          <div className="favorites-list">
            <div className="favorite-item">
              <i className="fas fa-book"></i>
              <div className="fav-info">
                <h4>Ungarisch Grammatik</h4>
                <p>Gespeichert am 10.11.2025</p>
              </div>
            </div>
            <div className="favorite-item">
              <i className="fas fa-utensils"></i>
              <div className="fav-info">
                <h4>Somlói Galuska Rezept</h4>
                <p>Gespeichert am 08.11.2025</p>
              </div>
            </div>
            <div className="favorite-item">
              <i className="fas fa-map-marked-alt"></i>
              <div className="fav-info">
                <h4>Budapest Sehenswürdigkeiten</h4>
                <p>Gespeichert am 05.11.2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Detail Popup */}
      <div
        className={`detail-popup ${
          activeDetailPopup === "historyPopup" ? "active" : ""
        }`}
        id="historyPopup"
      >
        <div className="detail-header">
          <button className="detail-back" onClick={closeDetailPopup}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[#4a7c59] text-2xl uppercase font-bold">
            Verlauf
          </h2>
          <button className="popup-close" onClick={closeAllPopups}>
            ✕
          </button>
        </div>
        <div className="detail-content">
          <div className="history-list">
            <div className="history-item">
              <span className="history-time">Heute, 14:30</span>
              <h4>Zahlentrainer</h4>
            </div>
            <div className="history-item">
              <span className="history-time">Heute, 12:15</span>
              <h4>Kulinarische Seele</h4>
            </div>
            <div className="history-item">
              <span className="history-time">Gestern, 18:45</span>
              <h4>Ungarisch Grammatik</h4>
            </div>
            <div className="history-item">
              <span className="history-time">Gestern, 10:20</span>
              <h4>Budapest Guide</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <footer className="mobile-footer">
        <div
          className="footer-menu-item"
          data-menu="info"
          onClick={() =>
            setActiveFooterMenu(activeFooterMenu === "info" ? null : "info")
          }
        >
          Information
        </div>
        <div
          className="footer-menu-item"
          data-menu="lang"
          onClick={() =>
            setActiveFooterMenu(activeFooterMenu === "lang" ? null : "lang")
          }
        >
          Sprache
        </div>
        <div
          className="footer-menu-item"
          data-menu="hungary"
          onClick={() =>
            setActiveFooterMenu(
              activeFooterMenu === "hungary" ? null : "hungary"
            )
          }
        >
          Ungarn
        </div>
        <div
          className="footer-menu-item"
          data-menu="community"
          onClick={() =>
            setActiveFooterMenu(
              activeFooterMenu === "community" ? null : "community"
            )
          }
        >
          Community
        </div>
      </footer>

      {/* Dropdown Menus (appear above footer) */}
      <div
        className={`footer-dropdown ${
          activeFooterMenu === "info" ? "active" : ""
        }`}
        id="menu-info"
      >
        <div className="menu-column">
          <Link href="/wissenswert">WISSEENWERT</Link>
          <Link href="/kategorien">KATEGORIEN</Link>
        </div>
      </div>

      <div
        className={`footer-dropdown ${
          activeFooterMenu === "lang" ? "active" : ""
        }`}
        id="menu-lang"
      >
        <div className="menu-column">
          <Link href="/sprachkurs">GRAMMATIKKURS</Link>
          <Link href="/kreuzwortraetsel">Kreuzworträtsel</Link>
          <Link href="/suffixhero">SuffixHero</Link>
          <Link href="/memoria">memória</Link>
          <Link href="/vokabel-aufkleber">Vokabel-Aufkleber</Link>
          <Link href="/liedtexte">LIEDTEXTE</Link>
        </div>
        <div className="menu-column">
          <Link href="/aus-dem-leben">aus dem Leben</Link>
          <Link href="/einfach-lesen">EINFACH LESEN</Link>
          <Link href="/wie-spaet-ist-es">Wie spät ist es?</Link>
          <Link href="/ungarisch-lernen">Ungarisch lernen</Link>
          <Link href="/zahlentrainer">Zahlentrainer</Link>
          <Link href="/kultour-ungarn">Kultour ungarn</Link>
        </div>
      </div>

      <div
        className={`footer-dropdown ${
          activeFooterMenu === "hungary" ? "active" : ""
        }`}
        id="menu-hungary"
      >
        <div className="menu-column">
          <Link href="/kulinarische-seele">kulinarische Seele</Link>
          <Link href="/ausflugsziele">AUSFLUGSZIELE</Link>
          <Link href="/veranstaltungen">Veranstaltungskalender</Link>
        </div>
      </div>

      <div
        className={`footer-dropdown ${
          activeFooterMenu === "community" ? "active" : ""
        }`}
        id="menu-community"
      >
        <div className="menu-column">
          <Link href="#">Gemeinsam</Link>
        </div>
      </div>

      {/* Floating Plus Button (Mobile Only) */}
      <button
        type="button"
        className="hover-plus mobile-only"
        onClick={() => openFilterBar()}
        aria-label="Mehr von diesem Thema"
      >
        <img src="/assets/plus-icon.png" alt="" />
      </button>

      {/* Bottom Filter Bar */}
      <div
        id="bottom-filter-bar"
        className={filterBarActive ? "active" : ""}
        aria-hidden={!filterBarActive}
      >
        <div className="bar-inner">
          <div className="left-column">
            <button className="funnel-btn" aria-label="Filter">
              <img
                src="/assets/filter-icon.jpeg"
                alt="Filter"
                className="btn-icon funnel-icon"
              />
            </button>

            <div className="text-and-controls">
              <div className="mobile-title">Filter Setup</div>

              <div className="filter-text">
                Du hast den Filter angeschaltet und bekommst ausschließlich die
                gewünschten Themen angezeigt.
              </div>

              <div
                className="controls-row"
                role="group"
                aria-label="filter controls"
              >
                <button className="info-btn" aria-label="Info" title="Info">
                  <img
                    src="/assets/filter-i-icon.jpeg"
                    alt="Info"
                    className="btn-icon info-icon"
                  />
                </button>

                <div className="search-wrap">
                  <input
                    id="filter-search"
                    className="filter-search"
                    type="text"
                    placeholder="search for more tags"
                    aria-label="search for tags"
                  />
                </div>

                <div
                  id="filter-tags"
                  className="filter-tags"
                  aria-label="active tags"
                >
                  {filterTags.map((tag, index) => (
                    <div className="tag-pill" key={index}>
                      {tag}{" "}
                      <button
                        className="tag-close"
                        aria-label={`remove ${tag}`}
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <button
              id="filter-close"
              aria-label="Schließen"
              title="Schließen"
              type="button"
              onClick={closeFilterBar}
            >
              <span className="close-x">×</span>
              <span className="close-text">close modification</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
