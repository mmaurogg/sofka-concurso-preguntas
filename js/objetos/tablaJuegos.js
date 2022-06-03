import { formulario } from "../objetos.js";

/**
 * Función que despliega una tabla con la información de un array parado como parámetro
 * @param {*} arr es el arreglo que se quiere tabular
 * @returns un objeto DOM de una tabla del arreglo entregado
 */
export const tablaJuegos = (arr) => {
    const container = document.querySelector("#container");

    const table = document.createElement("table");
    const trCabecera = document.createElement("tr");

    const thNombre = document.createElement("th");
    thNombre.innerText = "Nombre";
    thNombre.id = "thNombre";

    const thDocumento = document.createElement("th");
    thDocumento.innerText = "Documento";
    thDocumento.id = "thDocumento";

    const thCorreo = document.createElement("th");
    thCorreo.innerText = "Correo";
    thCorreo.id = "thCorreo";

    const thPuntaje = document.createElement("th");
    thPuntaje.innerText = "Puntaje";
    thPuntaje.id = "thPuntaje";

    trCabecera.append(thNombre, thDocumento, thCorreo, thPuntaje);
    table.append(trCabecera);

    table.appendChild(llenarTabla(arr));

    const btnRegresar = document.createElement("button");
    btnRegresar.type = "button";
    btnRegresar.classList = "btn btn-primary mt-2 w-50";
    btnRegresar.textContent = "Regresar";
    btnRegresar.addEventListener("click", () => {
        container.removeChild(table);
        formulario();
    });

    table.appendChild(btnRegresar);

    return table;
};

/**
 * Función para llenar el body de la tabla con la informacón pasada como parámetro
 * @param {*} arr es el arreglo que se quiere tabular
 * @returns un objeto DOM del body de la tabla con la información del arreglo entregado
 */
const llenarTabla = (arr) => {
    const bodyTable = document.createElement("tbody");
    arr.forEach((element) => {
        const fila = document.createElement("tr");

        const tdBodyNombre = document.createElement("td");
        tdBodyNombre.innerText = element.nombre;

        const tdBodyDocumento = document.createElement("td");
        tdBodyDocumento.innerText = element.documento;

        const tdBodyCorreo = document.createElement("td");
        tdBodyCorreo.innerText = element.correo;

        const tdBodyPuntaje = document.createElement("td");
        tdBodyPuntaje.innerText = element.score;

        fila.append(tdBodyNombre, tdBodyDocumento, tdBodyCorreo, tdBodyPuntaje);

        bodyTable.append(fila);
    });

    return bodyTable;
};
