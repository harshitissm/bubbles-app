const canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 600;

class CircleAndArrow {
    constructor(x, y, radius, color) {
        this.arrow_x = x + 440;
        this.arrow_y = y;
        this.circle_x = x;
        this.circle_y = y;
        this.radius = radius;
        this.color = color;
        this.isAnimating = false;
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.circle_x, this.circle_y, this.radius, 0, Math.PI * 2, true);
        c.fill();

        c.beginPath();
        c.arc(this.circle_x, this.circle_y, this.radius, 0, Math.PI * 2, true);
        c.stroke();

        c.beginPath();
        c.fillStyle = "black";
        c.moveTo(this.arrow_x, this.arrow_y);
        c.lineTo(this.arrow_x + 15, this.arrow_y - 20);
        c.lineTo(this.arrow_x + 15, this.arrow_y - 5);
        c.lineTo(this.arrow_x + 50, this.arrow_y - 5);
        c.lineTo(this.arrow_x + 50, this.arrow_y + 5);
        c.lineTo(this.arrow_x + 15, this.arrow_y + 5);
        c.lineTo(this.arrow_x + 15, this.arrow_y + 20);
        c.lineTo(this.arrow_x, this.arrow_y);
        c.stroke();
        c.fill();
    }

    update(color) {
        this.color = color;
        this.draw();
    }
}

let circleAndArrow = [];
const colors = ['yellow', 'blue', 'red', 'green'];

window.onload = drawCircle();

function drawCircle() {
    circleAndArrow = new Array();
    var y = 0;
    for (let i = 0; i < 4; i++) {
        circleAndArrow[i] = new CircleAndArrow(60, 50 + y, 30, colors[i]);
        circleAndArrow[i].draw();
        y += 100;
    }
}

let animateId = new Array(4);

function move(n) {

    if (circleAndArrow[n].isAnimating) {
        return;
    }

    circleAndArrow[n].isAnimating = true;

    if (circleAndArrow[n].arrow_x > 90)
        animate();

    function animate() {
        animateId[n] = requestAnimationFrame(animate);

        c.clearRect(0, 0, 600, 400);

        for (var i = 0; i < 4; i++) {
            circleAndArrow[i].draw();
        }

        circleAndArrow[n].arrow_x -= 2;

        if (circleAndArrow[n].arrow_x == 90) {
            circleAndArrow[n].update("grey");
            cancelAnimationFrame(animateId[n]);
            circleAndArrow[n].isAnimating = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('Reset');
    button.addEventListener("click", () => {

        for(var i= 0; i < animateId.length; i++)
        if (animateId[i]) {
            cancelAnimationFrame(animateId[i]);
        }

        c.clearRect(0, 0, 600, 400);
        drawCircle();
    });
});

var mouse = {
    x: undefined,
    y: undefined
}

let rect = canvas.getBoundingClientRect();

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x - rect.left;
    mouse.y = event.y - rect.top;

    for (var i = 0; i < 4; i++) {
        if (mouse.x - circleAndArrow[i].circle_x < 30 && mouse.x - circleAndArrow[i].circle_x > -30 && mouse.y - circleAndArrow[i].circle_y < 30 && mouse.y - circleAndArrow[i].circle_y > -30) {
            document.body.classList.add('custom-cursor');
            break;
        } else {
            document.body.classList.remove('custom-cursor');
        }
    }
});

window.addEventListener('click', function (event) {
    mouse.x = event.x - rect.left;
    mouse.y = event.y - rect.top;

    if (mouse.x > 0 && mouse.y > 0) {
        for (var i = 0; i < 4; i++) {
            if (mouse.x - circleAndArrow[i].circle_x < 30 && mouse.x - circleAndArrow[i].circle_x > -30 && mouse.y - circleAndArrow[i].circle_y < 30 && mouse.y - circleAndArrow[i].circle_y > -30) {
                move(i);
            }
        }
    }
});