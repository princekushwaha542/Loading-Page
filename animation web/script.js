const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("explodeBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let stars = [];
let theme = "colorful";

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.gravity = 0.2;
    this.color = theme === "colorful"
      ? `hsl(${Math.random() * 360},100%,50%)`
      : "#00f2ff";
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce bottom
    if (this.y + this.size > canvas.height) {
      this.y = canvas.height - this.size;
      this.speedY *= -0.6;
    }

    // Collision with other particles
    particles.forEach(p => {
      const dx = this.x - p.x;
      const dy = this.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + p.size) {
        this.speedX *= -1;
        this.speedY *= -1;
      }
    });

    this.size *= 0.97;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.5;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

function createExplosion(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(x, y));
  }

  // Button shake animation
  button.style.transform = "scale(1.2)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 200);
}

function initStars() {
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.size < 0.5) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

button.addEventListener("click", (e) => {
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  createExplosion(x, y);
});

// Mouse trail effect
canvas.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 2; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

// Theme toggle with double click
button.addEventListener("dblclick", () => {
  theme = theme === "colorful" ? "neon" : "colorful";
});

initStars();
animate();