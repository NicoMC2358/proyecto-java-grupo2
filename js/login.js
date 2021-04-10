// class Usuario {
//     constructor(id, email, password, activo = true) {
//       this.id = id;
//       this.email = email;
//       this.password = password;
//       this.activo = activo;
//     }
//   }

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuario = {};
// let usuarioLogueado={};
localStorage.setItem('usuario', JSON.stringify(usuario)); // cada vez que se inicie el login, si habia algo en la pantalla del login el usuario desaparece, lo creo de vuelta 
// let admin = new Usuario (9999,"ritmolatinogim@gmail.com","ritmolatino123");
// usuarios.push(admin);

// let admin1 = new Usuario (7999,"gabegarcia916@gmail.com","ritmolatino123");
// usuarios.push(admin1);


localStorage.setItem("usuarios",JSON.stringify(usuarios));


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
  //  console.log('en funcion validar');
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
                location.href = "index.html";
            } else {
                location.href = "index.html";
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





/* ================================================= */
/* =============Recuperar contrasenia============= */
/* ================================================= */
function randomPassword(){
    return new Date().getTime()
}
let formularioRecu = document.querySelector('#recuperarSubmit');

formularioRecu.addEventListener("submit",function(event){
    event.preventDefault;
    console.log("adentro de recuperar submit");
  
    let email=document.querySelector("#mailRecu").value;

    let validar = usuarios.find(function(user){
        return user.email===email;
    });
    let index = usuarios.findIndex(function(user){
        return user.email===email;
    });
    console.log("validar", validar);
    
    if(validar!== undefined){
        console.log("encontro un usuario con ese mail");
        let newPassword=randomPassword();
        let emailOG = usuarios[index].email;
        let idOG=usuarios[index].id;
        // que hago con el activo?
        usuarios.splice(index,2);
        usuarios.push({
            id: idOG,
            email: emailOG,
            password: newPassword,
            activo: true
        });
        console.log(usuarios);
        debugger;
        let mensaje = ['Querido socio','telefono',emailOG,`su nueva contraseña es ${newPassword}`];
       //enviarMailRecuperacionPassword(mensaje);
        localStorage.setItem("usuarios",JSON.stringify(usuarios));

        
    } else {
        console.log("No se encontro ningun usuario con ese mail");


    }
})

 // ===============Email JS===================== 
  
 function enviarMailRecuperacionPassword(array){

     console.log("Entro a mail recuperacion");
     //debugger;
    console.log(array);
  var templateParamsConsulta = {
    from_name:'RITMO LATINO',
      user_name: array[0],
      destinatario: array[2],
      message: array[3]
  };
  
    emailjs.send('service_pru7jpa', 'template_ojqof6y', templateParamsConsulta)
      .then(function(response) {
          debugger;
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
    }