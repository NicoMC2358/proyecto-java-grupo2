class Producto {
    constructor(codigo, nombre, precio, stock, imagen) {
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    }
}

// Crear el arreglo para los productos
let productos = JSON.parse(localStorage.getItem(`productos`)) || [];

// // Crear el arreglo para el carrito
// let carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];

// // Variable que suma los precios del carrito
// let sumaCarrito = 0;

// // Contenedor del badge de carrito
// let contadorCarrito = document.querySelector("#contadorCarrito");

// // Contenedor card-deck
// let contenedor = document.querySelector("#cardsContenedor");

// //Body del Modal
// let cuerpoModal = document.querySelector(".modal-body");

function addProducto() {
    let veces = parseInt(prompt("¿Cuantos productos va a ingresar?"));

    if (isNaN(veces) || veces <= 0) {
        console.error("Debe ingresar un número mayor que cero");
        return;
    }

    for (let i = 0; i < veces; i++) {
        let codigo = i + 1;
        let nombre = prompt(`Ingrese el nombre del producto #${i + 1}`);

        if (nombre === "" || nombre === null) {
            console.error("Faltaron datos o se canceló");
            return;
        } else {
            let precio = parseFloat(prompt("Ingrese el precio del producto"));

            if (isNaN(veces) || veces <= 0) {
                console.error("No se ingresó un número o se canceló");
                return;
            } else {
                let stock = parseFloat(prompt("Ingrese el stock del producto"));

                if (isNaN(veces) || veces <= 0) {
                    console.error("No se ingresó un número o se canceló");
                    return;
                } else {
                    let imagen = (prompt("Ingrese el link de la imagen del producto"));

                    if (imagen === "" || nombre === null) {
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
}