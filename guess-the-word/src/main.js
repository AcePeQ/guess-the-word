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
const triesTextContainer = document.querySelector("#tries");
const mistakesText = document.querySelector("#mistakesText");
const resetButtons = [...document.querySelectorAll(".reset")];

generateRandomWord();
createInputFields(currentWord.length);

const inputs = [...document.querySelectorAll(".input")];
console.log(inputs);

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
  inputsContainer.innerHTML = "";

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

function checkIfPlayerWon() {
  const currentInputWord = inputs
    .map((input) => input.value.toLowerCase())
    .join("");

  if (
    currentInputWord.length === currentWord.length &&
    currentInputWord === currentWord
  ) {
    setTimeout(() => {
      window.alert(`🎉 You won! The word was "${currentWord.toUpperCase()}"`);
      resetGame();
    }, 100);
  }
}

function handleInput(event) {
  if (numberOfTries === 5) resetGame();

  const input = event.target;
  if (!input.value) return;

  const inputIndex = input.dataset.index;

  if (currentWord[inputIndex] === input.value) {
    if (input.nextElementSibling) {
      input.nextElementSibling.focus();
    } else {
      input.blur();
    }
  } else {
    const dotTry = document.querySelector(`[data-dot='${numberOfTries}']`);
    dotTry.classList.add("activeDot");
    ++numberOfTries;

    triesTextContainer.textContent = `Tries (${numberOfTries}/5):`;
    if (!mistakes.includes(input.value)) {
      mistakes.push(input.value);
      mistakesText.textContent = `Mistakes: ${mistakes.join(", ")}`;
    }
    input.value = "";
  }

  checkIfPlayerWon();
}

function resetGame() {
  const tryDots = [...document.querySelectorAll("#dot")];
  tryDots.forEach((dot) => dot.classList.remove("activeDot"));

  currentWord = "";
  numberOfTries = 0;
  mistakes = [];

  generateRandomWord();
  createInputFields(currentWord.length);

  triesTextContainer.textContent = `Tries (${numberOfTries}/5):`;
  mistakesText.textContent = `Mistakes: ${mistakes.join(", ")}`;
}

resetButtons.forEach((button) => button.addEventListener("click", resetGame));
