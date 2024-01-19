//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "Which type of geodatabase can have multiple editors but only if they work on different parts of the data?",
    options: ["File geodatabase", "Personal geodatabase", "Microsoft database", "Enterprise database"],
    correct: "File geodatabase",
  },
  {
    id: "1",
    question: "What map data comprises facilities, physical features, and utilities within the installation boundary?",
    options: ["Mission data set (MDS)", "Mission data layer (MDL)", "Common installation picture (CIP)", "Installation development plan (IDP)"],
    correct: "Common installation picture (CIP)",
  },
  {
    id: "2",
    question: "What are the type groups of vector data?",
    options: ["Points, lines, and imagery", "Points, lines, and polygons", "Points, polygons, and imagery", "Points, lines, polygons, and imagery"],
    correct: "Points, lines, and polygons",
  },
  {
    id: "3",
    question: "Which tables give data unique characteristics?",
    options: ["Data", "Excel", "Raster", "Attribute"],
    correct: "Attribute",
  },    
  {
    id: "4",
    question: "Which mission data set (MDS) represents the planning districts of the installation?",
    options: ["Land use", "Constraints", "Future development plan", "Common installation picture"],
    correct: "Land use",
  },
  {
    id: "5",
    question: "Three files are generated when creating a schema; which file contains instructions on importing the schema?",
    options: [".tbx file", ".sch file", ".xml file", "Readme.doc"],
    correct: "Readme.doc",
  },
   {
    id: "6",
    question: "Which editor function allows us to specify an angle and a length to create a line or side of a polygon?",
    options: ["Length", "Direction", "Deflection", "Direction/Length"],
    correct: "Direction/Length",
  },
  {
    id: "7",
    question: "We group grids together by creating “samples” at larger scales by way of",
    options: ["Cylinders", "Pyramids", "Polygons", "Diamonds"],
    correct: "Pyramids",
  },
  {
    id: "8",
    question: "Which tool do we use to create a new file of a layer’s data in a different format?",
    options: ["Draw", "Export Data", "Edit Features", "Advanced Editor"],
    correct: "Export Data",
  },
  {
    id: "9",
    question: "Under which menu and tab in Catalog do we find the “Metadata Style” setting?",
    options: ["File, Data", "Edit, Options", "Customize, ArcCatalog Options", "Windows, View Metadata Styles"],
    correct: "Customize, ArcCatalog Options",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
