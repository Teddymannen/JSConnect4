class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.createGrid();
  }

  createGrid() {
    const grid = new Array(this.rows);

    for (let i = 0; i < this.rows; i++) {
      grid[i] = new Array(this.columns).fill('');
    }

    return grid;
  }

  // getCellsReplaceWithEmpty() {
  //   let allTd = [...document.querySelectorAll('td')];
  //   let cellsReplaceWithEmpty = [];
  //   allTd.forEach((td, index) => {
  //     if (td.innerText === 'X' || td.innerText === 'O') {
  //       cellsReplaceWithEmpty.push(index);
  //     }
  //   });
  //   return cellsReplaceWithEmpty;
  // }

  render() {
    return /*html*/`
      <table class="board">
        ${this.grid.map(row => `<tr>${row.map(cell => `
          <td class="${cell === 'X' ? 'yellow' : ''}${cell === 'O' ? 'red' : ''}${cell === '' ? 'empty' : ''}">
          </td>
        `).join('')}</tr>`).join('')}
      </table>
    `;
  }
  // q: can I add an if statement to add a class to the td, depending on the value of the cell?
  // a: yes, but you need to add a class to the cell in the first place
  // q: how would that look? 
  // a: 
  // render() {
  //   return /*html*/`
  //     <table class="board">
  //       ${this.grid.map(row => `<tr>${row.map(cell => `
  //         <td class="${cell === 'X' ? 'player1' : 'player2'}">
  //           ${cell}
  //         </td>
  //       `).join('')}</tr>`).join('')}
  //     </table>
  //   `;
  // }


  dropPiece(column, playerPiece) {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][column] === '') {
        this.grid[row][column] = playerPiece;
        return true; // Piece successfully dropped
      }
    }
    return false; // Column is full
  }

  isFull() {
    return this.grid.every(row => row.every(cell => cell !== ''));
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