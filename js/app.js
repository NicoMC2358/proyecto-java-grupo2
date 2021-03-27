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
    event.preventDefault(); //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo. basicamente no me permite actualizar la pantalla 
    console.log('dentro de la funcion validar general' + event);
   
    let div= document.createElement("div");
    div.innerHTML="";

    if(campoRequerido(document.getElementById('nombre')) &&
    validarMail(document.getElementById('email')) &&
    validarNumeros(document.getElementById('telefono')) &&
    validarCantidadCaracteres(document.getElementById('consulta')) &&
    validarCheck()){
     
      div.innerHTML=`<div class="alert alert-success" role="alert" id="msjEnvio">
     Los datos se enviaron correctamente
    </div>`;
    }else{

      div.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `;
    }
    formulario.appendChild(div);

}

