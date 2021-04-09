class Producto {
    constructor(codigo, nombre, categoria, precio, stock, imagen) {
        this.codigo = codigo
        this.nombre = nombre
        this.categoria = categoria
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
//Contador del badge de carrito
let contadorCarrito = document.querySelector("#contadorCarrito");
//Contenedores de las Cards de los Productos
let contenedor = document.querySelector("#ropaContenedor");
let contenedor1 = document.querySelector("#muscleContenedor");
let contenedor2 = document.querySelector("#suplementosContenedor");
//Body del modal
let cuerpoModal = document.querySelector(".modal-body");

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
            let categoria = prompt(`Ingrese la categoria del producto (Ropa Deportiva, Fitness y Musculacion o Suplementos y Shakers)`);

            if (categoria === "" || categoria === null || !isNaN(categoria)) {
                console.error("No se ingreso el dato o se puso un número en la categoria");
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
                            new Producto(codigo, nombre.toUpperCase(), categoria.toLocaleLowerCase(), precio, stock, imagen)
                        );
                    }
                }
            }
        }
    }
    localStorage.setItem('productos', JSON.stringify(productos))
    cargarCard()
}

function cantidadCarrito() {
    let sumaCantidad = 0;

    for (let i = 0; i < carrito.length; i++) {
        sumaCantidad += carrito[i].cantidad;
    }
    contadorCarrito.innerHTML = sumaCantidad;
}

function cargarCard() {
    contenedor.innerHTML = "";
    contenedor1.innerHTML = "";
    contenedor2.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
        let div = document.createElement("div");
        div.classList = "col-12 col-md-6 col-lg-4 test";
        div.innerHTML = `
        <div class="card border-secondary mb-3">
            <img src="${productos[i].imagen}" class="card-img-top-miguel imgCard" alt="${productos[i].nombre}" />
            <div class="card-body">
                <h4 class="card-title">${productos[i].nombre}</h4>
                <hr>
                <p class="card-categoria">${productos[i].categoria}</p>
                <p class="card-text">Stock: ${productos[i].stock}</p>
            </div>
            <div class="card-footer text-center">
                <p class="card-text">Precio: $${productos[i].precio}</p>
                <a href="#" class="btn btn-success" onclick="agregarCarrito(${productos[i].codigo})">Carrito</a>
            </div>
        </div>
        `;
        switch (productos[i].categoria) {
            case "ropa deportiva":
                contenedor.appendChild(div);
                break;
            case "fitness y musculacion":
                contenedor1.appendChild(div);
                break;
            case "suplementos y shakers":
                contenedor2.appendChild(div);
                break;
        }
    }
}

function agregarCarrito(codigo) {
    let indexProd = productos.findIndex(function (prod) {
        return prod.codigo === codigo;
    });

    if (productos[indexProd].stock >= 1) {
        productos[indexProd].stock -= 1;

        let indexCar = carrito.findIndex(function (prod) {
            return prod.id === codigo;
        });

        if (indexCar >= 0) {
            carrito[indexCar].cantidad += 1;
            carrito[indexCar].precio += carrito[indexCar].precio;
        } else {
            carrito.push({
                id: productos[indexProd].codigo,
                nombre: productos[indexProd].nombre,
                categoria: productos[indexProd].categoria,
                precio: productos[indexProd].precio,
                imagen: productos[indexProd].imagen,
                cantidad: 1,
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("productos", JSON.stringify(productos));
        cantidadCarrito();
        cargarCard();
    } else {
        alert("No hay stock disponible para este producto");
    }
}

function cargarModal() {
    cuerpoModal.innerHTML = "";

    let suma = document.querySelector("#totalCarrito");
    sumaCarrito = 0;

    if (carrito.length === 0) {
        cuerpoModal.innerHTML = "<h4>No hay productos en el carrito</h4>";
        sumaCarrito = 0;
        suma.innerHTML = `<b>${sumaCarrito}</b>`;
        return;
    }

    carrito.forEach(function (prod) {
        let div = document.createElement("div");
        div.classList = "card mb-3";
        let detalle = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img class="imagenCarritoMiguel" src="${prod.imagen}" alt="${prod.nombre}">
                </div>
            <div class="col-md-8">
                <div class="card-body">
                <h4 class="card-title">${prod.cantidad} ${prod.nombre}</h4>
                <hr>
                <p class="card-categoria">${prod.categoria}</p>
                <p class="card-text">Precio: $${prod.precio}</p>
                <a href="#" class="btn btn-danger" onclick="eliminarProdCarrito(${prod.id})">Eliminar</a>
                </div>
            </div>
        </div>
    `;
        div.innerHTML = detalle;
        cuerpoModal.appendChild(div);
        sumaCarrito += prod.precio;
    });

    suma.innerHTML = `<b>$${sumaCarrito}</b>`;
}

function verCarrito() {
    cargarModal();
    $("#modalCarrito").modal("show");
}

function eliminarProdCarrito(id) {
    let index = carrito.findIndex(function (prod) {
        return prod.id === id;
    });

    let cantidad = carrito[index].cantidad;

    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    let indexProd = productos.findIndex(function (prod) {
        return prod.codigo === id;
    });

    productos[indexProd].stock += cantidad;
    localStorage.setItem("productos", JSON.stringify(productos));

    cargarCard();
    cargarModal();
    cantidadCarrito();
}

cargarCard();
cantidadCarrito();