document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);

  const hoveredEl = document.elementFromPoint(x, y);

  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
});


// Rock Paper Scissors
//Caching the DOM
//DOM variables that store DOM elements

// Game Text (Schere - Stein - Papier)
const gameText = document.querySelector(".game-heading-text");

let schere = "Schere".fontsize(3);
let stein = "Stein";
let papier = "Papier";

let gameTextContent = `Vulkanier - Meteorid - Galaxie`;

Array.from(gameTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  gameText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "gameTextAnim 5s";
  });
});
// End of Game Text (Schere - Stein - Papier)

let userScore = 0;
let computerScore = 0;
let userScore_span = document.getElementById("user-score");
let computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function convertToWord(letter) {
  if (letter === "r") return "Stein";
  if (letter === "p") return "Papier";
  return "Schere";
}

// function change badge win -user
function changeBadgeWin() {
  var element = document.getElementById("user-label");
  element.classList.remove("rotating-badge");
  void element.offsetWidth;
  element.classList.add("rotating-badge");
}

function changeBadgeLose() {
  var element = document.getElementById("computer-label");
  element.classList.remove("rotating-badge");
  void element.offsetWidth;
  element.classList.add("rotating-badge");
}

function changeBadgeDraw() {
  changeBadgeWin();
  changeBadgeLose();
}

function win(user, computer) {
  const smallUserWord = "Du".fontsize(3).sub();
  const smallComputerWord = "Chris".fontsize(3).sub();
  const user_div = document.getElementById(user);
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(
    user
  )} ${smallUserWord} schlägt ${convertToWord(
    computer
  )}${smallComputerWord}. ${userScore} 🍪 für dich!`;
  user_div.classList.add("green-glow");
  setTimeout(() => user_div.classList.remove("green-glow"), 300);
  changeBadgeWin();
  // console.log(userScore);
  // console.log("YOU WIN!");
  // console.log(user);
  // console.log(computer);
}

// setTimeout(function() {console.log("hello")}, 3000);

function lose(user, computer) {
  const smallUserWord = "Du".fontsize(3).sub();
  const smallComputerWord = "Chris".fontsize(3).sub();
  const user_div = document.getElementById(user);
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(
    user
  )} ${smallUserWord} verliert gegen ${convertToWord(
    computer
  )}${smallComputerWord}.`;
  user_div.classList.add("red-glow");
  setTimeout(() => user_div.classList.remove("red-glow"), 300);
  changeBadgeLose();
  // console.log("YOU LOOSE!");
}

function draw(user, computer) {
  const smallUserWord = "Du".fontsize(3).sub();
  const smallComputerWord = "Chris".fontsize(3).sub();
  const user_div = document.getElementById(user);
  result_p.innerHTML = `${convertToWord(
    user
  )} ${smallUserWord} gleicht ${convertToWord(
    computer
  )}${smallComputerWord}. Unentschieden!`;
  user_div.classList.add("gray-glow");
  setTimeout(() => user_div.classList.remove("gray-glow"), 300);
  changeBadgeDraw();
  // console.log("IT'S A DRAW!");
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  // console.log("user choice: " + userChoice);
  // console.log("computer choice: " + computerChoice);
  switch (userChoice + computerChoice) {
    case "rs": // Rock beats scissors
    case "pr": // Paper beats rock
    case "sp": // Scissors beat paper
      win(userChoice, computerChoice);
      // console.log("User wins.");
      break;
    case "rp": // Paper beats rock
    case "ps": // Scissors beat paper
    case "sr": // Rock beats scissors
      lose(userChoice, computerChoice);
      // console.log("Computer wins.");
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      // console.log("It's a draw.");
      break;
  }
  if (userScore + computerScore === 10) {
    // alert("You won!")
    rock_div.removeEventListener("click", handleRockClick);
    rock_div.style.cursor = "none";
    paper_div.removeEventListener("click", handlePaperClick);
    paper_div.style.cursor = "none";
    scissors_div.removeEventListener("click", handleScissorsClick);
    scissors_div.style.cursor = "none";
  }
}

const handleRockClick = () => game("r");
const handlePaperClick = () => game("p");
const handleScissorsClick = () => game("s");

function main() {
  rock_div.addEventListener("click", handleRockClick);
  paper_div.addEventListener("click", handlePaperClick);
  scissors_div.addEventListener("click", handleScissorsClick);
}

function resetGame() {
  document.getElementById("user-score").innerHTML = 0;
  document.getElementById("computer-score").innerHTML = 0;
  window.location.reload();
}

main();

// console.log(getComputerChoice());
// game();

// Schere-Stein-Papier-Spiel
