const player = document.querySelector(".player");
const game = document.querySelector(".game");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const BgCover = document.querySelector(".cover");

let gameRunning = false;
let score = 0;
let speed = 5;
let playerX = 175;
let enemies = [];

startBtn.addEventListener("click", startGame);

function startGame(){
  if(gameRunning) return;

  score = 0;
  speed = 5;
  enemies.forEach(e => e.remove());
  enemies = [];

  gameRunning = true;
  startBtn.style.display = "none";
  BgCover.style.display = "none";
  
  spawnEnemy();
  gameLoop();
}

/* PLAYER CONTROL */
document.addEventListener("keydown", e=>{
  if(!gameRunning) return;

  if(e.key === "ArrowLeft" && playerX > 0){
    playerX -= 25;
  }

  if(e.key === "ArrowRight" && playerX < 350){
    playerX += 25;
  }

  player.style.left = playerX + "px";
});

/* GAME LOOP */
function gameLoop(){
  if(!gameRunning) return;

  moveEnemies();

  score++;
  speed += 0.001;
  scoreDisplay.innerText = "Score: " + score;

  requestAnimationFrame(gameLoop);
}

/* ENEMY SPAWN */
function spawnEnemy(){
  if(!gameRunning) return;

  const enemy = document.createElement("div");
  enemy.classList.add("car","enemy");

  enemy.style.left = Math.floor(Math.random()*7)*50 + "px";
  enemy.style.top = "-100px";

  game.appendChild(enemy);
  enemies.push(enemy);

  setTimeout(spawnEnemy,1500);
}

/* MOVE ENEMY */
function moveEnemies(){
  enemies.forEach((enemy,index)=>{
    let top = parseInt(enemy.style.top);
    top += speed;
    enemy.style.top = top + "px";

    if(isColliding(player,enemy)){
      gameOver();
    }

    if(top > window.innerHeight){
      enemy.remove();
      enemies.splice(index,1);
    }
  });
}

/* COLLISION */
function isColliding(a,b){
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

/* GAME OVER */
function gameOver(){
  gameRunning = false;
  alert("Game Over! Score: "+score);
  startBtn.style.display = "inline-block";
}
