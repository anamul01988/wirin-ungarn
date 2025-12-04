import { ArchivePageHeaderImage } from "@/lib/utils/utils";
import { zahelentrainer_data } from "@/lib/utils/zahelentrainer_data";
import React, { useState, useEffect, useRef } from "react";

// Base audio path
const BASE_AUDIO_PATH = "https://wir-in-ungarn.hu/wiucontent/uploads/hn_audio/";

const HungarianNumberGame = () => {
  const [difficulty, setDifficulty] = useState(1);
  const [speed, setSpeed] = useState(65);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userInputs, setUserInputs] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [inputRefs, setInputRefs] = useState([]);
  const [checkClickCount, setCheckClickCount] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [usedIds, setUsedIds] = useState(new Set());
  const audioRef = useRef(null);

  // Get audio URL based on speed selection
  const getAudioUrl = (audioFile, speedValue) => {
    const speedMap = {
      65: { dir: "nt65", ext: 1 },
      75: { dir: "nt75", ext: 2 },
      85: { dir: "nt85", ext: 3 },
      95: { dir: "nt95", ext: 4 },
    };

    const speedInfo = speedMap[speedValue];
    return `${BASE_AUDIO_PATH}${speedInfo.dir}/${audioFile}_${speedInfo.ext}.mp3`;
  };

  // Get random question by difficulty
  const getRandomQuestion = (diff) => {
    const filtered = Object.entries(zahelentrainer_data).filter(
      ([_, item]) => parseInt(item.difficulty) === diff
    );

    if (filtered.length === 0) return null;

    const availableQuestions = filtered.filter(([id]) => !usedIds.has(id));
    const questionsToUse =
      availableQuestions.length > 0 ? availableQuestions : filtered;

    if (availableQuestions.length === 0) {
      setUsedIds(new Set());
    }

    const randomIndex = Math.floor(Math.random() * questionsToUse.length);
    const [id, question] = questionsToUse[randomIndex];

    setUsedIds((prev) => new Set([...prev, id]));
    return question;
  };

  // Update question
  const updatePlaySection = () => {
    const question = getRandomQuestion(difficulty);
    if (!question) return;

    setCurrentQuestion(question);
    setUserInputs(new Array(question.numbers.length).fill(""));
    setFeedback("");
    setShowInfo(false);
    setCheckClickCount(0);
    setInputChanged(false);
    setIncorrectIndices([]);

    const refs = Array(question.numbers.length)
      .fill(null)
      .map(() => React.createRef());
    setInputRefs(refs);

    setTimeout(() => refs[0]?.current?.focus(), 100);
  };

  useEffect(() => {
    setUsedIds(new Set());
    updatePlaySection();
  }, [difficulty]);

  // Format number input
  const formatNumberInput = (format) => {
    if (!format) return [];

    const elements = [];
    let digitIndex = 0;
    let i = 0;

    const units = [
      "kg",
      "g",
      "mg",
      "µg",
      "dkg",
      "t",
      "l",
      "ml",
      "dl",
      "cl",
      "km",
      "cm",
      "m",
      "mm",
      "m²",
      "m³",
      "ha",
      "°C",
      "atm",
      "bar",
      "W",
      "kW",
      "kWh",
      "V",
      "A",
      "Hz",
      "GB",
      "TB",
      "MB",
      "Ft",
      "€",
    ];

    while (i < format.length) {
      const char = format[i];

      if (char === "0") {
        elements.push({ type: "input", index: digitIndex });
        digitIndex++;
        i++;
      } else if (["+", "-", "*", "=", ",", "/", ".", ":"].includes(char)) {
        elements.push({ type: "symbol", value: char });
        i++;
      } else if (char === " ") {
        elements.push({ type: "space" });
        i++;
      } else {
        let matched = false;
        for (const unit of units.sort((a, b) => b.length - a.length)) {
          if (format.substring(i).startsWith(unit)) {
            elements.push({ type: "unit", value: unit });
            i += unit.length;
            matched = true;
            break;
          }
        }
        if (!matched) {
          elements.push({ type: "text", value: char });
          i++;
        }
      }
    }

    return elements;
  };

  // Handle input change
  const handleInputChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
    setInputChanged(true);

    if (value && index < userInputs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!userInputs[index] && index > 0) {
        e.preventDefault();
        const newInputs = [...userInputs];
        newInputs[index - 1] = "";
        setUserInputs(newInputs);
        inputRefs[index - 1]?.current?.focus();
      } else if (userInputs[index]) {
        const newInputs = [...userInputs];
        newInputs[index] = "";
        setUserInputs(newInputs);
        e.preventDefault();
      }
    }
  };

  // Play audio
  const playAudio = () => {
    if (!currentQuestion || !audioRef.current) return;

    const audioUrl = getAudioUrl(currentQuestion.audio_file, speed);

    audioRef.current.src = audioUrl;
    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => {
        console.log("Playing audio:", audioUrl);
      })
      .catch((err) => {
        console.error("Audio playback failed:", err);
        console.log("Attempted URL:", audioUrl);
      });

    // Focus back to first empty input
    const emptyIndex = userInputs.findIndex((val) => !val);
    const focusIndex = emptyIndex >= 0 ? emptyIndex : 0;
    inputRefs[focusIndex]?.current?.focus();
  };

  // Validate input
  const validateInput = () => {
    if (!currentQuestion) return;

    const userAnswer = userInputs.join("");
    const correctAnswer = currentQuestion.numbers;

    const incorrect = [];
    for (let i = 0; i < correctAnswer.length; i++) {
      if (userInputs[i] !== correctAnswer[i]) {
        incorrect.push(i);
      }
    }

    setIncorrectIndices(incorrect);

    if (incorrect.length === 0 && userAnswer === correctAnswer) {
      setFeedback("correct");
      setTimeout(() => updatePlaySection(), 1500);
    } else {
      setFeedback("incorrect");
      if (incorrect.length > 0) {
        inputRefs[incorrect[0]]?.current?.focus();
      }
    }
  };

  // Handle check button
  const handleCheck = () => {
    if (checkClickCount === 0) {
      validateInput();
      setCheckClickCount(1);
      setInputChanged(false);
    } else if (checkClickCount === 1) {
      if (!inputChanged) {
        updatePlaySection();
        setCheckClickCount(0);
      } else {
        validateInput();
        setCheckClickCount(1);
        setInputChanged(false);
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.target.tagName === "INPUT") {
        if (e.key === "Enter") {
          e.preventDefault();
          handleCheck();
        }
        return;
      }

      if (e.key.toLowerCase() === "p") {
        e.preventDefault();
        playAudio();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleCheck();
      } else if (e.key.toLowerCase() === "i") {
        e.preventDefault();
        setShowInfo((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [currentQuestion, userInputs, checkClickCount, inputChanged]);

  if (!currentQuestion) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>Lade Fragen...</div>
    );
  }

  const formattedElements = formatNumberInput(currentQuestion.format);

  return (
    <div
      style={
        {
          // maxWidth: "900px",
          // margin: "0 auto",
          // padding: "20px",
          // fontFamily: "Arial, sans-serif",
        }
      }
    >
      <audio ref={audioRef} preload="auto" />

      <div className="w-full relative flex items-center justify-center mb-[1.6rem]">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/Zahlentrainer.jpg"
          imageAlt="Zahlentrainer"
        />
      </div>

      {/* Difficulty Selection */}
      <div style={{ marginBottom: "30px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Wähle hier die gewünschte Schwierigkeitsstufe aus:
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          {[
            { value: 1, label: "Einfach" },
            { value: 2, label: "Mittel" },
            { value: 3, label: "Schwer" },
            { value: 4, label: "Experte" },
          ].map(({ value, label }) => (
            <div
              key={value}
              onClick={() => setDifficulty(value)}
              style={{
                flex: 1,
                padding: "10px 20px",
                textAlign: "center",
                cursor: "pointer",
                border: "1px solid #ccc",
                backgroundColor: difficulty === value ? "#dc3545" : "white",
                color: difficulty === value ? "white" : "black",
                userSelect: "none",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Speed Selection */}
      <div style={{ marginBottom: "30px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Und hier die Geschwindigkeit der Audio-Dateien:
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          {[65, 75, 85, 95].map((value) => (
            <div
              key={value}
              onClick={() => setSpeed(value)}
              style={{
                flex: 1,
                padding: "10px 20px",
                textAlign: "center",
                cursor: "pointer",
                border: "1px solid #ccc",
                backgroundColor: speed === value ? "#dc3545" : "white",
                color: speed === value ? "white" : "black",
                userSelect: "none",
              }}
            >
              {(value / 100).toFixed(2)}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <p
        style={{
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Drücke „Play" (oder „P" auf der Tastatur) und schreibe die gehörte Zahl
        in die Kästchen.
        <br />
        Wenn Du fertig bist klicke „Prüfen" oder „Enter" auf Deiner Tastatur.
      </p>

      {/* Game Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Play Button */}
        <div
          onClick={playAudio}
          style={{
            width: "110px",
            height: "70px",
            backgroundColor: "#28a745",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "40px", color: "white" }}>▶</span>
        </div>

        {/* Number Input Container */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          {formattedElements.map((element, idx) => {
            if (element.type === "input") {
              const isIncorrect = incorrectIndices.includes(element.index);

              return (
                <input
                  key={`input-${idx}`}
                  ref={inputRefs[element.index]}
                  type="text"
                  maxLength={1}
                  value={userInputs[element.index] || ""}
                  onChange={(e) =>
                    handleInputChange(element.index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(element.index, e)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "20px",
                    border: isIncorrect ? "2px solid red" : "1px solid #28a745",
                    borderRadius: "5px",
                    backgroundColor: isIncorrect ? "#ffe6e6" : "white",
                    outline: "none",
                    boxShadow: isIncorrect ? "0 0 5px red" : "none",
                  }}
                />
              );
            } else if (element.type === "symbol") {
              return (
                <span
                  key={`symbol-${idx}`}
                  style={{ fontSize: "28px", fontWeight: "bold" }}
                >
                  {element.value}
                </span>
              );
            } else if (element.type === "unit") {
              return (
                <span
                  key={`unit-${idx}`}
                  style={{ fontSize: "24px", marginLeft: "10px" }}
                >
                  {element.value}
                </span>
              );
            } else if (element.type === "space") {
              return <span key={`space-${idx}`} style={{ width: "8px" }} />;
            }
            return null;
          })}
        </div>
      </div>

      {/* Info Display */}
      <div
        style={{
          border: "1px solid #436f4d",
          padding: "10px",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={() => setShowInfo(!showInfo)}
      >
        <div
          style={{
            position: "absolute",
            left: "10px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "2px solid #436f4d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#436f4d",
          }}
        >
          i
        </div>
        <p
          style={{
            color: "#436f4d",
            fontWeight: "bold",
            margin: 0,
            textAlign: "center",
          }}
        >
          {feedback === "correct" && "✓ Richtig! Weiter geht's!"}
          {feedback === "incorrect" &&
            "✗ Falsch, bitte überprüfe die markierten Stellen!"}
          {showInfo && !feedback && currentQuestion.word_hu}
        </p>
      </div>

      {/* Check Button */}
      <div style={{ textAlign: "right" }}>
        <button
          onClick={handleCheck}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 34px",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          PRÜFEN
        </button>
      </div>
    </div>
  );
};

export default HungarianNumberGame;
