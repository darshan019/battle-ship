import { gameBoard, ships } from "./gameboard";

const gmBrd = gameBoard()
const ship = gmBrd.ships

test('hit', () => {
  ship[0].hit()
  ship[0].hit()
  expect(ship[0].timesHit).toBe(2)
})

test('sunk', () => {
  for(let i = 0; i < ship[3].length; i++) {
    ship[3].hit()
  }
  expect(ship[3].isSunk()).toBe(true)
})

test('ship placed', () => {
  gmBrd.placeShips('carrier', 1, 3, false)
  const arr = gmBrd.board
  expect(arr[1][3]).toBe('carrier')
  expect(arr[1][4]).toBe('carrier')
  expect(arr[1][5]).toBe('carrier')
  expect(arr[1][6]).toBe('carrier')
  expect(arr[1][7]).toBe('carrier')
})

test('miss hit', () => {
  gmBrd.placeShips('patrolboat', 1, 1, true)
  const arr1 = gmBrd.board
  gmBrd.receiveAttack(1,1)
  expect(arr1[1][1]).toBe(false)
  gmBrd.receiveAttack(4, 5)
  expect(arr1[4][5]).toBe(false)
})

test('ship sunk', () => {
  const funcBoard = gameBoard()
  funcBoard.placeShips('destroyer', 2, 4, true)
  let ship = funcBoard.ships

  for(let i = 0; i < ship[2].length; i++) {
    funcBoard.receiveAttack(2 + i, 4);
  }
  expect(ship[2].timesHit).toBe(3)
  expect(ship[2].isSunk()).toBe(true)
})
