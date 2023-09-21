class MediumBot {
    constructor(name, symbol) {
        this.name = "Medium Bot " + name;
        this.symbol = symbol;
    }

    // oneMoveAhead(board) {

    // }
    autoPlay(game) {
        setTimeout(() => {
            game.play(this.smartMove(game.board));
        }, 50);
    }

    randomMove(board) {
        let column = Math.floor(Math.random() * board.columns);
        while (board.isColumnFull(column)) {
            column = Math.floor(Math.random() * board.columns);
        }
        console.log("randomMove")
        return column + 1;
    }

    smartMove(board) {
        return this.findWinningMove(board) ||
            this.findThreeInARow(board) ||
            this.randomMove(board);
    }

    findWinningMove(board) {
        const symbol = this.symbol;
        const grid = board.grid;
        const rows = board.rows;
        const columns = board.columns;

        // Check for horizontal win
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (grid[row][col] === "" &&
                    grid[row][col + 1] === symbol &&
                    grid[row][col + 2] === symbol &&
                    grid[row][col + 3] === symbol &&
                    (row === rows - 1 || grid[row + 1][col] !== "")) {
                    return col + 1;
                }
                if (grid[row][col] === symbol &&
                    grid[row][col + 1] === "" &&
                    grid[row][col + 2] === symbol &&
                    grid[row][col + 3] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 1] !== "")) {
                    return col + 2;
                }
                if (grid[row][col] === symbol &&
                    grid[row][col + 1] === symbol &&
                    grid[row][col + 2] === "" &&
                    grid[row][col + 3] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 2] !== "")) {
                    return col + 3;
                }
                if (grid[row][col] === symbol &&
                    grid[row][col + 1] === symbol &&
                    grid[row][col + 2] === symbol &&
                    grid[row][col + 3] === "" &&
                    (row === rows - 1 || grid[row + 1][col + 3] !== "")) {
                    return col + 4;
                }
            }
        }
        // Check for vertical win
        for (let row = 0; row < rows - 3; row++) {
            for (let col = 0; col < columns; col++) {
                if (grid[row][col] === "" &&
                    grid[row + 1][col] === symbol &&
                    grid[row + 2][col] === symbol &&
                    grid[row + 3][col] === symbol) {
                    return col + 1;
                }
            }
        }
        // Check for diagonal win (bottom left to top right)
        for (let row = 0; row < rows - 3; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (grid[row][col] === "" &&
                    grid[row + 1][col + 1] === symbol &&
                    grid[row + 2][col + 2] === symbol &&
                    grid[row + 3][col + 3] === symbol) {
                    return col + 1;
                }
                if (grid[row][col] === symbol &&
                    grid[row + 1][col + 1] === "" &&
                    grid[row + 2][col + 2] === symbol &&
                    grid[row + 3][col + 3] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 1] !== "")) {
                    return col + 2;
                }
                if (grid[row][col] === symbol &&
                    grid[row + 1][col + 1] === symbol &&
                    grid[row + 2][col + 2] === "" &&
                    grid[row + 3][col + 3] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 2] !== "")) {
                    return col + 3;
                }
                if (grid[row][col] === symbol &&
                    grid[row + 1][col + 1] === symbol &&
                    grid[row + 2][col + 2] === symbol &&
                    grid[row + 3][col + 3] === "" &&
                    (row === rows - 1 || grid[row + 1][col + 3] !== "")) {
                    return col + 4;
                }
            }
        }
        // Check for diagonal win (top left to bottom right)
        for (let row = 3; row < rows; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (grid[row][col] === "" &&
                    grid[row - 1][col + 1] === symbol &&
                    grid[row - 2][col + 2] === symbol &&
                    grid[row - 3][col + 3] === symbol) {
                    return col + 1;
                }
                if (grid[row][col] === symbol &&
                    grid[row - 1][col + 1] === "" &&
                    grid[row - 2][col + 2] === symbol &&
                    grid[row - 3][col + 3] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 1] !== "")) {
                    return col + 2;
                }
                if (grid[row][col] === symbol &&
                    grid[row - 1][col + 1] === symbol &&
                    grid[row - 2][col + 2] === "" &&
                    grid[row - 3][col + 3] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 2] !== "")) {
                    return col + 3;
                }
                if (grid[row][col] === symbol &&
                    grid[row - 1][col + 1] === symbol &&
                    grid[row - 2][col + 2] === symbol &&
                    grid[row - 3][col + 3] === "" &&
                    (row === rows - 1 || grid[row + 1][col + 3] !== "")) {
                    return col + 4;
                }
            }
        }
    }

    findThreeInARow(board) {
        const symbol = this.symbol;
        const grid = board.grid;
        const rows = board.rows;
        const columns = board.columns;

        // Check for horizontal, three in a row
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (grid[row][col] === "" &&
                    grid[row][col + 1] === symbol &&
                    grid[row][col + 2] === symbol &&
                    (row === rows - 1 || grid[row + 1][col] !== "")) {
                    console.log("findThreeInARow 1")
                    return col + 1;
                }
                if (grid[row][col] === symbol &&
                    grid[row][col + 1] === "" &&
                    grid[row][col + 2] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 1] !== "")) {
                    console.log("findThreeInARow 2")
                    return col + 2;
                }
                if (grid[row][col] === symbol &&
                    grid[row][col + 1] === symbol &&
                    grid[row][col + 2] === "" &&
                    (row === rows - 1 || grid[row + 1][col + 2] !== "")) {
                    console.log("findThreeInARow 3")
                    return col + 3;
                }
            }
        }
        // Check for vertical, three in a row
        for (let row = 0; row < rows - 2; row++) {
            for (let col = 0; col < columns; col++) {
                if (grid[row][col] === "" &&
                    grid[row + 1][col] === symbol &&
                    grid[row + 2][col] === symbol) {
                    console.log("findThreeInARow 4")
                    return col + 1;
                }
            }
        }
        // Check for diagonal, three in a row (bottom left to top right)
        for (let row = 0; row < rows - 3; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (grid[row][col] === "" &&
                    grid[row + 1][col + 1] === symbol &&
                    grid[row + 2][col + 2] === symbol) {
                    console.log("findThreeInARow 5")
                    return col + 1;
                }
                if (grid[row][col] === symbol &&
                    grid[row + 1][col + 1] === "" &&
                    grid[row + 2][col + 2] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 1] !== "")) {
                    console.log("findThreeInARow 6")
                    return col + 2;
                }
                if (grid[row][col] === symbol &&
                    grid[row + 1][col + 1] === symbol &&
                    grid[row + 2][col + 2] === "" &&
                    (row === rows - 1 || grid[row + 1][col + 2] !== "")) {
                    console.log("findThreeInARow 7")
                    return col + 3;
                }
            }
        }
        // Check for diagonal, three in a row (top left to bottom right)
        for (let row = 3; row < rows; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (grid[row][col] === "" &&
                    grid[row - 1][col + 1] === symbol &&
                    grid[row - 2][col + 2] === symbol) {
                    console.log("findThreeInARow 8")
                    return col + 1;
                }
                if (grid[row][col] === symbol &&
                    grid[row - 1][col + 1] === "" &&
                    grid[row - 2][col + 2] === symbol &&
                    (row === rows - 1 || grid[row + 1][col + 1] !== "")) {
                    console.log("findThreeInARow 9")
                    return col + 2;
                }
                if (grid[row][col] === symbol &&
                    grid[row - 1][col + 1] === symbol &&
                    grid[row - 2][col + 2] === "" &&
                    (row === rows - 1 || grid[row + 1][col + 2] !== "")) {
                    console.log("findThreeInARow 10")
                    return col + 3;
                }
            }
        }
    }
}