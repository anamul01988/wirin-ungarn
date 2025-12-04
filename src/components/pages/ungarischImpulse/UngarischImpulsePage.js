"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  GetAllImpulse,
  GetAllImpulseIds,
  GetImpulseById,
} from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import "./UngarischImpulsePage.css";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";

const UngarischImpulsePage = () => {
  const [pageData, setPageData] = useState(null);
  const [impulses, setImpulses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [audioObjects, setAudioObjects] = useState({});
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [answersBlurred, setAnswersBlurred] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("A1"); // Default to A1
  const [impulseIds, setImpulseIds] = useState([]);
  const [currentImpulseIndex, setCurrentImpulseIndex] = useState(-1);
  const [loadingImpulses, setLoadingImpulses] = useState(false);
  const isInitialLoad = useRef(true);
  const contentRef = useRef(null);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        // Only show loader on initial load
        if (isInitialLoad.current) {
          setLoading(true);
          isInitialLoad.current = false;
        }
        console.log("Fetching impulses with level:", selectedLevel);
        const apiData = await GetAllImpulse(220, null, selectedLevel);
        console.log("Ungarisch-Impulse data:", apiData);
        console.log("API Response for level", selectedLevel, ":", apiData);

        if (apiData?.data) {
          // Set page data (only on first load or if page data is missing)
          if (!pageData && apiData.data.pages?.nodes?.length > 0) {
            setPageData(apiData.data.pages.nodes[0]);
          }

          // Set impulses data
          if (apiData.data.ungarischImpulses?.nodes?.length > 0) {
            setImpulses(apiData.data.ungarischImpulses.nodes);
            // Select random lesson initially
            const randomIndex = Math.floor(
              Math.random() * apiData.data.ungarischImpulses.nodes.length
            );
            setCurrentLessonIndex(randomIndex);
            setCurrentLesson(apiData.data.ungarischImpulses.nodes[randomIndex]);
            console.log(
              "Loaded",
              apiData.data.ungarischImpulses.nodes.length,
              "impulses for level",
              selectedLevel
            );
          } else {
            console.log("No impulses found for level", selectedLevel);
            setImpulses([]);
            setCurrentLessonIndex(null);
            setCurrentLesson(null);
          }
        }
      } catch (err) {
        console.error("Error fetching Ungarisch-Impulse data:", err);
        setError("Fehler beim Laden der Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedLevel]);

  // Handle lesson selector change
  const handleLessonSelect = useCallback(
    (e) => {
      const selectedIndex = parseInt(e.target.value);
      if (
        !isNaN(selectedIndex) &&
        selectedIndex >= 0 &&
        selectedIndex < impulses.length
      ) {
        setCurrentLessonIndex(selectedIndex);
        setCurrentLesson(impulses[selectedIndex]);
        setAnswersBlurred(true);
        // Pause all audio when switching lessons
        pauseAllAudio();
        // Scroll to top
        if (contentRef.current) {
          contentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    },
    [impulses]
  );

  // Handle next lesson button
  const handleNextLesson = useCallback(() => {
    if (impulses.length === 0) return;

    let nextIndex;
    if (
      currentLessonIndex === null ||
      currentLessonIndex === impulses.length - 1
    ) {
      // Random lesson
      nextIndex = Math.floor(Math.random() * impulses.length);
    } else {
      nextIndex = currentLessonIndex + 1;
    }

    setCurrentLessonIndex(nextIndex);
    setCurrentLesson(impulses[nextIndex]);
    setAnswersBlurred(true);
    pauseAllAudio();

    // Scroll to top
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentLessonIndex, impulses]);

  // Audio control functions
  const handlePlayPause = useCallback(
    (audioId, audioUrl) => {
      if (!audioUrl) return;
  
      // Get or create audio object
      let audio = audioObjects[audioId];
  
      if (!audio) {
        audio = new Audio(audioUrl);
        setAudioObjects((prev) => ({ ...prev, [audioId]: audio }));
  
        // Reset playing state when audio ends
        audio.addEventListener("ended", () => {
          setPlayingAudioId(null);
        });
  
        // Error handling
        audio.addEventListener("error", () => {
          console.error("Error loading audio file:", audioUrl);
          alert("Audio konnte nicht geladen werden.");
          setPlayingAudioId(null);
        });
      }
  
      // Check if THIS audio is currently playing
      if (playingAudioId === audioId && !audio.paused) {
        // If this audio is playing, pause it
        audio.pause();
        setPlayingAudioId(null);
      } else {
        // Pause all other audio first
        Object.entries(audioObjects).forEach(([id, audioObj]) => {
          if (audioObj && !audioObj.paused && id !== audioId) {
            audioObj.pause();
          }
        });
        
        // Play this audio
        audio.play();
        setPlayingAudioId(audioId);
      }
    },
    [audioObjects, playingAudioId]
  );

  const handleRewind = useCallback(
    (audioId) => {
      const audio = audioObjects[audioId];
      if (audio) {
        const newTime = audio.currentTime - 5;
        audio.currentTime = newTime > 0 ? newTime : 0;
      }
    },
    [audioObjects]
  );

  const pauseAllAudio = useCallback(() => {
    Object.values(audioObjects).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause();
      }
    });
    setPlayingAudioId(null);
  }, [audioObjects]);

  // Handle blurred answers toggle
  const handleToggleAnswers = useCallback(() => {
    setAnswersBlurred((prev) => !prev);
  }, []);

  // Initialize impulse IDs when level changes
  useEffect(() => {
    async function initializeIds() {
      try {
        const idsResponse = await GetAllImpulseIds(selectedLevel);
        const ids = idsResponse?.data?.ungarischImpulses?.nodes || [];
        setImpulseIds(ids);
        setCurrentImpulseIndex(-1); // Reset index when level changes
        console.log(
          "Initialized impulse IDs for level",
          selectedLevel,
          ":",
          ids.length
        );
      } catch (err) {
        console.error("Error fetching impulse IDs:", err);
      }
    }
    initializeIds();
  }, [selectedLevel]);

  // Handle button click to fetch next impulse by ID
  const handleFetchNextImpulse = useCallback(async () => {
    try {
      setLoadingImpulses(true);

      // If IDs are not loaded yet, load them first
      let ids = impulseIds;
      if (ids.length === 0) {
        const idsResponse = await GetAllImpulseIds(selectedLevel);
        ids = idsResponse?.data?.ungarischImpulses?.nodes || [];
        setImpulseIds(ids);
      }

      if (ids.length === 0) {
        console.log("No impulse IDs found for level", selectedLevel);
        setLoadingImpulses(false);
        return;
      }

      // Calculate next index (cycle through)
      const nextIndex = (currentImpulseIndex + 1) % ids.length;
      setCurrentImpulseIndex(nextIndex);

      // Fetch the next impulse by ID
      const nextId = ids[nextIndex].id;
      const impulseResponse = await GetImpulseById(nextId);
      const fetchedImpulse = impulseResponse?.data?.ungarischImpulse;

      if (fetchedImpulse) {
        // Update currentLesson with the fetched content
        setCurrentLesson(fetchedImpulse);
        setAnswersBlurred(true);
        pauseAllAudio();

        console.log("Fetched next impulse:", fetchedImpulse);
      }
    } catch (err) {
      console.error("Error fetching next impulse by ID:", err);
      setError("Fehler beim Laden des Impulses.");
    } finally {
      setLoadingImpulses(false);
    }
  }, [selectedLevel, impulseIds, currentImpulseIndex, pauseAllAudio]);

  // Extract audio URLs from content
  const extractAudioUrls = useCallback((content) => {
    if (!content) return {};
    const audioUrls = {};
    const audioRegex = /data-audio-url=["']([^"']+)["']/g;
    let match;
    while ((match = audioRegex.exec(content)) !== null) {
      const audioId = match[1]
        .split("/")
        .pop()
        .replace(".ogg", "")
        .replace(".mp3", "");
      audioUrls[audioId] = match[1];
    }
    return audioUrls;
  }, []);

  // Process content HTML to add audio controls and handle blurred answers
  useEffect(() => {
    if (!currentLesson?.content) return;

    // Extract audio URLs
    const audioUrls = extractAudioUrls(currentLesson.content);

    // Process content to add audio controls
    let processedContent = currentLesson.content;

    // Replace audio button containers with React-compatible structure
    processedContent = processedContent.replace(
      /<div class="himpulse-play-button-container">[\s\S]*?<\/div>/g,
      (match) => {
        const audioUrlMatch = match.match(/data-audio-url=["']([^"']+)["']/);
        if (audioUrlMatch) {
          const audioUrl = audioUrlMatch[1];
          const audioId = audioUrl
            .split("/")
            .pop()
            .replace(".ogg", "")
            .replace(".mp3", "");
          return `<div class="audio-control-container" data-audio-id="${audioId}" data-audio-url="${audioUrl}"></div>`;
        }
        return match;
      }
    );

    // Handle blurred answers
    if (processedContent.includes("antworten_blurred")) {
      processedContent = processedContent.replace(
        /class="antworten_blurred blurred"/g,
        `class="antworten-blurred ${answersBlurred ? "blurred" : ""}"`
      );
    }

    // Update content ref
    if (contentRef.current) {
      contentRef.current.innerHTML = processedContent;

      // Add event listeners for audio controls
      const audioContainers = contentRef.current.querySelectorAll(
        ".audio-control-container"
      );
      audioContainers.forEach((container) => {
        const audioId = container.getAttribute("data-audio-id");
        const audioUrl = container.getAttribute("data-audio-url");

        if (audioId && audioUrl) {
          // Create audio controls
          const controlsDiv = document.createElement("div");
          controlsDiv.className = "audio-controls";

          const backwardBtn = document.createElement("button");
          backwardBtn.className = "audio-backward-button";
          backwardBtn.setAttribute("data-audio-id", audioId);
          backwardBtn.setAttribute("aria-label", "Rewind 5 seconds");
          backwardBtn.addEventListener("click", () => handleRewind(audioId));

          const playBtn = document.createElement("button");
          playBtn.className = `audio-play-button ${
            playingAudioId === audioId ? "playing" : ""
          }`;
          playBtn.setAttribute("data-audio-id", audioId);
          playBtn.setAttribute("data-audio-url", audioUrl);
          playBtn.setAttribute("aria-label", "Play audio");
          playBtn.addEventListener("click", () =>
            handlePlayPause(audioId, audioUrl)
          );

          controlsDiv.appendChild(backwardBtn);
          controlsDiv.appendChild(playBtn);
          container.appendChild(controlsDiv);
        }
      });

      // Add click handler for blurred answers
      const blurredSection =
        contentRef.current.querySelector(".antworten-blurred");
      const italicPara = contentRef.current.querySelector(".italic_para");
      if (blurredSection) {
        blurredSection.addEventListener("click", handleToggleAnswers);
      }
      if (italicPara) {
        italicPara.addEventListener("click", handleToggleAnswers);
      }
    }
  }, [
    currentLesson,
    answersBlurred,
    playingAudioId,
    handlePlayPause,
    handleRewind,
    handleToggleAnswers,
    extractAudioUrls,
  ]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      pauseAllAudio();
      Object.values(audioObjects).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, [audioObjects, pauseAllAudio]);

  if (loading) {
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  }

  if (error && impulses.length === 0) {
    return <div className="impulse-page">{error}</div>;
  }

  const { title, content: pageContent } = pageData || {};
  const pageIntro = pageContent
    ? pageContent.replace(/<[^>]*>/g, "").substring(0, 200) + "..."
    : "Diese Lernseite bietet dir, abseits von einer Lern-Reihenfolge, verschiedene Themen zur ungarischen Sprache mit ausführlichen Erklärungen. Du darfst dich bei dem, was der Zufall für dich auswählt, einfach darauf verlassen, dass es für dich passt. Und falls es dir für den Moment doch zu kompliziert ist (oder du es schon weißt), klicke einfach auf den Pfeil für „nächsten Impuls anzeigen“.";

  return (
    <div className="impulse-page">
      {/* Page Header */}
      <div className="impulse-header">
        {/* <h1>{title || "Ungarisch-Impulse"}</h1> */}
        <div className="w-full relative flex items-center justify-center mb-3">
          <ArchivePageHeaderImage
            imageUrl="/headlineImages/Ungarisch-Impulse.jpg"
            imageAlt="Ungarisch Impulse"
          />
        </div>
        <p className="impulse-intro">{pageIntro}</p>
        <p className="impulse-note">
          Wähle hier die gewünschte Schwierigkeitsstufe aus:
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          className="button-option"
          onClick={() => {
            console.log("A1 button clicked");
            setSelectedLevel("A1");
          }}
          style={{
            backgroundColor: selectedLevel === "A1" ? "#dc3545" : "",
            color: selectedLevel === "A1" ? "#fff" : "",
          }}
        >
          A1
        </button>
        <button
          className="button-option"
          onClick={() => {
            console.log("A2 button clicked");
            setSelectedLevel("A2");
          }}
          style={{
            backgroundColor: selectedLevel === "A2" ? "#dc3545" : "",
            color: selectedLevel === "A2" ? "#fff" : "",
          }}
        >
          A2
        </button>
        <button
          className="button-option"
          onClick={() => {
            console.log("B1 button clicked");
            setSelectedLevel("B1");
          }}
          style={{
            backgroundColor: selectedLevel === "B1" ? "#dc3545" : "",
            color: selectedLevel === "B1" ? "#fff" : "",
          }}
        >
          B1
        </button>
      </div>

      <div className="flex items-center justify-end gap-2 mb-6">
        <button
          className="bg-[#006400] text-white px-4 py-2 rounded font-medium hover:bg-green-700 transition-colors"
          title="Copy lesson ID"
        >
          {currentLesson.impulsesFields.impulseCode}
        </button>
        <button
          className="bg-[#006400] text-white w-10 h-10 rounded flex items-center justify-center hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleFetchNextImpulse}
          disabled={loadingImpulses}
          aria-label="Next impulse"
          title="Next impulse"
        >
          {loadingImpulses ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Main Content Container */}
      <div className="mt-10 impulse-lesson" ref={contentRef}>
        {currentLesson ? (
          <div
            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            className="impulse-lesson-content"
          />
        ) : (
          <div className="no-lesson">
            <p>Bitte wähle einen Impuls aus dem Dropdown-Menü aus.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="impulse-footer">
        <button className="impulse-cta-button" type="button">
          Fehler im Reiter (Lektion) gefunden?
          <span className="arrow">▼</span>
        </button>
      </div>
    </div>
  );
};

export default UngarischImpulsePage;
