let canvas = document.querySelector('canvas');

let c = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const colors = ['yellow', 'red', 'green', 'blue'];

window.onload = circle(), arrows();

function circle() {
    let x = 0;

    for (var i = 0; i < 4; i++) {

        c.beginPath();
        c.fillStyle = colors[i];
        c.arc(60, 50 + x, 30, 0, Math.PI * 2, true);
        c.fill();

        c.beginPath();
        c.arc(60, 50 + x, 30, 0, Math.PI * 2, true);
        c.stroke();

        x += 100;
    }
}


function arrows() {
    let x = 0;
    for (var i = 0; i < 4; i++) {
        c.beginPath();
        c.fillStyle = "black";
        c.moveTo(500, 50 + x);
        c.lineTo(515, 30 + x);
        c.lineTo(515, 45 + x);
        c.lineTo(550, 45 + x);
        c.lineTo(550, 55 + x);
        c.lineTo(515, 55 + x);
        c.lineTo(515, 70 + x);
        c.lineTo(500, 50 + x);
        c.stroke();
        c.fill();
        x += 100;
    }
}

function move() {

    let n = 0;
    animate();

    function animate() {

        var animateId = requestAnimationFrame(animate);

        c.clearRect(0, 0, 600, 400);

        circle();

        c.beginPath();
        c.fillStyle = "black";
        c.moveTo(500 - n, 50);
        c.lineTo(515 - n, 30);
        c.lineTo(515 - n, 45);
        c.lineTo(550 - n, 45);
        c.lineTo(550 - n, 55);
        c.lineTo(515 - n, 55);
        c.lineTo(515 - n, 70);
        c.lineTo(500 - n, 50);
        c.stroke();
        c.fill();
        n += 2;

        c.beginPath();
        c.fillStyle = "black";
        c.moveTo(500, 150);
        c.lineTo(515, 130);
        c.lineTo(515, 145);
        c.lineTo(550, 145);
        c.lineTo(550, 155);
        c.lineTo(515, 155);
        c.lineTo(515, 170);
        c.lineTo(500, 150);
        c.stroke();
        c.fill();

        c.beginPath();
        c.fillStyle = "black";
        c.moveTo(500, 250);
        c.lineTo(515, 230);
        c.lineTo(515, 245);
        c.lineTo(550, 245);
        c.lineTo(550, 255);
        c.lineTo(515, 255);
        c.lineTo(515, 270);
        c.lineTo(500, 250);
        c.stroke();
        c.fill();

        c.beginPath();
        c.fillStyle = "black";
        c.moveTo(500, 350);
        c.lineTo(515, 330);
        c.lineTo(515, 345);
        c.lineTo(550, 345);
        c.lineTo(550, 355);
        c.lineTo(515, 355);
        c.lineTo(515, 370);
        c.lineTo(500, 350);
        c.stroke();
        c.fill();

        if (n == 412) {
            c.beginPath();
            c.fillStyle = "grey";
            c.arc(60, 50, 30, 0, Math.PI * 2, true);
            c.fill();

            c.beginPath();
            c.arc(60, 50, 30, 0, Math.PI * 2, true);
            c.stroke();
            cancelAnimationFrame(animateId);
        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('yellowBall');
    button.addEventListener("click", move);
});

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('Reset');
    button.addEventListener("click", () => {
        c.clearRect(0, 0, 600, 400);
        circle();
        arrows();
    });
})

// move();

console.log(canvas);
