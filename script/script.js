// Initialize all variables needed
var currentQuestionIndex = 0;
var time = 100;
var timerId;

// get elements from html pages
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var resultsEl = document.getElementById("results");
var startScreenEl = document.getElementById("start-screen");

//Functions to start quiz and save scores
startBtn.onclick = startQuiz;
submitBtn.onclick = saveScores;

//Updating time
function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

//Start All quiz attributes

function startQuiz() {
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

//How to load questions from our storage
function getQuestion() {
  choicesEl.innerHTML = "";

  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = nextQuestion;
    choicesEl.appendChild(choiceBtn);
  });
}

// Answering Question
function nextQuestion() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
  }

  currentQuestionIndex++;
  //check to see if it's the last question in the array
  if (currentQuestionIndex == questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

//function for when the quiz is finished
function endQuiz() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function saveClicks() {
  var characterPick = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials,
    };

    // store and puts into string
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }

  window.location.reload(true);
}

// function in order to save scores to the browser's local storage
function saveScores() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials,
    };

    // store and puts into string
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }

  window.location.reload(true);
}

// Actual questions during class...

var questions = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<js>", "<javascript>", "<scripting>", "<script>"],
    answer: "<script>",
  },

  {
    title: "Where is the correct place to insert a JavaScript?",
    choices: ["<head> section", "<body> section", "both", "neither"],
    answer: "both",
  },

  {
    title: "What does CSS stand for?",
    choices: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
    answer: "Cascading Style Sheet",
  },

  {
    title: "What does XML stand for?",
    choices: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
    answer: "eXtensible Markup Language",
  },

  {
    title: "What are the three parts of the Box Model",
    choices: [
      "Margin-Border-Padding",
      "Height-Width-Depth",
      "Border-Margin-Spacing",
    ],
    answer: "Margin-Border-Padding",
  },

  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Git Bash", "Terminal", "console.log"],
    answer: "console.log",
  },

  {
    title: "How do you denote an ID tag in CSS?",
    choices: [".", "<id>", "$", "#"],
    answer: "#",
  },

  {
    title: "The external JavaScript file must contain the <script> tag.",
    choices: ["True", "False"],
    answer: "False",
  },

  {
    title: "What does 'URL' stand for?",
    choices: [
      "User Resource Locating",
      "Unicode Registry Load",
      "Uniform Resource Location",
      "I Don't Know",
    ],
    answer: "Uniform Resource Location",
  },

  {
    title: "How does a WHILE loop start?",
    choices: ["while (i <=10); i++", "while(i<=10)", "while i=1 to 10"],
    answer: "while(i<=10)",
  },
];

//Get elementIDs and also call function when new page is loaded
document.getElementById("clear").onclick = clearHighscores;
showScores();

// Functions for displaying highscores
function showScores() {
  // retrieve scores from local storage with JSON
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort scores
  highscores.sort(function (x, y) {
    return y.score - x.score;
  });

  //append to high scores
  highscores.forEach(function (score) {
    var liTag = document.createElement("LI");
    score.initials = score.initials.toUpperCase();
    liTag.textContent = score.initials + " --- " + score.score;

    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

//Clearing the scores that are stored
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
