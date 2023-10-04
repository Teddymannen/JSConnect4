class GameLogic {
  constructor(player1, player2, board) {
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.board = board;
    this.isGameOver = false;
    this.info = "";
    this.form = "";
  }

  makeMove(column) {
    if (!this.isGameOver) {
      const currentPlayer = this.players[this.currentPlayerIndex];
      this.currentPlayer = currentPlayer
      if (this.board.dropPiece(column, currentPlayer.symbol)) {
        this.board.display();
        if (this.checkForWin(currentPlayer)) {
          console.log(`${currentPlayer.name} wins!`);
          // this.info = `${currentPlayer.name} wins!`;
          this.isGameOver = true;
        } else if (this.board.isFull()) {
          console.log("It's a draw!");
          // this.info = "It's a draw!";
          this.isGameOver = true;
        } else {
          this.switchPlayer();
          let pIndex = this.currentPlayerIndex;
          this.info = `<p class="${pIndex === 0 ? 'redP' : 'yellowP'}">It's ${this.players[pIndex].name}'s turn.</p>`;
        }
      } else {
        // console.log('Invalid move. Please try again.');
        this.info = 'Invalid move. Please try again.';
      }
    }

    if (this.players[0] instanceof OnlinePlayer || this.players[1] instanceof OnlinePlayer) {
      this.form = /*html*/`
      <div class="form">
        <form onsubmit="game.onlineRender(); game.stopGame();">
          <button type="submit">Restart</button>
        </form>
      </div>
      `;
    }
    else {
      this.form = /*html*/`
      <div class="form">
        <form onsubmit="game.offlineRender(); game.stopGame();">
          <button type="submit">Restart</button>
        </form>
      </div>
      `;
    }


    if (this.isGameOver) {
      const currentPlayer = this.players[this.currentPlayerIndex];
      if (this.checkForWin(currentPlayer)) {
        this.info = `
        <p class="tealP">${this.currentPlayer.name} wins! </p>
        <p>Game Over!</p>`;
      } else if (this.board.isFull()) {
        this.info = `
        <p>It's a draw!</p>
        <p>Game Over!</p>`;
      }

      if (this.players[0] instanceof OnlinePlayer || this.players[1] instanceof OnlinePlayer) {
        this.form = /*html*/`
        <div class="form">
          <form onsubmit="game.startWithPlayersOnline();">
            <button type="submit">Same players</button>
          </form>
          <form onsubmit="game.onlineRender();">
            <button type="submit">New Game</button>
          </form>
          <form onsubmit="game.menuRender();">
            <button type="submit">Main menu</button>
          </form>
        </div>
        `;
      }
      else {
        this.form = /*html*/`
        <div class="form">
          <form onsubmit="game.startWithPlayers();">
            <button type="submit">Same players</button>
          </form>
          <form onsubmit="game.offlineRender();">
            <button type="submit">New Game</button>
          </form>
          <form onsubmit="game.menuRender();">
            <button type="submit">Main menu</button>
          </form>
        </div>
        `;
      }

    }
  }

  switchPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    console.log("It's " + this.players[this.currentPlayerIndex].name + "'s turn.");
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