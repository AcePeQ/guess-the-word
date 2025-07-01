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

const inputsContainer = document.querySelector("#inputs");

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

function createInputFields(length) {
  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.setAttribute("id", `input-${i}`);
    input.setAttribute("type", `text`);
    input.setAttribute("class", `input input-${i}`);
    input.setAttribute("maxLength", `1`);

    inputsContainer.appendChild(input);
    input.dataset.index = i;
    input.addEventListener("input", handleInput);
  }
}

function handleInput(event) {
  const input = event.target;
  if (!input.value) return;

  const inputIndex = input.dataset.index;

  if (
    currentWord.includes(input.value) &&
    currentWord[inputIndex] === input.value
  ) {
    if (input.nextElementSibling) {
      input.nextElementSibling.focus();
    } else {
      input.blur();
    }
  } else {
    input.value = "";
    mistakes.push(input.value);
  }
}

generateRandomWord();
createInputFields(currentWord.length);
