/**
 * Función para obtener un arreglo de 5 preguntas al azar de cada categoria (nivel de dificultad) del banco de preguntas
 * @param {*} preguntas Es el arreglo de todas las preguntas disponibles
 * @returns Arreglo con la cantidad de preguntas seleccionada en la constante CANTIDAD_PREGUNTAS, una por nivel
 */
export const obtenerPreguntas = (preguntas) => {
    const CANTIDAD_PREGUNTAS = 5;
    let arregloPreguntas = [];

    if (preguntas === null) {
        return [];
    }

    for (let i = 1; i < CANTIDAD_PREGUNTAS + 1; i++) {
        let pregunta = preguntaAleatoria(filtrarArreglo(preguntas, i));
        arregloPreguntas.push(pregunta);
    }

    return arregloPreguntas;
};

/**
 * Función para seleccionar una pregunta aleatoriamente entre un set de preguntas
 * @param {*} arrPreguntas set de preguntas a elegir
 * @returns pregunta elegida aleatoriamente
 */
const preguntaAleatoria = (arrPreguntas) => {
    let indiceAleatorio = Math.floor(Math.random() * arrPreguntas.length);
    return arrPreguntas[indiceAleatorio];
};

/**
 * Función para filtrar un set de preguntas por su nivel de dificultad
 * @param {*} arr arreglo de preguntas con diferentes niveles de difucultad o categorías
 * @param {*} dificultad es el nivel de dificultado o categoria por la que se quieren filtrar las preguntas
 * @returns arreglo con preguntas del mismo nivel de dificultad o categoría
 */
const filtrarArreglo = (arr, dificultad) => {
    let arrayN = [];

    arr.forEach((pregunta) => {
        if (pregunta.dificultad == dificultad) {
            arrayN.push(pregunta);
        }
    });
    return arrayN;
};
