import productsData from "./Data/products.json";
// Selecciona los botones de abrir el carrito por su atributo 'data-accion'.
const btnOpenCart = document.querySelectorAll('[data-accion="abrir-carrito"]');
// Selecciona los botones de cerrar el carrito por su atributo 'data-accion'.
const btnCloseCart = document.querySelectorAll('[data-accion="cerrar-carrito"]');
// Obtiene el elemento del carrito por su ID.
const windowCart = document.getElementById("carrito");
// Obtiene el botón 'Add to Cart' del HTML
const addCart = document.getElementById("agregar-al-carrito");
// Obtiene el contenedor de todo el producto
const product = document.getElementById("producto");
// Generamos una variable la cual tendrá la cantidad de productos que el usuario agregue
let cartProduct = [];

// Función para renderizar el contenido del carrito y mostrarlo al usuario.
const renderCart = () => {
  // Agrega la clase "carrito--active" para mostrar la ventana del carrito.
  windowCart.classList.add("carrito--active");

  // Eliminamos los productos que hay contenidos en el carrito para que no los duplique si se vuelve a abrir
  const productsInCart = windowCart.querySelectorAll(".carrito__producto");
  productsInCart.forEach((product) => product.remove());

  //Si no existen productos en el carrito agregamos la clase 'carrito--vacio' de lo contrario mostramos los productos que en él hay.
  if (cartProduct.length < 1) {
    windowCart.classList.add("carrito--vacio");
  } else {
    //En caso de que haya un producto eliminamos la clase 'carrito--vacio' y mostramos lo que haya dentro
    windowCart.classList.remove("carrito--vacio");
    // Itera a través de cada producto en el array "cartProduct".
    cartProduct.forEach((cartProduct) => {
      /* Se obtiene el precio del archivo products.js
     siempre y cuando el id del item coincide con el que está en products.js */
      productsData.products.forEach((productDataBase) => {
        if (productDataBase.id === cartProduct.id) {
          cartProduct.price = productDataBase.price;
        }
      });

      // Establece la ruta de la imagen que se quiere mostrar dependiendo de la decisión del usuario
      let thumbSrc = product.querySelectorAll(".producto__thumb-img")[0].src;
      if (cartProduct.color === "silver") {
        thumbSrc = "./img/thumbs/silver/silver.jpg";
      } else if (cartProduct.color === "blue") {
        thumbSrc = "./img/thumbs/blue/blue.jpg";
      } else if (cartProduct.color === "black") {
        thumbSrc = "./img/thumbs/black/black.jpg";
      }
      // Genera una plantilla HTML para representar el producto en el carrito.
      let templateProduct = `
      <div class="carrito__producto-info">
        <img src="${thumbSrc}" alt="" class="carrito__thumb" />
        <div>
          <p class="carrito__producto-nombre">
            <span class="carrito__producto-cantidad">${cartProduct.quantity} x </span>${cartProduct.name}
          </p>
          <p class="carrito__producto-propiedades">
            Shipping Type:<span>${cartProduct.ShippingType}</span> Color:<span>${cartProduct.color}</span>
          </p>
        </div>
      </div>
      <div class="carrito__producto-contenedor-precio">
        <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
          <i class="bi bi-x"></i>
        </button>
        <p class="carrito__producto-precio">$${cartProduct.price * cartProduct.quantity}</p>
      </div>
    `;

      // Crea un nuevo elemento div para el producto en el carrito.
      let itemCart = document.createElement("div");

      // Agrega la clase "carrito__producto" al elemento div creado.
      itemCart.classList.add("carrito__producto");

      // Asigna la plantilla HTML como contenido del elemento div.
      itemCart.innerHTML = templateProduct;

      // Agrega el elemento del producto al cuerpo del carrito.
      windowCart.querySelector(".carrito__body").appendChild(itemCart);
    });
  }
};

// Carga los productos del carrito desde localStorage si existen
const storedCartProduct = localStorage.getItem("cartProduct");
if (storedCartProduct) {
  cartProduct = JSON.parse(storedCartProduct);
  if (cartProduct.length >= 1) {
    renderCart(); // Actualiza el carrito para mostrar los productos recuperados
  }
}

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

  if (cartProduct.length > 0) {
    let productInCart = false;
    cartProduct.forEach((item) => {
      if (item.id === id && item.name === name && item.color === color && item.ShippingType === ShippingType) {
        item.quantity += quantity;
        productInCart = true;
      }
    });
    if (!productInCart) {
      // Agrega los datos recopilados como un nuevo objeto al array "cartProduct".
      cartProduct.push({
        id: id,
        name: name,
        quantity: quantity,
        color: color,
        ShippingType: ShippingType,
      });
    }
  } else {
    // Agrega los datos recopilados como un nuevo objeto al array "cartProduct".
    cartProduct.push({
      id: id,
      name: name,
      quantity: quantity,
      color: color,
      ShippingType: ShippingType,
    });
  }

  // Guarda cartProduct en localStorage
  localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
});

/*Esta función gestiona los eventos de clic en el carrito de compras.
  Permite eliminar productos del carrito haciendo clic en el botón de eliminar. */
windowCart.addEventListener("click", (e) => {
  if (e.target.closest("button")?.dataset.accion === "eliminar-item-carrito") {
    // Obtiene el elemento del producto que se va a eliminar.
    let myProduct = e.target.closest(".carrito__producto");
    // Encuentra el índice del producto en el carrito.
    let productIndex = [...windowCart.querySelectorAll(".carrito__producto")].indexOf(myProduct);

    // Filtra el producto eliminado del array 'cartProduct'.
    cartProduct = cartProduct.filter((item, index) => {
      if (index !== productIndex) {
        return item;
      }
    });

    // Actualiza el localStorage para reflejar los cambios.
    localStorage.setItem("cartProduct", JSON.stringify(cartProduct));

    // Vuelve a renderizar el carrito para reflejar los cambios.
    renderCart();
  }
});
