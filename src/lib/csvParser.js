// Utility function to parse CSV data for the time telling game
export const parseTimeData = (csvText) => {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const time = values[0];
    const image = values[1];

    // Parse options (up to 10 options with audio and correctness)
    const options = [];
    for (let i = 0; i < 10; i++) {
      const optionIndex = i + 1;
      const textIndex = optionIndex * 3 - 2; // Option1, Option2, etc.
      const audioIndex = optionIndex * 3 - 1; // Audio1, Audio2, etc.
      const correctIndex = optionIndex * 3; // Correct1, Correct2, etc.

      if (
        values[textIndex] &&
        values[textIndex] !== "null" &&
        values[textIndex].trim() !== ""
      ) {
        options.push({
          text: values[textIndex].trim(),
          audio:
            values[audioIndex] && values[audioIndex] !== "null"
              ? values[audioIndex].trim()
              : null,
          correct: values[correctIndex] === "1",
        });
      }
    }

    return {
      time,
      image,
      options,
    };
  });
};

// Sample data for testing (fallback)
export const SAMPLE_DATA = [
  {
    time: "12:00",
    image: "12.00.jpg",
    options: [
      { text: "tizenkét óra", audio: "12_00-1.ogg", correct: true },
      { text: "dél", audio: "12_00-2.ogg", correct: true },
      { text: "éjfél", audio: "12_00-3.ogg", correct: false },
      { text: "fél egy", audio: "12_30.mp3", correct: false },
    ],
  },
  {
    time: "1:00",
    image: "1.00.jpg",
    options: [
      { text: "egy óra", audio: "01_00-1.ogg", correct: true },
      { text: "kettő óra", audio: "02_00.mp3", correct: false },
      { text: "fél kettő", audio: "01_30.mp3", correct: false },
    ],
  },
];
