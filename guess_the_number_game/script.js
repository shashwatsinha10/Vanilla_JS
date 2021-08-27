'use strict';

/* -------------------------------------------------------------------------- */
/*                          PROJECT 1: GUESS THE NUMBER                         */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                     👁‍🗨🧠🦾 LEARNING OUTCOME                              */
/* -------------------------------------------------------------------------- */

/*
1. Selecting DOM element: querySelector

2. Handling Event: addEventListener
*/

/* -------------------------------------------------------------------------- */
/*                           📌 Handling Click Event                            */
/* -------------------------------------------------------------------------- */
/*
  Step 1.To listen to a event, first select the element where it has to happen
 Target -> Check Button

 Step 2. Call addEventListener on the element and specify the parameters which are 
 type (what is the event) and eventHandler.

    Remark The event handler is takes a object which can be a function also. 

 Note There is two class name - btn and check ("btn check"). btn is a generic class for all the buttons
 where as check defines the specific button.
*/

/* -------------------------------------------------------------------------- */
/*                        📌IMPLEMENTING THE GAME LOGIC                       */
/* -------------------------------------------------------------------------- */

/*
Step 3. Implement a secret number ,i.e, the correct answer
        
    Remark It should be defined globally since we want to intialized it only once per game

Step 4. Apply conditional statments and display the appropriate message:
        i. Guess === Null
        ii. Guess > Secret Number
        iii. Guess < Secret Number
        iv. Guess === Secret Number: Set the high score equal to the score

Step 5. Decrease the score on wrong guess. Declare a global variable, manipulate and display.
        Remark Why global declaration: Dont leave your data on the DOM. DOM is supposed to view data, not to store it (avoids conflicts).  

Step 6. Dont forget to stop the same once the score reaches to zero.
*/

//Note random() generates random floating number between 0 to 1 (excluding). Convert to int using trunc (ex -> trunc(3.4) = 3).

/* -------------------------------------------------------------------------- */
/*                          📌 MANIPULATING CSS STYLES                          */
/* -------------------------------------------------------------------------- */

/*
Step 7. Display green color if player guess correct number. 
        Tip: Apply the CSS efect to the body, ie, selector will select the body

Step 8. Increase the font of the number display when won.
*/

/* -------------------------------------------------------------------------- */
/*                              📌 RELOAD THE GAME                              */
/* -------------------------------------------------------------------------- */

/*
Implement a game rest functionality, so that the player can make a new guess!
Step 9. Set the score to the intial value and the input value to null.

Step 10. Reassign the secretNumber.

Step 11. Display the message 'start guessing...' and '?' (.number)

Step 12. Restore the CSS style.
*/

/* -------------------------------------------------------------------------- */
/*                          📌 IMPLEMENTING HIGHSCORE                           */
/* -------------------------------------------------------------------------- */

/*
Step 13. Initialize highScore = 0

Step 14. Update the highscore if the current score is greater than the highscore (highscore should be reset)

/* -------------------------------------------------------------------------- */
/*                            📌REFACTORING THE CODE                            */
/* -------------------------------------------------------------------------- */

/*
Follow the DRY PRINCIPLE.
*/

/* -------------------------------------------------------------------------- */
/*                                   📌 Code                                    */
/* -------------------------------------------------------------------------- */

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;

// Helper function
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const setNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const setScore = function (score) {
  document.querySelector('.score').textContent = score;
};

// Selecting the Elements
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //Note Default user input is always a string.

  //Remark guess is a number and if no input is given then 0 will be evaluated to false (0 is a falsy value)

  // Implementing Game Logic
  // When there is no input
  if (!guess) {
    displayMessage('No Number😢');
  }

  // When the player wins
  else if (guess === secretNumber) {
    displayMessage('🎉Correct Number!');
    setNumber(secretNumber);

    //Note: An element is selected by passing it to the string.
    // CSS style when win
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // Implementing highScore
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }

  //When the Guess is wrong
  else if (guess !== secretNumber)
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈Too high!' : '📉Too low!');
      score--;
      setScore(score);
    } else {
      displayMessage('You lost the game😿!');
      setScore(0);
    }
});

// Implementing Again
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  displayMessage('Start guessing...');
  setScore(score);
  setNumber('?');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
