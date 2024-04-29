// Generating random number
let randomNumber = Math.floor(Math.random() * 100) + 1;

// math random: [0,1)

//Save the document references for each paragraph
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");


//Save information about the inputs
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

//Variables for reset button and counting the guesses
let guessCount = 1;
let resetButton;

//Function to try to guess the number
function checkGuess(){

    //Save the input value and check if is number
    let userGuess = Number(guessField.value);


    //Check if the player guesses in 1 try
    if (guessCount === 1){
        guesses.textContent = "Tries: ";
    }
    guesses.textContent+=userGuess + " ";

    /*
    Conditions to check if the answer is right or wrong / the player has no more tries
        1.If the player guesses we will see "Congratulation" with green background.
        2.If the player ran out of tries, we wil see a game over screen.
        3.If non above, we will tell the player if the number is too high (b) or too low (a).
    */
    if (userGuess===randomNumber){ //1
        lastResult.textContent="Congratulations! You guessed the number!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent="";
        setGameOver();
    }
    else if(guessCount===10){ //2
        lastResult.textContent = "Game Over! :(";
        setGameOver();
    }
    else{ //3
        lastResult.textContent="Incorrect! Guess again!";
        lastResult.style.backgroundColor = "red";

        if(userGuess<randomNumber){ //3 a
            lowOrHi.textContent="The number is too low.";
        }
        else{ //3 b
            lowOrHi.textContent="The number is too high.";
        }
    }


    //Preparing variables for next try
    //Reset the input box and applies focus
    guessCount++;
    guessField.value="";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

//Game Over
function setGameOver(){
    guessField.disabled = true; //disable textbox
    guessSubmit.disabled = true; //disable button

    //Create reset game button and add to html
    resetButton = document.createElement("button"); 
    resetButton.textContent = "Reset Game";
    document.body.append(resetButton);
    resetButton.addEventListener("click",resetGame);
}

function resetGame(){
    guessCount=1;


    const resetParas = document.querySelectorAll(".resultParas p");
    for(let i=0;i<resetParas.length;i++){
        resetParas[i].textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
    lastResult.style.backgroundColor = "white";

    let randomNumber = Math.floor(Math.random() * 100) + 1;
}