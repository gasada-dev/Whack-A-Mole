const HOLES = document.querySelectorAll('.hole');
const MOLES = document.querySelectorAll('.mole');
const SCORE = document.querySelectorAll('.score');
let lastHole;

function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randHole(HOLES) {
  const IDX = Math.floor(Math.random() * HOLES.length);
  const HOLE = HOLES[IDX];

  if (lastHole === HOLE) {
    console.log('restart');
    return randHole(HOLES);
  }

  lastHole = HOLE
  return HOLE;
}