//letrehoz egy paragrafust a dokumentum vegere, amikor megnyomjuk a gombot
function crearParrafo(){
    let para = document.createElement("p");
    para.textContent = "Has pulsado el boton";
    document.body.appendChild(para);
}


/* megkeresi, hogy hany gomb van a dokumentumban*/
const buttons = document.querySelectorAll("button");

for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", crearParrafo);
}

// egysoros komment

/* 
    tobb
    soros
    komment
*/
