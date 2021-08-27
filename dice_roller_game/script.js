'use strict';

/* -------------------------------------------------------------------------- */
/*                             🧠🦾PROJECT 3: PIG GAME                             */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   📌STEPS                                  */
/* -------------------------------------------------------------------------- */
/* OBJECTIVE: Implement the game to revise the concept.

Step1. Intialize the app with score = 0 and dice should not appear till the first move is played (Implement the hidden class in style.css).

Step2. Implement Rolling the dice functionality
        Step2.1 When a user roll a dice, generate a random number 
        Tip Select the button and add the event listener
        Step2.2 If 1 switch player else add to the current score

Step3. Identify the current player and modify the code to switch player (score should be reset and current display should be 0)

Step4. As the player is switched, background color is also changed. 
        Tip Use the toggle method of the classList 

Step5. Holding current score -> When the player clicks the hold button, the score is saved and the game is transfered to the next player. 
    5.1 If the score is >= 100, end the game

Step6. If a player wins then hold the state of the game

Step7. Implement the 'again' button
*/

/* -------------------------------------------------------------------------- */
/*                                   📌CODE                                   */
/* -------------------------------------------------------------------------- */

// Selecting Elements
//Remark Use '#' to select ID if querySelector, or use getElementByID (#score--0)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Select the button element
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Selecting the current score
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// Selecting the dice element (.dice)
const diceEl = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;
// scores[player1, player2], Store the players score in the array, [0] for player 0...
//currentScore -> stores the current score
//Active Player -> - 0 and 1 for Player 1 and Player 2 respectively
//playing -> to hold the state, when game is finished set it to false, that is button roll and hold should not work when the game is finished

/* -------------------------------------------------------------------------- */
/*                              📌INTIAL CONDITIONS                             */
/* -------------------------------------------------------------------------- */

// Helper function -> Init - initial conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // Setting the element content to zero
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.querySelector('.dice').classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // Setting the active player effect
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

/* -------------------------------------------------------------------------- */
/*                            📌SWITCHING THE PLAYER                            */
/* -------------------------------------------------------------------------- */

// Helper function - Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Ensures that only one of the player have the CSS effect
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/* -------------------------------------------------------------------------- */
/*                 📌Implementing rolling the dice fuctionality                 *
/* -------------------------------------------------------------------------- */

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2. Display the dice
    //Tip Use element.src to change the image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check of rolled 1: if true switch the player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                   📌Implementing the hold functionality                   */
/* -------------------------------------------------------------------------- */

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check score is already atleast >= 100, if true then finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden'); // Hide the dice when the player wins
      // Finish the game -> Assign the player winner css class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Or change player
      switchPlayer();
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                        📌Implementing the again button                       */
/* -------------------------------------------------------------------------- */

btnNew.addEventListener('click', init);

/* -------------------------------------------------------------------------- */
/*                    📌ANOTHER METHOD OF REMOVING CSS EFFECT                   */
/* -------------------------------------------------------------------------- */
// Note Removing the winner effect on reset
// if (
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.contains('player--winner')
// ) {
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
// }
// Removing the winner effect, method 2 (brute force)
