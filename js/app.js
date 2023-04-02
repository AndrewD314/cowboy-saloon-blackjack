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
// Display available options for the player
function displayOptions() {
    // Show hit and stand options
    document.getElementById("hit-button").style.display = "inline";
    document.getElementById("stand-button").style.display = "inline";
    
    // Show double down option if applicable
    if (canDoubleDown()) {
      document.getElementById("double-button").style.display = "inline";
    }
    
    // Show split option if applicable
    if (canSplit()) {
      document.getElementById("split-button").style.display = "inline";
    }
  }
  
  // Prompt player to choose an action
  function promptPlayer() {
    return new Promise((resolve) => {
      // Show available options
      displayOptions();
      
      // Listen for button clicks
      document.getElementById("hit-button").addEventListener("click", () => {
        resolve("hit");
      });
      document.getElementById("stand-button").addEventListener("click", () => {
        resolve("stand");
      });
      document.getElementById("double-button").addEventListener("click", () => {
        resolve("double");
      });
      document.getElementById("split-button").addEventListener("click", () => {
        resolve("split");
      });
    });
  }
  
  // Perform player's chosen action
  async function playerTurn(player) {
    while (true) {
      // Prompt player for action
      const action = await promptPlayer();
      
      // Perform action
      if (action === "hit") {
        hit(player);
      } else if (action === "stand") {
        stand(player);
        break;
      } else if (action === "double") {
        doubleDown(player);
        break;
      } else if (action === "split") {
        split(player);
        break;
      }
    }
  }
  // check if the player or computer has busted (exceeded 21 points)
function checkBust(player) {
    if (player.score > 21) {
      player.isBust = true;
      return true;
    } else {
      return false;
    }
  }
  
  // end players turn
  function endPlayerTurn(player) {
    console.log(`${player.name}'s turn has ended.`);
  }
  
  // perform the computer players action, such as hitting or standing
  function computerTurn(computerPlayer) {
    while (computerPlayer.score < 17) {
      hit(computerPlayer);
    }
  }
  
  // end the computer players turn
  function endComputerTurn(computerPlayer) {
    console.log(`${computerPlayer.name}'s turn has ended.`);
  }
  
  // determine winners and pay out bets
  function determineWinner(players, house) {
    // Determine house score
    while (house.score < 17) {
      hit(house);
    }
  
    // Check for winners and losers
    players.forEach(function (player) {
      if (!player.isBust) {
        if (player.score > house.score || house.isBust) {
          console.log(`${player.name} wins!`);
          player.money += player.bet * 2;
        } else if (player.score === house.score) {
          console.log(`${player.name} pushes.`);
          player.money += player.bet;
        } else {
          console.log(`${player.name} loses.`);
        }
      } else {
        console.log(`${player.name} busted.`);
      }
    });
  
    // Reset players and house
    players.forEach(function (player) {
      player.isBust = false;
      player.score = 0;
      player.hand = [];
      player.bet = 0;
      player.choice = "";
    });
    house.isBust = false;
    house.score = 0;
    house.hand = [];
  }

  // determine winners and pay out bets
function determineWinners() {
    let playerHandValue = getHandValue(player.hand);
    let dealerHandValue = getHandValue(dealer.hand);
    
    // determine winner
    if (playerHandValue > 21 || dealerHandValue === 21 || dealerHandValue < playerHandValue) {
      // dealer wins
      dealer.money += player.bet;
      player.money -= player.bet;
    } else if (dealerHandValue > 21 || playerHandValue === 21 || playerHandValue > dealerHandValue) {
      // player wins
      player.money += player.bet;
      dealer.money -= player.bet;
    } else {
      // tie
      console.log("It's a tie!");
    }
  
    // pay out side bets (if any)
    // ...
  
    // reset game for the next hand
    resetGame();
  }
  
  // reset game for the next hand
  function resetGame() {
    // reset variables and clear UI
    player.hand = [];
    dealer.hand = [];
    player.bet = 0;
    // ...
  
    // prompt player for a new bet
    getPlayerBet();
  }
  