export const obtenerPreguntas = (preguntas) => {

    const CANTIDAD_PREGUNTAS = 5;
    let arregloPreguntas = [];

    if(preguntas === null){
        return [];
    }

    for (let i = 1; i < CANTIDAD_PREGUNTAS+1; i++) {
        let pregunta = preguntaAleatoria(filtrarArreglo(preguntas, i));
        arregloPreguntas.push(pregunta)
    }

    return arregloPreguntas;
}

const preguntaAleatoria = (arrPreguntas) => {
    let indiceAleatorio = Math.floor(Math.random()*(arrPreguntas.length));
    return arrPreguntas[indiceAleatorio];
}

const filtrarArreglo = (arr, dificultad) => {

    let arrayN = [];

    arr.forEach((pregunta) => {
        if (pregunta.dificultad == dificultad) {
            arrayN.push(pregunta);
        }
    });
    return arrayN

    
}