const overlay = document.querySelector('.overlay');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const record = document.querySelector('.record');
const score = document.querySelector('.score');

let isGameStarted = false;
let gameOver = false;

const startGame = () => {
	isGameStarted = true;
	overlay.classList.remove('active');
	pipe.style.visibility = 'visible';
	pipe.style.animation = 'pipe-animation 1.5s infinite linear';
}

const jump = (event) => {
	if(isGameStarted) {
			if(event.code === 'Space') {
			mario.classList.add('jump');

			setTimeout(() => {
				mario.classList.remove('jump');
			}, 500)
		}
	}

}

let counter = 0;

const scoreCounter = setInterval(() => {
	const recordReference = localStorage.getItem('score') || 0;
	isGameStarted && !gameOver && counter++;
	score.textContent =  counter.toString().padStart(5,'0');
	if(counter > Number(recordReference)) {
		localStorage.setItem('score', counter);
		console.log(localStorage.getItem('score'));
	}

	record.textContent = `HI ${recordReference.padStart(5, '0')}`;

}, 100)

const reload = () => {
	if(gameOver) {
		gameOver = false;
		counter = 0;
		pipe.removeAttribute('style');
		pipe.style.visibility = 'visible';
		pipe.style.animation = 'pipe-animation 1.5s infinite linear';
		mario.removeAttribute('style');
		mario.src = './assets/mario.gif'
	}
}

const loop = setInterval(() => {
	const pipePosition = pipe.offsetLeft;
	const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
	if(pipePosition <= 120 && pipePosition > 0 &&  marioPosition <= 200) {
		gameOver = true;
		pipe.style.animation = 'none';
		pipe.style.left = `${pipePosition}px`

		mario.style.animation = 'none';
		mario.style.bottom = `${marioPosition}px`


		mario.src = './assets/game-over.png'
		mario.style.width = '75px';
		mario.style.marginLeft = '50px';
		
	}
}, 10)



window.addEventListener('keypress', reload);
!isGameStarted && window.addEventListener('keypress', startGame);
window.addEventListener('keydown', jump);