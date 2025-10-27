"use client";
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import ImpressumtModal from "../ui/ImpressumModal";
import { footerLinks } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import algoliasearch from "algoliasearch/lite";
import { toggleFavorite } from "@/lib/utils/favoritesManager";

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
        <div class="loading">
          <div class="loading-spinner"></div>
          <p>Searching...</p>
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
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAiBtn, setOpenAiBtn] = useState(false);
  const [listSearchInstance, setListSearchInstance] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [activeFooterMenu, setActiveFooterMenu] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  const primaryLinks = footerLinks.filter((link) => link.primary);
  const secondaryLinks = footerLinks.filter((link) => !link.primary);
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

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      currentX = startX;
      currentY = startY;
      isDragging = false;
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
      if (!isDragging) return;

      const deltaX = currentX - startX;
      const activeCard = cards[currentCardIndex];
      const leftIndicator = document.getElementById("swipeLeft");
      const rightIndicator = document.getElementById("swipeRight");

      if (!activeCard) return;

      // Hide indicators
      if (leftIndicator) leftIndicator.style.opacity = 0;
      if (rightIndicator) rightIndicator.style.opacity = 0;

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
            const nextIndex = (currentCardIndex + 1) % cards.length;
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
            src="/assets/icons/Wishlist-icon.jpeg"
            alt="Wishlist"
            className="wishlist-icon"
            onClick={() => {
              // Navigate to profile page with favorites
              route.push("/profile");
            }}
            style={{ cursor: "pointer", width: "25px", height: "25px" }}
          />
          <img
            src="/assets/icons/user-icon.jpeg"
            alt="User"
            className="user-icon"
            onClick={() => {
              // Navigate to profile page
              route.push("/profile");
            }}
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
        /* Custom Scrollbar Container */
        .scrollbar-container {
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 70vh;
            max-height: 600px;
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

        /* Scrollbar Thumb with Image */
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
            <li key={i}>
              <button className="nav-item" type="button">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.slug !== "community" && (
                  <ul className="hover-menu">
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
              </button>
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
        ].map((card, index) => (
          <article key={index} className="card-wrapper">
            <div
              className="card"
              tabIndex={0}
              role="button"
              aria-label={`${card.title} Karte öffnen`}
              onClick={() => {
                const modal = document.getElementById("modal");
                document.getElementById(
                  "modalTitle"
                ).textContent = `${card.title}`;
                document.getElementById(
                  "modalText"
                ).textContent = `Klicken Sie auf "Zur Seite", um mehr über ${card.title} zu erfahren.`;

                // Add a button to navigate to the page
                const buttonContainer =
                  modal.querySelector(".modal-content div");
                if (buttonContainer) {
                  // Clear existing buttons first
                  const existingNavigateBtn =
                    buttonContainer.querySelector(".navigate-btn");
                  if (existingNavigateBtn) {
                    existingNavigateBtn.remove();
                  }

                  // Create and add the navigation button
                  const navigateBtn = document.createElement("button");
                  navigateBtn.className = "close-modal navigate-btn";
                  navigateBtn.style.backgroundColor = "#4a7c59";
                  navigateBtn.textContent = "Zur Seite";
                  navigateBtn.onclick = () => {
                    route.push(card.route);
                  };
                  buttonContainer.appendChild(navigateBtn);
                }

                modal.style.display = "flex";
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
          {!tickerClosed && (
            <aside
              className="ticker-container"
              id="newsTickerContainer"
              aria-label="Nachrichten Ticker"
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
                        <span className="ticker-separator" aria-hidden="true">
                          |
                        </span>
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
                        <span className="ticker-separator" aria-hidden="true">
                          |
                        </span>
                      )}
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

          {/* <div>
            <div className="cards cursor-pointer" onClick={routerServerGlobal}>
              Cards will go here...
            </div>
          </div> */}

          {/* Footer Links */}

          <nav aria-label="Footer Navigation" className="relative">
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
                      <span className="text-white" aria-hidden="true">
                        |
                      </span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-white" aria-hidden="true">
                  |
                </span>

                {/* More Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-gray-200 transition-colors text-sm font-medium flex items-center gap-1 px-1"
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
          </nav>
        </div>
      </footer>

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
          ].map((card, index) => (
            <div
              key={index}
              className={`mobile-card ${
                index === currentCardIndex
                  ? "active"
                  : index === (currentCardIndex + 1) % 10
                  ? "next"
                  : "hidden"
              }`}
              data-index={index}
              style={{
                transform: `rotate(${Math.random() * 4 - 2}deg)`,
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="card-image"
                draggable="false"
              />
            </div>
          ))}
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
    </div>
  );
};

export default LandingPage;
