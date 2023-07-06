import Ship from "./ships.js";

function gameBoard() {
  const ships = Ship();

  const boardArr = () => {
    let board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i].push(null);
      }
    }
    return board
  }
  const board = boardArr()

  const placeShips = (ship, row, col, isVertical) => {
    for (let i = 0; i < ships.length; i++) {
      if (!isVertical) {
        if (ship === ships[i].type) {
          for (let j = 0; j < ships[i].length; j++) {
            board[row][col + j] = ships[i].type;
          }
        }
      } else {
        if (ship === ships[i].type) {
          for (let k = 0; k < ships[i].length; k++) {
            board[row + k][col] = ships[i].type;
          }
        }
      }
    }
  };

  const receiveAttack = (row, col) => {
    if (board[row][col] !== null && board[row][col] !== false) {
      for (let i = 0; i < ships.length; i++) {
        if (board[row][col] === ships[i].type) {
          ships[i].hit();
          board[row][col] = false;
        }
      }
    } else if(board[row][col] === null) {
      board[row][col] = false;
    }
  };

  function canPlaceShip(board, row, col, length, bool) {
    if (bool === false) {
      for (let i = 0; i < length; i++) {
        if (col + i >= 10 || board[row][col + i] !== null) {
          return false;
        }
      }
    } else if (bool === true) {
      for (let i = 0; i < length; i++) {
        if (row + i >= 10 || board[row + i][col] !== null) {
          return false;
        }
      }
    }
  
    return true;
  }

  return {
    placeShips,
    receiveAttack,
    board,
    canPlaceShip,
    ships
  };
}
export { gameBoard };