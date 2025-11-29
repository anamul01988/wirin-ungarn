import { ArchivePageHeaderImage } from "@/lib/utils/utils";
import vocabularyData from "@/lib/utils/vocalGameData";
import React, { useState, useEffect, useRef } from "react";

const themes = [
  { value: "Vásárlás", label: "Vásárlás | Einkaufen" },
  { value: "Ítalok", label: "Ítalok | Getränke" },
  {
    value: "Gyümölcs és zöldség",
    label: "Gyümölcs és zöldség | Obst und Gemüse",
  },
  { value: "Gabonatermékek", label: "Gabonatermékek | Getreideprodukte" },
  { value: "Hús és hal", label: "Hús és hal | Fleisch und Fisch" },
  {
    value: "Tej és tojástermékek",
    label: "Tej és tojástermékek | Milch- und Ei-Produkte",
  },
  {
    value: "Édességek és rágcsálnivalók",
    label: "Édességek és rágcsálnivalók | Süßigkeiten und Snacks",
  },
  {
    value: "Fűszerek és fűszernövények",
    label: "Fűszerek és fűszernövények | Gewürze und Kräuter",
  },
  {
    value: "A terített asztal",
    label: "A terített asztal | Der gedeckte Tisch",
  },
  {
    value: "Konyhai berendezések és eszközök",
    label: "Konyhai berendezések és eszközök | Küchengeräte und -utensilien",
  },
  { value: "Család", label: "Család | Familie" },
  { value: "Testrészek", label: "Testrészek | Körperteile" },
  { value: "Érzelmek", label: "Érzelmek | Gefühle" },
  { value: "Szakmák", label: "Szakmák | Berufe" },
  { value: "Iskola", label: "Iskola | Schule" },
  { value: "Ruházat", label: "Ruházat | Kleidung" },
  {
    value: "Épületek és helyiségek",
    label: "Épületek és helyiségek | Gebäude und Räume",
  },
  { value: "Bútorok", label: "Bútorok | Möbel" },
  { value: "Fürdőszoba", label: "Fürdőszoba | Badezimmer" },
  { value: "Járművek", label: "Járművek | Fahrzeuge" },
  { value: "Tömegközlekedés", label: "Tömegközlekedés | öffentlicher Verkehr" },
  {
    value: "Közlekedési táblák",
    label: "Közlekedési táblák | Verkehrszeichen",
  },
  { value: "Országok", label: "Országok | Länder" },
  {
    value: "Hatóságok és intézmények",
    label: "Hatóságok és intézmények | Behörden und Institutionen",
  },
  { value: "Banki ügyek", label: "Banki ügyek | Bankwesen" },
  { value: "Elmegyünk szórakozni", label: "Elmegyünk szórakozni | Ausgehen" },
  { value: "Nyaralás", label: "Nyaralás | Urlaub" },
  {
    value: "Ünnepek és fesztiválok",
    label: "Ünnepek és fesztiválok | Feiertage und Feste",
  },
  { value: "Sport", label: "Sport | Sport" },
  {
    value: "Szabadidős tevékenységek",
    label: "Szabadidős tevékenységek | Freizeitbeschäftigungen",
  },
  { value: "Hobbik", label: "Hobbik | Hobbys" },
  { value: "Zene", label: "Zene | Musik" },
  { value: "Művészet", label: "Művészet | Kunst" },
  { value: "Természet", label: "Természet | Natur" },
  { value: "Tájképek", label: "Tájképek | Landschaften" },
  { value: "Időjárás", label: "Időjárás | Wetter" },
  { value: "Növények", label: "Növények | Pflanzen" },
  { value: "Állatok", label: "Állatok | Tiere" },
  { value: "Kert", label: "Kert | Garten" },
  { value: "Számítógép", label: "Számítógép | Computer" },
  { value: "Mobiltelefon", label: "Mobiltelefon | Handy" },
  {
    value: "Szórakoztató elektronika",
    label: "Szórakoztató elektronika | Unterhaltungselektronik",
  },
  {
    value: "Szerszámok és gépek",
    label: "Szerszámok és gépek | Werkzeug und Maschinen",
  },
];

const AUDIO_BASE_URL =
  "https://wir-in-ungarn.hu/wiuplugins/hungarian-vocab-game/assets/audio/";

function VocabGame() {
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [theme, setTheme] = useState("Ruházat");
  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    initGame(theme);
  }, [theme]);

  function initGame(selectedTheme) {
    const vocab = vocabularyData[selectedTheme] || [];

    if (vocab.length === 0) {
      setCards([]);
      setRevealed(0);
      return;
    }

    // Separate words and sentences based on audio_code
    let wordPairs = [];
    let sentencePairs = [];

    vocab.forEach((pair) => {
      const audioCode = pair.audio_code || "";
      const lastThree = audioCode.slice(-3).toLowerCase();

      if (lastThree.includes("w")) {
        wordPairs.push(pair);
      } else if (lastThree.includes("s")) {
        sentencePairs.push(pair);
      }
    });

    // Shuffle word pairs
    if (wordPairs.length > 0) {
      wordPairs = shuffleArray(wordPairs);
    }

    // Shuffle sentence pairs but keep them at the bottom
    if (sentencePairs.length > 0) {
      sentencePairs = shuffleArray(sentencePairs);
    }

    // Combine lists with word pairs first, then sentence pairs
    const sortedVocabulary = [...wordPairs, ...sentencePairs];

    const newCards = [];

    sortedVocabulary.forEach((pair, i) => {
      newCards.push({
        id: `h${i}`,
        text: pair.hungarian,
        lang: "hun",
        pair: i,
        audio: pair.audio_code,
        blur: false,
        flash: false,
      });
      newCards.push({
        id: `g${i}`,
        text: pair.german,
        lang: "ger",
        pair: i,
        audio: null,
        blur: false,
        flash: false,
      });
    });

    // Blur exactly 20 random pairs (one card from each pair)
    const pairsBlurred = new Set();
    let blurCount = 0;
    const maxBlur = Math.min(20, sortedVocabulary.length);

    while (blurCount < maxBlur) {
      const pairId = Math.floor(Math.random() * sortedVocabulary.length);

      if (!pairsBlurred.has(pairId)) {
        // Randomly choose Hungarian or German card from this pair
        const cardIndex = Math.random() < 0.5 ? pairId * 2 : pairId * 2 + 1;
        newCards[cardIndex].blur = true;
        pairsBlurred.add(pairId);
        blurCount++;
      }
    }

    setCards(newCards);
    setRevealed(0);
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function playAudio(audioCode) {
    if (!audioCode) return;

    const audioUrl = `${AUDIO_BASE_URL}${audioCode}.ogg`;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }

  function handleClick(clickedId) {
    const idx = cards.findIndex((c) => c.id === clickedId);
    if (idx === -1) return;

    const card = cards[idx];

    // Play audio for Hungarian cards
    if (card.lang === "hun" && card.audio) {
      playAudio(card.audio);
    }

    if (!card.blur) return;

    const updated = [...cards];
    updated[idx].blur = false;
    updated[idx].flash = true;

    const available = updated
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => !c.blur && c.pair !== card.pair);

    if (available.length > 0) {
      const randomIdx =
        available[Math.floor(Math.random() * available.length)].i;
      updated[randomIdx].blur = true;
    }

    setCards(updated);
    setRevealed((prev) => prev + 1);

    setTimeout(() => {
      setCards((prev) => {
        const copy = [...prev];
        copy[idx].flash = false;
        return copy;
      });
    }, 1000);
  }

  const blurredCount = cards.filter((c) => c.blur).length;
  const hasVocabulary = cards.length > 0;

  return (
    <div style={styles.container}>
      <div className="w-full relative flex items-center justify-center mb-3">
        <ArchivePageHeaderImage
          imageUrl="/headlineImages/Vokabelentdecker.jpg"
          imageAlt="Vokabelentdecker"
        />
      </div>
      <div style={styles.instructBox}>
        <div
          style={styles.instructHeader}
          onClick={() => setInstructionsOpen(!instructionsOpen)}
        >
          <span style={styles.instructTitle}>
            Wie spielt man Vokabel-Entdecker?
          </span>
          <span style={styles.instructToggle}>
            {instructionsOpen ? "▲" : "▼"}
          </span>
        </div>
        {instructionsOpen && (
          <div style={styles.instructContent}>
            <p>
              In diesem Spiel kannst du ganz einfach neue Vokabeln lernen! Wähle
              zunächst ein Thema aus dem Dropdown-Menü, z. B. "Obst und Gemüse".
              Auf der Oberfläche siehst du Vokabelkarten in zwei Sprachen, wobei
              einige Wörter unscharf dargestellt sind. Klicke auf eine solche
              Karte, um das Wort aufzudecken – dabei wird eine andere Karte
              unscharf.
            </p>
            <p>
              Besonders praktisch: Wenn du auf die ungarischen Karten klickst,
              hörst du die richtige Aussprache der Wörter. Versuche, dir die
              Übersetzungen zu merken, bevor du sie aufdeckst, und trainiere so
              dein Gedächtnis und deine Sprachkenntnisse.
            </p>
            <p>Viel Spaß beim Lernen!</p>
          </div>
        )}
      </div>

      <div style={styles.themeSelector}>
        <label style={styles.label}>Wähle ein Thema aus</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={styles.select}
        >
          {themes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {!hasVocabulary && (
        <div style={styles.noDataMessage}>
          <p>
            Vocabulary data for this theme is not yet available. Please select
            another theme.
          </p>
          <p style={styles.noDataSubtext}>
            Die Vokabeldaten für dieses Thema sind noch nicht verfügbar. Bitte
            wähle ein anderes Thema.
          </p>
        </div>
      )}

      {hasVocabulary && (
        <>
          <div style={styles.grid}>
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleClick(card.id)}
                style={{
                  ...styles.card,
                  ...(card.lang === "hun" ? styles.cardHun : styles.cardGer),
                  ...(card.flash ? styles.cardFlash : {}),
                }}
              >
                <span
                  style={{
                    filter: card.blur ? "blur(5px)" : "none",
                    userSelect: card.blur ? "none" : "auto",
                  }}
                >
                  {card.text}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.stats}>
            Revealed words: <strong style={styles.statsNum}>{revealed}</strong>{" "}
            | Words left to reveal:{" "}
            <strong style={styles.statsNum}>{blurredCount}</strong>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    // fontFamily: "Arial, sans-serif",
    // maxWidth: "800px",
    margin: "0 auto",
    // padding: "20px",
  },
  instructBox: {
    border: "3px solid #436f4d",
    marginBottom: "20px",
  },
  instructHeader: {
    backgroundColor: "#436f4d",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    color: "white",
  },
  instructTitle: {
    fontWeight: "bold",
    margin: 0,
  },
  instructToggle: {
    fontSize: "14px",
  },
  instructContent: {
    padding: "15px",
    lineHeight: "1.6",
  },
  themeSelector: {
    textAlign: "center",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    minWidth: "300px",
  },
  noDataMessage: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#fff3cd",
    borderRadius: "8px",
    border: "2px solid #ffc107",
    marginTop: "20px",
  },
  noDataSubtext: {
    color: "#666",
    fontSize: "14px",
    marginTop: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "20px",
  },
  card: {
    padding: "15px",
    textAlign: "center",
    borderRadius: "5px",
    cursor: "pointer",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    fontSize: "14px",
    position: "relative",
  },
  cardHun: {
    border: "2px solid #436f4d",
    backgroundColor: "#e8f5e9",
  },
  cardGer: {
    border: "2px solid #cc2233",
    backgroundColor: "#ffebee",
  },
  cardFlash: {
    backgroundColor: "#64b5f6",
    transform: "scale(1.05)",
  },
  stats: {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    fontSize: "16px",
  },
  statsNum: {
    color: "#436f4d",
    margin: "0 5px",
  },
};

export default VocabGame;
