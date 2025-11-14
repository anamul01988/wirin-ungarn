"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Plyr to avoid SSR issues
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

export default function EinfachLesenAccordion({ level, isFirst }) {
  const [isOpen, setIsOpen] = useState(isFirst);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plyrOptions = {
    controls: [
      "play",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "settings",
    ],
    settings: ["speed"],
    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 2],
    },
    volume: 0.5,
    muted: false,
  };

  const audioSource = level.audioFile?.node?.mediaItemUrl
    ? {
        type: "audio",
        sources: [
          {
            src: level.audioFile.node.mediaItemUrl,
            type: level.audioFile.node.mimeType || "audio/mpeg",
          },
        ],
      }
    : null;

  return (
    <div className="mb-3">
      <button
        className={`w-full p-4 text-left text-white text-lg border-none outline-none cursor-pointer transition-colors ${
          isOpen ? "bg-[#436f4d]" : "bg-[#609f6f] hover:bg-[#436f4d]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {level.levelTitle}
      </button>

      {isOpen && (
        <div className="bg-white p-4">
          {/* Audio Player */}
          {mounted && audioSource && (
            <div className="mb-4">
              <Plyr source={audioSource} options={plyrOptions} />
            </div>
          )}

          {/* Level Content */}
          {level.levelContent && (
            <div
              className="max-h-[230px] overflow-y-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: level.levelContent }}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#436f4d #f5f5f5",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
