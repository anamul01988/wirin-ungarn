import React, { useState, useEffect } from "react";

const vocabularyData = {
  Vásárlás: [
    { hungarian: "üzlet", german: "Geschäft", audio_code: "EIW01" },
    { hungarian: "áruház", german: "Kaufhaus", audio_code: "EIW02" },
    {
      hungarian: "bevásárlóközpont",
      german: "Einkaufszentrum",
      audio_code: "EIW03",
    },
    { hungarian: "szupermarket", german: "Supermarkt", audio_code: "EIW04" },
    { hungarian: "piac", german: "Markt", audio_code: "EIW05" },
    { hungarian: "pénztár", german: "Kasse", audio_code: "EIW06" },
    {
      hungarian: "Ma bevásárolok.",
      german: "Heute kaufe ich ein.",
      audio_code: "EIS01",
    },
  ],
  Ruházat: [
    { hungarian: "ruha", german: "Kleid", audio_code: "KLW01" },
    { hungarian: "póló", german: "T-Shirt", audio_code: "KLW02" },
    { hungarian: "ing", german: "Hemd", audio_code: "KLW03" },
    { hungarian: "kabát", german: "Mantel", audio_code: "KLW06" },
    { hungarian: "nadrág", german: "Hose", audio_code: "KLW07" },
    { hungarian: "cipő", german: "Schuhe", audio_code: "KLW10" },
  ],
  "Étel és ital": [
    { hungarian: "kenyér", german: "Brot", audio_code: "ESW01" },
    { hungarian: "tej", german: "Milch", audio_code: "ESW02" },
    { hungarian: "víz", german: "Wasser", audio_code: "ESW03" },
    { hungarian: "kávé", german: "Kaffee", audio_code: "ESW04" },
    { hungarian: "tea", german: "Tee", audio_code: "ESW05" },
    { hungarian: "sör", german: "Bier", audio_code: "ESW06" },
  ],
  Számok: [
    { hungarian: "egy", german: "eins", audio_code: "ZAW01" },
    { hungarian: "kettő", german: "zwei", audio_code: "ZAW02" },
    { hungarian: "három", german: "drei", audio_code: "ZAW03" },
    { hungarian: "négy", german: "vier", audio_code: "ZAW04" },
    { hungarian: "öt", german: "fünf", audio_code: "ZAW05" },
    { hungarian: "hat", german: "sechs", audio_code: "ZAW06" },
  ],
};

function VocabGame() {
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [theme, setTheme] = useState("Vásárlás");
  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    initGame(theme);
  }, [theme]);

  function initGame(selectedTheme) {
    const vocab = vocabularyData[selectedTheme] || [];
    const newCards = [];

    vocab.forEach((pair, i) => {
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

    // Blur random cards
    const pairsBlurred = new Set();
    let blurCount = 0;
    const maxBlur = Math.min(10, vocab.length);

    while (blurCount < maxBlur) {
      const idx = Math.floor(Math.random() * newCards.length);
      const card = newCards[idx];
      if (!pairsBlurred.has(card.pair)) {
        newCards[idx].blur = true;
        pairsBlurred.add(card.pair);
        blurCount++;
      }
    }

    setCards(newCards);
    setRevealed(0);
  }

  function handleClick(clickedId) {
    const idx = cards.findIndex((c) => c.id === clickedId);
    if (idx === -1) return;

    const card = cards[idx];

    if (card.lang === "hun" && card.audio) {
      console.log(`🔊 Audio: ${card.audio}.ogg`);
      // Simulated audio playback
      const audio = new Audio();
      audio.src = `/assets/audio/${card.audio}.ogg`;
      audio.play().catch((err) => console.log("Audio playback not available"));
    }

    if (!card.blur) return;

    const updated = [...cards];
    updated[idx].blur = false;
    updated[idx].flash = true;

    // Find another to blur
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

  return (
    <div style={styles.container}>
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
              Klicke auf unscharfe Karten, um sie aufzudecken. Dabei wird eine
              andere Karte unscharf. Ungarische Karten spielen Audio ab (siehe
              Konsole).
            </p>
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
          <option value="Vásárlás">Vásárlás | Einkaufen</option>
          <option value="Ruházat">Ruházat | Kleidung</option>
          <option value="Étel és ital">Étel és ital | Essen und Trinken</option>
          <option value="Számok">Számok | Zahlen</option>
        </select>
      </div>

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
        <strong style={styles.statsNum}>{revealed}</strong> revealed |
        <strong style={styles.statsNum}>{blurredCount}</strong> remaining
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
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
    minWidth: "280px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "20px",
  },
  card: {
    padding: "18px",
    textAlign: "center",
    borderRadius: "6px",
    cursor: "pointer",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    fontSize: "15px",
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
    margin: "0 8px",
  },
};

export default VocabGame;
