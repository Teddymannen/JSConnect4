// Board tests here
// run with "npm test"
require('./load-all-classes.js');

test('Check that a grid is created properly', () => {
  // Write the logic for our test with Jest expect syntax
  let board = new Board(6, 7);
  expect(board.grid.length).toBe(6);
  for (let i = 0; i < board.grid.length; i++) {
    expect(board.grid[i].length).toBe(7);
  }
});

test('Check that a piece can be dropped in an empty column', () => {

});