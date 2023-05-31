class ComputerPlayer {

  static getValidMoves(grid) {
    let validMoves = [];
    for (let col_i = 0; col_i < grid[0].length; col_i++) {
      for (let row_i = 0; row_i < grid.length; row_i++) {
        if (grid[row_i][col_i] === ' ') {
          validMoves.push({ row: row_i, col: col_i });
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid) {
    let validMoves = ComputerPlayer.getValidMoves(grid);
    let random = Math.floor(Math.random() * validMoves.length);

    return validMoves[random];
  }

  static getAllLines(grid) {
    let masterGrid = [grid];
    let columns = [];
    let diagonals = [];

    for (let col = 0; col < grid[0].length; col++) {
      columns.push([grid[0][col], grid[1][col], grid[2][col]]);
    }
    masterGrid.push(columns);

    diagonals.push([grid[0][0], grid[1][1], grid[2][2]]);
    diagonals.push([grid[0][2], grid[1][1], grid[2][0]]);
    masterGrid.push(diagonals);

    // mastergrid = [[rows], [columns], [diagonals]]
    // section[0] = [rows] = [['X','X',' '], ['O',' ',' '], ['O',' ',' ']]
      // line[0], line[1], line[2]
      // line[0] === ['X','X',' ']

    // section[1] = [columns] = [['X', 'O', 'O'], ['X', ' ', ' '], [' ', ' ', ' ']]
    // section[2] = [diagonals] = [['X', ' ', ' '], [' ', ' ', 'O']]

    return masterGrid;
  }

  static getWinningMoves(grid, symbol) {
    let masterGrid = ComputerPlayer.getAllLines(grid);
    let winners = [];
    let losing = [];

    for (let section = 0; section < masterGrid.length; section++) {
      let lines = masterGrid[section];
      for (let i = 0; i < lines.length; i++) {
        let maybeWin = lines[i].filter(spot => spot !== symbol);
          // [' '] ['o' ' ' ' '] ['o', 'o', ' ']
          // want to get [' '] bc it has 2 symbols + an empty spot for a win
        if (maybeWin.length === 1 & maybeWin[0] === ' ') {
          // ' ' position
          let winningSpot = lines[i].indexOf(' ');

          // find where winning spot is
          if (section === 0) {
            // rows
            let row_i = i;
            let col_i = winningSpot;
            winners.push({ row: row_i, col: col_i });
          }
          else if (section === 1) {
            // cols
            let row_i = winningSpot;
            let col_i = i;
            winners.push({ row: row_i, col: col_i });
          }
          else {
            // diagonal
            if (i === 0) {
              let row_i = winningSpot;
              let col_i = winningSpot;
              winners.push({ row: row_i, col: col_i });
            }
            else {
              let row_i = i;
              let col_i =  2 - i;
              winners.push({ row: row_i, col: col_i });
            }
          }
        }
        else if (maybeWin.length === 3) {
          let maybeLose = maybeWin.filter(spot => spot !== ' ')
          if (maybeLose.length === 2) {
            let losingSpot = maybeWin.indexOf(' ');

            if (section === 0) {
              // rows
              let row_i = i;
              let col_i = losingSpot;
              losing.push({ row: row_i, col: col_i });
            }
            else if (section === 1) {
              // cols
              let row_i = losingSpot;
              let col_i = i;
              losing.push({ row: row_i, col: col_i });
            }
            else {
              // diagonal
              if (i === 0) {
                let row_i = losingSpot;
                let col_i = losingSpot;
                losing.push({ row: row_i, col: col_i });
              }
              else {
                let row_i = i;
                let col_i =  2 - i;
                losing.push({ row: row_i, col: col_i });
              }
            }
         }
       }
      }
    }
      if (winners.length >= losing.length) {
        return winners;
      }
      else if (losing.length > winners.length) {
        return losing;
      }
  }


  static getSmartMove(grid, symbol) {
    let winners = ComputerPlayer.getWinningMoves(grid, symbol);

    return winners[0];
  }
}
module.exports = ComputerPlayer;
