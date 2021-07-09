const HOLES = document.querySelectorAll('.hole');
const MOLES = document.querySelectorAll('.mole');
const SCORE = document.querySelector('.score');
const START = document.querySelector('.start');

let lastHole;
let timeUp = true;
let score;
let oldScore = localStorage.getItem('score');
let difficult;

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

  lastHole = HOLE;
  return HOLE;
}

привет 
ПРИВЕТ

function moleSpawn() {
  let speedMin = 1000;
  let speedMax = 2000;
  if (difficult === 0) {
    if (score > 1) {
      speedMin = Math.round(speedMin / (score / 3));
      speedMax = Math.round(speedMax / (score / 3));
    }
  } else if (difficult === 1) {
    speedMin = 1500;
    speedMax = 2100;
  } else if (difficult === 2) {
    speedMin = 800;
    speedMax = 1000;
  } else if (difficult === 3) {
    speedMin = 400;
    speedMax = 600;
  }

  const TIME = randTime(speedMin, speedMax);
  const HOLE = randHole(HOLES);
  HOLE.classList.add('up');

  setTimeout(() => {
    HOLE.classList.remove('up');
    if (timeUp) moleSpawn();
  }, TIME);
}

function startGame() {
  SCORE.textContent = 0;
  timeUp = true;
  score = 0;
  moleSpawn();
  setTimeout(() => timeUp = false, 15000);
}

function hit(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  SCORE.textContent = score;
  window.localStorage.score = score;
}

START.addEventListener('click', () => startGame());
MOLES.forEach(mole => mole.addEventListener('click', hit));
