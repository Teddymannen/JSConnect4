// Board tests here
// run with "npm test"
require('./load-all-classes.js');

test('Check that a grid is created properly', () => {
  let board = new Board(6, 7);
  expect(board.grid.length).toBe(6);
  for (let i = 0; i < board.grid.length; i++) {
    expect(board.grid[i].length).toBe(7);
  }
});

test('Check that a piece can only be dropped in an empty column', () => {
  let board = new Board(6, 7);
  expect(board.dropPiece(0, 'O')).toBe(true);
  expect(board.dropPiece(0, 'X')).toBe(true);
  expect(board.dropPiece(0, 'O')).toBe(true);
  expect(board.dropPiece(0, 'X')).toBe(true);
  expect(board.dropPiece(0, 'O')).toBe(true);
  expect(board.dropPiece(0, 'X')).toBe(true);
  // Column is full
  expect(board.dropPiece(0, 'O')).toBe(false);
});