/*Setting up the canvas.*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight * 0.8;
canvas.width = window.innerWidth * 0.8;
if(window.innerWidth > 1125) {
    canvas.width = 900;
}

/*Mouse control event listeners.*/
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', (e) => {
        startPosition(e.targetTouches[0])
    }
)
canvas.addEventListener('touchend', (e) => {
        finishPosition(e.targetTouches[0])
    }
);
canvas.addEventListener('touchmove', (e) =>
    {
        draw(e.targetTouches[0]);
    }
);

let painting = false;

/*Variables for brush settings*/
/*Brush Shape*/

let brushShape = 'round'
let rubbingOut = false;
const shapeSelection = document.querySelector('.brushShapes');

function changeShape(target) {
    if(target.id === '') return;

    if(target.id === 'round' || target.id === 'square'){
        rubbingOut = false;
    } else {
        rubbingOut = true;
    }
    
    brushShape = target.id;
}

shapeSelection.addEventListener('click', (e) => changeShape(e.target));

/*Brush slider value*/
let brushSize = document.getElementById('brushSize');
brushSize.addEventListener('input', () => {
    document.getElementById('sizeOutput').innerHTML = brushSize.value;
});

/*Colour controls*/
const colourInputs = document.querySelectorAll('.brushColours input');
let red = 0;
let green = 0;
let blue = 0;
let colour = `rgb(${red}, ${green}, ${blue})`;

function colourChange(target) {
    const id = target.id;
    document.getElementById(`${id}Output`).innerHTML = target.value;

    if(id === 'red') {
        red = target.value
    } else if(id === 'green'){
        green = target.value
    } else {
        blue = target.value
    }
    colour = `rgb(${red}, ${green}, ${blue})`;
    
    const currentColour = document.getElementById('colourDisplay');
    currentColour.style.cssText = `background-color: ${colour};`;    
}

colourInputs.forEach(input => {
    input.addEventListener('input', (e) => colourChange(e.target));
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
    let x = e.pageX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop + window.scrollY;

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