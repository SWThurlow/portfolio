//Variables for counting the score, and keeping tack of player choice.
let playerWins = 0;
let computerWins = 0;
let draws =  0;
let playing = false;

//Retrieving the necessary elements.
const gameStart = document.querySelector('.start');
const playerOptions = document.querySelectorAll('.playerOption');
const comentary =  document.querySelector('.runningComentary');
const playLog = document.querySelector('.playLog');

//Event Listeners for game start.
gameStart.addEventListener('click', game);

//Event listeners for player options.
playerOptions.forEach(option => option.addEventListener('click', (e) => {
    if(!playing) return;
    const weapon = e.target.id;
    playerSelection(weapon);
}));


//Computer's choice.
function computerSelection(){
    const options = ["rock", "paper", "scissors"];
    //Random number from 0 - 2 to pick from array.
    let choice = Math.floor(Math.random() * 3);
    return options[choice]
}

//Player's choice.
function playerSelection(move){
    playRound(move);
    const totalRounds = draws + computerWins + playerWins;
    if(totalRounds === 5){
        endGame();
    }
}

//Game logic, comparing the return values from playerSelection and computerSelection.
function playRound(playerChoice){
    //Had to put playerChoice first to remove player being able to see the computerSelection output.
    let compChoice = computerSelection();

    //Figuring out who won this round.
    if(compChoice === playerChoice){
        draws++;
        comentary.innerHTML = `Draw!`;
        let logEntry = document.createElement('p');
        logEntry.innerHTML = `Draws: ${draws}, Computer Wins: ${computerWins}, Player Wins: ${playerWins}`;
        playLog.appendChild(logEntry);
        return 
    } else if((compChoice === "rock" && playerChoice === "scissors") || 
                (compChoice === "scissors" && playerChoice === "paper") || 
                (compChoice === "paper" && playerChoice === "rock")){
                    computerWins++;
                    comentary.innerHTML = `The computer wins this round.`;
                    let logEntry = document.createElement('p');
                    logEntry.innerHTML = `Draws: ${draws}, Computer Wins: ${computerWins}, Player Wins: ${playerWins}`;
                     playLog.appendChild(logEntry);
                    return
    }else if((playerChoice === "rock" && compChoice === "scissors") || 
                (playerChoice === "scissors" && compChoice === "paper") || 
                (playerChoice === "paper" && compChoice === "rock")){
                    playerWins++;
                    comentary.innerHTML = `You won this one!`;
                    let logEntry = document.createElement('p');
                    logEntry.innerHTML = `Draws: ${draws}, Computer Wins: ${computerWins}, Player Wins: ${playerWins}`;
                    playLog.appendChild(logEntry);
                    return
    }
}

//Game to decide the best of five.
function game(){
    playing = true;

    //Reseting if multiple games are played.
    playerWins = 0;
    computerWins = 0;
    draws =  0;


    //Prompting the player.
    comentary.innerHTML = `Your move.`;

    //Create play again button.
    gameStart.classList.remove('start');
    gameStart.classList.add('playAgain');
    gameStart.addEventListener('click', () => {
        const logEntries = Array.from(playLog.childNodes);
        logEntries.forEach(child => playLog.removeChild(child));
        game();
    });
    gameStart.innerHTML = 'Play again?'
}

//Ending the game and finding out the winner.
function endGame(){
    playing = false;

    //Finding the winner.
    if(playerWins === computerWins){
        comentary.innerHTML = `The game's a draw!`;
        let endEntry = document.createElement('p');
        endEntry.innerHTML = `Draws: ${draws}, Computer Wins: ${computerWins}, Player Wins: ${playerWins}`;
        playLog.appendChild(endEntry);
    } else if(playerWins > computerWins){
        comentary.innerHTML = `You won the game!`;
        let endEntry = document.createElement('p');
        endEntry.innerHTML = `Player Wins: ${playerWins}, Computer Wins: ${computerWins}, Draws: ${draws}`;
        playLog.appendChild(endEntry);
    } else {
        comentary.innerHTML = `And the computer wins the game!`;
        let endEntry = document.createElement('p');
        endEntry.innerHTML = `Computer Wins: ${computerWins}, Player Wins: ${playerWins}, Draws: ${draws}`;
        playLog.appendChild(endEntry);
    }
}