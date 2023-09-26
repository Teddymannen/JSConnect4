class Game {
  constructor(rows, columns) {
    this.board = new Board(rows, columns);
    this.player1 = new Player('Player 1', 'X');
    this.player2 = new Player('Player 2', 'O');
    // this.player2 = new EasyBot('Player 2', 'O');
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
    this.form = /*html*/`
    <div class="form">
      <form onsubmit="game.startRender();">
        <button type="submit">Restart</button>
      </form>
    </div>
    `;
    this.render(this.info, this.form);
    this.addEventListeners();

    // if player is a bot, make it play
    const currentPlayer = this.gameLogic.players[this.gameLogic.currentPlayerIndex];
    this.currentPlayer = currentPlayer
    if (this.currentPlayer instanceof EasyBot || this.currentPlayer instanceof HardBot) {
      this.currentPlayer.autoPlay(this);
    }
  }

  startRender() {
    this.board = new Board(this.board.rows, this.board.columns);
    document.body.innerHTML = /*html*/`
      <h1 class="mainHeader">Connect Four</h1>
      ${this.board.render()}
      <div class="info">
        <form class="save-name-form">
          <label id="labelPlayer1">Player 1: <br><input class="inputLabel" placeholder="Player 1" required></label>
          <input type="radio" class="player" name="radio1" value="Player" onclick="game.changeLabelText()" checked>
          <input type="radio" class="easyBot" name="radio1" value="EasyBot" onclick="game.changeLabelText()">
          <input type="radio" class="hardBot" name="radio1" value="HardBot" onclick="game.changeLabelText()">
          <br>
          <label id="labelPlayer2">Player 2: <br><input class="inputLabel" placeholder="Player 2" required></label>
          <input type="radio" class="player" name="radio2" value="Player" onclick="game.changeLabelText()" checked>
          <input type="radio" class="easyBot" name="radio2" value="EasyBot" onclick="game.changeLabelText()">
          <input type="radio" class="hardBot" name="radio2" value="HardBot" onclick="game.changeLabelText()">
          <br>
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

  changeLabelText() {
    let player1 = document.getElementById('labelPlayer1');
    let player2 = document.getElementById('labelPlayer2');

    let text;
    let val;
    // get the value of the input field
    let label1Value = document.getElementById('labelPlayer1').querySelector('.inputLabel').value;
    let label2Value = document.getElementById('labelPlayer2').querySelector('.inputLabel').value;
    // Player 1
    switch (document.querySelector('input[name="radio1"]:checked').value) {

      case 'Player':
        val = label1Value;
        text = "Player 1";
        break;

      case 'EasyBot':
        val = label1Value;
        text = "Easy Bot 1";
        break;

      case 'HardBot':
        val = label1Value;
        text = "Hard Bot 1";
        break;
    }
    player1.innerHTML = `${text}: <br><input value="${val}" class="inputLabel" placeholder="${text}" required></label>`

    // Player 2
    switch (document.querySelector('input[name="radio2"]:checked').value) {

      case 'Player':
        val = label2Value;
        text = "Player 2";
        break;

      case 'EasyBot':
        val = label2Value;
        text = "Easy Bot 2";
        break;

      case 'HardBot':
        val = label2Value;
        text = "Hard Bot 2";
        break;
    }
    player2.innerHTML = `${text}: <br><input value="${val}" class="inputLabel" placeholder="${text}" required></label>`
  }

  play(column) {
    this.gameLogic.makeMove(column - 1);
    this.render(this.gameLogic.info, this.gameLogic.form);
    const currentPlayer = this.gameLogic.players[this.gameLogic.currentPlayerIndex];
    this.currentPlayer = currentPlayer
    if ((this.currentPlayer instanceof EasyBot || this.currentPlayer instanceof HardBot) && !this.gameLogic.isGameOver) {
      this.currentPlayer.autoPlay(this);
    }
    else {
      this.addEventListeners();
    }
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

        console.log(saveNameForm.elements) // debug
        var player1 = saveNameForm.querySelectorAll('.inputLabel')[0].value;
        var player2 = saveNameForm.querySelectorAll('.inputLabel')[1].value;

        if (document.querySelector('input[name="radio1"]:checked').value === 'EasyBot') {
          this.player1 = new EasyBot(player1, 'X');
        }
        else if (document.querySelector('input[name="radio1"]:checked').value === 'HardBot') {
          this.player1 = new HardBot(player1, 'X', this.board);
          // this.player1 = new EasyBot(player1, 'X');
        }
        else {
          this.player1 = new Player(player1, 'X');
        }

        if (document.querySelector('input[name="radio2"]:checked').value === 'EasyBot') {
          this.player2 = new EasyBot(player2, 'O');
        }
        else if (document.querySelector('input[name="radio2"]:checked').value === 'HardBot') {
          this.player2 = new HardBot(player2, 'O', this.board);
          // this.player2 = new EasyBot(player2, 'O');
        }
        else {
          this.player2 = new Player(player2, 'O');
        }

        // this.player1 = new Player(player1, 'X');
        // this.player1 = new EasyBot(player1, 'X');
        // this.player2 = new Player(player2, 'O');
        // this.player2 = new EasyBot(player2, 'O');
        this.startWithPlayers();
      }
    });
    // Remove submit handler (so we can never have double submit handlers)
    document.body.removeEventListener('submit', this.nameSubmitHandler);
    // Add submit handler
    document.body.addEventListener('submit', this.nameSubmitHandler);
  }
}