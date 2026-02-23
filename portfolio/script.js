// ===== TYPING EFFECT =====
const words = [
"Frontend Developer",
"JavaScript Enthusiast",
"UI Animation Specialist"
];

let i=0,j=0,currentWord="";
let isDeleting=false;

function type(){
currentWord = words[i];
if(!isDeleting){
document.querySelector(".typing").textContent =
currentWord.substring(0,j++);
if(j>currentWord.length){
isDeleting=true;
setTimeout(type,1000);
return;
}
}else{
document.querySelector(".typing").textContent =
currentWord.substring(0,j--);
if(j<0){
isDeleting=false;
i++;
if(i>=words.length) i=0;
}
}
setTimeout(type,isDeleting?60:120);
}
type();


// ===== SCROLL REVEAL =====
function reveal(){
const reveals=document.querySelectorAll(".reveal");

reveals.forEach(section=>{
const windowHeight=window.innerHeight;
const revealTop=section.getBoundingClientRect().top;
const revealPoint=100;

if(revealTop < windowHeight - revealPoint){
section.classList.add("active");
}
});
}
window.addEventListener("scroll",reveal);


// ===== SKILL BAR ANIMATION =====
const fills=document.querySelectorAll(".fill");

function animateSkills(){
fills.forEach(fill=>{
const rect=fill.getBoundingClientRect();
if(rect.top < window.innerHeight){
fill.style.width=fill.dataset.width;
}
});
}
window.addEventListener("scroll",animateSkills);


// ===== NAV ACTIVE LINK =====
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{
let current="";

sections.forEach(section=>{
const sectionTop=section.offsetTop;
if(pageYOffset >= sectionTop-200){
current=section.getAttribute("id");
}
});

navLinks.forEach(a=>{
a.classList.remove("active");
if(a.getAttribute("href")==="#"+current){
a.classList.add("active");
}
});
});
// ===== DARK LIGHT MODE SAFE VERSION =====
document.addEventListener("DOMContentLoaded", function(){

const toggleBtn = document.getElementById("themeToggle");

if(!toggleBtn) return;

const icon = toggleBtn.querySelector("i");

// Load saved theme
if(localStorage.getItem("theme") === "light"){
document.body.classList.add("light");
icon.classList.remove("fa-moon");
icon.classList.add("fa-sun");
}

// Toggle click
toggleBtn.addEventListener("click", function(){

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
icon.classList.remove("fa-moon");
icon.classList.add("fa-sun");
localStorage.setItem("theme","light");
}else{
icon.classList.remove("fa-sun");
icon.classList.add("fa-moon");
localStorage.setItem("theme","dark");
}

});

});