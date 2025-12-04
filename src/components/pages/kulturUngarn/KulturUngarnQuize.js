// import { ArchivePageHeaderImage } from "@/lib/utils/utils";
// import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { FRENCH_QUIZ_DATA } from "@/lib/utils/kultour_ungarn_data";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";
const HungarianQuiz = () => {
  const [quizData] = useState(FRENCH_QUIZ_DATA);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shownQuestionIds, setShownQuestionIds] = useState(new Set());
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Get unique categories
  const categories = [...new Set(quizData.map((q) => q.category))].sort();

  // Initialize with first category selected
  useEffect(() => {
    if (categories.length > 0 && selectedCategories.length === 0) {
      setSelectedCategories([categories[0]]);
    }
  }, [categories]);

  // Generate unique ID for a question
  const getQuestionId = (question) => {
    return `${question.category}-${question.level}-${question.questionHU}`;
  };

  // Shuffle array utility
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get all questions matching current settings
  const getMatchingQuestions = () => {
    return quizData.filter(
      (q) =>
        q.level === selectedDifficulty &&
        selectedCategories.includes(q.category)
    );
  };

  // Load next question
  const loadNextQuestion = () => {
    const allMatchingQuestions = getMatchingQuestions();

    if (allMatchingQuestions.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    // Get questions not yet shown in this round
    let availableQuestions = allMatchingQuestions.filter((q) => {
      const qId = getQuestionId(q);
      return !shownQuestionIds.has(qId);
    });

    // If all questions shown, reset the round (start new cycle)
    if (availableQuestions.length === 0) {
      setShownQuestionIds(new Set());
      availableQuestions = allMatchingQuestions;
    }

    // Pick random question from available pool
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    // Create question with shuffled answers and unique ID
    const questionWithShuffledAnswers = {
      ...selectedQuestion,
      answers: shuffleArray(selectedQuestion.answers),
      id: getQuestionId(selectedQuestion),
    };

    // Update current question
    setCurrentQuestion(questionWithShuffledAnswers);

    // Mark this question as shown in current round
    setShownQuestionIds(
      (prev) => new Set([...prev, questionWithShuffledAnswers.id])
    );

    // Reset answer selection
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // Load initial question and reset round when settings change
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    // Reset the round when settings change
    setShownQuestionIds(new Set());
    loadNextQuestion();
  }, [selectedDifficulty, selectedCategories, quizData]);

  // Handle category toggle
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle answer selection
  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  // Handle next question
  const handleNextQuestion = () => {
    loadNextQuestion();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (key === "enter") {
        handleNextQuestion();
        return;
      }

      if (selectedAnswer === null && currentQuestion) {
        let answerIndex = null;
        if (key === "1" || key === "a") answerIndex = 0;
        else if (key === "2" || key === "b") answerIndex = 1;
        else if (key === "3" || key === "c") answerIndex = 2;

        if (answerIndex !== null && currentQuestion?.answers[answerIndex]) {
          handleAnswerClick(answerIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAnswer, currentQuestion]);

  return (
    <div style={styles.wrapper}>
      {/* <h1 style={styles.mainTitle}>KulTour Ungarn</h1> */}
      <div className="w-full relative flex items-center justify-center mb-3">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/Kultour-Ungarn.jpg"
          imageAlt="kultour Ungarn"
        />
      </div>

      <p className="archive__page_description leading-relaxed font-semibold mb-6">
        Manchmal sieht man den Wald vor lauter Bäumen nicht. Und ein anderes Mal
        hat man etwas 5 x geprüft (und auch prüfen lassen) und es ist dennoch
        was falsch. So sind auch wir sicher nicht davor verschont, dass sich in
        unseren Schulungsunterlagen ein Fehler eingeschlichen haben könnte. Aber
        wir als Gemeinschaft schaffen es sicher das immer weiter zu optimieren.
      </p>

      <div style={styles.container}>
        {/* Settings Panel */}
        <div style={styles.settings}>
          <div
            style={styles.settingsHeader}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <p style={styles.settingsTitle}>
              <span style={styles.settingsIcon}>⚙</span>
              Quiz-Einstellungen
            </p>
            <button style={styles.settingsToggle}>
              {settingsOpen ? "▼" : "▶"}
            </button>
          </div>

          {settingsOpen && (
            <div style={styles.settingsContent}>
              {/* Difficulty Section */}
              <div style={styles.section}>
                <p style={styles.label}>
                  Wähle hier die gewünschte Schwierigkeitsstufe aus:
                </p>
                <div style={styles.buttonGroup}>
                  <button
                    style={{
                      ...styles.button,
                      ...(selectedDifficulty === 1
                        ? styles.buttonSelected
                        : {}),
                    }}
                    onClick={() => setSelectedDifficulty(1)}
                  >
                    Einfach
                  </button>
                  <button
                    style={{
                      ...styles.button,
                      ...(selectedDifficulty === 2
                        ? styles.buttonSelected
                        : {}),
                    }}
                    onClick={() => setSelectedDifficulty(2)}
                  >
                    Mittel
                  </button>
                  <button
                    style={{
                      ...styles.button,
                      ...(selectedDifficulty === 3
                        ? styles.buttonSelected
                        : {}),
                    }}
                    onClick={() => setSelectedDifficulty(3)}
                  >
                    Schwer
                  </button>
                </div>
              </div>

              {/* Category Section */}
              <div style={styles.section}>
                <p style={styles.label}>
                  Wähle hier die gewünschten Kategorien aus:
                </p>
                <div style={styles.buttonGroup}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      style={{
                        ...styles.button,
                        ...(selectedCategories.includes(cat)
                          ? styles.buttonSelected
                          : {}),
                      }}
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quiz Container */}
        {!currentQuestion && selectedCategories.length > 0 && (
          <div style={styles.noQuestions}>
            <p>
              Für die ausgewählten Einstellungen sind keine Fragen vorhanden.
            </p>
          </div>
        )}

        {currentQuestion && (
          <div style={styles.quizContainer}>
            <p style={styles.instruction}>
              Wähle durch Anklicken die richtige Antwort aus.
            </p>

            {/* Question */}
            <div style={styles.questionContainer}>
              <div style={styles.questionInner}>
                <p style={styles.questionHU}>{currentQuestion.questionHU}</p>
                <p style={styles.questionDE}>{currentQuestion.questionDE}</p>
              </div>
            </div>

            {/* Answers */}
            <div style={styles.answersWrapper}>
              {currentQuestion.answers.map((answer, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = answer.isCorrect;
                const isDisabled = selectedAnswer !== null;

                let answerStyle = { ...styles.answer };
                let letterStyle = { ...styles.answerLetter };
                let textHUStyle = { ...styles.answerHU };
                let textDEStyle = { ...styles.answerDE };

                if (isDisabled) {
                  answerStyle = { ...answerStyle, ...styles.answerDisabled };
                  letterStyle = { ...letterStyle, color: "lightgrey" };
                  textHUStyle = { ...textHUStyle, color: "lightgrey" };
                  textDEStyle = { ...textDEStyle, color: "lightgrey" };

                  if (isCorrect) {
                    answerStyle = { ...answerStyle, ...styles.answerCorrect };
                    letterStyle = { ...letterStyle, color: "#436f4d" };
                    textHUStyle = { ...textHUStyle, color: "#436f4d" };
                    textDEStyle = { ...textDEStyle, color: "#436f4d" };
                  } else if (isSelected) {
                    answerStyle = { ...answerStyle, ...styles.answerIncorrect };
                    textHUStyle = { ...textHUStyle, color: "#cc2233" };
                    textDEStyle = { ...textDEStyle, color: "#cc2233" };
                  }
                }

                return (
                  <div key={index} style={styles.answerContainer}>
                    <span style={letterStyle}>{["A", "B", "C"][index]}</span>
                    <div
                      style={answerStyle}
                      onClick={() => handleAnswerClick(index)}
                    >
                      <div>
                        <p style={textHUStyle}>{answer.answerHU}</p>
                        <p style={textDEStyle}>{answer.answerDE}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div style={styles.explanation}>
                <p style={styles.explanationLabel}>Erklärung zur Antwort</p>
                <div style={styles.explanationInner}>
                  <p style={styles.explanationHU}>
                    {currentQuestion.explanationHU}
                  </p>
                  <p style={styles.explanationDE}>
                    {currentQuestion.explanationDE}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={styles.navigation}>
              <button style={styles.nextButton} onClick={handleNextQuestion}>
                NÄCHSTE FRAGE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    // fontFamily:
    //   "'Roboto Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    // backgroundColor: "#f5f5f5",
    // minHeight: "100vh",
    // padding: "20px",
  },
  mainTitle: {
    maxWidth: "800px",
    margin: "0 auto 20px",
    fontSize: "32px",
    fontWeight: "400",
    color: "#333",
    letterSpacing: "0.5px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0px 60px",
  },
  settings: {
    border: "3px solid #436f4d",
    borderRadius: "5px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
  settingsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1px 20px",
    backgroundColor: "#436f4d",
    cursor: "pointer",
    borderRadius: "2px 2px 0 0",
  },
  settingsTitle: {
    color: "#fff",
    margin: 0,
    fontSize: "16px",
    fontWeight: "normal",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  settingsIcon: {
    fontSize: "20px",
  },
  settingsToggle: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    padding: "0",
    fontFamily: "inherit",
  },
  settingsContent: {
    padding: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  label: {
    fontWeight: "600",
    marginBottom: "10px",
    fontSize: "13px",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  button: {
    fontSize: "16px",
    padding: "4px 24px",
    border: "1px solid #ccc",
    background: "white",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "3px",
    transition: "all 0.2s",
    fontFamily: "inherit",
    fontWeight: "normal",
  },
  buttonSelected: {
    background: "#dc3545",
    color: "white",
    borderColor: "#dc3545",
  },
  quizContainer: {
    marginTop: "0",
  },
  instruction: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#555",
  },
  questionContainer: {
    marginBottom: "20px",
    border: "2px solid #000",
    borderRadius: "5px",
    backgroundColor: "white",
  },
  questionInner: {
    padding: "16px",
    textAlign: "center",
  },
  questionHU: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#436f4d",
    margin: "0 0 8px 0",
    lineHeight: "1.3",
  },
  questionDE: {
    fontSize: "17px",
    color: "#436f4d",
    margin: 0,
    lineHeight: "1.3",
    fontWeight: "400",
  },
  answersWrapper: {
    marginBottom: "20px",
  },
  answerContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    position: "relative",
    paddingLeft: "50px",
  },
  answerLetter: {
    position: "absolute",
    left: "0",
    fontSize: "32px",
    fontWeight: "700",
    color: "#436f4d",
    width: "40px",
    textAlign: "center",
  },
  answer: {
    flex: 1,
    padding: "12px 20px",
    border: "2px solid #436f4d",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: "white",
  },
  answerHU: {
    fontWeight: "700",
    color: "#cc2233",
    margin: "0 0 4px 0",
    lineHeight: "1.2",
    fontSize: "17px",
  },
  answerDE: {
    color: "#436f4d",
    margin: 0,
    lineHeight: "1.2",
    fontSize: "16px",
    fontWeight: "normal",
  },
  answerDisabled: {
    cursor: "default",
    opacity: 0.85,
    borderColor: "lightgrey",
  },
  answerCorrect: {
    backgroundColor: "#d4edda",
    borderColor: "#436f4d",
  },
  answerIncorrect: {
    backgroundColor: "#f8d7da",
    borderColor: "#cc2233",
  },
  explanation: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  explanationLabel: {
    color: "#cc2233",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  explanationInner: {
    textAlign: "left",
    padding: "15px 20px",
    border: "2px solid #a9a9a9",
    borderRadius: "5px",
    backgroundColor: "white",
  },
  explanationHU: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#436f4d",
    marginBottom: "8px",
    lineHeight: "1.3",
  },
  explanationDE: {
    fontSize: "16px",
    color: "#436f4d",
    margin: 0,
    lineHeight: "1.3",
    fontWeight: "normal",
  },
  navigation: {
    textAlign: "right",
    marginTop: "20px",
  },
  nextButton: {
    padding: "12px 28px",
    fontSize: "15px",
    cursor: "pointer",
    backgroundColor: "#436f4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    transition: "background 0.2s",
    fontFamily: "inherit",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  noQuestions: {
    marginTop: "20px",
    padding: "30px",
    textAlign: "center",
    fontSize: "18px",
    color: "#436f4d",
    border: "3px solid #436f4d",
    borderRadius: "5px",
    backgroundColor: "white",
  },
};

export default HungarianQuiz;
