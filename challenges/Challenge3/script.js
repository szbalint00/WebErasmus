// 1-rock
// 2-paper
// 3-scissors


const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const resultDiv = document.querySelector("div .resultDiv");
const resetButton = document.querySelector("button");
const choiceList = document.querySelector("ul");
const streakP = document.querySelector(".streak");

let compChoicePara = document.querySelector(".computer");
let results = document.querySelector(".results");

let computerChoice;
let playerChoice;
let streak=0;

reset();

resetButton.addEventListener("click",reset);
resetButton.style.display="none";

function reset(){
    choiceList.style.display="flex";
    resultDiv.style.display = "none";
    compChoicePara.textContent="Computers choice: 🤷‍♂️";
    results.textContent="";
    streakP.textContent="";
    streak=0;
    resetButton.style.display="none";
}


rock.addEventListener("click",onRockClick);
paper.addEventListener("click",onPaperClick);
scissors.addEventListener("click",onScissorsClick);

function onRockClick(){
    playerChoice=1;
    main();
}

function onPaperClick(){
    playerChoice=2;
    main();
}

function onScissorsClick(){
    playerChoice=3;
    main();
}

function randomGen(){
    let randomNumber = Math.random();
    compChoicePara.textContent="Computers choice: ";
    console.log(randomNumber);
    if(randomNumber<=0.33){
        computerChoice = 1;
        compChoicePara.textContent+="Rock";
    }
    else if(randomNumber>=0.33 && randomNumber<=0.66){
        computerChoice = 2;
        compChoicePara.textContent+="Paper";
    }
    else{
        computerChoice = 3;
        compChoicePara.textContent+="Scissors";
    }
}

function main(){
    randomGen();
    resultDiv.style.display = "flex";

    if(computerChoice===playerChoice){
        draw();
    }
    else if(playerChoice===1){
        if(computerChoice===2){
            lose();
        }
        else if(computerChoice===3){
            win();
        }
    }
    else if(playerChoice===2){
        if(computerChoice===3){
            lose();
        }
        else if(computerChoice===1){
            win();
        }
    }
    else if(playerChoice===3){
        if(computerChoice===1){
            lose();
        }
        else if(computerChoice===2){
            win();
        }
    }
}

function win(){
    results.textContent="You won!";
    resultDiv.style.background="green";
    streak++;
}

function draw(){
    results.textContent="Draw. Try again!";
    resultDiv.style.background="yellow";
}

function lose(){
    results.textContent="You lost!";
    resultDiv.style.background="red";
    choiceList.style.display="none";
    streakP.textContent="Win streak: "+streak;
    resetButton.style.display="block";
}