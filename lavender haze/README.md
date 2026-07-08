# Lavender Haze - Tienda de Vinilos 🎵

Este proyecto es una página web de e-commerce para una tienda de vinilos. En ella se puede explorar un catálogo de vinilos, agregarlos a un carrito de compras dinámico, leer reseñas de clientes y enviar un mensaje por un formulario de contacto, aplicando **HTML5**, **CSS3** y **JavaScript**.

## Propósito
La página fue creada para ofrecer a los usuarios la exploración de vinilos clásicos y modernos, la compra simulada de estos y un diseño responsivo que se adapta a computadoras y dispositivos móviles, ofreciendo además un estilo retro-moderno.

## Características Principales 
- **Diseño Retro:** Estética basada en colores crema, naranja y turquesa con bordes gruesos y sombras sólidas.
- **Vista previa del catálogo:** La home muestra una selección de vinilos destacados con un botón "Ver más".
- **Pantalla de catálogo completo:** Una pantalla aparte que muestra todos los vinilos disponibles más una sección de álbumes traídos en vivo desde una API externa.
- **Carrito de compras dinámico:** Pantalla aparte para ver el carrito, editar cantidades, eliminar productos y simular la compra. El estado se guarda en `localStorage`.
- **Consumo de API REST:** La sección "Descubrí más" trae álbumes reales usando `fetch` a la iTunes Search API.
- **Formulario de contacto:** Con validación en JavaScript y envío de datos mediante Formspree.
- **Menú mobile:** Sistema de navegación funcional para celulares mediante checkbox.
- **Sección de reseñas:** Grid con las opiniones de los usuarios.
- **Banner interactivo:** Sección principal con introducción, botones de acción y un video insertado de YouTube.

## Tecnologías Utilizadas 
- **HTML5:** Estructura semántica (`header`, `nav`, `main`, `section`, `footer`).
- **CSS3:**
  - Flexbox para la organización de las cards del catálogo.
  - Grid para la sección de reseñas.
  - Media Queries para diseño responsivo.
  - Posicionamiento fijo para las pantallas de carrito y catálogo.
- **JavaScript:**
  - Manipulación del DOM para renderizar productos, carrito y validar el formulario.
  - `fetch` para consumir la API de iTunes.
  - `localStorage` para persistir el carrito entre visitas.

## Estructura de Archivos 
- `index.html`: Estructura principal de la página.
- `styles.css`: Estilos, fuentes y diseño responsivo.
- `script.js`: Lógica del carrito, fetch a la API, validación del formulario y navegación entre pantallas.
- `/img`: Carpeta que contiene las portadas de los vinilos y el logo.
