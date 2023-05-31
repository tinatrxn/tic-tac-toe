const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require("./computer-player");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'move up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'move left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('space', 'place a move', this.placeMove.bind(this));

    Screen.render();
  }

  placeMoveAI() {
    let smartMove = ComputerPlayer.getSmartMove(Screen.grid, 'X');
    let move;
    if (smartMove === undefined) {
      move = ComputerPlayer.randomMove(Screen.grid);
    }
    else {
      move = smartMove;
    }

    Screen.setGrid(move.row, move.col, 'X');
    Screen.render();

    let winner = TTT.checkWin(Screen.grid);

    if (winner) {
      TTT.endGame();
    }
  }

  placeMove() {
    let row = this.cursor.row;
    let col = this.cursor.col;
    let char = this.playerTurn;

    Screen.setGrid(row, col, char);
    Screen.render();

    this.playerTurn = 'O';

    let winner = TTT.checkWin(Screen.grid);

    if (winner) {
      TTT.endGame(winner);
    }

    setTimeout(this.placeMoveAI.bind(this), 1000);
  }

  static checkWin(grid) {
    // check empty
    let emptySpots = 0;
    for(let i = 0; i < grid.length; i++) {
      grid[i].forEach(function(spot) {
        if (spot === ' ') {
          emptySpots += 1;
        }
      });
    }

    if (emptySpots === 9) {
      return false;
    }

    // horizontal
    for(let row = 0; row < grid.length; row++) {
      if (grid[row].every(letter => letter === 'X')) {
        return 'X';
      }
      else if (grid[row].every(letter => letter === 'O')) {
        return 'O';
      }
    }

    // vertical
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[0][col] === 'X') {
        if (grid[1][col] === 'X' && grid[2][col] === 'X') {
          return 'X';
        }
      }
      else if (grid[0][col] === 'O') {
        if (grid[1][col] === 'O' && grid[2][col] === 'O') {
          return 'O';
        }
      }
    }

    // diagonal
    if (grid[0][0] !== ' ') {
      let leftCorner = grid[0][0];
      if (grid[1][1] === leftCorner && grid[2][2] === leftCorner) {
        return leftCorner;
      }
    }

    if (grid[0][2] !== ' ') {
      let rightCorner = grid[0][2];
      if (grid[1][1] === rightCorner && grid[2][0] === rightCorner) {
        return rightCorner;
      }
    }

    if (emptySpots === 0) {
      return 'T';
    }

    return false;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
