let carrito = [];

// Función para agregar producto al carrito o incrementar la cantidad si ya existe
function agregarAlCarrito(evento, precio) {
  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.evento === evento);

  if (productoExistente) {
    // Si ya está en el carrito, incrementar la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si no está, agregar como nuevo producto
    carrito.push({ evento, precio: parseFloat(precio), cantidad: 1 });
  }

  actualizarCarrito();
}

// Función para eliminar una unidad de un producto del carrito
function eliminarDelCarrito(evento) {
  // Buscar el producto en el carrito
  const producto = carrito.find(item => item.evento === evento);

  if (producto) {
    // Si la cantidad es mayor a 1, reducir en 1
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
    } else {
      // Si solo hay una unidad, eliminar el producto del carrito
      carrito = carrito.filter(item => item.evento !== evento);
    }
  }

  actualizarCarrito();
}

// Función para actualizar el contenido del carrito y el precio total
function actualizarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  carritoLista.innerHTML = ""; // Limpiar la lista del carrito

  let total = 0;

  // Crear un elemento de lista para cada producto en el carrito
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    // Calcular el subtotal para este producto
    const subtotal = item.precio * item.cantidad;
    total += subtotal; // Sumar al total

    // Texto de la línea del carrito
    li.textContent = `${item.evento} - $${item.precio} x ${item.cantidad} = $${subtotal.toFixed(2)}`;

    // Botón para eliminar una unidad del producto
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Remove";
    btnEliminar.classList.add("btn", "btn-sm", "btn-danger", "ms-2");
    btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.evento));

    li.appendChild(btnEliminar); // Agregar el botón a la línea del carrito
    carritoLista.appendChild(li); // Agregar la línea al carrito
  });

  // Mostrar el total del carrito
  document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
}

// Función para mostrar una notificación elegante al agregar al carrito
function mostrarNotificacion(mensaje) {
  const notificacion = document.getElementById("notification");
  notificacion.textContent = mensaje; // Cambia el mensaje de la notificación
  notificacion.classList.add("visible"); // Muestra la notificación
  notificacion.classList.remove("hidden");

  // Oculta la notificación después de 3 segundos
  setTimeout(() => {
    notificacion.classList.remove("visible");
    notificacion.classList.add("hidden");
  }, 3000);
}

// Event listener para los botones "Add to Cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const evento = button.getAttribute('data-event');
    const precio = button.getAttribute('data-price');
    agregarAlCarrito(evento, precio);
    mostrarNotificacion(`¡${evento} ha sido agregado al carrito!`); // Muestra la notificación
  });
});

// Script para el botón de Checkout
document.getElementById('checkout-button').addEventListener('click', function() {
  // Verifica si el carrito tiene elementos
  if (carrito.length > 0) {
    // Vacía el carrito
    carrito = []; 
    actualizarCarrito(); // Actualiza la visualización del carrito

    // Mostrar el modal de agradecimiento
    var thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
    thankYouModal.show();
  } else {
    // Mostrar el modal de carrito vacío
    var emptyCartModal = new bootstrap.Modal(document.getElementById('emptyCartModal'));
    emptyCartModal.show();
  }
});
