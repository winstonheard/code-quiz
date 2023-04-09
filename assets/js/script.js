// DOM elements

const startQuizBtn = document.getElementById("start-quiz");
const viewHighScoresBtn = document.getElementById("view-high-scores");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choiceButtons = document.querySelectorAll(".choice-btn");
const answerResult = document.getElementById("answer-result");
const timerElement = document.getElementById("timer");
const gameOverSection = document.getElementById("game-over");
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
  }
];

function startQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  timeRemaining = 120;
  updateTimer();
  startQuizBtn.parentElement.style.display = "none";
  quizContainer.style.display = "block";
  timer = setInterval(countdown, 1000);
  showQuestion();
}

function countdown() {
  timeRemaining--;
  updateTimer();

  if (timeRemaining <= 0) {
    clearInterval(timer);
    showGameOver();
  }
}

function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  timerElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function showQuestion() {
  let question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].textContent = question.choices[i];
    choiceButtons[i].addEventListener("click", checkAnswer);
  }
}

function checkAnswer(e) {
    let chosenAnswer = Array.from(choiceButtons).indexOf(e.target);
    let correct = chosenAnswer === questions[currentQuestionIndex].correctAnswer;
  
    answerResult.style.display = "block";
    answerResult.textContent = correct ? "Correct!" : "Incorrect!";
    answerResult.style.color = correct ? "green" : "red";
  
    if (correct) {
      correctAnswers++;
    } else {
      timeRemaining = Math.max(0, timeRemaining - 10);
      updateTimer();
    }
  
    for (let button of choiceButtons) {
      button.removeEventListener("click", checkAnswer);
    }
  
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
  

function showGameOver() {
    quizContainer.style.display = "none";
    gameOverSection.style.display = "block";
    finalScoreElement.textContent = correctAnswers;
    setTimeout(() => {
      showSaveScore();
    }, 4000);
  }
  

function restartQuiz() {
  gameOverSection.style.display = "none";
  startQuiz();
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
  

function viewHighScores() {
    startQuizBtn.parentElement.style.display = "none";
    gameOverSection.style.display = "none";
    saveScoreSection.style.display = "none";
    highScoresSection.style.display = "block";
    displayHighScores();
  }
  
  function displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5);
  
    scoreList.innerHTML = "";
  
    if (highScores.length === 0) {
      scoreList.appendChild(noScores);
    } else {
      highScores.forEach(score => {
        const li = document.createElement("li");
        li.textContent = `${score.name}: ${score.score}`;
        scoreList.appendChild(li);
      });
    }
  }
  
  function clearHighScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
  }
  
  function backToHome() {
    highScoresSection.style.display = "none";
    startQuizBtn.parentElement.style.display = "block";
  }
  
  function showSaveScore() {
    gameOverSection.style.display = "none";
    saveScoreSection.style.display = "block";
  }
  
  scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = nameInput.value.trim();
    if (!name) return;
  
    saveUserScore(name, correctAnswers);
  
    nameInput.value = "";
    saveScoreSection.style.display = "none";
    setTimeout(() => {
      viewHighScores();
    }, 500);
  });  
  
  
  startQuizBtn.addEventListener("click", startQuiz);
  restartQuizBtn.addEventListener("click", restartQuiz);
  viewHighScoresBtn.addEventListener("click", viewHighScores);
  clearScoresBtn.addEventListener("click", clearHighScores);
  backToHomeBtn.addEventListener("click", backToHome);

