const canvas = document.getElementById('introCanvas'); // Get the canvas element
const ctx = canvas.getContext("2d"); // Get the context of the canvas

canvas.width = window.innerWidth; // Set the width of the canvas to the width of the window
canvas.height = window.innerHeight; // Set the height of the canvas to the height of the window

const particles = []; //create an empty array to store the particles

class Particle {
    constructor (x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }


update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
}

draw() {
    ctx.beginPath(); // Start drawing
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Draw a circle
    ctx.fillStyle = this.color; // Set the fill color
    ctx.fill(); // Fill the circle
    ctx.closePath(); // End drawing
}
}
// create random particles
function initParticles() {
    for(let i = 0; i < 50; i++) {
        let size = Math.random() * 5 + 2; // Random size between 2 and 7
        let x = Math.random() * canvas.width; // Random x coordinate    
        let y = Math.random() * canvas.height; // Random y coordinate
        let speedX = (Math.random()-0.5) * 2; // Random speed in x direction
        let speedY = (Math.random()-0.5) * 2; // Random speed in y direction
        let color = 'rgba(255, 255, 255, 0.8)'; // Random color

        particles.push(new Particle(x,y, size, speedX, speedY, color));
    }
}
//Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    particles.forEach((particle) => { // Loop through each particle
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles); // Call the function again
}

//Resize canvas dynamically
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    initParticles();
});

//particles follow mouse
/*canvas.addEventListener("mousemove", (event) => {
    let size = Math.random() * 5 + 2; // Random size between 2 and 7
    let color = "rgba(255, 255, 255, 0.8)";
    let speedX = (Math.random() - 0.5) * 2;
    let speedY = (Math.random() - 0.5) * 2;

    particles.push(new Particle(event.x, event.y, size, speedX, speedY, color));
})*/

//initialize and start the animation
initParticles();
animateParticles();

document.getElementById("view-work-btn").addEventListener("click", function() {
    let projectsSection = document.getElementById("projects");
    projectsSection.scrollIntoView({behavior: "smooth"});

    /*setTimeout(() => {
        projectsSection.classList.add("visible");
    }, 600);*/
});