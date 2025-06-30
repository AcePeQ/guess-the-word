"use strict";

const words = [
  "example",
  "javascript",
  "coding",
  "challenge",
  "flower",
  "player",
  "react",
];

let currentWord = "";
let numberOfTries = 0;
let mistakes = [];

function scrambleWord(word) {
  const letters = word.split("");

  for (let i = 0; i < letters.length - 1; i++) {
    const randomLetterIndex = Math.floor(Math.random() * letters.length);
    let tempLetter = letters[i];
    letters[i] = letters[randomLetterIndex];
    letters[randomLetterIndex] = tempLetter;
  }

  return letters.join("");
}

function generateRandomWord() {
  const displayWordContainer = document.querySelector("#display");
  currentWord = words[Math.floor(Math.random() * words.length)];

  const scrambledWord = scrambleWord(currentWord);

  displayWordContainer.textContent = scrambledWord;
}

function createInputFields(length) {}

generateRandomWord();
