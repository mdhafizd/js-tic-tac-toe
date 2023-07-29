const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let board = {
    1: '', 2: '', 3: '',
    4: '', 5: '', 6: '',
    7: '', 8: '', 9: ''
};

let currentPlayer = 'X';
let gameOver = false;

// Function to check for a winner or a tie
function checkGameStatus() {
    const winCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.textContent = `Player ${board[a]} wins!`;
            gameOver = true;
            return;
        }
    }

    if (Object.values(board).every(cell => cell !== '')) {
        message.textContent = "It's a tie!";
        gameOver = true;
        return;
    }
}

// Function to handle a cell click event
function handleCellClick(event) {
    const cell = event.target;
    const cellNumber = cell.dataset.cell;

    if (!board[cellNumber] && !gameOver) {
        board[cellNumber] = currentPlayer;
        cell.textContent = currentPlayer;
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to restart the game
function restartGame() {
    board = {
        1: '', 2: '', 3: '',
        4: '', 5: '', 6: '',
        7: '', 8: '', 9: ''
    };
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
    gameOver = false;
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial message
message.textContent = "Player X's turn";
