import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

// Quiz data - Replace this array with your full 415 questions
const QUIZ_DATA = [
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik a legnagyobb tó Magyarországon?",
    questionDE: "Welcher ist der größte See in Ungarn?",
    answers: [
      {
        answerHU: "Balaton",
        answerDE: "Plattensee (Balaton)",
        isCorrect: true,
      },
      { answerHU: "Velencei-tó", answerDE: "Velencei-See", isCorrect: false },
      { answerHU: "Fertő-tó", answerDE: "Neusiedler See", isCorrect: false },
    ],
    explanationHU:
      "A Balaton, a 'magyar tenger', Közép-Európa legnagyobb édesvizű tava, Magyarország nyugati felén terül el, népszerű üdülőhely.",
    explanationDE:
      "Der Balaton, das 'ungarische Meer', der größte Süßwassersee Mitteleuropas, liegt im westlichen Teil Ungarns und ist ein beliebter Ferienort.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Hány folyó szeli át Budapestet?",
    questionDE: "Wie viele Flüsse durchqueren Budapest?",
    answers: [
      {
        answerHU: "Csak egy, a Duna folyik keresztül.",
        answerDE: "Nur einer, die Donau fließt hindurch.",
        isCorrect: true,
      },
      {
        answerHU: "Kettő: a Duna és a Tisza folyók.",
        answerDE: "Zwei: die Flüsse Donau und Theiß.",
        isCorrect: false,
      },
      {
        answerHU: "Három: Duna, Tisza, és a Garam.",
        answerDE: "Drei: Donau, Theiß und die Gran.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Budapestet egyedül a Duna szeli át, mely kettéválasztja a várost Budára és Pestre, de egyben összeköti is a két partot.",
    explanationDE:
      "Budapest wird nur von der Donau durchflossen, die die Stadt in Buda und Pest teilt, aber auch beide Ufer miteinander verbindet.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Hogyan nevezik magyarul a 'Große Ungarische Tiefebene' területet?",
    questionDE: "Wie heißt die 'Große Ungarische Tiefebene' auf Ungarisch?",
    answers: [
      { answerHU: "Kisalföld", answerDE: "Kleine Tiefebene", isCorrect: false },
      { answerHU: "Alföld", answerDE: "Tiefebene", isCorrect: true },
      { answerHU: "Dunántúl", answerDE: "Transdanubien", isCorrect: false },
    ],
    explanationHU:
      "A legnagyobb tájegység az Alföld, melyet Nagy Magyar Alföldnek is hívnak. Az ország délkeleti részét foglalja el.",
    explanationDE:
      "Die größte Region ist die Tiefebene, die auch Große Ungarische Tiefebene genannt wird. Sie nimmt den südöstlichen Teil des Landes ein.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Mikor alapították a Magyar Királyságot?",
    questionDE: "Wann wurde das Königreich Ungarn gegründet?",
    answers: [
      { answerHU: "896", answerDE: "896", isCorrect: false },
      { answerHU: "1000", answerDE: "1000", isCorrect: true },
      { answerHU: "1222", answerDE: "1222", isCorrect: false },
    ],
    explanationHU:
      "Szent István 1000-ben koronázták magyar királlyá, megalapítva a Magyar Királyságot.",
    explanationDE:
      "Stephan der Heilige wurde im Jahr 1000 zum König von Ungarn gekrönt und gründete das Königreich Ungarn.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Ki volt Magyarország első királya?",
    questionDE: "Wer war der erste König von Ungarn?",
    answers: [
      { answerHU: "Árpád", answerDE: "Árpád", isCorrect: false },
      {
        answerHU: "Szent István",
        answerDE: "Stephan der Heilige",
        isCorrect: true,
      },
      {
        answerHU: "Mátyás király",
        answerDE: "König Matthias",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szent István volt Magyarország első királya, 1000-ben koronázták.",
    explanationDE:
      "Stephan der Heilige war der erste König von Ungarn, gekrönt im Jahr 1000.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mikor volt a tatárjárás Magyarországon?",
    questionDE: "Wann war der Mongolensturm in Ungarn?",
    answers: [
      { answerHU: "1241-1242", answerDE: "1241-1242", isCorrect: true },
      { answerHU: "1456", answerDE: "1456", isCorrect: false },
      { answerHU: "1526", answerDE: "1526", isCorrect: false },
    ],
    explanationHU: "A tatárjárás 1241-1242-ben pusztította Magyarországot.",
    explanationDE: "Der Mongolensturm verwüstete Ungarn 1241-1242.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a gulyás?",
    questionDE: "Was ist Gulasch?",
    answers: [
      { answerHU: "Egy sütemény", answerDE: "Ein Gebäck", isCorrect: false },
      {
        answerHU: "Egy hús- és zöldségesleves",
        answerDE: "Eine Fleisch- und Gemüsesuppe",
        isCorrect: true,
      },
      { answerHU: "Egy bor", answerDE: "Ein Wein", isCorrect: false },
    ],
    explanationHU:
      "A gulyás egy hagyományos magyar húsleves paprikával és zöldségekkel.",
    explanationDE:
      "Gulasch ist eine traditionelle ungarische Fleischsuppe mit Paprika und Gemüse.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mi a pörkölt?",
    questionDE: "Was ist Pörkölt?",
    answers: [
      { answerHU: "Egy leves", answerDE: "Eine Suppe", isCorrect: false },
      {
        answerHU: "Egy paprikás húsétel",
        answerDE: "Ein Paprikaschfleischgericht",
        isCorrect: true,
      },
      { answerHU: "Egy sütemény", answerDE: "Ein Gebäck", isCorrect: false },
    ],
    explanationHU: "A pörkölt egy vastag, paprikás mártásban főzött húsétel.",
    explanationDE:
      "Pörkölt ist ein Fleischgericht, das in einer dicken Paprikasauce gekocht wird.",
  },
  {
    category: "Kulinarik",
    level: 3,
    questionHU: "Mi a pálinka?",
    questionDE: "Was ist Pálinka?",
    answers: [
      { answerHU: "Egy bor", answerDE: "Ein Wein", isCorrect: false },
      {
        answerHU: "Egy gyümölcspárlat",
        answerDE: "Ein Obstbrand",
        isCorrect: true,
      },
      { answerHU: "Egy sör", answerDE: "Ein Bier", isCorrect: false },
    ],
    explanationHU: "A pálinka egy hagyományos magyar gyümölcspárlat.",
    explanationDE: "Pálinka ist ein traditioneller ungarischer Obstbrand.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki volt Liszt Ferenc?",
    questionDE: "Wer war Franz Liszt?",
    answers: [
      { answerHU: "Festő", answerDE: "Maler", isCorrect: false },
      {
        answerHU: "Zeneszerző és zongorista",
        answerDE: "Komponist und Pianist",
        isCorrect: true,
      },
      { answerHU: "Politikus", answerDE: "Politiker", isCorrect: false },
    ],
    explanationHU:
      "Liszt Ferenc világhírű magyar zeneszerző és zongorista volt.",
    explanationDE:
      "Franz Liszt war ein weltberühmter ungarischer Komponist und Pianist.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki volt Bartók Béla?",
    questionDE: "Wer war Béla Bartók?",
    answers: [
      { answerHU: "Író", answerDE: "Schriftsteller", isCorrect: false },
      {
        answerHU: "Zeneszerző és népzenekutató",
        answerDE: "Komponist und Volksmusikforscher",
        isCorrect: true,
      },
      { answerHU: "Politikus", answerDE: "Politiker", isCorrect: false },
    ],
    explanationHU: "Bartók Béla híres magyar zeneszerző és népzenekutató volt.",
    explanationDE:
      "Béla Bartók war ein berühmter ungarischer Komponist und Volksmusikforscher.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Ki volt Semmelweis Ignác?",
    questionDE: "Wer war Ignaz Semmelweis?",
    answers: [
      { answerHU: "Zeneszerző", answerDE: "Komponist", isCorrect: false },
      {
        answerHU: "Orvos, az anyák megmentője",
        answerDE: "Arzt, der Retter der Mütter",
        isCorrect: true,
      },
      { answerHU: "Festő", answerDE: "Maler", isCorrect: false },
    ],
    explanationHU:
      "Semmelweis Ignác magyar orvos, akit 'az anyák megmentőjének' neveznek a gyermekágyi láz elleni küzdelme miatt.",
    explanationDE:
      "Ignaz Semmelweis war ein ungarischer Arzt, der als 'Retter der Mütter' für seinen Kampf gegen das Kindbettfieber bekannt ist.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mikor ünneplik Magyarországon március 15-ét?",
    questionDE: "Wann wird in Ungarn der 15. März gefeiert?",
    answers: [
      {
        answerHU: "A tavasz kezdete",
        answerDE: "Der Frühlingsbeginn",
        isCorrect: false,
      },
      {
        answerHU: "Az 1848-as forradalom emléknapja",
        answerDE: "Gedenktag der Revolution von 1848",
        isCorrect: true,
      },
      {
        answerHU: "Szent István ünnepe",
        answerDE: "Fest des Heiligen Stephan",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Március 15. az 1848-as forradalom és szabadságharc emléknapja Magyarországon.",
    explanationDE:
      "Der 15. März ist der Gedenktag der Revolution und des Freiheitskampfes von 1848 in Ungarn.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi a busójárás?",
    questionDE: "Was ist Busójárás?",
    answers: [
      { answerHU: "Egy tánc", answerDE: "Ein Tanz", isCorrect: false },
      {
        answerHU: "Egy farsangi népszokás Mohácson",
        answerDE: "Ein Faschingsbrauch in Mohács",
        isCorrect: true,
      },
      {
        answerHU: "Egy ételfajta",
        answerDE: "Eine Speiseart",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A busójárás egy hagyományos farsangi népszokás Mohácson, ahol maszkos alakok járják a várost.",
    explanationDE:
      "Busójárás ist ein traditioneller Faschingsbrauch in Mohács, bei dem maskierte Gestalten durch die Stadt ziehen.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi a csárdás?",
    questionDE: "Was ist Csárdás?",
    answers: [
      { answerHU: "Egy étel", answerDE: "Ein Gericht", isCorrect: false },
      {
        answerHU: "Egy hagyományos magyar tánc",
        answerDE: "Ein traditioneller ungarischer Tanz",
        isCorrect: true,
      },
      { answerHU: "Egy épület", answerDE: "Ein Gebäude", isCorrect: false },
    ],
    explanationHU:
      "A csárdás egy hagyományos magyar páros tánc, gyors és lassú részekkel.",
    explanationDE:
      "Csárdás ist ein traditioneller ungarischer Paartanz mit schnellen und langsamen Teilen.",
  },
];

const HungarianQuiz = () => {
  const [quizData] = useState(QUIZ_DATA);
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
    <div>
      <div
        className="mb-4 rounded-[18px] h-[50px] bg-[#D02C3C] flex items-center justify-center"
        // style={styles.wrapper}
      >
        <Typography
          variant="h4"
          className="archive__page_title font-bold text-center text-[#FFF]"
        >
          Kultour Ungarn
        </Typography>
      </div>

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
  // wrapper: {
  //   fontFamily:
  //     "'Roboto Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  //   backgroundColor: "#f5f5f5",
  //   minHeight: "100vh",
  //   padding: "20px",
  // },
  mainTitle: {
    // maxWidth: "800px",
    margin: "0 auto 20px",
    fontSize: "32px",
    fontWeight: "400",
    color: "#333",
    letterSpacing: "0.5px",
  },
  container: {
    // maxWidth: "800px",
    margin: "0 auto",
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
    padding: "12px 20px",
    backgroundColor: "#436f4d",
    cursor: "pointer",
    borderRadius: "2px 2px 0 0",
  },
  settingsTitle: {
    color: "#fff",
    margin: 0,
    fontSize: "18px",
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
    fontSize: "18px",
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
    fontSize: "15px",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  button: {
    fontSize: "16px",
    padding: "8px 24px",
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
    padding: "20px",
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
