if (!globalThis.testOn) { // turn of console.log for unit tests. 
  console.log = () => { } // turn off console.log
}
// window.moveHistory = []; // for debugging
window.game = new Game(6, 7);