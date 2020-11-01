//building array of questions
var questions = [
  {
    question: "What was Tandem's previous name?",
    answers: [
      "Tandem",
      "Devmynd",
      "Burger Shack",
      "Extraordinary Humans"
    ],
    id: "question-1",
    correctAnswer: "Devmynd"
  },
  {
    question: "In Shakespeare's play Julius Caesar, Caesar's last words were...",
    answers: [
      "Iacta alea est!",
      "Vidi, vini, vici",
      "Aegri somnia vana",
      "Et tu, Brute?"
    ],
    id: "question-2",
    correctAnswer: "Et tu, Brute?"
  },
  {
    question: "A group of tigers are referred to as:",
    answers: [
      "Chowder",
      "Ambush",
      "Pride",
      "Destruction"
    ],
    id: "question-3",
    correctAnswer: "Ambush"
  }
];
//targeting div with Start button
var card = $("#questions")
//setting 120 seconds on timer
var timeRemaining = 120;
var timer
//creating game object
var game = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timeRemaining: timeRemaining,
  currentQuestion: 0,
  //building countdown timer
  countdown: function () {
    this.timeRemaining--;
    $("#timeRemain").text(this.timeRemaining + " Seconds Left");
    if (this.timeRemaining === 0) {
      this.stop()
      alert("Time is up!")
      this.checkAnswers()
    }
  },
  //setting up first question
  questionForm: function () {
    timer = setInterval(this.countdown.bind(this), 1000)
    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>")
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class = 'answer-button' id = 'button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>")
    }
  },
  //setting up next question
  nextQuestion: function () {
    this.currentQuestion++
    this.questionForm.bind(this)()
  },
  stop: function () {
    clearInterval(window.timer)
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 1000)
    }
    else {
      setTimeout(this.nextQuestion, 1000)
    }
  },
  results: function () {
    clearInterval(window.timer)
    $("#timeRemain").text(this.timeRemaining)
    //showing correct, incorrect and unanswered questions
    card.append("<h3>Correct Answers:  " + this.correct + "</h3>")
    card.append("<h3>Incorrect Answers:  " + this.incorrect + "</h3>")
    card.append("<h3>Unanswered:  " + (questions.length - (this.incorrect + this.correct)) + "</h3>")
    card.append("<br><button id ='start-over'>Start Over?</button>")
  },
  clicked: function (e) {
    clearInterval(window.timer)
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly()
    }
    else {
      this.answeredIncorrectly()
    }
    console.log(questions[this.currentQuestion].correctAnswer)
  },
  //function for correct answers
  answeredCorrectly: function () {
    this.correct++
    clearInterval(window.timer)
    card.html("<h2>Correct</h2>")
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 1000)
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 1000)
    }
  },
  //attempt to decrement timer if wrong answer given
  answeredIncorrectly: function () {
    this.incorrect++
    clearInterval(window.timer)
    timer - 10;
    card.html("<h2>Incorrect</h2>")
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 1000)
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 1000)
    }
  },
  reset: function () {
    this.currentQuestion = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.timeRemaining = timeRemaining;
    this.questionForm();
  }
}
$(document).on("click", "#start-over", game.reset.bind(game))
$(document).on("click", ".answer-button", function (e) {
  game.clicked.bind(game, e)()
})
$(document).on("click", "#start", function () {
  game.questionForm.bind(game)()
})
