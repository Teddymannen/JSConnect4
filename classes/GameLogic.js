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
    // Implement your win-checking logic here
    return false;
  }
}