const gameContainer = document.getElementById("gameContainer");

const gameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const createBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = null;
            }
        }
    };

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = null;
            }
        }
    };

    const getBoard = () => board;

    const isNoCellsLeft = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    };

    return {
        getBoard,
        isNoCellsLeft,
        createBoard,
        resetBoard
    };
})();

const Player = (name, marker, imgSrc) => {
    return { name, marker, imgSrc};
};

function GameController() {
    const playerOne = Player("Player One", "O", "./images/o_icon.png");
    const playerTwo = Player("Player Two", "X", "./images/x_icon.png");
    let currentPlayer = playerOne;
    let board = gameBoard.getBoard();

    const printBoard = () => {
        gameContainer.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            let row = document.createElement("div");
            row.className = `Row ${i}`;
            gameContainer.appendChild(row);
            for (let j = 0; j < board[i].length; j++) {
                let cell = document.createElement("div");
                cell.className = `Cell ${i}-${j}`;
                cell.textContent = board[i][j];
                row.appendChild(cell);
                cell.addEventListener("click", () => {
                    getPlayerChoice(cell, i, j);
                });
            }
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const getPlayerChoice = (cell, row, col) => {
        if (board[row][col] === null) { // Only allow marking empty cells
            board[row][col] = currentPlayer.marker;
            cell.textContent = '';
            const img = document.createElement("img");
            img.src = currentPlayer.imgSrc;
            img.alt = currentPlayer.marker;
            cell.appendChild(img);
            setTimeout(() => {
                if (checkWin()) {
                    alert(`${currentPlayer.name} wins!`);
                    resetGame();
                } else if (gameBoard.isNoCellsLeft()) {
                    alert("It's a draw!");
                    resetGame();
                } else {
                    switchPlayer();
                }
            }, 0);
        }
    };

    const checkWin = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return true;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return true;
            }
        }
        // Check diagonals
        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true;
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return true;
        }
        return false;
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        printBoard();
        currentPlayer = playerOne;
    };

    const playGame = () => {
        gameBoard.createBoard();
        printBoard();
    };

    return {
        playGame
    };
}

const gameController = GameController();
gameController.playGame();
