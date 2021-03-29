class Producto {
    constructor(codigo, nombre, precio, stock, imagen) {
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    }
}

//Crear arreglo de productos
let productos = JSON.parse(localStorage.getItem("productos")) || [];

//Crear arreglo para el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Variable que suma los precios del carrito
let sumaCarrito = 0;

// //Contador del badge de carrito
// let contadorCarrito = document.querySelector("#countCarrito");

//Contenedor card-deck
let contenedor = document.querySelector("#cardsContenedor");

// //Body del modal
// let cuerpoModal = document.querySelector(".modal-body");

function agregarProducto() {
    let veces = parseInt(prompt("¿Cuantos productos va a ingresar?"));

    if (isNaN(veces) || veces <= 0) {
        console.error("Debe ingresar un número y que este sea mayor que cero");
        return;
    }

    for (let i = 0; i < veces; i++) {
        let codigo = i + 1;
        let nombre = prompt(`Ingrese el nombre del producto #${i + 1}`);

        if (nombre === "" || nombre === null || !isNaN(nombre)) {
            console.error("No se ingreso el dato o se puso un número en el nombre");
            return;
        } else {
            let precio = parseFloat(prompt("Ingrese el precio del producto"));

            if (isNaN(precio) || precio <= 0) {
                console.error("No se ingresó un número o se canceló");
                return;
            } else {
                let stock = parseFloat(prompt("Ingrese el stock del producto"));

                if (isNaN(stock) || stock <= 0) {
                    console.error("No se ingresó un número o se canceló");
                    return;
                } else {
                    let imagen = (prompt("Ingrese el link de la imagen del producto"));

                    if (imagen === "" || imagen === null) {
                        console.error("No se ingresó el dato o se canceló");
                        return;
                    }

                    productos.push(
                        new Producto(codigo, nombre.toUpperCase(), precio.toFixed(2), stock, imagen)
                    );
                }
            }
        }
    }
    localStorage.setItem('productos', JSON.stringify(productos))
    cargarCard()
}

function cargarCard() {
    contenedor.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
        let div = document.createElement("div");
        div.classList = "col col-md-6 col-lg";
        div.innerHTML = `
        <div class="card border-secondary mb-3">
            <img src="${productos[i].imagen}" class="card-img-top-miguel imgCard" alt="${productos[i].nombre}" />
            <div class="card-body">
                <h5 class="card-title">${productos[i].nombre}</h5>
                <p class="card-text">Stock: ${productos[i].stock}</p>
            </div>
            <div class="card-footer text-center">
                <p class="card-text">Precio: $${productos[i].precio}</p>
                <a href="#" class="btn btn-success" onclick="agregarCarrito(${productos[i].codigo})">Carrito</a>
            </div>
        </div>
        `;
        contenedor.appendChild(div);
    }
}