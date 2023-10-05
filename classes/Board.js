class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.createGrid();
    this.lastPlayedCell = [null, null]; // [row, column]
  }

  createGrid() {
    const grid = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      grid[i] = new Array(this.columns).fill('');
    }
    return grid;
  }

  render() {
    return /*html*/`
      <table class="board">
        ${this.grid.map((row, rowIndex) => `<tr>${row.map((cell, cellIndex) => `
          <td class="${cell === 'X' ? 'red' : ''}${cell === 'O' ? 'yellow' : ''} 
          ${cell === '' ? 'empty' : ''}${this.lastPlayedCell[0] === rowIndex && this.lastPlayedCell[1] === cellIndex ? 'last-played' : ''}">
          </td>
        `).join('')}</tr>`).join('')}
      </table>
    `;
  }

  dropPiece(column, playerPiece) {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][column] === '') {
        this.grid[row][column] = playerPiece;
        // window.moveHistory.push(column) // Add move to history array
        this.lastPlayedCell = [row, column]; // Update last played cell.
        return true; // Piece successfully dropped
      }
    }
    return false; // Column is full
  }

  isColumnFull(column) {
    return this.grid[0][column] !== '';
  }

  isFull() {
    return this.grid.every(row => row.every(cell => cell !== ''));
  }

  isEmpty() {
    return this.grid.every(row => row.every(cell => cell === ''));
  }

  display() {
    for (let row = 0; row < this.rows; row++) {
      let rowStr = '|';
      for (let col = 0; col < this.columns; col++) {
        const piece = this.grid[row][col];
        rowStr += ` ${piece !== '' ? piece : ' '} |`;
      }
      console.log(rowStr);
      if (row < this.rows - 1) {
        console.log(' ' + '-'.repeat(this.columns * 4 - 1));
      }
    }
    console.log(' ' + '-'.repeat(this.columns * 4 - 1));
    console.log(' ' + [...Array(this.columns).keys()].map(col => ` ${col + 1} `).join(' '));
  }
}