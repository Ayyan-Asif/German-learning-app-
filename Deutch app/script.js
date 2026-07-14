// ===============================
// Global Variables
// ===============================
let words = [];
let knownWords = JSON.parse(localStorage.getItem("knownWords")) || [];
let currentIndex = 0;

// ===============================
// Show Word on Screen
// ===============================
function showWord(index) {
    if (words.length === 0) return;

    document.getElementById("word").innerText = words[index].word;
    document.getElementById("translation").innerText = words[index].translation;
    document.getElementById("sentence-de").innerText = words[index].sentence_de;
    document.getElementById("sentence-en").innerText = words[index].sentence_en;
}

// ===============================
// Get Next Unknown Word
// ===============================
function nextWord() {
    if (knownWords.length === words.length) {
        alert("🎉 You have learned all words in this level!");
        return;
    }

    do {
        currentIndex = Math.floor(Math.random() * words.length);
    } while (knownWords.includes(words[currentIndex].word));

    showWord(currentIndex);
}

// ===============================
// Mark Current Word as Known
// ===============================
function markKnown() {
    const currentWord = words[currentIndex].word;

    if (!knownWords.includes(currentWord)) {
        knownWords.push(currentWord);
        localStorage.setItem("knownWords", JSON.stringify(knownWords));
    }

    updateProgress();
    nextWord();
}

// ===============================
// Progress Bar Update
// ===============================
function updateProgress() {
    const total = words.length;
    const known = knownWords.length;
    const percent = total === 0 ? 0 : Math.round((known / total) * 100);

    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").innerText =
        `Progress: ${known} / ${total} words (${percent}%)`;
}

// ===============================
// Load A1 Words from JSON
// ===============================
fetch("data/A1.json")
    .then(response => response.json())
    .then(data => {
        words = data;
        currentIndex = 0;
        showWord(currentIndex);
        updateProgress();
    })
    .catch(error => {
        console.error("Error loading A1 words:", error);
    });
