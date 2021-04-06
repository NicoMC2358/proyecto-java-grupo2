class Producto {
    constructor(codigo, nombre, precio, stock, imagen) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
}

let productos = JSON.parse(localStorage.getItem("productos")) || [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let sumaCarrito = 0;

let contadorCarrito = document.querySelector("#countCarrito");

//contenedor card-deck
let contenedor = document.querySelector("#contenedor");

//Body del modal
let cuerpoModal = document.querySelector(".modal-body");

function cantidadCarrito() {
    let sumaCantidad = 0;
    for (let i = 0; i < carrito.length; i++) {
        sumaCantidad += carrito[i].cantidad;
    }
    contadorCarrito.innerHTML = sumaCantidad;
}


function cargarCard() {
    contenedor.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
        let div = document.createElement("div");
        div.classList = "col col-md-6 col-lg";
        div.innerHTML = `
        div class="card">
              <img src="${productos[i].imagen}" class="card-img-top imgCard" alt="${productos[i].nombre}" />
              <div class="card-body">
                <h5 class="card-title">${productos[i].nombre}</h5>
                <p class="card-text">
                  Stock: ${productos[i].stock}
                </p>
              </div>
              <div class="card-footer">
              <p class="card-text">Precio: $${productos[i].precio}</p>
              <a href="#" class="btn btn-success" onclick="agregarCarrito(${productos[i].codigo})">Carrito</a>
              </div>
            </div>`;
        contenedor.appendChild(div);
    }
}