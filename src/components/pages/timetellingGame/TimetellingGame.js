import React, { useState, useEffect } from "react";
import { FaVolumeUp } from "react-icons/fa";

// Sample data structure matching your CSV format
const SAMPLE_DATA = [
  {
    time: "12:00",
    image: "clock_1200.jpg",
    options: [
      { text: "tizenkét óra", audio: "12_00_1.mp3", correct: true },
      { text: "dél", audio: "12_00_2.mp3", correct: true },
      { text: "éjfél", audio: "12_00_3.mp3", correct: false },
      { text: "fél egy", audio: "12_30.mp3", correct: false },
      { text: "negyed egy", audio: "12_15.mp3", correct: false },
    ],
  },
  {
    time: "1:00",
    image: "clock_0100.jpg",
    options: [
      { text: "egy óra", audio: "01_00_1.mp3", correct: true },
      { text: "kettő óra", audio: "02_00.mp3", correct: false },
      { text: "fél kettő", audio: "01_30.mp3", correct: false },
      { text: "negyed kettő", audio: "01_15.mp3", correct: false },
    ],
  },
  {
    time: "9:37",
    image: "clock_0937.jpg",
    options: [
      {
        text: "pontosan kilenc óra harminchat perc",
        audio: "09_37_1.mp3",
        correct: true,
      },
      { text: "fél tíz", audio: "09_30.mp3", correct: false },
      { text: "kilenc harminc", audio: "09_30_2.mp3", correct: false },
      {
        text: "kilenc óra harminchat perc",
        audio: "09_37_2.mp3",
        correct: true,
      },
    ],
  },
  {
    time: "2:10",
    image: "clock_0210.jpg",
    options: [
      { text: "két óra tíz perc", audio: "02_10_1.mp3", correct: true },
      { text: "negyed három", audio: "02_15.mp3", correct: false },
      { text: "fél három", audio: "02_30.mp3", correct: false },
      { text: "tíz perc múlva két", audio: "02_10_2.mp3", correct: false },
    ],
  },
  {
    time: "3:45",
    image: "clock_0345.jpg",
    options: [
      { text: "három óra negyvenöt perc", audio: "03_45_1.mp3", correct: true },
      { text: "negyed négy", audio: "03_45_2.mp3", correct: true },
      { text: "fél négy", audio: "03_30.mp3", correct: false },
      { text: "három harminc", audio: "03_30_2.mp3", correct: false },
    ],
  },
  {
    time: "6:30",
    image: "clock_0630.jpg",
    options: [
      { text: "hat óra harminc perc", audio: "06_30_1.mp3", correct: true },
      { text: "fél hét", audio: "06_30_2.mp3", correct: true },
      { text: "hat óra", audio: "06_00.mp3", correct: false },
      { text: "negyed hét", audio: "06_15.mp3", correct: false },
    ],
  },
];

const TimetellingGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answeredOptions, setAnsweredOptions] = useState({});
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [highlightedOptions, setHighlightedOptions] = useState(new Set());

  // Load a random question on mount and when refreshing
  useEffect(() => {
    loadRandomQuestion();
  }, []);

  const loadRandomQuestion = () => {
    const randomData =
      SAMPLE_DATA[Math.floor(Math.random() * SAMPLE_DATA.length)];

    // Separate correct and wrong options
    const correctOpts = randomData.options.filter((opt) => opt.correct);
    const wrongOpts = randomData.options.filter((opt) => !opt.correct);

    // Build selected options (at least 1 correct and 1 wrong, up to 4 total)
    const selected = [];

    if (correctOpts.length > 0) {
      selected.push(
        correctOpts[Math.floor(Math.random() * correctOpts.length)]
      );
    }

    if (wrongOpts.length > 0) {
      selected.push(wrongOpts[Math.floor(Math.random() * wrongOpts.length)]);
    }

    // Fill remaining slots
    const remaining = randomData.options.filter(
      (opt) => !selected.includes(opt)
    );
    while (selected.length < 4 && remaining.length > 0) {
      const idx = Math.floor(Math.random() * remaining.length);
      selected.push(remaining[idx]);
      remaining.splice(idx, 1);
    }

    // Shuffle the selected options
    selected.sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      ...randomData,
      options: selected,
    });

    // Reset states
    setAnsweredOptions({});
    setFeedbackShown(false);
    setHighlightedOptions(new Set());
  };

  const handleOptionClick = (index) => {
    if (answeredOptions[index]) {
      // Revert selection
      const newAnswered = { ...answeredOptions };
      delete newAnswered[index];
      setAnsweredOptions(newAnswered);
    } else {
      // Mark as answered
      setAnsweredOptions({
        ...answeredOptions,
        [index]: true,
      });
    }
  };

  const playAudio = (audioFile) => {
    // In a real implementation, you would play the actual audio file
    // For this demo, we'll just log it
    console.log(`Playing audio: ${audioFile}`);

    // Simulated audio playback
    const audio = new Audio();
    audio.src = `/assets/audio/${audioFile}`;
    audio
      .play()
      .catch((err) => console.log("Audio playback not available in demo"));
  };

  const handleNextClick = () => {
    if (!feedbackShown) {
      // Check for missing correct answers
      let missing = false;
      const newHighlighted = new Set();

      currentQuestion.options.forEach((option, index) => {
        if (option.correct && !answeredOptions[index]) {
          newHighlighted.add(index);
          missing = true;
        }
      });

      if (missing) {
        setHighlightedOptions(newHighlighted);
        setFeedbackShown(true);
        return;
      }
    }

    // Load new question
    loadRandomQuestion();
  };

  const getOptionClass = (index, option) => {
    let classes = "option-btn";

    if (answeredOptions[index]) {
      classes += " answered";
      if (option.correct) {
        classes += " correct";
      } else {
        classes += " wrong";
      }
    }

    if (highlightedOptions.has(index)) {
      classes += " highlight-correct";
    }

    return classes;
  };

  const shouldShowAudio = (index, option) => {
    return (
      (answeredOptions[index] && option.correct) ||
      highlightedOptions.has(index)
    );
  };

  if (!currentQuestion) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="game-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        
        .game-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .game-container {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        
        .clock-section {
          flex: 1;
          text-align: center;
        }
        
        .clock-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .options-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .digital-time {
          font-family: 'Orbitron', monospace;
          font-size: 56px;
          color: #436f4d;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: 2px;
          font-weight: 700;
        }
        
        .option-wrapper {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .option-btn {
          flex: 1;
          padding: 12px 20px;
          font-size: 16px;
          cursor: pointer;
          background-color: white;
          color: black;
          font-weight: 400;
          border: 2px solid #436f4d;
          text-transform: lowercase;
          min-height: 48px;
          border-radius: 4px;
          transition: all 0.3s ease;
          text-align: left;
        }
        
        .option-btn:hover {
          background-color: #f5f5f5;
        }
        
        .option-btn.correct {
          background-color: #436f4d;
          color: white;
          border-color: #436f4d;
        }
        
        .option-btn.wrong {
          background-color: #cc2233;
          color: white;
          border-color: #cc2233;
        }
        
        .option-btn.highlight-correct {
          background-color: #d0f0c0;
          border: 2px solid #8bc34a;
          animation: pulse 1s ease-in-out;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .audio-btn {
          width: 48px;
          height: 48px;
          border: 4px solid #436f4d;
          border-radius: 4px;
          background: #436f4d;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        
        .audio-btn:hover {
          background: #365a3d;
          border-color: #365a3d;
        }
        
        .audio-btn:active {
          transform: scale(0.95);
        }
        
        .controls {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
        
        .next-btn {
          padding: 12px 24px;
          background: #436f4d;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.2s ease;
          text-transform: lowercase;
        }
        
        .next-btn:hover {
          background: #365a3d;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .next-btn:active {
          transform: translateY(0);
        }
        
        .loading {
          text-align: center;
          font-size: 18px;
          color: #666;
          padding: 40px;
        }
        
        @media (max-width: 768px) {
          .game-container {
            flex-direction: column;
            gap: 20px;
          }
          
          .digital-time {
            font-size: 42px;
          }
          
          .clock-image {
            max-width: 300px;
          }
          
          .option-btn {
            font-size: 14px;
            padding: 10px 15px;
          }
        }
      `}</style>

      <div className="game-container">
        <div className="clock-section">
          <img
            src={`https://via.placeholder.com/400/ff6b35/ffffff?text=${currentQuestion.time.replace(
              ":",
              "%3A"
            )}`}
            alt={`Clock showing ${currentQuestion.time}`}
            className="clock-image"
          />
        </div>

        <div className="options-section">
          <div className="digital-time">{currentQuestion.time}</div>

          {currentQuestion.options.map((option, index) => (
            <div key={index} className="option-wrapper">
              <button
                className={getOptionClass(index, option)}
                onClick={() => handleOptionClick(index)}
              >
                {option.text}
              </button>

              {shouldShowAudio(index, option) && (
                <button
                  className="audio-btn"
                  onClick={() => playAudio(option.audio)}
                  title="Play audio"
                >
                  <FaVolumeUp size={24} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button className="next-btn" onClick={handleNextClick}>
          weiter
        </button>
      </div>
    </div>
  );
};

export default TimetellingGame;
