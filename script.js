const BOARD_SIZE = 4;
const EMPTY_SQUARE = "";
const TOTAL_SQUARES = BOARD_SIZE ** 2;
const WINNING_SEQUENCE = [...Array(TOTAL_SQUARES - 1).keys()].map((i) => i + 1);
const MOVES = [-BOARD_SIZE, 1, BOARD_SIZE, -1];

let board = [];
let emptyIndex = 0;
let isGameOver = false;
let timer = null;
let startTime = null;

const boardEl = document.getElementById("board");
const restartBtn = document.getElementById("restartBtn");
const timerEl = document.getElementById("timer");
