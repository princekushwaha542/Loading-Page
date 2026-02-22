const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("explodeBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.gravity = 0.2;
    this.color = `hsl(${Math.random() * 360},100%,50%)`;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce effect
    if (this.y + this.size > canvas.height) {
      this.y = canvas.height - this.size;
      this.speedY *= -0.6;
    }

    this.size *= 0.96; // shrink
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createExplosion(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

animate();