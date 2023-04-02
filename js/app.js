// Constants and Variables

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King"
];
const numPlayers = 3; // number of players, including the player

const playerHand = [];
const dealerHand = [];
const betAmounts = [];
const maxBet = 100; // max bet amount allowed
const minBet = 10; // min bet amount allowed
let currentPlayer = 0; // index of the current player in the players array
let dealerIndex = 0; // index of the dealer in the players array
let gameOver = false;


// Deal cards
function dealCards(players, deck) {
    for (let i = 0; i < 2; i++) {
      players.forEach(player => {
        player.cards.push(deck.pop());
      });
    }
  }
  
  // Player's turn
  function playerTurn(player, deck) {
    while (player.totalPoints < 21) {
      const decision = prompt("What would you like to do? (hit/stand/double/split)");
      switch (decision) {
        case "hit":
          player.cards.push(deck.pop());
          calculatePoints(player);
          break;
        case "stand":
          return;
        case "double":
          player.chips -= player.currentBet;
          player.currentBet *= 2;
          player.cards.push(deck.pop());
          calculatePoints(player);
          return;
        case "split":
          // handle splitting logic
          break;
        default:
          alert("Invalid decision. Please choose hit, stand, double, or split.");
          break;
      }
    }
  }
  
  // Computer players' turn
  function computerTurn(player, deck) {
    while (player.totalPoints < 17) {
      player.cards.push(deck.pop());
      calculatePoints(player);
    }
  }
  
  // House's turn
  function houseTurn(house, deck) {
    while (house.totalPoints < 17) {
      house.cards.push(deck.pop());
      calculatePoints(house);
    }
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  class Player {
    constructor(name, chips) {
      this.name = name;
      this.hand = [];
      this.bet = 0;
      this.chips = chips;
    }
    
    // Add a card to the player's hand
    hit(card) {
      this.hand.push(card);
    }
    
    // Return the player's current hand value
    get handValue() {
      let value = 0;
      let numAces = 0;
      for (let card of this.hand) {
        if (card.value === "A") {
          numAces++;
          value += 11;
        } else if (card.value === "J" || card.value === "Q" || card.value === "K") {
          value += 10;
        } else {
          value += parseInt(card.value);
        }
      }
      while (value > 21 && numAces > 0) {
        value -= 10;
        numAces--;
      }
      return value;
    }
  }
  // define bet constants
const MIN_BET = 5;
const MAX_BET = 100;
const SIDE_BET = 10;

// create an array of player objects
let players = [
  {
    name: "Player",
    bet: 0,
    hand: [],
    sideBet: 0,
    bankroll: 1000
  },
  {
    name: "Computer Player 1",
    bet: 0,
    hand: [],
    bankroll: 1000
  },
  {
    name: "Computer Player 2",
    bet: 0,
    hand: [],
    bankroll: 1000
  }
];

// prompt each player to place a bet
players.forEach((player) => {
  if (player.name !== "House") {
    let betAmount = parseInt(prompt(`${player.name}, place your bet (between ${MIN_BET} and ${MAX_BET}): `));
    while (betAmount < MIN_BET || betAmount > MAX_BET) {
      betAmount = parseInt(prompt(`Invalid bet. Please enter a bet between ${MIN_BET} and ${MAX_BET}: `));
    }
    player.bet = betAmount;
    player.bankroll -= betAmount;

    let sideBetAmount = parseInt(prompt(`${player.name}, place your side bet (up to ${SIDE_BET}): `));
    while (sideBetAmount < 0 || sideBetAmount > SIDE_BET) {
      sideBetAmount = parseInt(prompt(`Invalid side bet. Please enter a side bet between 0 and ${SIDE_BET}: `));
    }
    player.sideBet = sideBetAmount;
    player.bankroll -= sideBetAmount;
  }
});

// deal two cards to each player and the house, alternating between each player and the house
let deck = createDeck();
shuffleDeck(deck);

players.forEach((player) => {
  if (player.name !== "House") {
    player.hand.push(deck.pop());
    player.hand.push(deck.pop());
  } else {
    player.hand.push(deck.pop());
  }
});

// check if any player has blackjack
players.forEach((player) => {
  if (player.hand.length === 2) {
    if ((player.hand[0].value === 1 && player.hand[1].value === 10) || (player.hand[0].value === 10 && player.hand[1].value === 1)) {
      console.log(`${player.name} has Blackjack!`);
      player.bankroll += player.bet * 1.5;
      player.bet = 0;
    }
  }
});
