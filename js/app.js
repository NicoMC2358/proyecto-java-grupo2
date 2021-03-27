function campoRequerido(elemento) {
    console.log("en la funcion campo requerido");
    //   let elemento = document.querySelector('#nombre');
    if (elemento.value === "") {
      elemento.className = "form-control is-invalid";
      return false;
    } else {
      elemento.className = "form-control is-valid";
      return true;
    }
  }
  
  function validarMail(input) {
    //emilse@gmail.com
    let expresion = /\w+@\w+\.[a-z]{2,4}$/;
    if (input.value != "" && expresion.test(input.value)) {
      input.className = "form-control is-valid";
    } else {
      input.className = "form-control is-invalid";
    }
  }
  
  function validarNumeros(input) {
    if (input.value != "" && !isNaN(input.value)) {
      input.className = "form-control is-valid";
    } else {
      input.className = "form-control is-invalid";
    }
  
    /*esto NO es un numero isNaN(---)
      isNaN('hola') el resultado es true
      isNaN(12334) el resultado es false
  
      ! operador Not (negacion)
      !true -> false
      !false -> true
      */
  }
  
  function validarCantidadCaracteres(input){
      if(input.value != '' && input.value.length >= 10){
          input.className = 'form-control is-valid';
      }else{
          input.className = "form-control is-invalid";
      }
  }
  
  //agregar eventos desde js
  let checkbox = document.getElementById('checkTermino');
  // checkbox.addEventListener('change', function (){
  //     //esto es una funcion anonima, funciona solo aqui no la puedo llamar desde otro lugar
  // })
  
  checkbox.addEventListener('change', validarCheck);
  
  function validarCheck(){
      console.log(checkbox.checked)
      if(checkbox.checked){ //if(checkbox.checked == true)
          checkbox.className = 'form-check-input is-valid';
      }else{
          checkbox.className = 'form-check-input is-invalid';
      }
  }
  
  function validarGeneral(event){
      event.preventDefault();
      console.log('dentro de la funcion validar general' + event);
  
      // if(campoRequerido(document.getElementById('nombre')))
  }
  
  