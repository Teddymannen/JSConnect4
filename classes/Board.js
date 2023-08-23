class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.createGrid();
  }

  createGrid() {
    const grid = new Array(this.rows);

    for (let i = 0; i < this.rows; i++) {
      grid[i] = new Array(this.columns).fill(null);
    }

    return grid;
  }

  dropPiece(column, player) {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][column] === null) {
        this.grid[row][column] = player;
        return true; // Piece successfully dropped
      }
    }
    return false; // Column is full
  }

  isFull() {
    return this.grid.every(row => row.every(cell => cell !== null));
  }

  display() {
    for (let row = 0; row < this.rows; row++) {
      let rowStr = '|';
      for (let col = 0; col < this.columns; col++) {
        const piece = this.grid[row][col];
        rowStr += ` ${piece !== null ? piece : ' '} |`;
      }
      console.log(rowStr);
      if (row < this.rows - 1) {
        console.log(' ' + '-'.repeat(this.columns * 4 - 1));
      }
    }
    console.log(' ' + '-'.repeat(this.columns * 4 - 1));
    console.log(' ' + [...Array(this.columns).keys()].map(col => ` ${col} `).join(' '));
  }
}