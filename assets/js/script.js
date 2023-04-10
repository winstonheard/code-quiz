// DOM elements

const welcomeSection = document.getElementById("welcome");
const startQuizBtn = document.getElementById("start-quiz");
const viewHighScoresBtn = document.getElementById("view-high-scores");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choiceButtons = document.querySelectorAll(".choice-btn");
const answerResult = document.getElementById("answer-result");
const timerElement = document.getElementById("timer");
const gameOverSection = document.getElementById("game-over");
const userName = document.getElementById("user-name");
const customMessage = document.getElementById("custom-message");
const finalScoreElement = document.getElementById("final-score");
const restartQuizBtn = document.getElementById("restart-quiz");
const saveScoreSection = document.getElementById("save-score");
const scoreForm = document.getElementById("score-form");
const nameInput = document.getElementById("name");
const highScoresSection = document.getElementById("high-scores");
const scoreList = document.getElementById("score-list");
const noScores = document.getElementById("no-scores");
const clearScoresBtn = document.getElementById("clear-scores");
const backToHomeBtn = document.getElementById("back-to-home");

// variables
let timer;
let timeRemaining = 120;
let currentQuestionIndex = 0;
let correctAnswers = 0;

// Define questions, choices, and correct answers
let questions = [
  
  {
    question: "_________ is a way to store multiple values in a single variable.",
    choices: ["An index", "An array", "A function", "A string"],
    correctAnswer: 1
  },
  {
    question: "_______ are the values associated with a JavaScript object.",
    choices: ["Properties", "Booleans", "Functions", "Loops"],
    correctAnswer: 0
  },
  {
    question: "The three ways to define a function in JavaScript are:",
    choices: ["Constructor, Arrow, and Block", "Expression, Declaration, and Arrow", "Declaration, Constructor, and Expression", "Asynchronous, Synchronous, and Arrow"],
    correctAnswer: 2
  },
  {
    question: "A _______ writes a message to the console for testing purposes.",
    choices: ["console.log", "console.write", "console.test", "debug.console"],
    correctAnswer: 0
  },
  {
    question: "_______ is a property used to set or get stack order of positioned element.",
    choices: ["var z", "zIndex", "Hierarchy", "Stack(index)"],
    correctAnswer: 1
  },
];

// start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  timeRemaining = 60;
  updateTimer();
  startQuizBtn.parentElement.style.display = "none";
  quizContainer.style.display = "block";
  timer = setInterval(countdown, 1000);
  showQuestion();
}

// countdown function for timer
function countdown() {
  timeRemaining--;
  updateTimer();
    // if time runs out, show game over
  if (timeRemaining <= 0) {
    clearInterval(timer);
    showGameOver();
  }
}

// update timer display
function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  timerElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// show current question and choices
function showQuestion() {
  let question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].textContent = question.choices[i];
    choiceButtons[i].addEventListener("click", checkAnswer);
  }
}

// check if answer is correct
function checkAnswer(e) {
    let chosenAnswer = Array.from(choiceButtons).indexOf(e.target);
    let correct = chosenAnswer === questions[currentQuestionIndex].correctAnswer;
    // show green result for correct answer, red for incorrect
    answerResult.style.display = "block";
    answerResult.textContent = correct ? "Correct!" : "Incorrect!";
    answerResult.style.color = correct ? "green" : "red";
  
    if (correct) {
      correctAnswers++;
    } else {
      timeRemaining = Math.max(0, timeRemaining - 10);
      updateTimer();
    }
  
    // remove event listeners from buttons
    for (let button of choiceButtons) {
      button.removeEventListener("click", checkAnswer);
    }
  
    // show next question or game over
    setTimeout(() => {
      answerResult.style.display = "none";
      currentQuestionIndex++;
  
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        clearInterval(timer);
        showGameOver();
      }
    }, 1000);
  }
  
// show game over section
function showGameOver() {
    quizContainer.style.display = "none";
    gameOverSection.style.display = "block";
    let scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    finalScoreElement.textContent = `${scorePercentage}%`;
  
    if (scorePercentage === 100) {
      customMessage.textContent = "Awesome! You got all of the questions right!";
    } else if (scorePercentage >= 60 && scorePercentage <= 80) {
      customMessage.textContent = "Great job! You know your JavaScript!";
    } else {
      customMessage.textContent = "Nice try! Study a little more and try the quiz again!";
    }
  }
  
  
  
  

  function restartQuiz() {
    gameOverSection.style.display = "none";
    // saveScoreSection.style.display = "none";
    highScoresSection.style.display = "none";
    welcomeSection.style.display = "block";
    resetQuiz();
  }

  function resetQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    // countdownTime = QUIZ_TIME;
  }
  
  

function saveUserScore(name, score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name: name, score: score });
  
    // Sort scores in descending order
    highScores.sort((a, b) => b.score - a.score);
  
    // Keep only the top 5 scores
    highScores = highScores.slice(0, 5);
  
    // Save the updated high scores list to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  
  
// show save score section
// function viewHighScores() {
//     // startQuizBtn.parentElement.style.display = "none";
//     // gameOverSection.style.display = "none";
//     // saveScoreSection.style.display = "none";
//     highScoresSection.style.display = "block";
//     displayHighScores();
//   }
  
// display high scores
function displayHighScores() {
    welcomeSection.style.display = "none";
    highScoresSection.style.display = "block";

    const scoreList = document.getElementById("score-list");
    scoreList.innerHTML = "";

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    if (highScores.length === 0) {
      const noScoresMessage = document.createElement("li");
      noScoresMessage.textContent = "No scores have been recorded yet. You can be the first!";
      scoreList.appendChild(noScoresMessage);
    } else {
      highScores.forEach((score) => {
        const li = document.createElement("li");
        li.textContent = `${score.name}: ${score.score}%`;
        scoreList.appendChild(li);
      });
    }
  }
  
  // clear high scores
  function clearHighScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
  }
  
  // go back to home page
  function backToHome() {
    highScoresSection.style.display = "none";
    startQuizBtn.parentElement.style.display = "block";
  }
  
  // show save score section
//   function showSaveScore() {
//     gameOverSection.style.display = "none";
//     saveScoreSection.style.display = "block";
//   }
  
scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = nameInput.value.trim();
    if (!name) return;
  
    let scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    saveUserScore(name, scorePercentage);
  
    nameInput.value = "";
    gameOverSection.style.display = "none";
    displayHighScores();
  });
  
  
    
  
  // event listeners
  startQuizBtn.addEventListener("click", startQuiz);
  restartQuizBtn.addEventListener("click", () => {
    highScoresSection.style.display = "none";
    restartQuiz();
    });
  viewHighScoresBtn.addEventListener("click", (e) => {
    e.preventDefault();
    welcomeSection.style.display = "none";
    highScoresSection.style.display = "block";  
    displayHighScores();
  });
  clearScoresBtn.addEventListener("click", clearHighScores);
//   backToHomeBtn.addEventListener("click", backToHome);

