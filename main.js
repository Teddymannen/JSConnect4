if (!globalThis.testOn) { // turn of console.log for unit tests. (comment out to see console.log output)
  console.log = () => { }
}
// window.moveHistory = []; // for debugging
window.game = new Game(6, 7);