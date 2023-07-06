import './styles.css'
import { gameBoard } from './gameboard'
import { boardGrid, connectToArr } from './dom'
import { Player } from './players'
import Ship from './ships'

function component() {
  
  gameBoard()
  boardGrid()
  connectToArr()

  
  const ships = Ship()
  
  function randomPlacementOfShips() {
    for (let i = 0; i < ships.length; i++) {
      let shipPlaced = false;

      while (!shipPlaced) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const bool = Math.random() < 0.5 ? true : false

        if (gameBoard().canPlaceShip(Player().playerArr,row,col,ships[i].length,bool)) {
          Player().placePlayerShip(ships[i].type, row, col, bool)
          shipPlaced = true;
        }
      }
    }
  }
  randomPlacementOfShips()

  return content
}

component()