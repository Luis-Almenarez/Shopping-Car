const btnOpenCart = document.querySelectorAll('[data-accion="abrir-carrito"]'); // Selecciona los botones de abrir el carrito por su atributo 'data-accion'.

const btnCloseCart = document.querySelectorAll('[data-accion="cerrar-carrito"]'); // Selecciona los botones de cerrar el carrito por su atributo 'data-accion'.

const windowCart = document.getElementById("carrito"); // Obtiene el elemento del carrito por su ID.

const addCart = document.getElementById("agregar-al-carrito"); // Obtiene el botón 'Add to Cart' del HTML

const product = document.getElementById("producto"); // Obtiene el contenedor de todo el producto

let cartProduct = []; // Generamos una variable la cual tendrá la cantidad de productos que el usuario agregue

// Define una función para mostrar el carrito.
const renderCart = () => {
  windowCart.classList.add("carrito--active");
  console.log(cartProduct);
};

// Abrir carrito.
btnOpenCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    renderCart(); // Muestra el carrito al hacer clic en un botón de abrir.
  });
});

// Cerrar carrito.
btnCloseCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    windowCart.classList.remove("carrito--active"); // Oculta el carrito al hacer clic en un botón de cerrar.
  });
});

// Cuando se hace clic en el botón "addCart", se recopilan los datos del producto seleccionado
// y se agregan al array "cartProduct" para mostrarlos en el carrito más tarde.
addCart.addEventListener("click", (e) => {
  let id = product.dataset.productoId; // Obtiene el ID del producto desde el atributo "data-producto-id".
  let name = product.querySelector(".producto__nombre").innerText; // Obtiene el nombre del producto.
  let quantity = parseInt(product.querySelector("#cantidad").value); // Obtiene la cantidad del producto como un número entero.
  let color = product.querySelector("#propiedad-color input:checked").value; // Obtiene el color seleccionado del producto.
  let ShippingType = product.querySelector("#propiedad-envio input:checked").value; // Obtiene el tipo de envío seleccionado para el producto.
  // Agrega los datos recopilados como un nuevo objeto al array "cartProduct".
  cartProduct.push({
    id: id,
    name: name,
    quantity: quantity,
    color: color,
    ShippingType: ShippingType,
  });
});
