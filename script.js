const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed is a measure of how fast you can type.",
    "JavaScript makes web applications interactive and dynamic."
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
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    referenceWords = randomText.split(" ");
    totalWords = referenceWords.length;

    // Wrap each word in a span for styling
    displayText.innerHTML = referenceWords.map(word => `<span>${word}</span>`).join(" ");

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

    wordElements.forEach((span, index) => {
        if (typedWords[index] === undefined) {
            span.style.color = "black"; // Reset color for untyped words
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

    const wpm = Math.round((correctWords / 30) * 60); // Words per minute
    const accuracy = Math.round((correctWords / totalWords) * 100);

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
