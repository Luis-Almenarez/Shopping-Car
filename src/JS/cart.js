const btnOpenCart = document.querySelectorAll('[data-accion="abrir-carrito"]');
const btnCloseCart = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const windowCart = document.getElementById("carrito");

const renderCart = () => {
  windowCart.classList.add("carrito--active");
};

//Abrir carrito
btnOpenCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    renderCart();
  });
});

//Cerrar carrito
btnCloseCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    windowCart.classList.remove("carrito--active");
  });
});
