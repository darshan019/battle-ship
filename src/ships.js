function Ship() {
  let shipArr = [];

  const carrier = {
    type: "carrier",
    length: 5,
    timesHit: 0,
    hit: function () {
      this.timesHit++;
    },
    isSunk: function () {
      if (this.timesHit === this.length) return true;
      else return false;
    },
  };
  const battleShip = {
    type: "battleship",
    length: 4,
    timesHit: 0,
    hit: function () {
      this.timesHit++;
    },
    isSunk: function () {
      if (this.timesHit === this.length) return true;
      else return false;
    },
  };
  const destroyer = {
    type: "destroyer",
    length: 3,
    timesHit: 0,
    hit: function () {
      this.timesHit++;
    },
    isSunk: function () {
      if (this.timesHit === this.length) return true;
      else return false;
    },
  };
  const submarine = {
    type: "submarine",
    length: 3,
    timesHit: 0,
    hit: function () {
      this.timesHit++;
    },
    isSunk: function () {
      if (this.timesHit === this.length) return true;
      else return false;
    },
  };
  const patrolBoat = {
    type: "patrolboat",
    length: 2,
    timesHit: 0,
    hit: function () {
      this.timesHit++;
    },
    isSunk: function () {
      if (this.timesHit === this.length) return true;
      else return false;
    },
  };
  shipArr.push(carrier, battleShip, destroyer, submarine, patrolBoat);
  return shipArr;
}


export default Ship