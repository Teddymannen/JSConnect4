class GameLogic {
  constructor(player1, player2, board) {
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.board = board;
    this.isGameOver = false;
  }

  makeMove(column) {
    if (!this.isGameOver) {
      const currentPlayer = this.players[this.currentPlayerIndex];
      if (this.board.dropPiece(column, currentPlayer.symbol)) {
        this.board.display();
        if (this.checkForWin(currentPlayer)) {
          console.log(`${currentPlayer.name} wins!`);
          this.isGameOver = true;
        } else if (this.board.isFull()) {
          console.log("It's a draw!");
          this.isGameOver = true;
        } else {
          this.switchPlayer();
        }
      } else {
        console.log('Invalid move. Column is full.');
      }
    } else {
      console.log('Game over. Start a new game.');
    }
  }

  switchPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    console.log(`It's ${this.players[this.currentPlayerIndex].name}'s turn.`);
  }

  checkForWin(player) {
    const symbol = player.symbol;
    const grid = this.board.grid;
    const rows = this.board.rows;
    const columns = this.board.columns;

    // Check for horizontal win
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (grid[row][col] === symbol &&
          grid[row][col + 1] === symbol &&
          grid[row][col + 2] === symbol &&
          grid[row][col + 3] === symbol) {
          return true;
        }
      }
    }

    // Check for vertical win
    for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < columns; col++) {
        if (grid[row][col] === symbol &&
          grid[row + 1][col] === symbol &&
          grid[row + 2][col] === symbol &&
          grid[row + 3][col] === symbol) {
          return true;
        }
      }
    }

    // Check for diagonal win (bottom left to top right) 
    for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (grid[row][col] === symbol &&
          grid[row + 1][col + 1] === symbol &&
          grid[row + 2][col + 2] === symbol &&
          grid[row + 3][col + 3] === symbol) {
          return true;
        }
      }
    }

    // Check for diagonal win (top left to bottom right)
    for (let row = 3; row < rows; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (grid[row][col] === symbol &&
          grid[row - 1][col + 1] === symbol &&
          grid[row - 2][col + 2] === symbol &&
          grid[row - 3][col + 3] === symbol) {
          return true;
        }
      }
    }
    return false;
  }
}