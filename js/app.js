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
  console.log("adentro de validar email")
  let expresion = /\w+@\w+\.[a-z]{2,4}$/;

  if (input.value != "" && expresion.test(input.value)) {

   input.className = "form-control is-valid";
    
    return true;
  } else {
    input.className = "form-control is-invalid";

    return false;
  }
}

function validarNumeros(input) {
  if (input.value != "" && !isNaN(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
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
        return true;
    }else{
        input.className = "form-control is-invalid";
        return false;
    }
}

//agregar eventos desde js
let checkbox = document.getElementById('checkTermino');
// checkbox.addEventListener('change', function (){
//     //esto es una funcion anonima, funciona solo aqui no la puedo llamar desde otro lugar
// })

//checkbox.addEventListener('change', validarCheck);

function validarCheck(){
    console.log(checkbox.checked)
    if(checkbox.checked){ //if(checkbox.checked == true)
        checkbox.className = 'form-check-input is-valid';
        return true;
    }else{
        checkbox.className = 'form-check-input is-invalid';
        return false;
    }
}

function validarGeneral(event){
    event.preventDefault();
    console.log('dentro de la funcion validar general' + event);
    let alerta = document.getElementById('msjEnvio');

    if(campoRequerido(document.getElementById('nombre')) &&
    validarMail(document.getElementById('email')) &&
    validarNumeros(document.getElementById('telefono')) &&
    validarCantidadCaracteres(document.getElementById('consulta')) &&
    validarCheck()){
      enviarMail();
      // alerta.className = 'alert alert-success mx-3';
      // alerta.innerHTML = 'Su consulta fue enviada correctamente'; 
    }else{
      alerta.className = 'alert alert-danger mx-3';
      alerta.innerHTML = 'Ocurrio un error, verifique los datos ingresados.'; 
    }
}

function enviarMail(){
  // envioelmail.then(funcion si todo salio bien, funcion cuando algo salio)
  emailjs.send("service_skyw81f","template_NQ91Q5cI",{
    to_name: "Administrador",
    from_name: document.getElementById('email').value,
    message_html: `Nombre y Apellido: ${document.getElementById('nombre').value} -
    Telefono: ${document.getElementById('telefono').value} -
    Consulta: ${document.getElementById('consulta').value}`,
    }).then(
      function (response){
        console.log(response);
        // agregar el alerta que todo salio bien
        alert('los datos se enviaron');
      }, function (error){
        console.log(error);
        alert('fallo el envio');
      }
    )
}