class Game {

  maxPlayers = 2; // max number of players
  players = []; // array of players

  constructor(rows, columns) {
    this.board = new Board(rows, columns);
    this.player1 = new Player('Player 1', 'X');
    this.player2 = new Player('Player 2', 'O');
    this.gameLogic = new GameLogic(this.player1, this.player2, this.board);
    this.addEventHandlerForSubmitNames();
    this.addEventHandlerForSubmitNamesOnline();
    this.info = "";
    this.form = "";
    this.menuRender();
    this.channel = "";

    window.send = this.sendMessage; // debug
  }

  sendMessage(message) { // debug
    Network.send(message);
  }

  menuRender() {
    this.board = new Board(this.board.rows, this.board.columns);
    document.body.innerHTML = /*html*/`
      <h1 class="mainHeader">Connect Four</h1>
      ${this.board.render()}
      <div class="info">
        <div class="form">
          <form onsubmit="game.onlineRender();">
            <button type="submit">Online</button>
          </form>
          <form onsubmit="game.offlineRender();">
            <button type="submit">Offline</button>
          </form>
        </div>
        <div class="instructions">
          <hr>
          <h2>Instructions:</h2>
          <p>Choose between playing online or offline.</p>
        </div>
      </div>
    `;
  }

  offlineRender() {
    this.board = new Board(this.board.rows, this.board.columns);
    document.body.innerHTML = /*html*/`
      <h1 class="mainHeader">Connect Four - Offline</h1>
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
        <form onsubmit="game.menuRender();">
          <button type="submit">Main menu</button>
        </form>
        <div class="rules">
          <p>Player 1 is <span class="redP">red</span></p>
          <p>Player 2 is <span class="yellowP">yellow</span></p>
          <hr>
          <h2>Rules:</h2>
          <p>Players take turns dropping a piece of their colour into a column.</p>
          <p>The piece falls to the lowest available square in the column.</p>
          <p>The first player to get four of their pieces in a row (horizontally, vertically or diagonally) wins.</p>
        </div>
      </div>
    `;
  }

  onlineRender() {
    Network.disconnect();
    this.board = new Board(this.board.rows, this.board.columns);
    this.players = [];
    document.body.innerHTML = /*html*/`
      <h1 class="mainHeader">Connect Four - Online</h1>
      ${this.board.render()}
      <div class="info">
        <form class="save-name-form-online">
          <label id="labelPlayer">Player: <br><input class="inputLabel" placeholder="Player" required></label>
          <input type="radio" class="player" name="radio" value="Player" onclick="game.changeLabelTextOnline()" checked>
          <input type="radio" class="easyBot" name="radio" value="EasyBot" onclick="game.changeLabelTextOnline()">
          <input type="radio" class="hardBot" name="radio" value="HardBot" onclick="game.changeLabelTextOnline()">
          <br>
          <label id="labelChannel">Channel: <br><input class="inputLabel" placeholder="Channel" required></label>
          <br>
          <button type="submit">Play!</button>
          </form>
          <form onsubmit="game.menuRender();">
          <button type="submit">Main menu</button>
          </form>
          <div class="rules">
          <p>Player 1 is <span class="redP">red</span></p>
          <p>Player 2 is <span class="yellowP">yellow</span></p>
          <hr>
          <h2>Rules:</h2>
        <p>Players take turns dropping a piece of their colour into a column.</p>
        <p>The piece falls to the lowest available square in the column.</p>
        <p>The first player to get four of their pieces in a row (horizontally, vertically or diagonally) wins.</p>
        </div>
      </div>
    `;
  }

  stopGame() {
    // set isGameOver to true
    this.gameLogic.isGameOver = true;
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
      <form onsubmit="game.offlineRender(); game.stopGame();">
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

  startWithPlayersOnline() {

    // if board is not empty, send resetBoard to server
    if (!this.board.isEmpty()) {
      Network.send('resetBoard');
    }

    // clear the board
    this.board = new Board(this.board.rows, this.board.columns);

    console.log('Welcome to Connect Four!');
    this.gameLogic = new GameLogic(this.player1, this.player2, this.board);

    // display the board
    this.board.display();
    // this.info = `<p>Let's begin. ${this.player1.name} goes first.</p>`;
    this.info = `<p>Let's begin. ${this.players[0]} goes first.</p>`;
    this.form = /*html*/`
    <div class="form">
      <form onsubmit="game.onlineRender(); game.stopGame();">
        <button type="submit">Disconnect</button>
      </form>
    </div>
    `;
    this.render(this.info, this.form);
    // add event listeners if it's my turn
    if (this.players[0] === this.user) {
      this.addEventListeners();
    }

    // if player is a bot, make it play
    const currentPlayer = this.gameLogic.players[this.gameLogic.currentPlayerIndex];
    this.currentPlayer = currentPlayer
    if (this.currentPlayer instanceof EasyBot || this.currentPlayer instanceof HardBot) {
      this.currentPlayer.autoPlay(this);
    }
  }

  play(column) {
    this.gameLogic.makeMove(column - 1);
    this.render(this.gameLogic.info, this.gameLogic.form);

    // if not online player - send message
    if (!(this.currentPlayer instanceof OnlinePlayer)) {
      Network.send(column - 1); // -1 because column is 1-7 and data is 0-6
    }

    const currentPlayer = this.gameLogic.players[this.gameLogic.currentPlayerIndex];
    this.currentPlayer = currentPlayer
    if ((this.currentPlayer instanceof EasyBot || this.currentPlayer instanceof HardBot) && !this.gameLogic.isGameOver) {
      this.currentPlayer.autoPlay(this);
    }
    else if (this.currentPlayer instanceof Player) {
      this.addEventListeners();
    }
  }

  render(info, form) {
    const p1 = this.gameLogic.players[0].name;
    const p2 = this.gameLogic.players[1].name;

    document.body.innerHTML = /*html*/`
      <h1 class="mainHeader">Connect Four</h1>
      ${this.board.render()}
      <div class="info">
        ${info}
        ${form}
        <div class="rules">
          <p>${p1} is <span class="redP">red</span></p>
          <p>${p2} is <span class="yellowP">yellow</span></p>
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

  changeLabelTextOnline() {
    let player = document.getElementById('labelPlayer');

    let text;
    let val;
    // get the value of the input field
    let labelValue = document.getElementById('labelPlayer').querySelector('.inputLabel').value;
    // Player 1
    switch (document.querySelector('input[name="radio"]:checked').value) {

      case 'Player':
        val = labelValue;
        text = "Player";
        break;

      case 'EasyBot':
        val = labelValue;
        text = "Easy Bot";
        break;

      case 'HardBot':
        val = labelValue;
        text = "Hard Bot";
        break;
    }
    player.innerHTML = `${text}: <br><input value="${val}" class="inputLabel" placeholder="${text}" required></label>`

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

          if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
            // Change colour for current player
            if (this.gameLogic.currentPlayerIndex === 0) {
              cell.classList.add('red');
            } else {
              cell.classList.add('yellow');
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
        this.startWithPlayers();
      }
    });
    // Remove submit handler (so we can never have double submit handlers)
    document.body.removeEventListener('submit', this.nameSubmitHandler);
    // Add submit handler
    document.body.addEventListener('submit', this.nameSubmitHandler);
  }

  addEventHandlerForSubmitNamesOnline() {
    // Create a submit handler function if it does not exist
    this.nameSubmitHandlerOnline = this.nameSubmitHandlerOnline || (event => {
      let saveNameFormOnline = event.target.closest('.save-name-form-online');
      // only do something if we submit the save-name-form
      if (saveNameFormOnline) {
        event.preventDefault(); // do not reload web page

        var player = saveNameFormOnline.querySelectorAll('.inputLabel')[0].value;
        var channel = saveNameFormOnline.querySelectorAll('.inputLabel')[1].value;


        if (document.querySelector('input[name="radio"]:checked').value === 'EasyBot') {
          this.player1 = new EasyBot(player, 'X');
        }
        else if (document.querySelector('input[name="radio"]:checked').value === 'HardBot') {
          this.player1 = new HardBot(player, 'X', this.board);
          // this.player1 = new EasyBot(player, 'X');
        }
        else {
          this.player1 = new Player(player, 'X');
        }
        this.user = this.player1.name;

        this.player2 = new OnlinePlayer('Player 2', 'O');

        Network.startConnection(
          this.user,
          channel,
          (...args) => this.messageListener(...args)
        );
      }
    });
    // Remove submit handler (so we can never have double submit handlers)
    document.body.removeEventListener('submit', this.nameSubmitHandlerOnline);
    // Add submit handler
    document.body.addEventListener('submit', this.nameSubmitHandlerOnline);
  }

  messageListener({ timestamp, user, data }) {
    let niceTime = new Date(timestamp).toLocaleString('sv-SE');
    console.log('time', niceTime, '\nuser', user, '\ndata', data);

    // keep track of joining players - add them to this.players
    if (
      user === 'system'
      && data.includes(`joined channel`)
    ) {
      let playerName = data.split('User ')[1].split(' joined')[0];
      // if enough players already - do not allow
      if (this.players.length >= this.maxPlayers) {
        if (playerName === this.user) {
          console.log('SORRY YOU CAN\'T JOIN ' +
            '- ALREADY TWO PLAYERS IN GAME!');
        }
      }
      // not enough players - add
      else {
        this.players.push(playerName);
        // if player.length === 2, change the last player to player2
        if (this.players.length === 2) {
          const self = this.player1;
          if (this.players[0] !== self.name) {
            this.player1 = new OnlinePlayer(this.players[0], 'X');
            this.player2 = self;
            this.player2.symbol = 'O';
          }
          if (this.players[1] !== self.name) {
            this.player2 = new OnlinePlayer(this.players[1], 'O');
          }


          this.startWithPlayersOnline();
        }
        else {
          this.info = `<p>Waiting for another player to join...</p>`;
          this.render(this.info, this.form);
        }
      }
    }

    // only if a message comes from player1 or player2
    // do something about it - otherwise ignore
    // user -> the user who sent the message,
    // this.user -> me, the user on this computer
    if (this.players.includes(user) /*&& this.players.includes(this.user)*/) {
      // if ((this.player1.name === user && this.player1 instanceof OnlinePlayer) || (this.player2.name === user && this.player2 instanceof OnlinePlayer)) {
      //   this.play(data);
      // }
      // If the message is from the other player
      if (user !== this.user) {
        // If the message is between 0 and 6 and is a number

        // if (typeof data === 'number' && data >= 0 && data < 7) {
        if (Number.isInteger(data) && data >= 0 && data < 7) {
          // Play the move
          this.play(data + 1); // +1 because data is 0-6 and play is 1-7
        }
        else if (data === 'resetBoard') {
          this.startWithPlayersOnline();
        }
      }

      console.log(`User "${user}" made move: ${data}`);
    }
  }
}