const deckContainer = document.querySelector(".deck-container");
const betInput = document.querySelector("#bet-input");
const hitButton = document.querySelector("#hit-button");
const standButton = document.querySelector("#stand-button");
const doubleButton = document.querySelector("#double-button");
const splitButton = document.querySelector("#split-button");
const resetButton = document.querySelector("#reset-button");
const messageContainer = document.querySelector(".message-container");
const playerCardsContainer = document.querySelector(".player-cards-container");
const playerScoreContainer = document.querySelector(".player-score-container");
const computer1CardsContainer = document.querySelector(".computer-1-cards-container");
const computer1ScoreContainer = document.querySelector(".computer-1-score-container");
const computer2CardsContainer = document.querySelector(".computer-2-cards-container");
const computer2ScoreContainer = document.querySelector(".computer-2-score-container");
const houseCardsContainer = document.querySelector(".house-cards-container");
const houseScoreContainer = document.querySelector(".house-score-container");


let deck = createDeck();
shuffleDeck(deck);
let players = createPlayers();
let house = {hand: [], score: 0};

betInput.addEventListener("change", () => {
  const bet = parseInt(betInput.value);
  if (bet <= players[0].bankroll) {
    players[0].bet = bet;
    players[0].bankroll -= bet;
    displayPlayerBankroll();
  } else {
    betInput.value = players[0].bankroll;
    players[0].bet = players[0].bankroll;
    players[0].bankroll = 0;
    displayPlayerBankroll();
  }
});


hitButton.addEventListener("click", () => {
    hitPlayer();
  });
  
  standButton.addEventListener("click", () => {
    standPlayer();
  });
  
  doubleButton.addEventListener("click", () => {
    doubleDown();
  });
  
  splitButton.addEventListener("click", () => {
    splitCards();
  });
  
  resetButton.addEventListener("click", () => {
    resetGame();
  });

