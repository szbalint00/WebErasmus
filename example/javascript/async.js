const name="Balint";

function createSalut(name){
    return `Hola, mi name es ${name}`;
}

const saludo=createSalut(name);

console.log("kezdes");
setTimeout(function(){
    console.log(saludo);
},5000);
console.log("vege");