let carrito = [];

// Función para agregar producto al carrito o incrementar la cantidad si ya existe
function agregarAlCarrito(evento, precio) {
  const productoExistente = carrito.find(item => item.evento === evento);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ evento, precio: parseFloat(precio), cantidad: 1 });
  }
  actualizarCarrito();
}

// Función para eliminar una unidad de un producto del carrito
function eliminarDelCarrito(evento) {
  const producto = carrito.find(item => item.evento === evento);
  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
    } else {
      carrito = carrito.filter(item => item.evento !== evento);
    }
  }
  actualizarCarrito();
}

// Función para actualizar el contenido del carrito y el precio total
function actualizarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  carritoLista.innerHTML = ""; 
  let total = 0;
  // Crear un elemento de lista para cada producto en el carrito
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    const subtotal = item.precio * item.cantidad;
    total += subtotal; 
    li.textContent = `${item.evento} - $${item.precio} x ${item.cantidad} = $${subtotal.toFixed(2)}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Remove";
    btnEliminar.classList.add("btn", "btn-sm", "btn-danger", "ms-2");
    btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.evento));

    li.appendChild(btnEliminar);
    carritoLista.appendChild(li); 
  });
  document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
}

// Función para mostrar una notificación al agregar al carrito
function mostrarNotificacion(mensaje) {
  const notificacion = document.getElementById("notification");
  notificacion.textContent = mensaje; 
  notificacion.classList.add("visible"); 
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
    mostrarNotificacion(`¡${evento} added to cart!`); 
  });
});

// Script para el botón de Checkout
document.getElementById('checkout-button').addEventListener('click', function() {
  if (carrito.length > 0) {
    carrito = []; 
    actualizarCarrito();  
    // Mostrar el modal de agradecimiento
    var thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'), {
      backdrop: 'static', 
      keyboard: false 
    });
    thankYouModal.show();
  } else {
    // Mostrar el modal de carrito vacío
    var emptyCartModal = new bootstrap.Modal(document.getElementById('emptyCartModal'), {
      backdrop: 'static', 
      keyboard: false 
    });
    emptyCartModal.show();
  }
});

