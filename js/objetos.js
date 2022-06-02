export const formulario = () =>{
    const container = selectorTag("#container");

    const formulario = crearTag()

}


let selectorTag = (select) => {
    return document.querySelector(select);
  };
  
  let crearTag = (tag) => {
    return document.createElement(tag)
  };