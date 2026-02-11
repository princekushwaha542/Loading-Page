const player = document.querySelector(".player");
const game = document.querySelector(".game");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let score = 0;
let isJumping = false;
let velocity = 0;
let gravity = 1;
let gameRunning = false;
let speed = 6;
let jumpCount = 0;

let obstacles = [];
let coins = [];
let animationId;

/* START GAME */
function startGame() {
  if (gameRunning) return;

  // Reset everything
  score = 0;
  speed = 6;
  obstacles.forEach(o => o.remove());
  coins.forEach(c => c.remove());
  obstacles = [];
  coins = [];

  player.style.bottom = "120px";

  gameRunning = true;
  startBtn.style.display = "none";
  scoreDisplay.innerText = "Score: 0";

  spawnObstacle();
  spawnCoin();
  gameLoop();
}

startBtn.addEventListener("click", startGame);

/* JUMP */
document.addEventListener("keydown", e => {
  if (!gameRunning) return;

  if (e.code === "Space" && jumpCount < 2) {
    velocity = 18;
    isJumping = true;
    jumpCount++;
  }
});

/* GAME LOOP */
function gameLoop() {
  if (!gameRunning) return;

  // Gravity
  if (isJumping) {
    velocity -= gravity;
    let bottom = parseInt(player.style.bottom);
    bottom += velocity;

    if (bottom <= 120) {
      bottom = 120;
      isJumping = false;
      jumpCount = 0;
    }

    player.style.bottom = bottom + "px";
  }

  moveObstacles();
  moveCoins();

  score++;
  speed += 0.002;
  scoreDisplay.innerText = "Score: " + score;

  animationId = requestAnimationFrame(gameLoop);
}

/* SPAWN OBSTACLE */
function spawnObstacle() {
  if (!gameRunning) return;

  const obs = document.createElement("div");
  obs.classList.add("obstacle");

  let height = Math.random() * 60 + 40;
  obs.style.height = height + "px";
  obs.style.left = window.innerWidth + "px";

  game.appendChild(obs);
  obstacles.push(obs);

  setTimeout(spawnObstacle, 2000);
}

function moveObstacles() {
  obstacles.forEach((obs, index) => {
    let left = parseInt(obs.style.left);
    left -= speed;
    obs.style.left = left + "px";

    if (isColliding(player, obs)) {
      gameOver();
    }

    if (left < -50) {
      obs.remove();
      obstacles.splice(index, 1);
    }
  });
}

/* SPAWN COIN */
function spawnCoin() {
  if (!gameRunning) return;

  const coin = document.createElement("div");
  coin.classList.add("obstacle");
  coin.style.height = "30px";
  coin.style.background = "gold";
  coin.style.borderRadius = "50%";
  coin.style.bottom = "200px";
  coin.style.left = window.innerWidth + "px";

  game.appendChild(coin);
  coins.push(coin);

  setTimeout(spawnCoin, 3000);
}

function moveCoins() {
  coins.forEach((coin, index) => {
    let left = parseInt(coin.style.left);
    left -= speed;
    coin.style.left = left + "px";

    if (isColliding(player, coin)) {
      score += 50;
      coin.remove();
      coins.splice(index, 1);
    }

    if (left < -50) {
      coin.remove();
      coins.splice(index, 1);
    }
  });
}

/* COLLISION */
function isColliding(a, b) {
  if (!gameRunning) return false;

  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.right < bRect.left ||
    aRect.left > bRect.right ||
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom
  );
}

/* GAME OVER */
function gameOver() {
  gameRunning = false;
  cancelAnimationFrame(animationId);

  alert("Game Over! Final Score: " + score);
  startBtn.style.display = "inline-block";
  startBtn.innerText = "Restart";
}
