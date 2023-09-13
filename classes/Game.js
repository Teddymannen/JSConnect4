class Game {
  constructor(rows, columns) {
    this.board = new Board(rows, columns);
    this.player1 = new Player('Player 1', 'X');
    this.player2 = new Player('Player 2', 'O');
    this.gameLogic = new GameLogic(this.player1, this.player2, this.board);
    this.addEventHandlerForSubmitNames();
    this.info = "";
    this.form = "";
    this.startRender();
  }

  startWithPlayers() {
    // clear the board
    this.board = new Board(this.board.rows, this.board.columns);
    console.log('Welcome to Connect Four!');
    this.gameLogic = new GameLogic(this.player1, this.player2, this.board);

    // display the board
    this.board.display();
    this.info = `<p>Let's begin. ${this.player1.name} goes first.</p>`;
    this.render(this.info, this.form);
    this.addEventListeners();
  }

  startRender() {
    this.board = new Board(this.board.rows, this.board.columns);
    document.body.innerHTML = /*html*/`
      <h1 class="mainHeader">Connect Four</h1>
      ${this.board.render()}
      <div class="info">
        <form class="save-name-form">
          <label>Player 1: <input placeholder="Player 1" required></label>
          <label>Player 2: <input placeholder="Player 2" required></label>
          <button type="submit">Play!</button>
        </form>
        <div class="rules">
          <p>Player 1 is <span class="yellowP">yellow</span></p>
          <p>Player 2 is <span class="redP">red</span></p>
          <hr>
          <h2>Rules:</h2>
          <p>Players take turns dropping a piece of their colour into a column.</p>
          <p>The piece falls to the lowest available square in the column.</p>
          <p>The first player to get four of their pieces in a row (horizontally, vertically or diagonally) wins.</p>
        </div>
      </div>
    `;
  }

  render(info, form) {
    document.body.innerHTML = /*html*/`
      <h1 class="mainHeader">Connect Four</h1>
      ${this.board.render()}
      <div class="info">
        ${info}
        ${form}
        <div class="rules">
          <p>Player 1 is <span class="yellowP">yellow</span></p>
          <p>Player 2 is <span class="redP">red</span></p>
          <hr>
          <h2>Rules:</h2>
          <p>Players take turns dropping a piece of their colour into a column.</p>
          <p>The piece falls to the lowest available square in the column.</p>
          <p>The first player to get four of their pieces in a row (horizontally, vertically or diagonally) wins.</p>
        </div>
      </div>
    `;
  }

  play(column) {
    this.gameLogic.makeMove(column - 1);
    this.render(this.gameLogic.info, this.gameLogic.form);
    this.addEventListeners();
  }

  addEventListeners() {
    let tdAll = document.querySelectorAll('td');
    // Add event listener for each column
    tdAll.forEach((td, index) => {
      td.addEventListener('click', () => {

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
            this.play(column + 1);
            // Stop searching when empty cell is found
            break;
          }
        }
      });
    });
  }

  addEventHandlerForSubmitNames() {
    // Create a submit handler function if it does not exist
    this.nameSubmitHandler = this.nameSubmitHandler || (event => {
      let saveNameForm = event.target.closest('.save-name-form');
      // only do something if we submit the save-name-form
      if (saveNameForm) {
        event.preventDefault(); // do not reload web page

        var player1 = saveNameForm.elements[0].value;
        var player2 = saveNameForm.elements[1].value;
        this.player1 = new Player(player1, 'X');
        this.player2 = new Player(player2, 'O');
        this.startWithPlayers();
      }
    });
    // Remove submit handler (so we can never have double submit handlers)
    document.body.removeEventListener('submit', this.nameSubmitHandler);
    // Add submit handler
    document.body.addEventListener('submit', this.nameSubmitHandler);
  }
}