import { Player, Computer } from "./players";
import { gameBoard } from "./gameboard";

const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');


const player = Player()
const computer = Computer()

function boardGrid() {
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      const div = document.createElement('div')
      div.classList.add('player-cells')
      div.setAttribute('data-row', i)
      div.setAttribute('data-col', j)
      playerBoard.appendChild(div)
    }
  }
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      const div = document.createElement('div')
      div.classList.add('computer-cells')
      div.setAttribute('data-row', i)
      div.setAttribute('data-col', j)
      computerBoard.appendChild(div)
    }
  }

}

function connectToArr() {

  const cellsOfComp = document.querySelectorAll('.computer-cells')
  const cellsOfPlayer = document.querySelectorAll('.player-cells')

  let arr1 = player.playerArr
  let arr2 = computer.placeShipsAtRandom()

  window.addEventListener('load', () => {
    cellsOfPlayer.forEach(cell => {
      if(arr1[cell.dataset.row][cell.dataset.col] !== null && arr1[cell.dataset.row][cell.dataset.col] !== false) {
        cell.style.backgroundColor = 'gray';
        if(arr1[cell.dataset.row][cell.dataset.col] === false) cell.style.backgroundColor = 'red';
      }
      else if(arr1[cell.dataset.row][cell.dataset.col] === false) {
        cell.style.backgroundColor = '#93c5fd';
      }
    })
  })
  
  cellsOfComp.forEach(cell => {

    cell.addEventListener('click', () => {
      if(arr2[cell.dataset.row][cell.dataset.col] === false) alert('The cell is attacked')
      
      if(arr2[cell.dataset.row][cell.dataset.col] !== null && arr2[cell.dataset.row][cell.dataset.col] !== false) {
        cell.style.backgroundColor = 'red'

        player.attack(cell.dataset.row, cell.dataset.col)

        if(computer.sunk() === true) {
          alert("The computer's ships have sunk, You won")
          location.reload()
        }
        computer.attack()
        if(player.sunk() === true)  {
          alert('Your ships have sunk, the computer won')
          location.reload()
        }
      }
      else if(arr2[cell.dataset.row][cell.dataset.col] === null) {
        cell.style.backgroundColor = '#93c5fd'
        player.attack(cell.dataset.row, cell.dataset.col)
        computer.attack()
        if(player.sunk() === true)   {
          alert('Your ships have sunk, the computer won')
          location.reload()
        }
        if(computer.sunk() === true)  {
          alert("The computer's ships have sunk, You won")
          location.reload()
        }
      }

      cellsOfPlayer.forEach(cell => {
        if(arr1[cell.dataset.row][cell.dataset.col] !== null && arr1[cell.dataset.row][cell.dataset.col] !== false) {
          cell.style.backgroundColor = 'gray';
        }
        else if(arr1[cell.dataset.row][cell.dataset.col] === false) {
          cell.style.backgroundColor = '#93c5fd';
        }
      })
    })
  })

  return arr2
}

export { boardGrid, connectToArr }