const paragraphs = [
  "JavaScript is a powerful programming language used for web development.",
  "Practice daily to improve your typing speed and accuracy.",
  "Coding requires patience logical thinking and creativity."
];

const textDisplay = document.getElementById("text");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timer;
let timeLeft = 30;
let currentText = "";
let started = false;

function startTest(){
  currentText = paragraphs[Math.floor(Math.random()*paragraphs.length)];
  textDisplay.innerHTML = currentText.split("").map(letter => `<span>${letter}</span>`).join("");
  
  input.disabled = false;
  input.value = "";
  input.focus();

  timeLeft = 30;
  timeDisplay.innerText = timeLeft;
  started = true;

  timer = setInterval(()=>{
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if(timeLeft === 0){
      clearInterval(timer);
      input.disabled = true;
    }
  },1000);
}

input.addEventListener("input", ()=>{
  const textSpans = textDisplay.querySelectorAll("span");
  const typed = input.value.split("");

  let correct = 0;

  textSpans.forEach((span,index)=>{
    const char = typed[index];

    if(char == null){
      span.classList.remove("correct","wrong");
    } else if(char === span.innerText){
      span.classList.add("correct");
      span.classList.remove("wrong");
      correct++;
    } else{
      span.classList.add("wrong");
      span.classList.remove("correct");
    }
  });

  const wordsTyped = input.value.trim().split(" ").length;
  const wpm = Math.round((wordsTyped / (30 - timeLeft)) * 60);
  wpmDisplay.innerText = wpm > 0 ? wpm : 0;

  const accuracy = Math.round((correct / textSpans.length) * 100);
  accuracyDisplay.innerText = accuracy > 0 ? accuracy : 0;
});
