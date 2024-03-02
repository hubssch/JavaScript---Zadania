const canvas = document.getElementById("renderArea");
const ctx = canvas.getContext("2d");

let isStopped = true;
let balls = [];
let X = 100; // Liczba kulek
let Y = 100; // Minimalna odległość między kulkami, aby rysować linię

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

document.getElementById("startBtn").addEventListener("click", startAnimation);
document.getElementById("stopBtn").addEventListener("click", stopAnimation);

let animationFrame = undefined;

function startAnimation()
{
    if(!animationFrame)
    {
        initializeBalls();
        animate();
    }
    
}

function stopAnimation ()
{
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
}

function initializeBalls() {
    balls = [];
    for (let i = 0; i < X; i++) {
        let radius = 30;
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        balls.push({ x, y, radius, dx, dy }); // Dodanie obiektu kuli do tablicy
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        updateBall(ball);
        drawBall(ball);
    });
    balls.forEach((ball1, index) => {
        for (let i = index + 1; i < balls.length; i++) {
            const ball2 = balls[i];
            const distance = Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2));
            if (distance < Y) {
                drawLine(ball1, ball2);
            }
        }
    });
    animationFrame = requestAnimationFrame(animate);
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function updateBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
}

function drawLine(ball1, ball2) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}