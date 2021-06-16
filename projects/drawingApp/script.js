/*Setting up the canvas.*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight * 0.8;
canvas.width = window.innerWidth * 0.8;

/*Mouse control event listeners.*/
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishPosition);
canvas.addEventListener('mousemove', draw);

let painting = false;

/*To have drawing occur on cursor location relative to canvas not to window - willneed to try and find a more elegant solution when incorporating into a portfolio website rather than finding height, margin and padding values for all elements above the canvas*/
let canStyle = getComputedStyle(canvas);
let canMargX = canStyle.getPropertyValue('margin-left').split('px');
let h1Style = getComputedStyle(document.querySelector('h1'));
let h1Height = h1Style.getPropertyValue('height').split('px');
let h1margin = h1Style.getPropertyValue('margin').split('px');
console.log(h1margin);
let canMargY = parseFloat(h1Height[0]) + (parseFloat(h1margin[0]) * 2);

/*Variables for brush settings*/
/*Brush Shape*/

let brushShape = 'round'
let rubbingOut = false;

let round = document.getElementById('round');
round.addEventListener('click', () => {
    brushShape = 'round';
    rubbingOut = false
});
let square = document.getElementById('square');
square.addEventListener('click', () => {
    brushShape = 'square';
    rubbingOut = false
});
let eraser = document.getElementById('eraser');
eraser.addEventListener('click', () => {
    rubbingOut = true
});


/*Brush slider value*/
let brushSize = document.getElementById('brushSize');
brushSize.addEventListener('input', () => {
    document.getElementById('sizeOutput').innerHTML = brushSize.value;
});

/*Colour controls*/
let red = document.getElementById('red');
red.addEventListener('input', () => {
    document.getElementById('redOutput').innerHTML = red.value;
});
let green = document.getElementById('green');
green.addEventListener('input', () => {
    document.getElementById('greenOutput').innerHTML = green.value;
});
let blue = document.getElementById('blue');
blue.addEventListener('input', () => {
    document.getElementById('blueOutput').innerHTML = blue.value;
});

let colour = 'rgb(' + red.value + ', ' + green.value + ', ' + blue.value + ')';
let currentColour = document.getElementById('currentColour');

red.addEventListener('input', () => {
    colour = 'rgb(' + red.value + ', ' + green.value + ', ' + blue.value + ')';
    currentColour.style.cssText = 'background-color:' + colour + ';';
});
green.addEventListener('input', () => {
    colour = 'rgb(' + red.value + ', ' + green.value + ', ' + blue.value + ')';
    currentColour.style.cssText = 'background-color:' + colour + ';';
});
blue.addEventListener('input', () => {
    colour = 'rgb(' + red.value + ', ' + green.value + ', ' + blue.value + ')';
    currentColour.style.cssText = 'background-color:' + colour + ';';
});

/*Drawing functions*/
/*Start and end positions*/

function startPosition(e) {
    painting = true;
    draw(e);
}

function finishPosition(e) {
    painting = false;
    ctx.beginPath();
}

/*Main drawing function*/
function draw(e) {
    if (!painting) return;


    /*X and Y   coordinates*/
    let x = e.clientX - parseFloat(canMargX[0]);
    let y = (e.clientY + window.pageYOffset);

    /*Drawing - done in an if statment so that it is possible to use the eraser without losing the selected colour.*/
    if (rubbingOut) {
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = brushShape;
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(247, 247, 247, 0.986)';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = brushShape;
        ctx.lineTo(x, y);
        ctx.strokeStyle = colour;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}