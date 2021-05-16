 /*Retrieve HTMl elements.*/
 const container = document.querySelector('.gridContainer');
 const gridSize = document.getElementById('gridSize');
 const colourPicker = document.getElementById('picker');
 const sizeLabel = document.querySelector('section p');
 const userInputs = document.querySelector('section');

/*For deciding on a colour.*/
let currentColour = colourPicker.value;

/*Populating container with grid cells.*/
function makeGrid() {
    [...container.childNodes].forEach(child => container.removeChild(child));
    container.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`
    for(let i = 1; i <= gridSize.value**2; i++){
        const div = document.createElement('div');
        div.setAttribute('class', 'gridCell');
        div.setAttribute('data-grey', '1');
        container.appendChild(div);
    }

    //If being called due to grid resizing.
    sizeLabel.textContent = `${gridSize.value} x ${gridSize.value}`
    
}

/*To colour in grid cells when the mouse is over them.*/
function colour(e) {
    if(e.target.classList[0] === 'gridContainer') return;
    if (currentColour === 'rainbow') {
        rainbowColour(e.target.style)
    } else if (currentColour === 'greyScale') {
        fiftyShades(e.target)
    } else if (currentColour === 'eraser') {
        rubbingOut(e.target)
    } else {
        e.target.style.backgroundColor = currentColour;
    }
}

/*Rainbow colouring.*/
let hue = 0; //Global variable so that it can change consistently across events.
function rainbowColour(style) {
    style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    hue += 5;
    if(hue > 360) {
        hue = 0;
    } 
}

/*Colouring with grey scale.*/
function fiftyShades(target) {
    let shade = target.dataset.grey;
    if(shade >= 10){
        target.style.backgroundColor = `rgba(0, 0, 0, ${shade})`;
    } else {
        target.style.backgroundColor = `rgba(0, 0, 0, 0.${shade})`;
        shade = Number(shade);
        shade++;
        target.dataset.grey = `${shade}`;
    }
}

/*Eraser*/
function rubbingOut(target) {
    target.style.backgroundColor = `#fff`;
    target.dataset.grey = `1`;
}

/*For picking a colour*/
function setColour(target, colourValue) {
    switch (target){
        case 'picker':
            currentColour = colourValue;
            break;
        case 'rainbow':
            currentColour = 'rainbow';
            break;
        case 'greyScale':
            currentColour = 'greyScale';
            break;
        case 'eraser':
            currentColour = 'eraser';
            break;
    } 
}

/*Function for click triggered events*/
let colourOnClick = false; //To switch between colouring on click and on mouseover.
function click(e) {
    if(e.target.dataset.click === 'colour'){
        setColour(e.target.id, null);
    } else if(e.target.dataset.click === 'clear-grid'){
        makeGrid();
    } else if(e.target.dataset.click === 'draw-on-click'){
        colourOnClick = true;
    } else if(e.target.dataset.click === 'draw-on-mouseover'){
        colourOnClick = false;
    }
}

/*All the event listeners.*/

//Setting up grid on page load.
window.addEventListener('load', makeGrid);

//Colour and eraser choice.
userInputs.addEventListener('click', click)
picker.addEventListener('input', (e) => {setColour(e.target.id, e.target.value)});

//Resizing the grid.
gridSize.addEventListener('input', makeGrid);

//Colouring in the grid cells.
container.addEventListener('mouseover', (e) => {
    if(colourOnClick === true) return;
    colour(e);
});
container.addEventListener('click', (e) => {
    if(colourOnClick === false) return;
    colour(e);
});