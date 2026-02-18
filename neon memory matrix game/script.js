const boxes = document.querySelectorAll(".box");
const startBtn = document.getElementById("start");
const levelText = document.getElementById("level");

let sequence = [];
let userSequence = [];
let level = 0;
let started = false;

startBtn.addEventListener("click", startGame);

function startGame(){
  sequence = [];
  level = 0;
  started = true;
  nextLevel();
}

function nextLevel(){
  userSequence = [];
  level++;
  levelText.innerText = "Level " + level;

  const random = Math.floor(Math.random() * 4);
  sequence.push(random);

  playSequence();
}

function playSequence(){
  let i = 0;
  const interval = setInterval(()=>{
    const box = boxes[sequence[i]];
    box.classList.add("active");

    setTimeout(()=>{
      box.classList.remove("active");
    },500);

    i++;
    if(i >= sequence.length){
      clearInterval(interval);
    }
  },800);
}

boxes.forEach(box=>{
  box.addEventListener("click", ()=>{
    if(!started) return;

    const id = Number(box.dataset.id);
    userSequence.push(id);

    box.classList.add("active");
    setTimeout(()=>box.classList.remove("active"),200);

    checkAnswer(userSequence.length - 1);
  });
});

function checkAnswer(index){
  if(userSequence[index] !== sequence[index]){
    levelText.innerText = "Game Over! Click Start";
    started = false;
    return;
  }

  if(userSequence.length === sequence.length){
    setTimeout(nextLevel,1000);
  }
}