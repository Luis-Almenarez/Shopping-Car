const product = document.getElementById("producto");
const productImage = document.querySelector(".producto__imagen");
const thumbs = document.querySelector(".producto__thumbs");
/* COLOR */
const colorSelected = product.querySelector("#propiedad-color");

// Agrega un evento de clic al elemento 'thumbs' (las miniaturas de imágenes del producto).
thumbs.addEventListener("click", (e) => {
  // Verifica si el objetivo del evento de clic es una etiqueta 'IMG'.
  if (e.target.tagName === "IMG") {
    // Obtiene la fuente (src) de la imagen que se hizo clic.
    const imageSrc = e.target.src;

    // Encuentra la última barra diagonal en la ruta de la imagen.
    const lastIndex = imageSrc.lastIndexOf("/");

    // Extrae el nombre de la imagen a partir de la ruta completa.
    const nameImage = imageSrc.substring(lastIndex + 1);

    // Actualiza la fuente de la imagen principal del producto con la nueva imagen seleccionada.
    productImage.src = `./img/products/${nameImage}`;
  }
});

colorSelected.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    const color = e.target.value;
    productImage.src = `./img/products/${color}.jpg`;

    // Cambia las rutas de las miniaturas según el color seleccionado
    const thumbnails = document.querySelectorAll(".producto__thumb-img");
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.src = `./img/thumbs/${color}/${color}${index + 1}.jpg`;
    });
  }
});
