let canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const circleX = 200;
const circleY = 200;
const circleRadius = 50;

const arrow = {
    x: 100,
    y: 100,
    speed: 2,
    angle: Math.PI / 4
};

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.closePath();

    // Draw arrow
    ctx.translate(arrow.x, arrow.y);
    ctx.rotate(arrow.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.lineTo(15, -5);
    ctx.moveTo(20, 0);
    ctx.lineTo(15, 5);
    ctx.strokeStyle = "red";
    ctx.stroke();
    // ctx.rotate(-arrow.angle);
    // ctx.translate(-arrow.x, -arrow.y);
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (Math.sqrt((clickX - circleX) ** 2 + (clickY - circleY) ** 2) <= circleRadius) {
        moveArrow();
    }
});

function moveArrow() {
    const dx = circleX - arrow.x;
    const dy = circleY - arrow.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    arrow.angle = Math.atan2(dy, dx);

    if (distance > circleRadius) {
        arrow.x += arrow.speed * Math.cos(arrow.angle);
        arrow.y += arrow.speed * Math.sin(arrow.angle);
        requestAnimationFrame(moveArrow);
    }
}

draw();
