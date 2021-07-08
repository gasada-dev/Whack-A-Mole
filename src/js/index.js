const HOLES = document.querySelectorAll('.hole');
const MOLES = document.querySelectorAll('.mole');
const SCORE = document.querySelector('.score');
let lastHole;
let timeUp = true;
let score;
let oldScore = localStorage.getItem('score');
SCORE.textContent = oldScore;


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
  let speedMin = 1000;
  let speedMax = 2000;
  if (score > 1) {
    speedMin = Math.round(1250 / (score / 1.5));
    speedMax = Math.round(2500 / (score / 1.5));
  }

  const TIME = randTime(speedMin, speedMax);
  const HOLE = randHole(HOLES);
  HOLE.classList.add('up');


  setTimeout(() => {

    HOLE.classList.remove('up');
    if (timeUp) moleSpawn()
  }, TIME);
}

function startGame() {
  SCORE.textContent = 0;
  timeUp = true;
  score = 0;
  moleSpawn();
  setTimeout(() => timeUp = false, 20000);
}

function hit(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  SCORE.textContent = score;
  window.localStorage.score = score
}

MOLES.forEach(mole => mole.addEventListener('click', hit));
