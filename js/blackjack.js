
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

const betInput = document.getElementById('bet-input')
const betButton = document.getElementById('bet-button')
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
    // console.log(deck);
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

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
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
      moneyDisplay.innerText = `Money: $${playerMoney}`;
      betInput.disabled = true;
      betButton.disabled = true;
      dealButton.disabled = false;
      hitButton.disabled = false;
      standButton.disabled = false;
    }
  }
  
//   betButton.addEventListener('click', handleBet);
  
  function resetGame() {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerAceCount = 0;
    dealerAceCount = 0;
    // updateScore();
    // updateDealerScore();
    // hideDealerScore();
    // showPlayerScore();
    // showDealerCardBack();
    // document.getElementById('dealButton').disabled = false;
    // document.getElementById('hitButton').disabled = true;
    // document.getElementById('standButton').disabled = true;
  }
  
  
//   playAgainBtn.addEventListener('click', () => {
//     resetGame();
//     playerMoney += playerBet * 2;
//     moneyDisplay.innerText = `Money: $${playerMoney}`;
//   });

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
    dealerCardsEl.innerHTML = dealerCardsHtml;
  
    // Update scores
    playerScoreEl.textContent = `Score: ${getScore(playerCards)}`;
    dealerScoreEl.textContent = `Score: ${getScore(dealerCards)}`;
  
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


// function stay() {
//     dealerSum = reduceAce(dealerSum, dealerAceCount);
//     yourSum = reduceAce(yourSum, yourAceCount);

//     canHit = false;
//     document.getElementById("hidden").src = "./cards/" + hidden + ".png";

//     let message = "";
//     if (yourSum > 21) {
//         message = "You Lose!";
//     }
//     else if (dealerSum > 21) {
//         message = "You win!";
//     }
//     //both you and dealer <= 21
//     else if (yourSum == dealerSum) {
//         message = "Tie!";
//     }
//     else if (yourSum > dealerSum) {
//         message = "You Win!";
//     }
//     else if (yourSum < dealerSum) {
//         message = "You Lose!";
//     }

//     document.getElementById("dealer-sum").innerText = dealerSum;
//     document.getElementById("your-sum").innerText = yourSum;
//     document.getElementById("results").innerText = message;
// }

async function stay() {
    document.querySelector('#hit-button').disabled = true;
    document.querySelector('#stay-button').disabled = true;
    while (DEALER_SCORE < PLAYER_SCORE && DEALER_SCORE <= 21 && PLAYER_SCORE <= 21) {
      let card = getRandomCard();
      dealCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
      await sleep(1000);
    }
    const dealerCard0 = document.querySelector('#dealer-card-0');
    if (dealerCard0) {
      dealerCard0.src = null;
    }
    showResult(computeWinner());
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
