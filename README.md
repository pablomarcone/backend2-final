# SERVIDOR ECOMMERCE

---

## GENERALIDADES

---

- Para instalar las dependencias primero ejecutar el comando "npm i".
- El servidor se puede ejecutar en modo desarrollo con el comando "npm run dev" o en modo produccion con "npm start".
- Se creó un archivo con variables de entorno que pueda subir a git para utilizar en la corrección. Es una base de prueba.
- Los datos subidos a la base de prueba fueron copiados de un ecommerce real en funcionamiento: 

---

## API REST

---

- La documentación de los endpoints se encuentra en /docs/API.md

---

## VISTAS

---

### Lista de Productos Estática: /
- **URL**: `http://localhost:8080/`
- **Plantilla**: home.hbs
- **Información**: Se muestran todos los productos existentes en la colección 'products'.

---

### Lista de Productos con Web Sockets: /realtimeProducts
- **URL**: `http://localhost:8080/realtimeProducts`
- **Plantilla**: realtime-products.hbs
- **Información**: Se muestran todos los productos existentes en la colección 'products' y se actualiza automáticamente al agregar o eliminar algun producto.

---

### Lista de Productos con Paginación y Filtros: /products
- **URL**: `http://localhost:8080/products`
- **Plantilla**: products.hbs
- **Información**: 
    - Se muestran los productos aplicando filtros y paginado. Además se pueden agregar productos al carrito.
    - Los filtros posibles son:
        - limit: Cantidad de productos por página (default: `10`)
        - page: Página a consultar (default: `1`)
        - sort: Ordenar por precio (`asc` o `desc`)
        - status: Filtro por disponibilidad (`true` o `false`)
        - category: Filtro por categoría (`nombre categoría`)
    - Agregar productos al carrito:
        - Si no hay productos en el carrito, al agregar un producto se genera un nuevo carrito. El id se guarda en localstorage.
        - Si hay un carrito vigente, al agregar productos se suman al mismo carrito.
        - Al presionar en Ver Carrito Completo se pueden ver todos los productos agregados y sus cantidades.
        - Con el botón reiniciar, se borra el id de localstorage y se puede comenzar un nuevo carrito. No se borra de la base de datos.
    - Si se presiona sobre una tarjeta de producto se puede visualizar toda la información del producto.

---

### Detalle de producto: /products/:pid
- **URL**: `http://localhost:8080/products/68db48edc0168666e65911e6`
- **Plantilla**: product-detail.hbs
- **Información**: Se muestra el detalle del id del producto ingresado, con posibilidad de agregar al carrito.

---

### Detalle de carrito: /carts/:cid
- **URL**: `http://localhost:8080/carts/68dbea1e3e06bf9fc2c2d8e7`
- **Plantilla**: cart-detail.hbs
- **Información**: Se muestra el detalle del id de carrito ingresado, con toda la información de los productos.

---