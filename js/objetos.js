import { obtenerPreguntas } from "./objetos/pregunta.js";
import { preguntas } from "./preguntas.js"

export const formulario = () => {

    let score = 1;
    const arrPreguntas = obtenerPreguntas(preguntas);
    let resultado={};

    console.log(arrPreguntas);

    const container = document.querySelector("#container");

    const form = document.createElement("form");
    form.id = "form";

    // encabezado datos del jugador
    const jugador = document.createElement("div");
    jugador.className = "jugador";
    jugador.id = "jugador";

    const grupoNombre = document.createElement("div");

    const labelNombre = document.createElement("label");
    labelNombre.textContent = "Nombre";

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.value = "Ingrese su nombre";

    grupoNombre.append(labelNombre, inputNombre);

    const grupoDocumento = document.createElement("div");

    const labelDocumento = document.createElement("label");
    labelDocumento.textContent = "Documento";

    const inputDocumento = document.createElement("input");
    inputDocumento.type = "text";
    inputDocumento.id = "documento";
    inputDocumento.value = "Ingrese su Documento";

    grupoDocumento.append(labelDocumento, inputDocumento);

    const grupoCorreo = document.createElement("div");

    const labelCorreo = document.createElement("label");
    labelCorreo.textContent = "Correo";

    const inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.id = "correo";
    inputCorreo.value = "Ingrese su Correo";

    grupoCorreo.append(labelCorreo, inputCorreo);


    const btnEnviar = document.createElement("button");
    btnEnviar.type = "button";
    btnEnviar.textContent = "Enviar datos";
    btnEnviar.addEventListener("click",() => {
        resultado = generarJugador();

        document.getElementById("preguntas").style.display = "inline";
        document.getElementById("jugador").style.display = "none";

    });

    jugador.append(grupoNombre, grupoDocumento, grupoCorreo, btnEnviar);
    form.appendChild(jugador)

    // preguntas
    const listaPreguntas = document.createElement("div");
    listaPreguntas.className = "preguntas";
    listaPreguntas.id = "preguntas";
    listaPreguntas.style.display = "none";

    for (let i = 0; i < arrPreguntas.length; i++) {
        const element = arrPreguntas[i];
        
        const pregunta = document.createElement("div");
        pregunta.className = "pregunta";
        pregunta.id = `pregunta${i+1}`;
        if(i>0){
            pregunta.style.display = "none";
        }
        
        const labelPregunta = document.createElement("label");
        labelPregunta.textContent = element.pregunta;

        pregunta.appendChild(labelPregunta);

        const respuestas = document.createElement("div");
        respuestas.className = "respuestas";

        element.respuestas.forEach((resp) => {
            const respuesta = document.createElement("div");
            respuesta.className = "respuesta";


            const inputOpcion = document.createElement("input");
            inputOpcion.type = "radio";
            inputOpcion.id = element.dificultad;
            inputOpcion.name = element.dificultad;
            inputOpcion.value = resp.value;
            inputOpcion.addEventListener("click", () => {
                resultado.respuestas.push(generarResultado( element.pregunta, resp));

                if(!validarRespuesta(resp.value,score)){
                    score = 0;
                    terminarJuego(resultado, score);
                    alert("oh! que mal ha perdido el juego no ha ganado premios");

                } else if (score > 4) {
                    alert("felicitaciones, ha ganado el premio mayor")
                    terminarJuego(resultado, score);
                } else {
                ++score;
                document.getElementById(`pregunta${i+2}`).style.display = "inline";
                document.getElementById(`pregunta${i+1}`).style.display = "none";
                
                console.log(resultado)

                }

            });

            const labelOpcion = document.createElement("label");
            labelOpcion.textContent = resp.message;

            respuesta.append(inputOpcion, labelOpcion);
            respuestas.append(respuesta);
        });

        pregunta.append(respuestas);
        listaPreguntas.append(pregunta);

    }

    const btnTerminar = document.createElement("button");
        btnTerminar.type = "button";
        btnTerminar.id = "terminar";
        btnTerminar.textContent = "Reclamar premio";
        btnTerminar.style.display = "inline"
        btnTerminar.addEventListener("click",() => {
            terminarJuego(resultado, score);
        });
        
        listaPreguntas.appendChild(btnTerminar)

    
    
    form.append(listaPreguntas);

    container.append(form);
};


const validarRespuesta = (valor, score) => {

    let acierto = true;

    if (valor === 0) {
        alert("Respuesta incorrecta");
        acierto = false;
        return acierto;
    }

    alert("¡Respuesta correcta! su puntuación es de: " + score + "!");

    return acierto;
}

const generarJugador = () => {
    const nombre = document.getElementById("nombre").value;
    const documento = document.getElementById("documento").value;
    const correo = document.getElementById("correo").value;

    return {
        nombre: nombre,
        documento: documento,
        correo: correo,
        respuestas: []
    }    

}

const generarResultado = (pregunta, selecion) => {
    console.log(selecion)

    return {
        pregunta: pregunta,
        respuesta: selecion.message,
        correcto: (selecion.value == 1)?true:false
    } 

}

const terminarJuego = (data, score) => {

    const id = new Date();
    data.id = id;
    data.score = score;

    localStorage.setItem(data.id, JSON.stringify(data));

    const container = document.getElementById("container");
    const form = document.getElementById("form");
    container.removeChild(form);

    alert("juego finalizado, su puntuación es "+ data.score)

    formulario();



}