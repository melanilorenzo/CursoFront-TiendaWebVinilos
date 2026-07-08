// ── ESTADO DEL CARRITO ───────────────────────────────

let carrito = JSON.parse(localStorage.getItem('lh-carrito')) || [];// lee de localStorage al cargar la página, si no existe arranca vacio

function guardar() {
  localStorage.setItem('lh-carrito', JSON.stringify(carrito));
}


// ── CONTADOR DEL HEADER ──────────────────────────────
function actualizarContador() {
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}


// ── RENDER DEL PANEL ────────────────────────────────
function renderCarrito() {
  const lista   = document.getElementById('cart-lista');
  const totalEl = document.getElementById('cart-total');
  const btnFin  = document.getElementById('btn-finalizar');

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="cart-vacio">Tu carrito está vacío 🎵</p>';
    totalEl.textContent = '$0';
    if (btnFin) btnFin.disabled = true;
    return;
  }

  if (btnFin) btnFin.disabled = false;

  lista.innerHTML = carrito.map((item, i) => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.nombre}" class="cart-item-img" />
      <div class="cart-item-info">
        <p class="cart-item-nombre">${item.nombre}</p>
        <p class="cart-item-precio">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
      </div>
      <div class="cart-item-ctrl">
        <button onclick="cambiarCantidad(${i}, -1)" aria-label="Restar">−</button>
        <span>${item.cantidad}</span>
        <button onclick="cambiarCantidad(${i},  1)" aria-label="Sumar">+</button>
      </div>
      <button class="cart-item-del" onclick="eliminar(${i})" aria-label="Eliminar">✕</button>
    </div>
  `).join('');

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  totalEl.textContent = '$' + total.toLocaleString('es-AR');
}


// ── ACCIONES DEL CARRITO ────────────────────────────

// agrega un producto y si ya existe solo suma cantidad
function agregar(nombre, precio, img) {
  const existe = carrito.find(item => item.nombre === nombre);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ nombre, precio, img, cantidad: 1 });
  }
  guardar();
  actualizarContador();
  renderCarrito();
  abrirCarrito();
}

// sube o baja la cantidad y si llega a 0 elimina el item
function cambiarCantidad(i, delta) {
  carrito[i].cantidad += delta;
  if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
  guardar();
  actualizarContador();
  renderCarrito();
}

// elimina un item por completo
function eliminar(i) {
  carrito.splice(i, 1);
  guardar();
  actualizarContador();
  renderCarrito();
}

// bloquea/desbloquea el scroll del body
function actualizarScrollBody() {
  const carritoAbierto  = document.getElementById('cart-screen').classList.contains('open');
  const catalogoAbierto = document.getElementById('catalog-screen').classList.contains('open');
  document.body.style.overflow = (carritoAbierto || catalogoAbierto) ? 'hidden' : '';
}

// abre y cierra la pantalla completa del carrito y del catalogo
function abrirCarrito() {
  document.getElementById('cart-screen').classList.add('open');
  actualizarScrollBody();
}
function cerrarCarrito() {
  document.getElementById('cart-screen').classList.remove('open');
  actualizarScrollBody();
}

function abrirCatalogo() {
  document.getElementById('catalog-screen').classList.add('open');
  actualizarScrollBody();
}
function cerrarCatalogo() {
  document.getElementById('catalog-screen').classList.remove('open');
  actualizarScrollBody();
}

// cierra cualquier pantalla abierta con la tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    cerrarCarrito();
    cerrarCatalogo();
  }
});

function irAInicio(e) {
  e.preventDefault();
  cerrarCatalogo();
  document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
}
function irAVinilos(e) {
  e.preventDefault();
  abrirCatalogo();
}
function irAResenas(e) {
  e.preventDefault();
  const estabaEnCatalogo = document.getElementById('catalog-screen').classList.contains('open');
  cerrarCatalogo();
  setTimeout(() => {
    document.getElementById('resenas').scrollIntoView({ behavior: 'smooth' });
  }, estabaEnCatalogo ? 250 : 0);
}
function irAContacto(e) {
  e.preventDefault();
  const estabaEnCatalogo = document.getElementById('catalog-screen').classList.contains('open');
  cerrarCatalogo();
  setTimeout(() => {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
  }, estabaEnCatalogo ? 250 : 0);
}

// simula la compra y muestra un mensaje de confirmacion
function finalizarCompra() {
  if (carrito.length === 0) return;
  carrito = [];
  guardar();
  actualizarContador();
  renderCarrito();
  document.getElementById('cart-lista').innerHTML =
    '<div class="cart-confirmacion"><p>🎉 ¡Gracias por tu compra!</p><p>Te enviamos un mail con el detalle de tu pedido.</p></div>';
}


// ── BOTONES "AGREGAR" DE LAS CARDS DEL HTML ─────────
function initBotones() {
  document.querySelectorAll('.vinilos .btn-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');

      const nombre = card.querySelector('h3').textContent.trim();

      const precioTexto = card.querySelector('.card-foot strong').textContent;
      const precio = parseInt(precioTexto.replace(/[\$\.]/g, ''));

      const img = card.querySelector('.card-img img')?.src || '';

      agregar(nombre, precio, img);
    });
  });
}


// ── VALIDACION DEL FORMULARIO ────────────────────────
function initFormulario() {
  const form = document.querySelector('.contacto form');
  if (!form) return;

  form.addEventListener('submit', e => {
    // borrar errores anteriores
    form.querySelectorAll('.campo-error').forEach(el => el.remove());

    const nombre  = document.getElementById('nombre').value.trim();
    const email   = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    let valido = true;

    if (!nombre) {
      marcarError('nombre', 'El nombre es obligatorio.');
      valido = false;
    }
    if (!email || !emailOk) {
      marcarError('email', 'Ingresá un correo electrónico válido.');
      valido = false;
    }
    if (!mensaje) {
      marcarError('mensaje', 'El mensaje no puede estar vacío.');
      valido = false;
    }

    // si hay errores, no envia el formulario
    if (!valido) e.preventDefault();
  });
}

// inserta el mensaje de error debajo del input correspondiente
function marcarError(id, msg) {
  const input = document.getElementById(id);
  const span  = document.createElement('span');
  span.className   = 'campo-error';
  span.textContent = msg;
  input.after(span);
}


// ── FETCH API ────────────────────────────────────────
// consume albumes desde la iTunes Search API y los renderiza como cards
async function cargarDesdeAPI() {
  const contenedor = document.getElementById('api-cards');
  if (!contenedor) return;

  contenedor.innerHTML = '<p class="cargando">Cargando discos...</p>';

  try {
    const respuesta = await fetch('https://itunes.apple.com/search?term=rock&entity=album&limit=8');
    const datos = await respuesta.json();
    const productos = datos.results;

    contenedor.innerHTML = productos.map(p => {
      // itunes devuelve la portada en 100x100 pero la pido mas grande
      const img = p.artworkUrl100.replace('100x100bb', '400x400bb');

      // itunes no vende vinilos, generamos uno acorde al rango de precios del resto del catálogo (semilla fija por álbum)
      const semilla = p.collectionId % 25000;
      const MARKUP = 100000; // recargo fijo que se le suma a todos los precios de la API
      const precio = (p.collectionPrice
        ? Math.round(p.collectionPrice * 1100)
        : 92000 + semilla) + MARKUP;

      return `
        <article class="card">
          <div class="card-img">
            <img src="${img}" alt="Portada ${p.collectionName}" />
          </div>
          <div class="card-body">
            <small>${p.primaryGenreName}</small>
            <h3>${p.collectionName}</h3>
            <p class="artist">${p.artistName}</p>
            <p class="descripcion">Edición en vinilo de ${p.collectionName}, de ${p.artistName}.</p>
            <div class="card-foot">
              <strong>$${precio.toLocaleString('es-AR')}</strong>
              <button class="btn btn-sm api-btn"
                data-nombre="${p.collectionName.replace(/"/g, '&quot;')}"
                data-precio="${precio}"
                data-img="${img}">Agregar</button>
            </div>
          </div>
        </article>`;
    }).join('');

    // agregar listeners a los botones generados por JS
    contenedor.querySelectorAll('.api-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        agregar(btn.dataset.nombre, parseInt(btn.dataset.precio), btn.dataset.img);
      });
    });

  } catch (error) {
    contenedor.innerHTML = '<p class="cargando">No se pudieron cargar los discos.</p>';
    console.error('Error en fetch:', error);
  }
}


// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initBotones();
  initFormulario();
  actualizarContador();
  renderCarrito();
  cargarDesdeAPI();
});
