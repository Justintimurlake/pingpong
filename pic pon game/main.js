// import Ball from "./Ball.js";
// import Paddle from "./paddle.js";

// const ball = new Ball(document.getElementById("ball"));
// const playerPaddle = new Paddle(
//   document.getElementById("player-paddle")
// );
// const computerPaddle = new Paddle(
//   document.getElementById("computer-paddle")
// );

// const playerScoreElem = document.getElementById("player-score");
// const computerScoreElem = document.getElementById("computer-score");

// let lastTime;
// function update(time) {
//   if (lastTime != null) {
//     const delta = time - lastTime;
//     ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
//     computerPaddle.update(delta, ball.y);
//     const hue = parseFloat(
//       getComputedStyle(document.documentElement).getPropertyValue(
//         "--hue"
//       )
//     );
//     document.documentElement.style.setProperty(
//       "--hue",
//       hue + delta * 0.01
//     );
//     if (isLose()) handle();
//   }

//   lastTime = time;
//   window.requestAnimationFrame(update);
// }

// function isLose() {
//   const rect = ball.rect();
//   return rect.right >= window.innerWindow || rect.left <= 0;
// }

// function handle() {
//   const rect = ball.rect();

//   if (rect.right >= window.innerWidth) {
//     playerScoreElem.textContent =
//       parseInt(playerScoreElem.textContent) + 1;
//   } else {
//     computerScoreElem.textContent =
//       parseInt(computerScoreElem.textContent) + 1;
//   }

//   ball.reset();
//   computerPaddle.reset();
// }

// document.addEventListener("mousemove", (e) => {
//   playerPaddle.position = (e.y / window.innerHeight) * 100;
// });

// window.requestAnimationFrame(update);

import Ball from "./Ball.js";
import Paddle from "./paddle.js";

class Game {
  constructor(
    ballElem,
    playerPaddleElem,
    computerPaddleElem,
    playerScoreElem,
    computerScoreElem
  ) {
    this.ball = new Ball(ballElem);
    this.playerPaddle = new Paddle(playerPaddleElem);
    this.computerPaddle = new Paddle(computerPaddleElem);
    this.playerScoreElem = playerScoreElem;
    this.computerScoreElem = computerScoreElem;
    this.lastTime = null;
  }

  update(time) {
    if (this.lastTime != null) {
      const delta = time - this.lastTime;
      this.ball.update(delta, [
        this.playerPaddle.rect(),
        this.computerPaddle.rect(),
      ]);
      this.computerPaddle.update(delta, this.ball.y);
      const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--hue"
        )
      );
      document.documentElement.style.setProperty(
        "--hue",
        hue + delta * 0.01
      );
      if (this.isLose()) this.handle();
    }

    this.lastTime = time;
    window.requestAnimationFrame((time) => this.update(time));
  }

  isLose() {
    const rect = this.ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
  }

  handle() {
    const rect = this.ball.rect();

    if (rect.right >= window.innerWidth) {
      this.playerScoreElem.textContent =
        parseInt(this.playerScoreElem.textContent) + 1;
    } else {
      this.computerScoreElem.textContent =
        parseInt(this.computerScoreElem.textContent) + 1;
    }

    this.ball.reset();
    this.computerPaddle.reset();
  }

  start() {
    document.addEventListener("mousemove", (e) => {
      this.playerPaddle.position = (e.y / window.innerHeight) * 100;
    });

    window.requestAnimationFrame((time) => this.update(time));
  }
}

const game = new Game(
  document.getElementById("ball"),
  document.getElementById("player-paddle"),
  document.getElementById("computer-paddle"),
  document.getElementById("player-score"),
  document.getElementById("computer-score")
);

game.start();
