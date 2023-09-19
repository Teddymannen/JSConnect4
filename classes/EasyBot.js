class EasyBot {
    constructor(name, symbol) {
        this.name = "Easy Bot " + name;
        this.symbol = symbol;
    }

    getValidCol(board) {
        let column = Math.floor(Math.random() * board.columns);
        while (board.isColumnFull(column)) {
            column = Math.floor(Math.random() * board.columns);
        }
        return column + 1;
    }

    autoPlay(game) {
        setTimeout(() => {
            game.play(this.getValidCol(game.board));
        }, 500);
    }
}
