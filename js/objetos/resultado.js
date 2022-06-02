

  export const validar = ( valor ) => {

    let acierto = false; 
  
      console.log(valor);
      if (valor.value == 1 ){
  
        alert("¡Respuesta correcta! su premio es de: " + this.premio),
        
        acierto = true
        this.score = this.score + 1;
        if (this.score == 5){
          alert("¡¡Felicitaciones!! ¡ha ganado el premio mayor!");
          this.guardar();
        }
  
        let resp = {
          respuesta: this.forma.value.respuesta1.message,
          pregunta: this.preguntas[0].pregunta,
          acierto: true,
          score: this.score,
        }
        
        this.premio += this.score*150;
  
      } else {
        console.log("respuesta incorrecta")
        alert("Respuesta incorrecta"),
        acierto = false
        this.guardar()
      }
  
  
      return acierto;
  
    }