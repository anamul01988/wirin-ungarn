"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { GetAllImpulse } from "@/lib/getAllPages";
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
  const contentRef = useRef(null);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const apiData = await GetAllImpulse(50, null);
        console.log("Ungarisch-Impulse data:", apiData);

        if (apiData?.data) {
          // Set page data
          if (apiData.data.pages?.nodes?.length > 0) {
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
  }, []);

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

      // Pause any currently playing audio
      pauseAllAudio();

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

      // Toggle play/pause
      if (audio.paused) {
        audio.play();
        setPlayingAudioId(audioId);
      } else {
        audio.pause();
        setPlayingAudioId(null);
      }
    },
    [audioObjects]
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

      {/* Top Control Bar */}
      <div className="impulse-control-bar">
        <div className="impulse-selector-wrapper">
          <select
            className="impulse-selector"
            id="lessonSelector"
            value={currentLessonIndex !== null ? currentLessonIndex : ""}
            onChange={handleLessonSelect}
          >
            <option value="">-- Zufälligen Impuls wählen --</option>
            {impulses.map((impulse, index) => (
              <option key={impulse.id} value={index}>
                {impulse.title}
              </option>
            ))}
          </select>
        </div>
        <div className="impulse-lesson-number">
          {currentLessonIndex !== null
            ? `Lec ${currentLessonIndex + 1}`
            : "Lec"}
        </div>
        <button
          className="impulse-next-button"
          onClick={handleNextLesson}
          aria-label="Next lesson"
          type="button"
        ></button>
        <div className="clear"></div>
      </div>

      {/* Main Content Container */}
      <div className="impulse-content" ref={contentRef}>
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
