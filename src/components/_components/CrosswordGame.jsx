"use client";

import { useState, useEffect, useRef, memo } from 'react';

// XML Parser Utility
const parseXMLCrossword = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  const dimensions = {
    x: parseInt(xmlDoc.querySelector('dimensions x')?.textContent || '15'),
    y: parseInt(xmlDoc.querySelector('dimensions y')?.textContent || '15')
  };

  const cells = {};
  const cellElements = xmlDoc.querySelectorAll('cell');
  cellElements.forEach(cell => {
    const row = parseInt(cell.getAttribute('row'));
    const col = parseInt(cell.getAttribute('coln'));
    const type = cell.getAttribute('type');
    const number = cell.getAttribute('number');
    const borders = cell.getAttribute('borders') || '0';
    const directions = cell.getAttribute('directions');
    const content = cell.textContent.trim();

    if (row && col) {
      const key = `${row}-${col}`;
      cells[key] = {
        row,
        col,
        type,
        number,
        borders,
        directions,
        content,
        isEmpty: type === 'empty' || content === ''
      };
    }
  });

  const answers = [];
  const answerElements = xmlDoc.querySelectorAll('answer');
  answerElements.forEach(answer => {
    const rowAttr = answer.getAttribute('row');
    const colAttr = answer.getAttribute('coln');
    const direction = answer.getAttribute('direction');
    const number = answer.getAttribute('number');
    const clue = answer.getAttribute('clue');
    const solution = answer.textContent.toUpperCase();
    const cellsAttr = answer.getAttribute('cells');

    let coordinates = [];
    let startRow, startCol;

    if (cellsAttr) {
      const matches = cellsAttr.matchAll(/\((\d+),(\d+)\)/g);
      coordinates = Array.from(matches).map(m => ({
        row: parseInt(m[1]),
        col: parseInt(m[2])
      }));
      if (coordinates.length > 0) {
        startRow = coordinates[0].row;
        startCol = coordinates[0].col;
      }
    } else {
      startRow = parseInt(rowAttr);
      startCol = parseInt(colAttr);

      for (let i = 0; i < solution.length; i++) {
        if (direction === 'across') {
          coordinates.push({ row: startRow, col: startCol + i });
        } else {
          coordinates.push({ row: startRow + i, col: startCol });
        }
      }
    }

    answers.push({
      row: startRow,
      col: startCol,
      direction,
      number,
      clue,
      solution,
      coordinates
    });
  });

  return { dimensions, cells, answers };
};

const Cell = memo(({ row, col, cell, highlightedWord, wrongLetters, selectedCell, userInputs, handleCellClick, handleInput, handleKeyDown, inputRefs }) => {
  const key = `${row}-${col}`;
  const isHighlighted = highlightedWord.includes(key);
  const isWrong = wrongLetters.has(key);

  if (!cell || cell.type === 'empty') {
    return (
      <td
        key={col}
        style={{
          width: '30px',
          height: '30px',
          padding: 0,
          backgroundColor: 'white',
          border: 'none'
        }}
      />
    );
  }

  return (
    <td
      key={col}
      onClick={(e) => {
        handleCellClick(row, col);
      }}
      style={{
        width: '30px',
        height: '30px',
        padding: 0,
        position: 'relative',
        backgroundColor: isHighlighted ? '#cedfd1' : '#fff',
        border: '1px solid #000',
        cursor: 'pointer'
      }}
    >
      {cell.number && (
        <div style={{
          position: 'absolute',
          top: '1px',
          left: '2px',
          fontSize: '8px',
          color: '#000',
          zIndex: 10,
          fontWeight: 'bold',
          pointerEvents: 'none'
        }}>
          {cell.number}
        </div>
      )}
      <input
        ref={el => inputRefs.current[key] = el}
        type="text"
        value={userInputs[key] || ''}
        onChange={(e) => handleInput(row, col, e.target.value)}
        onKeyDown={(e) => handleKeyDown(row, col, e)}
        onFocus={(e) => { }}
        style={{
          width: '100%',
          height: '100%',
          border: selectedCell === key ? '2px solid #436f4d' : 'none',
          boxSizing: 'border-box',
          padding: 0,
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000',
          backgroundColor: isWrong ? '#ffdddd' : 'transparent',
          outline: 'none',
          cursor: 'pointer',
          caretColor: 'transparent'
        }}
      />
    </td>
  );
});

const CrosswordGame = ({ xmlUrl, xmlData }) => {
  const [crosswordData, setCrosswordData] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentDirection, setCurrentDirection] = useState('across');
  const [highlightedWord, setHighlightedWord] = useState([]);
  const [currentClue, setCurrentClue] = useState('');
  const [wrongLetters, setWrongLetters] = useState(new Set());
  const [showWrongHighlight, setShowWrongHighlight] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputRefs = useRef({});

  useEffect(() => {
    if (selectedCell && inputRefs.current[selectedCell]) {
      inputRefs.current[selectedCell].focus();
    }
  }, [selectedCell]);

  // Load XML from either xmlData (local) or xmlUrl (remote)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Priority 1: Use xmlData if provided (local XML string)
        if (xmlData) {
          loadCrossword(xmlData);
          setLoading(false);
          return;
        }

        // Priority 2: Fetch from xmlUrl if provided
        if (xmlUrl) {
          const response = await fetch(xmlUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const xmlText = await response.text();
          loadCrossword(xmlText);
          setLoading(false);
          return;
        }

        // No data source provided
        setError('Keine XML-Daten oder URL angegeben');
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden des Kreuzworträtsels:', err);
        setError('Das Kreuzworträtsel konnte nicht geladen werden. Bitte versuchen Sie es später erneut.');
        setLoading(false);
      }
    };

    loadData();
  }, [xmlUrl, xmlData]);

  const loadCrossword = (xmlString) => {
    const data = parseXMLCrossword(xmlString);
    setCrosswordData(data);

    const wordMap = {};
    const cellSolutions = {};
    const startCells = {};

    data.answers.forEach(answer => {
      const startKey = `${answer.row}-${answer.col}`;
      if (!startCells[startKey]) startCells[startKey] = [];
      startCells[startKey].push(answer.direction);

      answer.coordinates.forEach((coord, index) => {
        const key = `${coord.row}-${coord.col}`;
        if (!wordMap[key]) {
          wordMap[key] = { across: null, down: null };
        }
        wordMap[key][answer.direction] = answer.coordinates.map(c => `${c.row}-${c.col}`);
        cellSolutions[key] = answer.solution[index];
      });
    });

    data.wordMap = wordMap;
    data.cellSolutions = cellSolutions;
    data.startCells = startCells;

    setUserInputs({});
    setSelectedCell(null);
    setCurrentDirection('across');
    setHighlightedWord([]);
    setCurrentClue('');
    setWrongLetters(new Set());
    setShowWrongHighlight(false);
  };

  const handleCellClick = (row, col, forceDirection = null) => {
    const key = `${row}-${col}`;
    const cell = crosswordData.cells[key];

    if (!cell || cell.type === 'empty') return;

    if (forceDirection) {
      setSelectedCell(key);
      const wordMapEntry = crosswordData.wordMap[key];
      let validDirection = forceDirection;

      if (wordMapEntry && !wordMapEntry[forceDirection]) {
        if (forceDirection === 'across' && wordMapEntry.down) validDirection = 'down';
        else if (forceDirection === 'down' && wordMapEntry.across) validDirection = 'across';
      }

      setCurrentDirection(validDirection);
      highlightWord(row, col, validDirection);
      return;
    }

    const isClickingSelected = selectedCell === key;
    const isPartOfCurrentWord = highlightedWord.includes(key);
    const wordMapEntry = crosswordData.wordMap[key];

    let newDirection = currentDirection;

    if (isClickingSelected) {
      if (wordMapEntry && wordMapEntry.across && wordMapEntry.down) {
        newDirection = currentDirection === 'across' ? 'down' : 'across';
      }
    } else if (isPartOfCurrentWord) {
      newDirection = currentDirection;
    } else {
      const starts = crosswordData.startCells[key];
      if (starts && starts.length > 0) {
        if (starts.length === 1) {
          newDirection = starts[0];
        } else {
          newDirection = 'across';
        }
      } else if (wordMapEntry) {
        if (wordMapEntry.across && wordMapEntry.down) {
          newDirection = 'across';
        } else if (wordMapEntry.across) {
          newDirection = 'across';
        } else if (wordMapEntry.down) {
          newDirection = 'down';
        }
      }
    }

    setSelectedCell(key);
    setCurrentDirection(newDirection);
    highlightWord(row, col, newDirection);
  };

  const highlightWord = (row, col, directionToUse) => {
    const key = `${row}-${col}`;
    const wordCoords = crosswordData.wordMap?.[key]?.[directionToUse];

    if (wordCoords) {
      setHighlightedWord(wordCoords);

      const startKey = wordCoords[0];
      const [startRow, startCol] = startKey.split('-').map(Number);
      const answer = crosswordData.answers.find(a =>
        a.row === startRow && a.col === startCol && a.direction === directionToUse
      );

      if (answer) {
        setCurrentClue(answer.clue || '');
      }
    } else {
      setHighlightedWord([]);
      setCurrentClue('');
    }
  };

  const handleInput = (row, col, rawValue) => {
    const key = `${row}-${col}`;

    const lastChar = rawValue.slice(-1).toUpperCase();

    if (lastChar && !/^[A-ZÁÉÍÓÖŐÚÜŰ]$/.test(lastChar)) {
      if (inputRefs.current[key]) inputRefs.current[key].value = userInputs[key] || '';
      return;
    }

    setUserInputs(prev => ({
      ...prev,
      [key]: lastChar
    }));

    if (showWrongHighlight) {
      const correctValue = crosswordData.cellSolutions[key];
      const newWrong = new Set(wrongLetters);
      if (lastChar && lastChar !== correctValue?.trim().toUpperCase()) {
        newWrong.add(key);
      } else {
        newWrong.delete(key);
      }
      setWrongLetters(newWrong);
    }

    if (lastChar) {
      moveToNextCell(key);
    }
  };

  const moveToNextCell = (currentKey) => {
    const wordCoords = highlightedWord;
    const currentIndex = wordCoords.indexOf(currentKey);

    if (currentIndex < wordCoords.length - 1) {
      for (let i = currentIndex + 1; i < wordCoords.length; i++) {
        const nextKey = wordCoords[i];
        const cell = crosswordData.cells[nextKey];

        if (cell && cell.type !== 'empty') {
          const [nextRow, nextCol] = nextKey.split('-').map(Number);
          handleCellClick(nextRow, nextCol, currentDirection);
          break;
        }
      }
    }
  };

  const moveToPreviousCell = (currentKey) => {
    const wordCoords = highlightedWord;
    const currentIndex = wordCoords.indexOf(currentKey);

    if (currentIndex > 0) {
      for (let i = currentIndex - 1; i >= 0; i--) {
        const prevKey = wordCoords[i];
        const cell = crosswordData.cells[prevKey];

        if (cell && cell.type !== 'empty') {
          const [prevRow, prevCol] = prevKey.split('-').map(Number);
          handleCellClick(prevRow, prevCol, currentDirection);
          break;
        }
      }
    }
  };

  const moveCell = (deltaRow, deltaCol) => {
    if (!selectedCell) return;
    const [currentRow, currentCol] = selectedCell.split('-').map(Number);
    let newRow = currentRow + deltaRow;
    let newCol = currentCol + deltaCol;
    let newKey = `${newRow}-${newCol}`;

    while (newRow >= 1 && newRow <= crosswordData.dimensions.y && newCol >= 1 && newCol <= crosswordData.dimensions.x) {
      const cell = crosswordData.cells[newKey];
      if (cell && cell.type !== 'empty') {
        handleCellClick(newRow, newCol, currentDirection);
        return;
      }
      newRow += deltaRow;
      newCol += deltaCol;
      newKey = `${newRow}-${newCol}`;
    }
  };

  const handleKeyDown = (row, col, e) => {
    const key = `${row}-${col}`;

    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        moveToPreviousCell(key);
      } else {
        moveToNextCell(key);
      }
    } else if (e.key === ' ') {
      e.preventDefault();
      const wordMapEntry = crosswordData.wordMap[key];
      if (wordMapEntry && wordMapEntry.across && wordMapEntry.down) {
        const newDirection = currentDirection === 'across' ? 'down' : 'across';
        setCurrentDirection(newDirection);
        highlightWord(row, col, newDirection);
      }
    } else if (e.key === 'Backspace') {
      if (!userInputs[key]) {
        e.preventDefault();
        moveToPreviousCell(key);
      }
    } else if (e.key === 'Delete') {
      e.preventDefault();
      setUserInputs(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      if (showWrongHighlight) {
        const newWrong = new Set(wrongLetters);
        newWrong.delete(key);
        setWrongLetters(newWrong);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveCell(0, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveCell(0, -1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveCell(1, 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveCell(-1, 0);
    }
  };

  const handleClearAll = () => setShowModal('clear');
  const confirmClearAll = () => {
    setUserInputs({});
    setWrongLetters(new Set());
    setShowModal(null);
  };

  const handleFillCurrentWord = () => {
    if (!selectedCell || !currentDirection) return;

    const wordCoords = highlightedWord;
    const startKey = wordCoords[0];
    const [startRow, startCol] = startKey.split('-').map(Number);
    const answer = crosswordData.answers.find(a =>
      a.row === startRow && a.col === startCol && a.direction === currentDirection
    );

    if (answer) {
      const newInputs = { ...userInputs };
      answer.coordinates.forEach((coord, i) => {
        const key = `${coord.row}-${coord.col}`;
        newInputs[key] = answer.solution[i];
      });
      setUserInputs(newInputs);

      const newWrong = new Set(wrongLetters);
      wordCoords.forEach(k => newWrong.delete(k));
      setWrongLetters(newWrong);
    }
  };

  const handleFillEverySecond = () => {
    if (!selectedCell || !currentDirection) return;
    const wordCoords = highlightedWord;
    const startKey = wordCoords[0];
    const [startRow, startCol] = startKey.split('-').map(Number);
    const answer = crosswordData.answers.find(a =>
      a.row === startRow && a.col === startCol && a.direction === currentDirection
    );
    if (answer) {
      const newInputs = { ...userInputs };
      answer.coordinates.forEach((coord, i) => {
        if (i % 2 === 0) {
          const key = `${coord.row}-${coord.col}`;
          newInputs[key] = answer.solution[i];
        }
      });
      setUserInputs(newInputs);
    }
  };

  const handleFillRandom = () => {
    const allCells = Object.keys(crosswordData.cellSolutions);
    const emptyCells = allCells.filter(key => !userInputs[key]);
    const shuffled = emptyCells.sort(() => 0.5 - Math.random());
    const cellsToFill = shuffled.slice(0, 10);
    const newInputs = { ...userInputs };
    cellsToFill.forEach(key => {
      newInputs[key] = crosswordData.cellSolutions[key];
    });
    setUserInputs(newInputs);
  };

  const recheckWrongLetters = () => {
    const wrong = new Set();
    Object.keys(userInputs).forEach(key => {
      const userValue = userInputs[key];
      const correctValue = crosswordData.cellSolutions[key];
      if (userValue && userValue.trim() !== '') {
        const normalizedUser = userValue.trim().toUpperCase();
        const normalizedCorrect = correctValue?.trim().toUpperCase();
        if (normalizedUser !== normalizedCorrect) {
          wrong.add(key);
        }
      }
    });
    setWrongLetters(wrong);
  };

  const handleHighlightWrong = () => {
    if (showWrongHighlight) {
      setWrongLetters(new Set());
      setShowWrongHighlight(false);
    } else {
      recheckWrongLetters();
      setShowWrongHighlight(true);
    }
  };

  const handleSolve = () => setShowModal('solve');
  const confirmSolve = () => {
    const newInputs = { ...crosswordData.cellSolutions };
    setUserInputs(newInputs);
    setWrongLetters(new Set());
    setShowModal(null);
  };

  const handleKeyboardClick = (char) => {
    if (selectedCell) {
      const [row, col] = selectedCell.split('-').map(Number);
      handleInput(row, col, char);
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px'
      }}>
        Kreuzworträtsel wird geladen...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#BF2037'
      }}>
        <p>{error}</p>
      </div>
    );
  }

  if (!crosswordData) {
    return <div style={{ padding: '20px' }}>Kein Kreuzworträtsel verfügbar.</div>;
  }

  const specialCharacters = ['Á', 'É', 'Í', 'Ó', 'Ö', 'Ő', 'Ú', 'Ü', 'Ű'];

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1400px',
      margin: '20px auto',
      padding: '15px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start'
      }}>
        {/* Left Sidebar */}
        <div style={{ minWidth: '100px' }}>
          {/* Special Characters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2px',
            marginBottom: '20px',
            width: '100px'
          }}>
            {specialCharacters.map(char => (
              <button
                key={char}
                onClick={() => handleKeyboardClick(char)}
                style={{
                  width: 'calc(50% - 2px)',
                  height: '40px',
                  padding: '5px',
                  fontSize: '14px',
                  background: '#BF2037',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {char}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleClearAll}
              style={{
                width: '100%',
                padding: '8px 16px',
                marginBottom: '4px',
                background: '#BF2037',
                color: '#fff',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              NEU
            </button>
            <button
              onClick={handleSolve}
              style={{
                width: '100%',
                padding: '8px 16px',
                marginBottom: '4px',
                background: '#BF2037',
                color: '#fff',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              LÖSEN
            </button>

            <h4 style={{
              fontSize: '15px',
              fontWeight: 600,
              marginTop: '20px',
              marginBottom: '10px'
            }}>
              HILFE
            </h4>

            <div style={{
              display: 'flex',
              gap: '4px',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleFillCurrentWord}
                title="Fill current word"
                style={{
                  flex: '1 0 45%',
                  height: '40px',
                  background: '#BF2037',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                📝
              </button>
              <button
                onClick={handleFillEverySecond}
                title="Fill every second"
                style={{
                  flex: '1 0 45%',
                  height: '40px',
                  background: '#BF2037',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ✏️
              </button>
              <button
                onClick={handleFillRandom}
                title="Fill 10 random"
                style={{
                  flex: '1 0 45%',
                  height: '40px',
                  background: '#BF2037',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                🎲
              </button>
              <button
                onClick={handleHighlightWrong}
                title="Highlight wrong"
                style={{
                  flex: '1 0 45%',
                  height: '40px',
                  background: '#BF2037',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ✓
              </button>
            </div>
          </div>
        </div>

        {/* Center - Grid and Clues */}
        <div style={{ flex: '1' }}>
          {/* Current Clue Display */}
          {currentClue && (
            <div style={{
              border: '2px solid #BF2037',
              padding: '12px',
              textAlign: 'center',
              marginBottom: '15px',
              backgroundColor: '#fff',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px'
            }}>
              {currentClue}
            </div>
          )}

          {/* Crossword Grid */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#fff',
            padding: '10px',
            marginBottom: '20px'
          }}>
            <table style={{
              borderCollapse: 'collapse',
              backgroundColor: '#fff'
            }}>
              <tbody>
                {Array.from({ length: crosswordData.dimensions.y }, (_, rowIndex) => {
                  const row = rowIndex + 1;
                  return (
                    <tr key={row}>
                      {Array.from({ length: crosswordData.dimensions.x }, (_, colIndex) => {
                        const col = colIndex + 1;
                        return (
                          <Cell
                            key={col}
                            row={row}
                            col={col}
                            cell={crosswordData.cells[`${row}-${col}`]}
                            highlightedWord={highlightedWord}
                            wrongLetters={wrongLetters}
                            selectedCell={selectedCell}
                            userInputs={userInputs}
                            handleCellClick={handleCellClick}
                            handleInput={handleInput}
                            handleKeyDown={handleKeyDown}
                            inputRefs={inputRefs}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Clues Section */}
          <div style={{
            fontSize: '14px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #BF2037'
          }}>
            {/* WAAGERECHT */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginTop: 0,
                marginBottom: '10px',
                color: '#BF2037'
              }}>
                WAAGERECHT
              </h3>
              {crosswordData.answers
                .filter(a => a.direction === 'across')
                .sort((a, b) => parseInt(a.number) - parseInt(b.number))
                .map(answer => (
                  <div
                    key={`${answer.number}-across`}
                    style={{
                      marginBottom: '6px',
                      lineHeight: '1.4'
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{answer.number}</span>: {answer.clue}
                  </div>
                ))}
            </div>

            {/* SENKRECHT */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '10px',
                color: '#BF2037'
              }}>
                SENKRECHT
              </h3>
              {crosswordData.answers
                .filter(a => a.direction === 'down')
                .sort((a, b) => parseInt(a.number) - parseInt(b.number))
                .map(answer => (
                  <div
                    key={`${answer.number}-down`}
                    style={{
                      marginBottom: '6px',
                      lineHeight: '1.4'
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{answer.number}</span>: {answer.clue}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal === 'clear' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: '30px',
            borderRadius: '8px',
            textAlign: 'center',
            minWidth: '300px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
              Möchtest Du wirklich alle Buchstaben löschen?
            </p>
            <button
              onClick={confirmClearAll}
              style={{
                margin: '5px',
                background: '#BF2037',
                color: '#fff',
                fontSize: '14px',
                border: 0,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              JA
            </button>
            <button
              onClick={() => setShowModal(null)}
              style={{
                margin: '5px',
                background: '#666',
                color: '#fff',
                fontSize: '14px',
                border: 0,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              NEIN
            </button>
          </div>
        </div>
      )}

      {showModal === 'solve' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: '30px',
            borderRadius: '8px',
            textAlign: 'center',
            minWidth: '300px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
              Möchtest Du das Rätsel auflösen?
            </p>
            <button
              onClick={confirmSolve}
              style={{
                margin: '5px',
                background: '#BF2037',
                color: '#fff',
                fontSize: '14px',
                border: 0,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              JA
            </button>
            <button
              onClick={() => setShowModal(null)}
              style={{
                margin: '5px',
                background: '#666',
                color: '#fff',
                fontSize: '14px',
                border: 0,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              NEIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrosswordGame;

