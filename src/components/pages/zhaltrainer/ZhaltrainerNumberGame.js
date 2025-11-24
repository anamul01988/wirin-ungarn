import { ArchivePageHeaderImage } from "@/lib/utils/utils";
import React, { useState, useEffect, useRef } from "react";

// Sample data - replace with full JSON
const numbersData = {
  10001: {
    value: "1/2",
    word_hu: "egy ketted",
    kind: "Bruch",
    difficulty: "1",
    format: "0/0",
    numbers: "12",
    audio_file: "10001",
  },
  10002: {
    value: "3/4",
    word_hu: "háromnegyed",
    kind: "Bruch",
    difficulty: "1",
    format: "0/0",
    numbers: "34",
    audio_file: "10002",
  },
  10003: {
    value: "1/4",
    word_hu: "egy negyed",
    kind: "Bruch",
    difficulty: "1",
    format: "0/0",
    numbers: "14",
    audio_file: "10003",
  },
  10031: {
    value: "0,1",
    word_hu: "nulla egész egy tized",
    kind: "Dezimalzahl",
    difficulty: "1",
    format: "0,0",
    numbers: "01",
    audio_file: "10031",
  },
  10032: {
    value: "2,5",
    word_hu: "kettő egész öt tized",
    kind: "Dezimalzahl",
    difficulty: "1",
    format: "0,0",
    numbers: "25",
    audio_file: "10032",
  },
  10044: {
    value: "7",
    word_hu: "hét",
    kind: "Grundzahl",
    difficulty: "1",
    format: "0",
    numbers: "7",
    audio_file: "10044",
  },
  10045: {
    value: "13",
    word_hu: "tizenhárom",
    kind: "Grundzahl",
    difficulty: "1",
    format: "00",
    numbers: "13",
    audio_file: "10045",
  },
  10046: {
    value: "99",
    word_hu: "kilencvenkilenc",
    kind: "Grundzahl",
    difficulty: "1",
    format: "00",
    numbers: "99",
    audio_file: "10046",
  },
  10120: {
    value: "350 g",
    word_hu: "háromszázötven gramm",
    kind: "Maßeinheit",
    difficulty: "1",
    format: "000 g",
    numbers: "350",
    audio_file: "10120",
  },
  10163: {
    value: "200 Ft",
    word_hu: "kétszáz forint",
    kind: "Preis",
    difficulty: "1",
    format: "000 Ft",
    numbers: "200",
    audio_file: "10163",
  },
  10184: {
    value: "01:23",
    word_hu: "egy óra huszonhárom perc",
    kind: "Uhrzeit",
    difficulty: "1",
    format: "00:00",
    numbers: "0123",
    audio_file: "10184",
  },
  20077: {
    value: "10,3",
    word_hu: "tíz egész három tized",
    kind: "Dezimalzahl",
    difficulty: "2",
    format: "00,0",
    numbers: "103",
    audio_file: "20077",
  },
  20136: {
    value: "256",
    word_hu: "kétszázötvenhat",
    kind: "Grundzahl",
    difficulty: "2",
    format: "000",
    numbers: "256",
    audio_file: "20136",
  },
  20137: {
    value: "512",
    word_hu: "ötszáztizenkettő",
    kind: "Grundzahl",
    difficulty: "2",
    format: "000",
    numbers: "512",
    audio_file: "20137",
  },
  20235: {
    value: "12:34",
    word_hu: "tizenkettő óra harmincnégy perc",
    kind: "Uhrzeit",
    difficulty: "2",
    format: "00:00",
    numbers: "1234",
    audio_file: "20235",
  },
  30074: {
    value: "210",
    word_hu: "kétszáztíz",
    kind: "Grundzahl",
    difficulty: "3",
    format: "000",
    numbers: "210",
    audio_file: "30074",
  },
  30075: {
    value: "222",
    word_hu: "kétszázhuszonkettő",
    kind: "Grundzahl",
    difficulty: "3",
    format: "000",
    numbers: "222",
    audio_file: "30075",
  },
  40044: {
    value: "10329",
    word_hu: "tízezer-háromszázhuszonkilenc",
    kind: "Grundzahl",
    difficulty: "4",
    format: "00000",
    numbers: "10329",
    audio_file: "40044",
  },
  40045: {
    value: "12056",
    word_hu: "tizenkétezer-ötvenhat",
    kind: "Grundzahl",
    difficulty: "4",
    format: "00000",
    numbers: "12056",
    audio_file: "40045",
  },
};

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

  const getRandomQuestion = (diff) => {
    const filtered = Object.entries(numbersData).filter(
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

  const playAudio = () => {
    if (!currentQuestion) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.word_hu);
      utterance.lang = "hu-HU";
      utterance.rate = speed / 100;
      window.speechSynthesis.speak(utterance);
    }

    const emptyIndex = userInputs.findIndex((val) => !val);
    const focusIndex = emptyIndex >= 0 ? emptyIndex : 0;
    inputRefs[focusIndex]?.current?.focus();
  };

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
      style={{
        // maxWidth: "900px",
        margin: "0 auto",
        // padding: "20px",
        // fontFamily: "Arial, sans-serif",
      }}
    >
      <audio ref={audioRef} />

      <div className="w-full relative flex items-center justify-center mb-3">
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
