 /*Retrieve HTMl elements.*/
 const container = document.querySelector('.gridContainer');
 const gridSize = document.getElementById('gridSize');
 const greyScale = document.getElementById('greyScale');
 const rainbow = document.getElementById('rainbow');
 const colourPicker = document.getElementById('picker');
 const clearGrid = document.getElementById('clearGrid');
 const eraser = document.getElementById('eraser');
 const sizeLabel = document.querySelector('form p');

 /*Colours object.*/
const colours = {
    picker: colourPicker.value,
    rainbow: false,
    grey: false,
    eraser: false,
}

/*Populating container with grid cells.*/
function makeGrid(e) {
    [...container.childNodes].forEach(child => container.removeChild(child));
    container.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`
    for(let i = 1; i <= gridSize.value**2; i++){
        const div = document.createElement('div');
        div.setAttribute('class', 'gridCell');
        div.setAttribute('data-grey', '1');
        div.addEventListener('mouseover', colour)
        container.appendChild(div);
    }

    //If being called due to grid resizing.
    sizeLabel.textContent = `${gridSize.value} x ${gridSize.value}`
    
}

/*To colour in grid cells when the mouse is over them.*/
function colour(e) {
    if(!colours.rainbow && !colours.grey && !colours.eraser){
        e.target.style.backgroundColor = colours.picker;
    } else if (colours.rainbow && !colours.grey && !colours.eraser) {
        rainbowColour(e)
    } else if (!colours.rainbow && colours.grey && !colours.eraser) {
        fiftyShades(e)
    } else if (!colours.rainbow && !colours.grey && colours.eraser) {
        rubbingOut(e)
    }
}

/*Rainbow colouring.*/
let hue = 0; //Global variable so that it can change consistently across events.
function rainbowColour(e) {
    e.target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    hue += 5;
    if(hue > 360) {
        hue = 0;
    } 
}

/*Colouring with grey scale.*/
function fiftyShades(e) {
    let shade = e.target.dataset.grey;
    console.log(shade)
    if(shade >= 10){
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${shade})`;
    } else {
        e.target.style.backgroundColor = `rgba(0, 0, 0, 0.${shade})`;
        shade = Number(shade);
        shade++;
        e.target.dataset.grey = `${shade}`;
    }
}

/*Eraser*/
function rubbingOut(e) {
    e.target.style.backgroundColor = `#fff`;
    e.target.dataset.grey = `1`;
}

/*For picking a colour*/
function setColour(e) {
    switch (e.target.id){
        case 'picker':
            colours.picker = e.target.value
            colours.rainbow = false
            colours.grey = false
            colours.eraser = false
            break;
        case 'rainbow':
            colours.rainbow = true
            colours.grey = false
            colours.eraser = false
            break;
        case 'greyScale':
            colours.rainbow = false
            colours.grey = true
            colours.eraser = false
            break;
        case 'eraser':
            colours.rainbow = false
            colours.grey = false
            colours.eraser = true
            break;
    } 
}

/*All the event listeners.*/

//Setting up grid on page load.
window.addEventListener('load', makeGrid);

//For the colour controls.
greyScale.addEventListener('click', setColour);
rainbow.addEventListener('click', setColour);
picker.addEventListener('input', setColour);

//Erasing
eraser.addEventListener('click', setColour);
clearGrid.addEventListener('click', makeGrid);

//Resizing the grid.
gridSize.addEventListener('input', makeGrid);