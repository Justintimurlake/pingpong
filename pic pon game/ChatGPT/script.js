// get the canvas element from the DOM
var canvas = document.getElementById("canvas");

// set the canvas width and height
canvas.width = 800;
canvas.height = 600;

// get the 2D context for the canvas
var ctx = canvas.getContext("2d");

// define the ball object
var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 5,
  dy: -5,
};

// define the paddles
var paddleHeight = 100;
var paddleWidth = 10;

var leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  speed: 5,
  dy: 0,
};

var rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  speed: 5,
  dy: 0,
};

// define the game loop function
function gameLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();

  // move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // check for collision with walls
  if (
    ball.y + ball.dy < ball.radius ||
    ball.y + ball.dy > canvas.height - ball.radius
  ) {
    ball.dy = -ball.dy;
  }
  if (ball.x + ball.dx > canvas.width - ball.radius) {
    ball.dx = -ball.dx;
  }

  // check for collision with paddles
  if (
    ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + leftPaddle.height
  ) {
    ball.dx = -ball.dx;
  }
  if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + rightPaddle.height
  ) {
    ball.dx = -ball.dx;
  }

  // move the paddles
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // check for collision with walls
  if (leftPaddle.y < 0) {
    leftPaddle.y = 0;
  }
  if (leftPaddle.y + leftPaddle.height > canvas.height) {
    leftPaddle.y = canvas.height - leftPaddle.height;
  }
  if (rightPaddle.y < 0) {
    rightPaddle.y = 0;
  }
  if (rightPaddle.y + rightPaddle.height > canvas.height) {
    rightPaddle.y = canvas.height - rightPaddle.height;
  }

  // draw the paddles
  ctx.fillStyle = "#FFF";
  ctx.fillRect(
    leftPaddle.x,
    leftPaddle.y,
    leftPaddle.width,
    leftPaddle.height
  );
  ctx.fillRect(
    rightPaddle.x,
    rightPaddle.y,
    rightPaddle.width,
    rightPaddle.height
  );

  // request a new animation frame
  requestAnimationFrame(gameLoop);
}

// handle keyboard input
document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 87: // W key
      leftPaddle.dy = -leftPaddle.speed;
      break;
    case 83: // S key
      leftPaddle.dy = leftPaddle.speed;
      break;
    case 38: // up arrow key
      rightPaddle.dy = -rightPaddle.speed;
      break;
    case 40: // down arrow key
      rightPaddle.dy = rightPaddle.speed;
      break;
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.keyCode) {
    case 87: // W key
    case 83: // S key
      leftPaddle.dy = 0;
      break;
    case 38: // up arrow key
    case 40: // down arrow key
      rightPaddle.dy = 0;
      break;
  }
});

// start the game loop
gameLoop();
