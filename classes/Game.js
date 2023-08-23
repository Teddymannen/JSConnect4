class Game {
  constructor(rows, columns) {
    this.board = new Board(rows, columns);
    this.player1 = new Player('Player 1', 'X');
    this.player2 = new Player('Player 2', 'O');
    this.gameLogic = new GameLogic(this.player1, this.player2, this.board);
    console.log('Start a new game with "game.start()"');
  }

  start() {
    console.log('Welcome to Connect Four!');
    // prompt for player names
    var player1 = prompt('Player 1, what is your name?');
    var player2 = prompt('Player 2, what is your name?');
    this.player1 = new Player(player1, 'X');
    this.player2 = new Player(player2, 'O');

    // display the board
    this.board.display();
    console.log(`Let's begin. ${this.player1.name} goes first.`);
    console.log('Play a piece with "game.play(0-6)"');
  }

  play(column) {
    this.gameLogic.makeMove(column);
  }
}