// 1. Variables //

const body = document.querySelector("body");
const container = document.querySelector(".container");
const myNumbers = document.querySelector(".choose-numbers-container");
const header3 = document.querySelector("h3");
const machineNumbers = document.querySelector("draw-numbers-container");
const showResultDiv = document.querySelector(".show-result");
const balls = document.getElementsByClassName(".ball");
const allNumbersArr = [];
const selectedNumsArr = [];
const startDrawBtn = document.querySelector(".startBtn");
const restartBtn = document.querySelector(".restartBtn");

// 2. Create Board //

function createNumbersBoard(number) {
  const board = document.createElement("div");
  board.classList.add("board");
  myNumbers.append(board);
  for (let i = 0; i < number; i++) {
    const boardEl = document.createElement("button");
    boardEl.classList.add("boardEl");
    board.append(boardEl);
  }

  const boardEls = document.getElementsByClassName("boardEl");
  for (let i = 0; i < boardEls.length; i++) {
    boardEls[i].setAttribute("data-number", i + 1);
    const dataNumber = boardEls[i].getAttribute("data-number");
    const number = parseInt(dataNumber, 10);
    allNumbersArr.push(number);
    boardEls[i].textContent = number;
  }
}

createNumbersBoard(39);

//3. Select Numbers //

const boardEls = document.getElementsByClassName("boardEl");
for (let i = 0; i < boardEls.length; i++) {
  boardEls[i].addEventListener("click", function () {
    if (selectedNumsArr.length < 7) {
      boardEls[i].style.backgroundColor = "red";
      boardEls[i].style.color = "white";
      boardEls[i].setAttribute("disabled", true);
      selectedNumsArr.push(boardEls[i].textContent);
    }
  });
}

//console.log(selectedNumsArr);

// Generate Random Numbers from 1 to 39 //

const generateNumbers = () => {
  const numbers = new Set();
  while (numbers.size < 7) {
    numbers.add(Math.floor(Math.random() * 39) + 1);
  }
  return Array.from(numbers);
};

// Display numbers in DOM //

const displayNumbers = () => {
  const numbers = generateNumbers();
  const numbersDiv = document.getElementById("randomNumbers");
  numbersDiv.innerHTML = "";
  numbers.forEach((number) => {
    const numberSpan = document.createElement("span");
    numberSpan.innerText = number;
    numbersDiv.appendChild(numberSpan);
  });
  return Array.from(numbers);
};

// Start draw Button Even Listener //
startDrawBtn.addEventListener(
  "click",
  function () {
    if (selectedNumsArr.length < 7) {
      alert("YOU DIDNT SELECT 7 NUMBERS YET");
    } else if (selectedNumsArr.length === 7) {
      const selectedNumsArrNumbers = selectedNumsArr.map((string) =>
        parseInt(string)
      );
      const machineNumbersArr = displayNumbers();
      const compareArrays = (selectedNumsArrNumbers, machineNumbersArr) => {
        let correctNumbers = 0;
        selectedNumsArrNumbers.forEach((num) => {
          if (machineNumbersArr.includes(num)) {
            correctNumbers += 1;
          }
        });
        let result = "";
        if (correctNumbers < 2) {
          result = `You got only ${correctNumbers} correct number! More luck next time 😫`;
        } else if (correctNumbers < 3) {
          result = `You got only ${correctNumbers} correct numbers! More luck next time 😫`;
        } else if (correctNumbers === 4) {
          result = `You got ${correctNumbers} correct number! You earned 100💲`;
        } else if (correctNumbers === 5) {
          result = `You got ${correctNumbers} correct number! You earned 500💲`;
        } else if (correctNumbers === 6) {
          result = `You got ${correctNumbers} correct number! You earned 10.000💲`;
        } else if (correctNumbers === 7) {
          result = `You got ${correctNumbers} correct number! You earned 1000000💲! You are the winner!`;
        }
        showResultDiv.innerHTML = result;
      };
      compareArrays(selectedNumsArrNumbers, machineNumbersArr);
      console.log(selectedNumsArrNumbers), console.log(machineNumbersArr);
    }
  },
  { once: true }
);

// Restart Button Event Listener //
restartBtn.addEventListener("click", function () {
  location.reload();
});
