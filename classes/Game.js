class Game {
    constructor(rows, columns) {
      this.board = new Board(rows, columns);
      this.player1 = new Player('Player 1', 'X');
      this.player2 = new Player('Player 2', 'O');
      this.gameLogic = new GameLogic(this.player1, this.player2, this.board);
    }
  
    start() {
      console.log('Welcome to Connect Four!');
      this.board.display();
      console.log(`Let's begin. ${this.player1.name} goes first.`);
    }
  
    play(column) {
      this.gameLogic.makeMove(column);
    }
  }