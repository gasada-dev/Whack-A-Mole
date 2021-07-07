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
    return randHole(HOLES);
  }

  lastHole = HOLE
  return HOLE;
}

function moleSpawn() {
  const TIME = randTime(300, 900);
  const HOLE = randHole(HOLES);
  HOLE.classList.add('up');
  setTimeout(() => {
    HOLE.classList.remove('up');
    moleSpawn();
  }, TIME);
}