class Game {
  constructor(rows, columns) {
    this.board = new Board(rows, columns);
    this.player1 = new Player('Player 1', 'X');
    this.player2 = new Player('Player 2', 'O');
    this.gameLogic = new GameLogic(this.player1, this.player2, this.board);
    // console.log('Start a new game with "game.start()"');
    this.info = "";
  }

  start() {
    console.log('Welcome to Connect Four!');
    // prompt for player names
    var player1 = prompt('Player 1, what is your name?');
    var player2 = prompt('Player 2, what is your name?');
    this.player1 = new Player(player1, 'X');
    this.player2 = new Player(player2, 'O');
    this.gameLogic = new GameLogic(this.player1, this.player2, this.board);

    // display the board
    this.board.display();
    // console.log(`Let's begin. ${this.player1.name} goes first.`);
    this.info = `Let's begin. ${this.player1.name} goes first.`;
    // console.log('Play a piece with "game.play(1-7)"');
    this.render(this.info);
  }

  // startWithPlayers(player1, player2) {
  //   this.player1 = player1;
  //   this.player2 = player2;
  //   this.gameLogic = new GameLogic(this.player1, this.player2, this.board);
  // }

  render(info) {
    document.body.innerHTML = `
      ${this.board.render()}
      <div class="info">${info}</div>
    `;
  }

  play(column) {
    this.gameLogic.makeMove(column - 1);
    this.render(this.gameLogic.info);
  }
}