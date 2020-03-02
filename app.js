// Query Selectors
const cards = document.querySelectorAll(".card");
const streak = document.querySelector("#streak");
const lowestSteakDisplay = document.querySelector("#lowest-streak");
const middleSpace = document.querySelector("#middle-space");
const startPage = document.querySelector("#start-page");
const gameOverPage = document.querySelector("#game-over");

// Variables
let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockboard = false;
let numOfCards = cards.length;
let currScore = 0;
let cardsFlipped = 0;
let lowestSteak = localStorage.getItem("lowestStreak");

startGame();

// Functions

function startGame() {
  randomOrder();
  resetBoard();
  setScore(0);
  cardsFlipped = 0;

  // Create Event Listeners
  cards.forEach(card => card.addEventListener("click", flipCard));
  startPage.addEventListener("click", clearStart);
  gameOverPage.addEventListener("click", newGame);
  lowestSteakDisplay.innerText = localStorage.getItem("lowestStreak");
}

function flipCard() {
  if (lockboard) return;
  if (this === firstCard) return;
  this.children[0].classList.toggle("flip");
  currScore++;
  streak.innerText = currScore;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableFlip() : unflipCard();
}

function disableFlip() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  cardsFlipped += 2;
  if (cardsFlipped === numOfCards) {
    gameOver();
  }
  resetBoard();
}

function unflipCard() {
  lockboard = true;
  setTimeout(() => {
    firstCard.children[0].classList.remove("flip");
    secondCard.children[0].classList.remove("flip");
    resetBoard();
  }, 1200);
}

function resetBoard() {
  hasFlippedCard = false;
  lockboard = false;
  firstCard = null;
  secondCard = null;
}

function newGame() {
  gameOverPage.classList.toggle("visible");
  for (let card of cards) {
    const flipped = card.children[0].classList[1] === "flip";
    if (flipped) {
      card.children[0].classList.toggle("flip");
    }
  }
  setScore(0);
  startGame();
}

function setScore(newScore) {
  currScore = newScore;
  streak.innerText = currScore;
}

function gameOver() {
  gameOverPage.classList.toggle("visible");
  console.log("you won");

  if (!lowestSteak) {
    localStorage.setItem("lowestStreak", currScore);
  } else if (currScore < lowestSteak) {
    localStorage.setItem("lowestStreak", currScore);
  }
}

function randomOrder() {
  for (let card of cards) {
    let randomOrder = Math.floor(Math.random() * 25);
    card.style.order = randomOrder;
  }
}

function clearStart() {
  startPage.classList.toggle("visible");
}
