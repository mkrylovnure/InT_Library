canv = document.querySelector("#game");
ctx = canv.getContext("2d");

squareWidth = 20;
tileCount = 20;
speed = 10;
appleX = 15, appleY = 15;
xVelocity = 0, yVelocity = 0;
xSnakePosition = 10, ySnakePosition = 10;
snakeParts = [];
snakeLength = 5;

setInterval(function () {
    yVelocity = appleY != ySnakePosition ? (appleY > ySnakePosition ? 1 : -1) : 0;
    xVelocity = appleX != xSnakePosition && yVelocity == 0 ? (appleX > xSnakePosition ? 1 : -1) : 0;

    xSnakePosition += xVelocity;
    ySnakePosition += yVelocity;

    fillBackground();

    drawSnake();
    makeMove();

    checkCollision();

    drawApple();
}, 1000 / speed);

function makeMove() {
    snakeParts.push({ x: xSnakePosition, y: ySnakePosition });
    while (snakeParts.length > snakeLength) snakeParts.shift();
}

function drawSnake() {
    ctx.fillStyle = "green";
    for (var i = 0; i < snakeParts.length; i++) {
        ctx.fillRect(snakeParts[i].x * squareWidth, snakeParts[i].y * squareWidth, squareWidth - 2, squareWidth - 2);
        if (snakeParts[i].x == xSnakePosition && snakeParts[i].y == ySnakePosition) snakeLength = 5;
    }
}

function fillBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * squareWidth, appleY * squareWidth, squareWidth - 2, squareWidth - 2);
}

function checkCollision() {
    if (appleX == xSnakePosition && appleY == ySnakePosition) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        snakeLength++;
        document.getElementById("score").innerText = `Рахунок: ${snakeLength - 5}`;
    }
}