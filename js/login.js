class Usuario {
    constructor(id, email, password, activo = true) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.activo = activo;
    }
  }


let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuario = {};// es un objeto vacio
localStorage.setItem('usuario', JSON.stringify(usuario)); // cada vez que se inicie el login, si habia algo en la pantalla del login el usuario desaparece, lo creo de vuelta 
let admin = new Usuario (9999,"ritmolatinogim@gmail.com","ritmolatino123");
usuarios.push(admin);
localStorage.setItem("usuarios",JSON.stringify(admin));

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


function validar() {
    console.log('en funcion validar');
    let inputEmail = document.querySelector("#email");
    let inputPassword = document.querySelector("#password");

    //en usuarios traemos todos los usuarios
    let user = usuarios.find(function (user) {
        return user.email === inputEmail.value;
    });

    // aca va a retornar el usuario que escribi, si no lo encuentra manda un undefined
    if (user !== undefined) {

        if (user.password === inputPassword.value) {
            alert('Estas logueado');
            if (user.id === "9999") {
                location.href = "productos.html";
            } else {
                location.href = "main.html";
            }

            usuario = {
                id: user.id,
                email: user.email
            }
            localStorage.setItem('usuario', JSON.stringify(usuario));
            location.href = 'productos.html';
        } else {
            alert('Usuario o contrania incorrecta ')
        }
    } else {
        alert('Usuario o contrania incorrecta ')
    }
    document.querySelector('#btnSubmit').reset();
}

document.querySelector("#btnSubmit").addEventListener("submit", function (event) {
    event.preventDefault();
    validar();
});
