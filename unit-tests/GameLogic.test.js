// GameLogic tests here
// run with "npm test"
require('./load-all-classes.js');
const getConsoleLogOutput = require('./capture-console-log.js');

test('Check that the makeMove() method works.', () => {
  let game = new Game(6, 7);
  let board = game.board;
  let player1 = new Player('Test 1', 'X');
  let player2 = new Player('Test 2', 'O');
  let gameLogic = new GameLogic(player1, player2, board);
  gameLogic.makeMove(0);

  expect(getConsoleLogOutput()).toEqual([
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['| X |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['  1   2   3   4   5   6   7 '],
    [`It's Test 2's turn.`]
  ]);
});

// Skip this test for now. 
test.skip('Check that the board is full', () => {
  let game = new Game(6, 7);
  let board = game.board;
  let player1 = new Player('Test 1', 'X');
  let player2 = new Player('Test 2', 'O');
  let gameLogic = new GameLogic(player1, player2, board);
  // loop to fill board
  for (let col = 0; col < board.columns; col++) {
    for (let i = 0; i < board.rows; i++) {
      gameLogic.makeMove(col);
    }
  }
  expect(getConsoleLogOutput()).toEqual([
    ['| O | O | O | O | O | O | O |'],
    [' ---------------------------'],
    ['| X | X | X | X | X | X | X |'],
    [' ---------------------------'],
    ['| O | O | O | O | O | O | O |'],
    [' ---------------------------'],
    ['| X | X | X | X | X | X | X |'],
    [' ---------------------------'],
    ['| O | O | O | O | O | O | O |'],
    [' ---------------------------'],
    ['| X | X | X | X | X | X | X |'],
    [' ---------------------------'],
    ['  1   2   3   4   5   6   7 '],
    [`It's a draw!`]
  ]);
});

test('Check that the switchPlayer() method works', () => {
  let game = new Game(6, 7);
  let board = game.board;
  let player1 = new Player('Test 1', 'X');
  let player2 = new Player('Test 2', 'O');
  let gameLogic = new GameLogic(player1, player2, board);
  gameLogic.switchPlayer();
  expect(getConsoleLogOutput()).toEqual([
    [`It's Test 2's turn.`]
  ]);
  gameLogic.switchPlayer();
  expect(getConsoleLogOutput()).toEqual([
    [`It's Test 1's turn.`]
  ]);
  gameLogic.switchPlayer();
  expect(getConsoleLogOutput()).toEqual([
    [`It's Test 2's turn.`]
  ]);
});