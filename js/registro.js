class Usuario {
    constructor(id, email, password, activo = true) {
        this.id = id;
        this.email = email;
        this.activo = activo;
    }
}
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
//Creamos una funcion que nos permita generar un ID automatico-----------------------------
function idRandom() {

    if (usuarios.length > 0) {
        return usuarios[usuarios.length - 1].id + Math.round(Math.random() * 100);
        //tambien puedo usar el new Date().getTime() para generar un numero random
    } else {
        return Math.round(Math.random() * 100);
    }
}

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