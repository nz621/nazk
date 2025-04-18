const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameOver = false;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#0ff';
  ctx.lineWidth = 4;

  for (let i = 1; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 100, 0);
    ctx.lineTo(i * 100, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * 100);
    ctx.lineTo(300, i * 100);
    ctx.stroke();
  }

  // Draw moves
  for (let i = 0; i < 9; i++) {
    const x = (i % 3) * 100 + 50;
    const y = Math.floor(i / 3) * 100 + 50;
    if (gameBoard[i] === 'X') drawX(x, y);
    else if (gameBoard[i] === 'O') drawO(x, y);
  }
}

function drawX(x, y) {
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x - 25, y - 25);
  ctx.lineTo(x + 25, y + 25);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 25, y - 25);
  ctx.lineTo(x - 25, y + 25);
  ctx.stroke();
}

function drawO(x, y) {
  ctx.strokeStyle = '#00f';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.stroke();
}

canvas.addEventListener('click', handleClick);

function handleClick(event) {
  if (gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const col = Math.floor(x / 100);
  const row = Math.floor(y / 100);
  const index = row * 3 + col;

  if (gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  drawGrid();
  if (checkWin()) {
    message.innerText = `Congratulations! Player ${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (!gameBoard.includes('')) {
    message.innerText = 'It\'s a draw!';
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  for (const [a, b, c] of winConditions) {
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      drawWinningLine(a, c);
      return true;
    }
  }
  return false;
}

function drawWinningLine(start, end) {
  const startX = (start % 3) * 100 + 50;
  const startY = Math.floor(start / 3) * 100 + 50;
  const endX = (end % 3) * 100 + 50;
  const endY = Math.floor(end / 3) * 100 + 50;

  ctx.strokeStyle = '#f0f';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function restartGame() {
  gameBoard = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  message.innerText = '';
  drawGrid();
}

drawGrid();