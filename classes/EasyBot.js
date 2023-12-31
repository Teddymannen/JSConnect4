class EasyBot {
  constructor(name, symbol) {
    this.name = "Easy Bot " + name;
    this.symbol = symbol;
  }

  randomMove(board) {
    let column = Math.floor(Math.random() * board.columns);
    while (board.isColumnFull(column)) {
      column = Math.floor(Math.random() * board.columns);
    }
    return column + 1;
  }

  autoPlay(game) {
    setTimeout(() => {
      if (game.gameLogic.isGameOver) {
        return;
      }
      game.play(this.randomMove(game.board));
    }, 1000);
  }
}
