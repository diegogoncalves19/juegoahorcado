let palabra = "hola";
let tamaño = palabra.length;
let intento = false;
letrasIntentadas = [];
let intentos = 6;
console.log(intentos);

intentoPalabra = "a";
tamañoIntentoPalabra = intentoPalabra.length;
let incluye = palabra.includes(intentoPalabra);

if (tamañoIntentoPalabra == 1){
    if(letrasIntentadas.includes(intentoPalabra) == true){
        console.log("Ya adivinaste esta letra.");
    }
    else if(incluye == false){
        console.log(intentoPalabra + "no está en la palabra.");
        intentos - 1;
        letrasIntentadas.push(intentoPalabra);
    }
    else{
        console.log(intentoPalabra + " si está en la palabra!");
        letrasIntentadas.push(intentoPalabra);
        let letrascorrectas = 0;

        for(let i = 0; i < palabra.length; i++){
            if(letrasIntentadas.includes(palabra.charAt(i))){
                console.log(palabra.charAt(i));
                letrascorrectas + 1;
            }
            else{
                console.log("_");
            }
        }

        if(letrascorrectas == tamaño){
            intento = true;
        }
    }
}else{
    console.log("Por favor poner una letra.");
}

console.log(intentos);

if(intento == true){
    console.log("Felicidades! Adivinaste la palabra!");
}
else{
    console.log("Perdón. La palabra era " + palabra + ".");
}