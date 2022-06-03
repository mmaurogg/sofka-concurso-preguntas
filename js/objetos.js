import { obtenerPreguntas } from "./objetos/pregunta.js";
import { arrPreguntas } from "./arregloPreguntas.js";
import { tablaJuegos } from "./objetos/tablaJuegos.js";

/**
 * funcion que despliega el formulario para el juego
 * @author Manuel Mauricio Gómez
 * @version 1.0.0
 */
export const formulario = () => {
    var score = 0;
    const preguntas = obtenerPreguntas(arrPreguntas);
    let resultado = {};

    console.log(preguntas);

    const container = document.querySelector("#container");

    const form = document.createElement("form");
    form.id = "form";

    // encabezado
    const encabezado = document.createElement("div");
    encabezado.className = "col";

    const puntuacion = document.createElement("div");
    encabezado.className = "card";

    const labelPuntuacion = document.createElement("label");
    labelPuntuacion.innerHTML = `<h4>Su puntuación es</h4>`;

    const labelScore = document.createElement("label");
    labelScore.id = "score";
    labelScore.className = "m-3";
    labelScore.textContent = score;

    puntuacion.append(labelPuntuacion, labelScore);

    const btnJuegos = document.createElement("button");
    btnJuegos.type = "button";
    btnJuegos.classList = "btn btn-primary mt-2 w-50";
    btnJuegos.textContent = "Revisar juegos";
    btnJuegos.addEventListener("click", () => {
        const juegos = ObtenerJuegos()
        if(juegos == null){
            alert("Aun no hay registro de juegos para mostrar")
        } else {
            container.removeChild(form);

            container.appendChild(tablaJuegos(ObtenerJuegos()));
        }
        
    });

    encabezado.appendChild(puntuacion);
    encabezado.appendChild(btnJuegos);
    form.appendChild(encabezado);

    // datos del jugador
    const jugador = document.createElement("div");
    jugador.className = "jugador";
    jugador.id = "jugador";

    const grupoNombre = document.createElement("div");
    grupoNombre.className = "";

    const labelNombre = document.createElement("label");
    labelNombre.textContent = "Nombre";
    labelNombre.className = "col-form-label";

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.className = "form-control w-50";
    inputNombre.id = "nombre";
    inputNombre.value = "Ingrese su nombre";

    grupoNombre.append(labelNombre, inputNombre);

    const grupoDocumento = document.createElement("div");

    const labelDocumento = document.createElement("label");
    labelDocumento.textContent = "Documento";
    labelDocumento.className = "col-form-label";

    const inputDocumento = document.createElement("input");
    inputDocumento.type = "text";
    inputDocumento.className = "form-control w-50";
    inputDocumento.id = "documento";
    inputDocumento.value = "Ingrese su Documento";

    grupoDocumento.append(labelDocumento, inputDocumento);

    const grupoCorreo = document.createElement("div");

    const labelCorreo = document.createElement("label");
    labelCorreo.textContent = "Correo";
    labelCorreo.className = "col-form-label";

    const inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.className = "form-control w-50";
    inputCorreo.id = "correo";
    inputCorreo.value = "Ingrese su Correo";

    grupoCorreo.append(labelCorreo, inputCorreo);

    const btnEnviar = document.createElement("button");
    btnEnviar.type = "button";
    btnEnviar.className = "btn btn-primary mt-2";
    btnEnviar.textContent = "Enviar datos";
    btnEnviar.addEventListener("click", () => {
        resultado = generarJugador();
        actualizarPuntuacion(score);
    });

    jugador.append(grupoNombre, grupoDocumento, grupoCorreo, btnEnviar);
    form.appendChild(jugador);

    // preguntas
    const listaPreguntas = document.createElement("div");
    listaPreguntas.className = "card";
    listaPreguntas.id = "preguntas";
    listaPreguntas.style.display = "none";

    for (let i = 0; i < preguntas.length; i++) {
        const element = preguntas[i];

        const pregunta = document.createElement("div");
        pregunta.className = "card w-50";
        pregunta.id = `pregunta${i + 1}`;
        if (i > 0) {
            pregunta.style.display = "none";
        }

        const labelPregunta = document.createElement("label");
        labelPregunta.innerHTML = `<h5>${element.pregunta}</h5>`;
        labelPregunta.className = "card-title";

        pregunta.appendChild(labelPregunta);

        const respuestas = document.createElement("div");
        respuestas.className = "respuestas";

        element.respuestas.forEach((resp) => {
            const respuesta = document.createElement("div");
            respuesta.className = "form-check";

            const inputOpcion = document.createElement("input");
            inputOpcion.type = "radio";
            inputOpcion.className = "form-check-input";
            inputOpcion.id = element.dificultad;
            inputOpcion.name = element.dificultad;
            inputOpcion.value = resp.value;
            inputOpcion.addEventListener("click", () => {
                resultado.respuestas.push(
                    generarResultado(element.pregunta, resp)
                );
                if (score > 3) {
                    alert("felicitaciones, ha ganado el premio mayor");
                    score++;
                    terminarJuego(resultado, score);
                } else if (!validarRespuesta(resp.value, score)) {
                    score = 0;
                    terminarJuego(resultado, score);
                    alert(
                        "oh! que mal ha perdido el juego no ha ganado premios"
                    );
                } else {
                    score++;
                    document.getElementById(`pregunta${i + 2}`).style.display =
                        "inline";
                    document.getElementById(`pregunta${i + 1}`).style.display =
                        "none";

                    actualizarPuntuacion(score);
                }
            });

            const labelOpcion = document.createElement("label");
            labelOpcion.className = "form-check-label";
            labelOpcion.textContent = resp.message;

            respuesta.append(inputOpcion, labelOpcion);
            respuestas.append(respuesta);
        });

        pregunta.append(respuestas);
        listaPreguntas.append(pregunta);
    }

    const btnTerminar = document.createElement("button");
    btnTerminar.type = "button";
    btnTerminar.className = "btn btn-danger mt-2";
    btnTerminar.id = "terminar";
    btnTerminar.textContent = "Reclamar premio";
    btnTerminar.style.display = "inline";
    btnTerminar.addEventListener("click", () => {
        terminarJuego(resultado, score);
    });

    listaPreguntas.appendChild(btnTerminar);

    form.append(listaPreguntas);

    container.append(form);
};

/**
 * Función para validar si una respuesta está buena o mala
 * @param {*} valor es el valor o peso que tiene la pregunta, si es 1 es correcta, si es cero está mala
 * @param {*} score Es el puntaje actual que tiene el jugador
 * @returns Boolean, si está buena la respuesta True si está mala False
 */
const validarRespuesta = (valor, score) => {
    let acierto = true;

    if (valor === 0) {
        alert("Respuesta incorrecta");
        acierto = false;
        return acierto;
    }

    alert("¡Respuesta correcta! su puntuación es de: " + (score + 1) + "!");

    return acierto;
};

/**
 * Función para crear la estructura del jugador, ocultar el cuadro de datos del jugador y mostrar las preguntas
 * @returns Diccionario con las keys: nombre, documento, correo y arreglo de respuesta en estado null
 */
const generarJugador = () => {
    const nombre = document.getElementById("nombre").value;
    const documento = document.getElementById("documento").value;
    const correo = document.getElementById("correo").value;

    document.getElementById("preguntas").style.display = "inline";
    document.getElementById("jugador").style.display = "none";

    return {
        nombre: nombre,
        documento: documento,
        correo: correo,
        respuestas: [],
    };
};

/**
 * Función para generar la estructura para el almacenamiento de las respuestas seleccionadas por el jugador
 * @param {*} pregunta es la pregunta a la cual se asocia la respuesta seleccionada
 * @param {*} selecion es la respuesta seleccionada por el jugador
 * @returns Diccionario que contiene los datos de la pregunta, la respuesta seleccionada por el jugador y si esta es correcta
 */
const generarResultado = (pregunta, selecion) => {
    console.log(selecion);

    return {
        pregunta: pregunta,
        respuesta: selecion.message,
        correcto: selecion.value == 1 ? true : false,
    };
};

/**
 * Función para finalizar el juego y guardar un arreglo con los datos del jugador y sus respuestas en el local storage
 * @param {*} data diccionario con el registro del juego contiene datos del jugador, respuestas
 * @param {*} score es la puntuación alcanzada por el jugador
 */
const terminarJuego = (data, score) => {
    data.score = score;

    localStorage.setItem(data.nombre, JSON.stringify(data));

    const container = document.getElementById("container");
    const form = document.getElementById("form");
    container.removeChild(form);

    alert("juego finalizado, su puntuación es " + data.score);

    formulario();
};

/**
 * Función para actualizar la puntuación en el encabezado (elemento con id score)
 * @param {*} score es la puntuación que ha alcanzado el jugador
 */
const actualizarPuntuacion = (score) => {
    document.getElementById("score").textContent = score;
};

/**
 * Funcion para traer todos los datos de los juegos realizados que están en el local storage
 * @returns Arreglo con los datos de cada juego
 */
const ObtenerJuegos = () => {
    if (localStorage.length == 0) {
        return null;
    }

    const juegos = [];

    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);

        let juego = JSON.parse(localStorage.getItem(element));

        juegos.push(juego);
    }

    return juegos;
};
