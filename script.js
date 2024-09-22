'use strict';

//selecting emements
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let playing;

//staring conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0E1.classList.remove('player--winner');
  player1E1.classList.remove('player--winner');
  player0E1.classList.add('player--active');
  player1E1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E1.classList.toggle('player--active');
  player1E1.classList.toggle('player--active');
};

//rolling dice functionality;

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Genertationg a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1:
    if (dice !== 1) {
      //add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current scor to active player's score
    scores[activePlayer] += currentScore;
    // scores[1]=scores[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's scores is >=50
    if (scores[activePlayer] >= 50) {
      //finsh game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});

// how to play new code from gpt bro

const howToPlayBtn = document.querySelector('.btn--how-to-play');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');

// Show modal with animation
howToPlayBtn.addEventListener('click', function () {
  modal.classList.add('show');
  document.querySelector('.modal-content').classList.add('show');
});

// Close modal when clicking on close button
closeBtn.addEventListener('click', function () {
  modal.classList.remove('show');
  document.querySelector('.modal-content').classList.remove('show');
});

// Optional: Close modal when clicking outside the modal content
modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.querySelector('.modal-content').classList.remove('show');
  }
});
