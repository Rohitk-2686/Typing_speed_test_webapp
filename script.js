const sampleTexts = [
  "The clouds grow dark, and a cool breeze fills the air. Soon, raindrops start falling, tapping softly on windows and rooftops. People open their umbrellas and rush to find shelter. The streets shine as the water reflects the lights around. Children jump in puddles, laughing with joy. A rainy day brings a calm and cozy feeling to everyone.",
  "The sand is warm underfoot, and the waves crash gently on the shore. The salty breeze fills the air, making everyone feel relaxed. Children build sandcastles, while others splash in the water. Seagulls fly overhead, looking for food. As the sun sets, the sky turns golden, making the perfect end to a beautiful day at the beach.",
  "The sun rises slowly, painting the sky with shades of orange and pink. Birds chirp softly, welcoming the new day. The air is fresh and cool, carrying the scent of blooming flowers. People begin their day, some jogging in the park while others sip warm tea. It is a moment of peace before the world becomes busy.",
];

let timer = 30;
let timeInterval;
let correctWords = 0;
let totalWords = 0;
let referenceWords = [];

const displayText = document.getElementById("display-text");
const inputText = document.getElementById("input-text");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const resultElement = document.getElementById("result");

startButton.addEventListener("click", startTest);
submitButton.addEventListener("click", finishTest);
resetButton.addEventListener("click", resetTest);
inputText.addEventListener("input", checkTyping);

function startTest() {
  correctWords = 0;
  totalWords = 0;
  timer = 30;
  timerElement.innerText = timer;
  resultElement.innerText = "";
  inputText.value = "";
  inputText.disabled = false;
  submitButton.disabled = false;
  resetButton.disabled = false;
  inputText.focus();

  // Select a random text
  const randomText =
    sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  referenceWords = randomText.split(" ");

  // Wrap each word in a span for styling
  displayText.innerHTML = referenceWords
    .map((word) => `<span>${word}</span>`)
    .join(" ");

  // Start the timer
  clearInterval(timeInterval);
  timeInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timer--;
  timerElement.innerText = timer;
  if (timer === 0) {
    clearInterval(timeInterval);
    finishTest();
  }
}

function checkTyping() {
  const typedWords = inputText.value.trim().split(" ");
  const wordElements = displayText.querySelectorAll("span");

  correctWords = 0;
  totalWords = typedWords.length; // Count all words (correct + incorrect)

  wordElements.forEach((span, index) => {
    if (typedWords[index] === undefined || typedWords[index] === "") {
      span.style.color = ""; // Reset color for untyped words
    } else if (typedWords[index] === referenceWords[index]) {
      span.style.color = "green"; // Correct word
      correctWords++;
    } else {
      span.style.color = "red"; // Incorrect word
    }
  });
}

function finishTest() {
  inputText.disabled = true;
  submitButton.disabled = true;
  clearInterval(timeInterval);

  const wpm = Math.round((totalWords / 30) * 60); // WPM now counts both correct and incorrect words
  const accuracy =
    totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0; // Prevent division by zero

  resultElement.innerHTML = `
        <strong>Results:</strong><br>
        WPM: <span class="text-primary">${wpm}</span><br>
        Accuracy: <span class="text-success">${accuracy}%</span>
    `;
}

function resetTest() {
  clearInterval(timeInterval);
  timerElement.innerText = "30";
  displayText.innerHTML = "Click Start to Begin...";
  inputText.value = "";
  inputText.disabled = true;
  submitButton.disabled = true;
  resetButton.disabled = true;
  resultElement.innerText = "";
}
