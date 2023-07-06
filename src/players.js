import { gameBoard } from "./gameboard.js";


const boardOfPlayer = gameBoard();
let shipOfPlayer = boardOfPlayer.ships

const boardOfComp = gameBoard();
const shipsOfComp = boardOfComp.ships;

const Player = () => {
  const placePlayerShip = (shipType, row, col, isVertical) => {
    boardOfPlayer.placeShips(shipType, row, col, isVertical);
  };

  const attack = (row, col) => {
    let arr = boardOfComp.board
    if(arr[row][col] !== false) {
      boardOfComp.receiveAttack(row, col);
    }
  };
  
  let playerArr = boardOfPlayer.board;

  function sunk() {
    for(let i = 0; i < shipOfPlayer.length; i++) {
      if(shipOfPlayer[i].isSunk() === false) return false
    }
    return true
  }

  return { 
    placePlayerShip, 
    attack,
    playerArr,
    shipOfPlayer,
    sunk,
  };
};

const Computer = function() {
  const board = boardOfComp.board;

  function placeShip(board, row, col, length, direction, shipName) {
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        board[row][col + i] = shipName;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        board[row + i][col] = shipName;
      }
    }
  }

  function canPlaceShip(board, row, col, length, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        if (col + i >= 10 || board[row][col + i] !== null) {
          return false;
        }
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < length; i++) {
        if (row + i >= 10 || board[row + i][col] !== null) {
          return false;
        }
      }
    }
  
    return true;
  }

  function placeShipsAtRandom() {
    for (let i = 0; i < shipsOfComp.length; i++) {
      let shipPlaced = false;

      while (!shipPlaced) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        if (
          canPlaceShip(
            board,
            row,
            col,
            shipsOfComp[i].length,
            direction
          )
        ) {
          placeShip(
            board,
            row,
            col,
            shipsOfComp[i].length,
            direction,
            shipsOfComp[i].type
          );
          shipPlaced = true;
        }
      }
    }
    return board;
  }

  let newRow = null;
  let newCol = null;

  const attack = () => {

    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    
    let arr = Player().playerArr;

    if(arr[row][col] !== false && arr[row][col] !== null) {
      boardOfPlayer.receiveAttack(row, col)
      newRow = row
      newCol = col
      return 
    }
    
    if(newRow !== null && newCol !== null) {
      const adjacentCells = [
        [newRow+1, newCol],
        [newRow-1, newCol],
        [newRow, newCol+1],
        [newRow, newCol-1]
      ];
      
      for(let i = 0; i < adjacentCells.length; i++) {
        let [x, y] = adjacentCells[i]
        
        if(x >= 0 && x < 10 && y < 10 && y >= 0 && arr[x][y] !== false) {
          boardOfPlayer.receiveAttack(x, y)
          return
        }
      }
      let randomRow = Math.floor(Math.random()*10)
      let randomCol = Math.floor(Math.random()*10)
      
      if(arr[randomRow][randomCol] !== false) {
        boardOfPlayer.receiveAttack(randomRow, randomCol)
      }
      else {
        while(arr[randomRow][randomCol] === false) {
          randomRow = Math.floor(Math.random() * 10);
          randomCol = Math.floor(Math.random() * 10);
        }
        boardOfPlayer.receiveAttack(randomRow, randomCol);
      }
      newRow = null
      newCol = null
    
    }

    else if(arr[row][col] === null || arr[row][col] === false) {

      if (arr[row][col] === null) {
        boardOfPlayer.receiveAttack(row, col)
      }
      else {
        while(arr[row][col] === false) {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        }
        boardOfPlayer.receiveAttack(row, col);

      }
    }
  };

  function sunk() {
    for(let i = 0; i < shipsOfComp.length; i++) {
      if(shipsOfComp[i].isSunk() === false) return false
    }
    return true
  }
  
  return {
    placeShipsAtRandom,
    attack,
    sunk
  };
};

export { Player, Computer };