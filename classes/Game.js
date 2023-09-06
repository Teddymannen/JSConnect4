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
    // Add eventListener to click on columns
    this.addEventListeners();
  }

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

  addEventListeners() {
    let tdAll = document.querySelectorAll('td');
    console.log(tdAll);
    // Add event listener for each column
    tdAll.forEach((td, index) => {
      td.addEventListener('click', () => {
        console.log('click');

        if (!this.board.isFull()) {
          let column = index % 7;
          
          // To find nearest empty cell/td from the board.
          for (let row = this.board.rows - 1; row >= 0; row--) {
            // Calculate index (0-41)
            const findIndex = row * 7 + column;
            // To reach the specific <td> in HTML (squares on the board) 
            // with the index, ie fetch the n:th index from tdAll
            const cell = tdAll[findIndex];

            if (!cell.classList.contains('yellow') && !cell.classList.contains('red')) {

              // Change colour for current player
              if (this.gameLogic.currentPlayerIndex === 0) {
                cell.classList.add('yellow');
              } else {
                cell.classList.add('red');
              }
              this.gameLogic.makeMove(column);
              // Update grid with new "tile"
              this.board.grid[row][column] = this.gameLogic.currentPlayer.symbol;
              this.gameLogic.switchPlayer();
              // Stop searching when empty cell is found
              break;
            }
          }
        } else {
          alert('This column is full. Please choose another column.');
        }
      });
    });
  }

}