let gameState;

let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden;
let deck;
let score = 0;
let cards = [];
let card = 0;
let canHit = true; //allows the player (you) to draw while yourSum <= 21

let playerBet = 0;
let playerMoney = 100;
let dealerScore = 0;


let dealer = {
    dealerCards: [],
    dealerScore: 0
  };

const betInput = document.getElementById('betInput')
const betButton = document.getElementById('place-bet')
const moneyDisplay = document.getElementById('money-display')
const hitButton = document.getElementById('hit')
const standButton = document.getElementById('stay')
const playerCards = document.getElementById('player-cards')
const dealerCards = document.getElementById('dealer-cards')
const playerScoreEl = document.getElementById('player-score')
const dealerScoreEl = document.getElementById('dealer-score')
const hitBtn = document.getElementById('hit')
const standBtn = document.getElementById('stand')
const newGameBtn = document.getElementById('new-game')
const betAmountInput = document.getElementById('bet-amount')
const playAgainBtn = document.getElementById("play-again-button")


window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
    // document.getElementById("dealer-sum").innerText = dealerSum;
    // document.getElementById("your-sum").innerText = yourSum;
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function Game() {
    this.deck = createDeck();
    this.playerCards = [];
    this.dealerCards = []; // add this line to initialize dealerCards
    this.playerScore = 0;
    this.dealerScore = 0;
  }
  

function startGame() {
    // Draw the hidden card
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    let hiddenCardImg = document.createElement("img");
    hiddenCardImg.src = "./cards/BACK.png";
    hiddenCardImg.id = "hidden";
    document.getElementById("dealer-cards").appendChild(hiddenCardImg);

    // Draw the second card
    let cardImg2 = document.createElement("img");
    let card2 = deck.pop();
    cardImg2.src = "./cards/" + card2 + ".png";
    dealerSum += getValue(card2);
    dealerAceCount += checkAce(card2);
    document.getElementById("dealer-cards").appendChild(cardImg2);

    // Draw two cards for the player
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}


function handleBet() {
    const betValue = parseInt(betInput.value);
  
    if (betValue > playerMoney) {
      alert('You do not have enough money to make this bet!');
    } else if (betValue <= 0) {
      alert('Please enter a valid bet amount!');
    } else {
      playerBet = betValue;
      playerMoney -= playerBet;
    //   moneyDisplay.innerText = `Money: $${playerMoney}`;
      if (moneyDisplay) {
        moneyDisplay.innerText = `Money: $${playerMoney}`;
      }

      betInput.disabled = true;
      betButton.disabled = true;
    //   dealButton.disabled = false;
      hitButton.disabled = false;
      standButton.disabled = false;
    }
  }
  
  betButton.addEventListener('click', handleBet);
  
  function resetGame() {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerAceCount = 0;
    dealerAceCount = 0;
    updateScore();
    updateDealerScore();
    hideDealerScore();
    showPlayerScore();
    showDealerCardBack();
    
    document.getElementById('hit').disabled = true;
    document.getElementById('stay').disabled = true;
  }

  function calculateScore(cards) {
    let score = 0;
    let hasAce = false;
    
    for (let i = 0; i < cards.length; i++) {
      let cardValue = cards[i];
      if (cardValue === "J" || cardValue === "Q" || cardValue === "K") {
        score += 10;
      } else if (cardValue === "A") {
        hasAce = true;
        score += 1;
      } else {
        score += parseInt(cardValue);
      }
    }
    
    if (hasAce && score + 10 <= 21) {
      score += 10;
    }
    
    return score;
  }
  
//   console.log(calculateScore(["A", "2", "3"])); // Output: 6
  
function hideDealerScore() {
    const dealerScoreElement = document.getElementById('dealer-score');
    dealerScoreElement.innerText = 'Dealer Score: ';
  }
  
  function showDealerCardBack() {
    const dealerCards = document.querySelectorAll(".dealer-cards .card");
  
    // Show the back of each card
    dealerCards.forEach(card => {
      card.classList.add("back");
    });
  }
  

  function showPlayerScore() {
    playerScoreEl.innerHTML = `Player score: ${yourSum}`;
  }

  function calculateDealerScore() {
    let dealerCards = dealer.dealerCards;
    let dealerScore = 0;
    let aceCount = 0;
  
    // calculate the dealer score by adding up the values of their cards
    for (let i = 0; i < dealerCards.length; i++) {
      let cardValue = getValue(dealerCards[i]);
      dealerScore += cardValue;
      if (cardValue === 11) {
        aceCount++;
      }
    }
  
    // if the dealer busts and has aces, count the aces as 1 instead of 11
    while (dealerScore > 21 && aceCount > 0) {
      dealerScore -= 10;
      aceCount--;
    }
  
    // update the dealer object with the calculated score
    dealer.dealerScore = dealerScore;
  }
  
  

  function updateDealerScore() {
    let score = 0;
    for (let i = 0; i < dealerHand.length; i++) {
      let card = dealerHand[i];
      score += card.value;
      if (card.value === 11) {
        dealerAceCount++;
      }
      while (score > 21 && dealerAceCount > 0) {
        score -= 10;
        dealerAceCount--;
      }
    }
    dealerScore = score;
    if (dealerScore <= 21) {
      showDealerScore();
    }
  }  

  function updateScore() {
    let score = 0;
    for (let i = 0; i < playerHand.length; i++) {
      let card = playerHand[i];
      score += card.value;
      if (card.value === 11) {
        playerAceCount++;
      }
      while (score > 21 && playerAceCount > 0) {
        score -= 10;
        playerAceCount--;
      }
    }
    playerScore = score;
    if (playerScore <= 21) {
      showPlayerScore();
    } else {
      hidePlayerScore();
    }
  }

  function showDealerScore() {
    
    const dealerScore = calculateScore(dealerCards);
    console.log("Dealer score: " + dealerScore);
  }
  
  
  playAgainBtn.addEventListener('click', () => {
    resetGame();
    playerMoney += playerBet * 2;
    moneyDisplay.innerText = `betInput: $${betInput}`;
  });

  function updateUi() {
    // Update player's cards
    let playerCardsHtml = '';
    for (let i = 0; i < playerCards.length; i++) {
      playerCardsHtml += `<img src="${playerCards[i].image}" class="card" />`;
    }
    playerCardsEl.innerHTML = playerCardsHtml;
  
    // Update dealer's cards
    let dealerCardsHtml = '';
    for (let i = 0; i < dealerCards.length; i++) {
      dealerCardsHtml += `<img src="${dealerCards[i].image}" class="card" />`;
    }
   
    console.log('dealers cards: ', dealerCardsHtml)
    dealerCardsEl.innerHTML = dealerCardsHtml;
  
    // Update scores
    playerScoreEl.textContent = `Score: ${getScore(playerScore)}`;
    dealerScoreEl.textContent = `Score: ${getScore(dealerScore)}`;
  
    // Update message
    if (gameOver) {
      if (playerWon) {
        messageEl.textContent = `You won ${betAmount} coins!`;
      } else if (dealerWon) {
        messageEl.textContent = 'Dealer wins!';
      } else {
        messageEl.textContent = 'Draw!';
      }
      hitBtn.disabled = true;
      standBtn.disabled = true;
      newGameBtn.disabled = false;
      betAmountInput.disabled = false;
    } else {
      messageEl.textContent = `Bet amount: ${betAmount} coins`;
    }
  }
  

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }
}


function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    
    console.log('this is the dealers sum:', dealerSum)
    console.log('this is your sum:', yourSum)


    canHit = false;
    let hiddenCard = document.getElementById("hidden") 
    let dealerCards = document.querySelector('#dealer-cards')
    hiddenCard.src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;


}


function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function playAgain() {
    // Reset variables
    dealerSum = 0
    yourSum = 0

    dealerAceCount = 0
    yourAceCount = 0

    hidden = ""
    deck = []

    canHit = true

    // Reset UI
    document.getElementById("dealer-cards").innerHTML = ""
    document.getElementById("your-cards").innerHTML = ""
    document.getElementById("dealer-sum").innerText = dealerSum
    document.getElementById("your-sum").innerText = yourSum
    document.getElementById("results").innerText = ""

    // Start new game
    buildDeck()
    shuffleDeck()
    startGame()
    resetGame()
}
playAgainBtn.addEventListener('click', playAgain);
