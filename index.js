const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById("reset-button");
let currentPlayer = 'X'; // Start with player X
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']; // Game board

// Functions to handle square clicks
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (board[index] !== ' ' || checkWinner()) return;

        square.textContent = currentPlayer;
        board[index] = currentPlayer;

        if (checkWinner()) {
            document.getElementById("demo").innerHTML = `${currentPlayer} wins!`;
        } else if (board.every(cell => cell !== ' ')) {
            document.getElementById("demo").innerHTML = "It is a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const winningCombination = winningCombinations.find(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });

    if (winningCombination) {
        drawWinningLine(winningCombination);
        return true;
    }
    return false;
}

// Function to draw the winning line
function drawWinningLine(combination) {
    const line = document.getElementById('line');
    const winnerLine = document.getElementById('winner-line');
    const squares = document.querySelectorAll('.square');

    const [a, b, c] = combination;
    const startX = squares[a].offsetLeft + squares[a].offsetWidth / 2;
    const startY = squares[a].offsetTop + squares[a].offsetHeight / 2;
    const endX = squares[c].offsetLeft + squares[c].offsetWidth / 2;
    const endY = squares[c].offsetTop + squares[c].offsetHeight / 2;

    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    winnerLine.style.display = 'block';
}

// Reset button functionality
resetButton.addEventListener('click', () => {
    // Clear the board and reset the game state
    board.fill(' ');
    squares.forEach(square => {
        square.textContent = ' ';
    });
    currentPlayer = 'X'; // Reset to player X
    document.getElementById('winner-line').style.display = 'none'; // Hide the winning line
    document.getElementById("demo").innerHTML = ""; // Clear win/tie message
    console.log("Game has been reset."); // Debugging output
});