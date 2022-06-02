import { obtenerPreguntas } from "./objetos/pregunta.js";

export const formulario = (list) => {

  const preguntas = obtenerPreguntas(list);
 
  console.log(preguntas);

    const container = document.querySelector("#container");

    const form = document.createElement("form");

    // encabezado datos del jugador
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
    inputDocumento.id = "Documento";
    inputDocumento.value = "Ingrese su Documento";

    grupoDocumento.append(labelDocumento, inputDocumento);

    const grupoCorreo = document.createElement("div");

    const labelCorreo = document.createElement("label");
    labelCorreo.textContent = "Correo";

    const inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.id = "Correo";
    inputCorreo.value = "Ingrese su Correo";

    grupoCorreo.append(labelCorreo, inputCorreo);

    const btnEnviar = document.createElement("button");
    btnEnviar.type = "button";
    btnEnviar.textContent = "Enviar datos";

    form.append(grupoNombre, grupoDocumento, grupoCorreo, btnEnviar);

    // preguntas

    const listaPreguntas = document.createElement("div");
    listaPreguntas.className = "preguntas";

    preguntas.forEach((element) => {
        const pregunta = document.createElement("div");
        pregunta.className = "pregunta";

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
            inputOpcion.id = "input-opcion";
            inputOpcion.name = element.dificultad;
            inputOpcion.value = resp.value;

            const labelOpcion = document.createElement("label");
            labelOpcion.textContent = resp.message;

            respuesta.append(inputOpcion, labelOpcion);
            respuestas.append(respuesta);
        });       

        pregunta.appendChild(respuestas)
        listaPreguntas.append(pregunta);
    });

    form.append(listaPreguntas);

    const btnValidar = document.createElement("button");
    btnValidar.type = "button";
    btnValidar.textContent = "Validar respuesta";

    form.append(btnValidar);

    container.append(form);
};



