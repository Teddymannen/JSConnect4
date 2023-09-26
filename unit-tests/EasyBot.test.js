// Board tests here
// run with "npm run test-jest"
require('./load-all-classes.js');
const getConsoleLogOutput = require('./capture-console-log.js');

test('Check that randomMove() returns a number between 1 and 7', () => {
    let game = new Game(6, 7);
    let easyBot = new EasyBot('Easy Bot', 'O');

    // loop through 100 times to make sure it's random
    for (let i = 0; i < 100; i++) {
        expect(easyBot.randomMove(game.board)).toBeGreaterThanOrEqual(1);
        expect(easyBot.randomMove(game.board)).toBeLessThanOrEqual(7);
    }
});