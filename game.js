// get board and cells
const board = document.querySelector('.board');
const cells = [];

// create cells and add to board
for (let i = 1; i <= 15; i++) {
  const cell = document.createElement('div');
  cell.innerText = i;
  cells.push(cell);
  board.appendChild(cell);
}

// empty cell
const emptyCell = document.createElement('div');
emptyCell.classList.add('empty');
cells.push(emptyCell);
board.appendChild(emptyCell);

// shuffle cells
shuffle(cells);

// add cells to board in random order
cells.forEach(cell => board.appendChild(cell));

// add event listener to each cell
cells.forEach(cell => cell.addEventListener('click', moveCell));

// add event listener to restart button
const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', restartGame);

// timer variables
let timerInterval;
let startTime;

function moveCell() {
  const cellIndex = cells.indexOf(this);
  const emptyIndex = cells.indexOf(emptyCell);

  // check if move is valid
  if (isValidMove(cellIndex, emptyIndex)) {
    // swap cells
    [cells[cellIndex], cells[emptyIndex]] = [cells[emptyIndex], cells[cellIndex]];
    // update board
    cells.forEach(cell => board.appendChild(cell));
    // check if game is won
    if (isGameWon()) {
      clearInterval(timerInterval);
      alert(`You won in ${getFormattedTime()}`);
    }
  }
}

function restartGame() {
  // stop timer
  clearInterval(timerInterval);
  // reset cells
  cells.forEach(cell => board.appendChild(cell));
  // shuffle cells
  shuffle(cells);
  // add cells to board in random order
  cells.forEach(cell => board.appendChild(cell));
  // start timer
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function isValidMove(cellIndex, emptyIndex) {
  // check if cells are adjacent
  if (Math.abs(cellIndex - emptyIndex) === 1 ||
      Math.abs(cellIndex - emptyIndex) === 4) {
    // check if cells are in same row or column
    if (Math.floor(cellIndex / 4) === Math.floor(emptyIndex / 4) ||
        cellIndex % 4 === emptyIndex % 4) {
      return true;
    }
  }
  return false;
}

function isGameWon() {
  for (let i = 0; i < cells.length - 1; i++) {
    if (parseInt(cells[i].innerText) !== i + 1) {
      return false;
    }
  }
  return true;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime - minutes * 60000) / 1000);
  document.getElementById('timer').innerText = getFormattedTime(minutes, seconds);
}

function getFormattedTime(minutes = 0, seconds = 0) {
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}
