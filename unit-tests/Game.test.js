// Game tests here
// run with "npm test"
require('./load-all-classes.js');
const getConsoleLogOutput = require('./capture-console-log.js');

test.skip('Check that start() starts the game', () => {
  // We tried to test prompts but realized it got too complicated for the scope
  // of this project. 
});

test('Check that the play() method works', () => {
  let game = new Game(6, 7);
  game.play(1);
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
    [`It's Player 2's turn.`]
  ]);
  game.play(1);
  expect(getConsoleLogOutput()).toEqual([
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['|   |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['| O |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['| X |   |   |   |   |   |   |'],
    [' ---------------------------'],
    ['  1   2   3   4   5   6   7 '],
    [`It's Player 1's turn.`]
  ]);
});