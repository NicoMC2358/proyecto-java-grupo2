class Usuario {
    constructor(id, email, password, activo = true) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.activo = activo;
    }
  }

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuario = {};

localStorage.setItem('usuario', JSON.stringify(usuario)); // cada vez que se inicie el login, si habia algo en la pantalla del login el usuario desaparece, lo creo de vuelta 
let admin = new Usuario (9999,"ritmolatinogim@gmail.com","ritmolatino123");
usuarios.push(admin);

let admin1 = new Usuario (7999,"gabegarcia916@gmail.com","ritmolatino123");
usuarios.push(admin1);


localStorage.setItem("usuarios",JSON.stringify(usuarios));

//-----------------------------
let formulario = document.querySelector("#btnSubmit");
//queremos evitar que se refresque el submit

formulario.addEventListener('submit', function (event) {
    event.preventDefault(); //me detiene el refresco del submit
    let id = idRandom();
    let usuario = document.querySelector('#user').value;
    let nombre = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    
    let password = document.querySelector('#password').value;

    let validar = usuarios.find(function(user){

        return user.email===email
    });
    if(validar!==undefined){
        alert('usuario existente');

        document.querySelector('#btnSubmit').reset()
        document.querySelector('#name').focus();

        return;
    }
    let newUser = new Usuario(id,usuario,nombre,email,password);
    console.log(newUser);

    usuarios.push(newUser);
    localStorage.setItem('usuarios',JSON.stringify(usuarios));
    
    document.querySelector('#btnSubmit').reset();
    
    alert('se creo nuevo usuario');

})