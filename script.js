const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const setMove = (index, marker) => {
    if (!board[index]) board[index] = marker;
  };

  return { getBoard, setMove, resetBoard };
})();
const Player = (name, marker) => {
  return { name, marker };
};
const GameController = (() => {
  let player1, player2, currentPlayer, gameOver;

  const startGame = (p1Name, p2Name) => {
    player1 = Player(p1Name, "X");
    player2 = Player(p2Name, "O");
    currentPlayer = player1;
    gameOver = false;
    Gameboard.resetBoard();
    DisplayController.renderBoard();
    DisplayController.setStatusMessage(`${currentPlayer.name}'s turn`);
  };

  const playRound = (index) => {
    if (gameOver || Gameboard.getBoard()[index]) return;
    Gameboard.setMove(index, currentPlayer.marker);
    if (checkWinner()) {
      gameOver = true;
      DisplayController.setStatusMessage(`${currentPlayer.name} wins!`);
    } else if (checkTie()) {
      gameOver = true;
      DisplayController.setStatusMessage("It's a tie!");
    } else {
      switchPlayer();
      DisplayController.setStatusMessage(`${currentPlayer.name}'s turn`);
    }
    DisplayController.renderBoard();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  const checkTie = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  return { startGame, playRound };
})();
const DisplayController = (() => {
  const gameboardDiv = document.getElementById("gameboard");
  const statusDiv = document.getElementById("gameStatus");

  const renderBoard = () => {
    gameboardDiv.innerHTML = "";
    Gameboard.getBoard().forEach((marker, index) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = marker;
      square.addEventListener("click", () => GameController.playRound(index));
      gameboardDiv.appendChild(square);
    });
  };

  const setStatusMessage = (message) => {
    statusDiv.textContent = message;
  };

  return { renderBoard, setStatusMessage };
})();
document.getElementById("startGame").addEventListener("click", () => {
  const player1Name =
    document.getElementById("player1Name").value || "Player 1";
  const player2Name =
    document.getElementById("player2Name").value || "Player 2";
  GameController.startGame(player1Name, player2Name);
});

document.getElementById("restartGame").addEventListener("click", () => {
  const player1Name =
    document.getElementById("player1Name").value || "Player 1";
  const player2Name =
    document.getElementById("player2Name").value || "Player 2";
  GameController.startGame(player1Name, player2Name);
});
