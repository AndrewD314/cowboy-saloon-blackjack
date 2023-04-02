const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];


let currentPlayerIndex = 0;
let dealerIndex;
let playerBets = [];
let playerMoney = [];
let playerInsurance = [];

const gameWrapper = document.getElementById('gameWrapper');
const dealBtn = document.getElementById('dealBtn');
const hitBtn = document.getElementById('hitBtn');
const standBtn = document.getElementById('standBtn');
const doubleBtn = document.getElementById('doubleBtn');
const splitBtn = document.getElementById('splitBtn');
const insuranceInput = document.getElementById('insuranceInput');
const playerMoneySpan = document.querySelectorAll('.player-money');
const playerBetSpan = document.querySelectorAll('.player-bet');
const playerInsuranceSpan = document.querySelectorAll('.player-insurance');
const message = document.getElementById('message');
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

  function displayPlayerBankroll() {
    const bankrollContainer = document.querySelector(".bankroll-container");
    bankrollContainer.textContent = `Bankroll: $${players[0].bankroll}`;
  }
  
  function displayPlayerCards() {
    playerCardsContainer.innerHTML = "";
    for (let card of players[0].hand) {
      let cardElement = document.createElement("div");
      cardElement.classList.add("card");
      let cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.alt;
      cardElement.appendChild(cardImage);
      playerCardsContainer.appendChild(cardElement);
    }
  }
  
  function displayPlayerScore() {
    playerScoreContainer.textContent = `Score: ${players[0].score}`;
  }
  
  function displayComputer1Cards() {
    computer1CardsContainer.innerHTML = "";
    for (let card of players[1].hand) {
      let cardElement = document.createElement("div");
      cardElement.classList.add("card");
      let cardImage = document.createElement("img");
      cardImage.src = "images/card-back.png";
      cardImage.alt = "Card back";
      cardElement.appendChild(cardImage);
      computer1CardsContainer.appendChild(cardElement);
    }
  }
  
  function displayComputer1Score() {
    computer1ScoreContainer.textContent = `Score: ${players[1].score}`;
  }
  
  function displayComputer2Cards() {
    computer2CardsContainer.innerHTML = "";
    for (let card of players[2].hand) {
      let cardElement = document.createElement("div");
      cardElement.classList.add("card");
      let cardImage = document.createElement("img");
      cardImage.src = "images/card-back.png";
      cardImage.alt = "Card back";
    }}

    function createDeck() {
        for (let suit in suits) {
          for (let value in values) {
            let card = {
              suit: suits[suit],
              value: values[value]
            };
            deck.push(card);
          }
        }
      }
      
      // Define Ace's value as 1 or 11 depending on hand value
function getCardValue(card) {
    switch (card.value) {
      case 'Ace':
        return 11;
      case '2':
        return 2;
      case '3':
        return 3;
      case '4':
        return 4;
      case '5':
        return 5;
      case '6':
        return 6;
      case '7':
        return 7;
      case '8':
        return 8;
      case '9':
        return 9;
      default:
        return 10;
    }
  }