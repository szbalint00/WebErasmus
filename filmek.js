// Tagek deklaralasa
const startInput = document.getElementById("playerAmount");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restartButton");

const nemValasz = document.querySelector(".wrong");
const igenValasz = document.querySelector(".right");
const filmImg = document.getElementById("film_img");
const filmCim = document.querySelector(".film_cim");
const filmDuration = document.getElementById("duration");
const filmYear = document.getElementById("year");
const filmGenre = document.getElementById("genre");
const filmDescription = document.getElementById("description");
const filmRating = document.getElementById("rating");

const kezdoLap = document.getElementById("kezdoLap");
const mainLap = document.getElementById("mainLap");
const restartLap = document.getElementById("restartLap");

const styles = document.querySelectorAll("link");

const kezdoLapStyle=styles[0];
const jatekStyle=styles[1];
const restartStyle=styles[2];

for(let i=0;i<styles.length;i++){
    styles[i].disabled=true;
}

restartLap.style.display = "none";
mainLap.style.display="none";
kezdoLap.style.display="none";

const restart = document.getElementById("restart");

// Valtozok deklaralasa
let maxi = 0;
let playerAmount = 2;
let filmlist = [];
let valaszFrek = [];
let ok;

function kezdolapVarazslo(){
    restartLap.style.display = "none";
    mainLap.style.display="none";
    kezdoLap.style.display="block";

    jatekStyle.disabled=true;
    restartStyle.disabled=true;
    kezdoLapStyle.disabled=false;
}

function jateklapVarazslo(){
    restartLap.style.display = "none";
    mainLap.style.display="block";
    kezdoLap.style.display="none";

    jatekStyle.disabled=false;
    restartStyle.disabled=true;
    kezdoLapStyle.disabled=true;
}

async function restartVarazslo(){
    restartLap.style.display = "flex";
    mainLap.style.display="none";
    kezdoLap.style.display="none";

    jatekStyle.disabled=true;
    restartStyle.disabled=false;
    kezdoLapStyle.disabled=true;

    restartButton.addEventListener("click",restartButtonClick);
    await waitForButtonClick();
}

function restartButtonClick(){}


// Beolvasas fuggveny
function beolvas() {
    return new Promise((resolve, reject) => {
        fetch('./filmek.txt')
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');

                lines.forEach(line => {
                    if (line.trim() === '') {
                        return;
                    }

                    const parts = line.split(';');

                    if (parts.length !== 7) {
                        console.error(`Invalid line: ${line}`);
                        return;
                    }

                    const [title, duration, year, genre, description, image, rating] = parts;

                    const film = {
                        title: title.trim(),
                        duration: duration.trim(),
                        year: year.trim(),
                        genre: genre.trim(),
                        description: description.trim(),
                        image: image.trim(),
                        rating: rating.trim()
                    };

                    filmlist.push(film);
                });

                console.log(filmlist);
                resolve(); // Resolve the promise once data is processed
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                reject(error); // Reject the promise if there's an error
            });
    });
}

beolvas().then(main).catch(error => {
    console.error('Error fetching data:', error);
});

async function main() {
    kezdolapVarazslo();

    await start();

    console.log("Game started!");

    // Initialize valaszFrek array
    for (let i = 0; i < filmlist.length; i++) {
        valaszFrek[i] = 0;
    }

    // Meghivja a jatekot annyiszor ahany jatekos van
    for (let i = 0; i < playerAmount; i++) {
        console.log(i);
        refresh(0);
        await jatekSession();
        if(i!==playerAmount-1)
            await restartVarazslo();
    }

    kiertekeles();
}

function jobb() {
    console.log("jobb");
    ok = true;
}

function bal() {
    // No need for additional action here
}

async function start(){
    startButton.addEventListener('click', startGame);
    await waitForButtonClick();
}

function startGame(){
    playerAmount = startInput.value;
    console.log(playerAmount);
}

async function jatekSession() {
    jateklapVarazslo();

    console.log("jatek session");
    let i = 0;

    // Register event listeners before entering the loop

    do {
        refresh(i);
        ok = false;
        igenValasz.addEventListener('click', jobb);
        nemValasz.addEventListener('click', bal);
        await waitForButtonClick();
        console.log(ok);

        if(ok===true){
            valaszFrek[i]++;
        }

        i++;
    }while (i < filmlist.length);
}

// Function to handle "jobb" button click

// Function to handle "bal" button click

// Function to wait for a button click using Promises
async function waitForButtonClick() {
    return new Promise(resolve => {
        const clickHandler = () => {
            // Remove event listeners after button click
            igenValasz.removeEventListener('click', clickHandler);
            nemValasz.removeEventListener('click', clickHandler);
            startButton.removeEventListener('click', clickHandler);
            restartButton.removeEventListener('click', clickHandler);
            resolve();
        };
        // Add click event listener to both buttons
        igenValasz.addEventListener('click', clickHandler);
        nemValasz.addEventListener('click', clickHandler);
        startButton.addEventListener('click', clickHandler);
        restartButton.addEventListener('click', clickHandler);
    });
}

function refresh(i) {
    console.log(i);
    filmImg.setAttribute('src', filmlist[i].image);
    filmCim.textContent = filmlist[i].title;
    filmYear.textContent = "Year: "+filmlist[i].year;
    filmDescription.textContent = filmlist[i].description;
    filmDuration.textContent = "Duration: "+filmlist[i].duration;
    filmGenre.textContent = "Genre: "+filmlist[i].genre;
    filmRating.textContent = "Rating: "+filmlist[i].rating;
}

function kiertekeles() {
    console.log("vege");
    maxi = 0;
    let maxiIndex = 0;
    for (let i = 0; i < filmlist.length; i++) {
        if (maxi < valaszFrek[i]) {
            maxi = valaszFrek[i];
            maxiIndex = i;
        }
    }
    console.log(filmlist[maxiIndex].title);
}