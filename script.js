const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 10; // Controls the snake's speed within the game

let tileCount = 20; // Number of tiles in the game grid
let titleSize = canvas.width / tileCount - 2; // Size of each tile

// Adjusting the collision wall size to match the game size
canvas.width = tileCount * titleSize + (tileCount + 1) * 2;
canvas.height = tileCount * titleSize + (tileCount + 1) * 2;

let headX = 10; // Initial X position of the snake's head
let headY = 10; // Initial Y position of the snake's head
const SnakeParts = []; // Array to store the snake's body parts
let tailLength = 2; // Initial length of the snake's tail

let appleX = 5; // X position of the apple
let appleY = 5; // Y position of the apple

let xVelocity = 0; // Velocity of the snake in the X direction
let yVelocity = 0; // Velocity of the snake in the Y direction

let score = 0; // Variable to keep track of the score

const gulpSound = new Audio("gulp.mp3"); // Sound played when the snake eats the apple


function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    
    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    if(score > 2){
        speed = 11;
    }
    if(score > 5) {
        speed = 15;
    }

    setTimeout(drawGame, 1000 / speed);
}
function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity == 0){
        return false;
    }

    if(headX < 0) {
        gameOver = true;
    }

    else if(headX === tileCount){
        gameOver = true;
    }

    else if(headY < 0) {
        gameOver = true;
    }

    else if(headY === tileCount){
        gameOver = true;
    }
    for(let i= 0; i <SnakeParts.length; i++) {
        let part = SnakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Comic Sans MS";

        ctx.fillText("GAME OVER!",canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px Comic Sans MS';
    ctx.fillText('Score: ' + score, canvas.width - 50, 10);
}

// Background of the Game.
function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Snakes head.
function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < SnakeParts.length; i++) {
        let part = SnakeParts[i];
        let x = part.x * tileCount;
        let y = part.y * tileCount;
        ctx.fillRect(x, y, titleSize, titleSize);
    }

    SnakeParts.push(new SnakePart(headX, headY));

    ctx.fillStyle = 'greenyellow';
    ctx.fillRect(headX * tileCount, headY * tileCount, titleSize, titleSize);

    while (SnakeParts.length > tailLength) {
        SnakeParts.shift();
    }
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount + 1, appleY * tileCount + 1, titleSize, titleSize);
}

// Collision Detects the apple
function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++; // Increase the score when the snake collides with the apple
        gulpSound.play();
    }
}

function changeSnakePosition() {
    headX += xVelocity;
    headY += yVelocity;
}

document.body.addEventListener('keydown', keyDown);

/* Controls for the game */

function keyDown(event) {
    /* Up */
    if (event.keyCode == 38) {
        if (yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }

    /* Down */
    if (event.keyCode == 40) {
        if (yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }

    /* Left */
    if (event.keyCode == 37) {
        if (xVelocity == 1) return;

        yVelocity = 0;
        xVelocity = -1;
    }

    /* Right */
    if (event.keyCode == 39) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
