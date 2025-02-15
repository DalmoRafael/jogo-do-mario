const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const gameMusic = new Audio('./assets/music-theme.mp3');
gameMusic.play();
const gameOverMusic = new Audio('./assets/die.mp3');

const jump = () => {
    mario.classList.add('jump');
    const jumpSound = new Audio("./assets/jump.mp3");
    jumpSound.play();
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

let points = 0;
const pointsInterval = setInterval(() => {
    points++;
    document.getElementById('points').textContent = `Pontos: ${points}`;
}, 333);

const highScore = localStorage.getItem("record") || 0;
const savedHighScore = localStorage.getItem("record") || 0;
document.getElementById('record').textContent = `Recorde: ${savedHighScore}`;

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
        const cloudPosition = getComputedStyle(clouds).right.replace('px', '');
        
        gameMusic.pause();
        gameOverMusic.play();

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudPosition}px`;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './assets/game-over.png';
        mario.style.width = '75px'
        mario.style.marginLeft = '30px'

        const gameOverButton = document.createElement('button');
        gameOverButton.classList.add('game-over-button');
        gameOverButton.textContent = 'Recomeçar';
        document.body.appendChild(gameOverButton);
        gameOverButton.addEventListener('click', () => {
            location.reload();
        });

        if (points > highScore) {
            localStorage.setItem("record", points);
        }

        clearInterval(pointsInterval);
        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);
