# SERVIDOR ECOMMERCE
---

## ENDPOINTS PRODUCTOS
---

### 1. Listar productos: GET /api/products
- **Método**: GET
- **URL**: `http://localhost:8080/api/products`
- **Código**: 200 OK
- **Respuesta Esperada**: Información de paginación y array vacío o con productos existentes.
```json
{
    "status": "success",
    "payload": [
        "_id": "68db48edc0168666e65911e6",
        "title": "Titulo",
        "description": "Descripcion",
        "code": "Código",
        "price": 0,
        "status": true,
        "stock": 0,
        "category": "Categoria",
        "thumbnails": []
    ],
    "totalPages": 0,
    "prevPage": 0,
    "nextPage": 0,
    "page": 0,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevLink": null,
    "nextLink": null
}
```

| Query Param | Descripción                                      |
| ----------- | ------------------------------------------------ |
| `limit`     | Cantidad de productos por página (default: `10`) |
| `page`      | Página a consultar (default: `1`)                |
| `sort`      | Ordenar por precio (`asc` o `desc`)              |
| `status`    | Filtro por disponibilidad (`true` o `false`)     |
| `category`  | Filtro por categoría (`nombre categoría`)          |



---

### 2. Obterner producto por ID: GET /api/products/:pid
- **Método**: GET
- **URL**: `http://localhost:8080/api/products/68db48edc0168666e65911e6`
- **Código**: 200 OK
- **Respuesta Esperada**: Objeto del poducto seleccionado.
```json
{
    "status": "success",
    "product": [
        "_id": "68db48edc0168666e65911e6",
        "title": "Titulo",
        "description": "Descripcion",
        "code": "Código",
        "price": 0,
        "status": true,
        "stock": 0,
        "category": "Categoria",
        "thumbnails": []
    ]
}
```



---

### 3. Crear producto: POST /api/products
- **Método**: POST
- **URL**: `http://localhost:8080/api/products`
- **Código**: 201 Created
- **Body**:
```json
{
    "title": "Auriculares Bluetooth",
    "description": "Auriculares inalámbricos con cancelación de ruido y estuche de carga.",
    "code": "SKU-0001",
    "price": 49.99,
    "status": true,
    "stock": 120,
    "category": "Electrónica",
    "thumbnails": [
      "https://acdn-us.mitiendanube.com/stores/004/584/501/products/1-e41bd379d92e4757a517561503411939-1024-1024.jpg",
      "https://acdn-us.mitiendanube.com/stores/004/584/501/products/3-15c1758de71ec0a83817561503417511-1024-1024.jpg"
    ]
}
```
- **Respuesta Esperada**:
```json
{
    "status": "success",
    "product": {'Objeto de producto con los datos ingresados'} (guardar id para proximas pruebas)
}
```



---

### 4. Actualizar producto: PUT /api/products/:pid
- **Método**: PUT
- **URL**: `http://localhost:8080/api/products/68db5d225bf9cc671b669966` (usar id prueba anterior)
- **Código**: 200 OK
- **Body**:
```json
{
    "price": 99.33,
    "status": false
}
```
- **Respuesta Esperada**:
```json
{
    "status": "success",
    "product": {'Objeto de producto con datos actualizados'}
}
```



---

### 5. Eliminar producto: DELETE /api/products/:pid
- **Método**: DELETE
- **URL**: `http://localhost:8080/api/products/68db5d225bf9cc671b669966` (usar id prueba anterior)
- **Código**: 200 OK
- **Respuesta Esperada**:
```json
{
    "status": "success",
    "products": {'Objeto de producto eliminado'}
}
```



---
## ENDPOINTS CARRITOS
---



### 1. Listar carritos: GET /api/carts
- **Método**: GET
- **URL**: `http://localhost:8080/api/carts`
- **Código**: 200 OK
- **Respuesta Esperada**: Array vacío o con carritos existentes
```json
{
  "status": "success",
  "carts": [
    {
      "_id": "68dbea1e3e06bf9fc2c2d8e7",
      "products": [
        {
          "product": "68db48edc0168666e65911e6",
          "quantity": 1
        }
      ]
    }
  ]
}
```



---

### 2. Obterner carrito por ID: GET /api/carts/:cid
- **Método**: GET
- **URL**: `http://localhost:8080/api/carts/68dbea1e3e06bf9fc2c2d8e7`
- **Código**: 200 OK
- **Respuesta Esperada**: Array de productos contenidos en el carrito.
```json
{
  "status": "success",
  "cart": {
    "_id": "68dbea1e3e06bf9fc2c2d8e7",
    "products": [
      {
        "product": {
          "_id": "68db48edc0168666e65911e6",
          "title": "Titulo",
          "description": "Descripcion",
          "code": "Codigo",
          "price": 0,
          "status": true,
          "stock": 0,
          "category": "Categoria",
          "thumbnails": []
        },
        "quantity": 0
      },
    ]
  }
}
```



---

### 3. Crear carrito: POST /api/carts
- **Método**: POST
- **URL**: `http://localhost:8080/api/carts`
- **Código**: 201 Created
- **Body**:
```json
[
  {
    "product": "68db48edc0168666e65911e6",
    "quantity": 2
  },
  {
    "product": "68db48edc0168666e65911ee",
    "quantity": 1
  }
]
```
- **Respuesta Esperada**: Array de productos contenidos en el carrito.
```json
{
    "status": "success",
    "cart": {
        "products": [
            {
                "product": "68db48edc0168666e65911e6",
                "quantity": 2
            },
            {
                "product": "68db48edc0168666e65911ee",
                "quantity": 1
            }
        ],
        "_id": "68dbed183e06bf9fc2c2d904", (guardar id para próximas pruebas)
        "__v": 0
    }
}
```



---

### 4. Agregar producto a carrito existente: POST /api/carts/:cid/products/:pid
- **Método**: POST
- **URL**: `http://localhost:8080/api/carts/68dbed183e06bf9fc2c2d904/products/68db48edc0168666e65911f0` (usar id prueba anterior)
- **Código**: 201 Created
- **Respuesta Esperada**: Array de productos contenidos en el carrito.
```json
{
    "status": "success",
    "cart": {
        "_id": "68dbed183e06bf9fc2c2d904",
        "products": [
            {
                "product": "68db48edc0168666e65911e6",
                "quantity": 2
            },
            {
                "product": "68db48edc0168666e65911ee",
                "quantity": 1
            },
            {
                "product": "68db48edc0168666e65911f0",
                "quantity": 1
            }
        ],
        "__v": 1
    }
}
```



---

### 5. Actualizar productos en carrito: PUT /api/carts/:cid
- **Método**: PUT
- **URL**: `http://localhost:8080/api/carts/68dbed183e06bf9fc2c2d904` (usar id prueba anterior)
- **Código**: 200 OK
- **Body**:
```json
[
  {
    "product": "68db4923c0168666e6591444",
    "quantity": 1
  },
  {
    "product": "68db4923c0168666e6591504",
    "quantity": 1
  }
]
```
- **Respuesta Esperada**: Array de productos contenidos en el carrito.
```json
{
    "status": "success",
    "cart": {
        "_id": "68dbed183e06bf9fc2c2d904",
        "products": [
            {
                "product": "68db4923c0168666e6591444",
                "quantity": 1
            },
            {
                "product": "68db4923c0168666e6591504",
                "quantity": 1
            }
        ],
        "__v": 1
    }
}
```



---

### 6. Actualizar cantidad de un producto en carrito: PUT /api/carts/:cid/products/:pid
- **Método**: PUT
- **URL**: `http://localhost:8080/api/carts/68dbed183e06bf9fc2c2d904/products/68db4923c0168666e6591444` (usar id prueba anterior)
- **Código**: 200 OK
- **Body**:
```json
{
    "quantity": 2
}
```
- **Respuesta Esperada**: Array de productos contenidos en el carrito.
```json
{
    "status": "success",
    "cart": {
        "_id": "68dbed183e06bf9fc2c2d904",
        "products": [
            {
                "product": "68db4923c0168666e6591444",
                "quantity": 2
            },
            {
                "product": "68db4923c0168666e6591504",
                "quantity": 1
            }
        ]
    }
}
```



---

### 7. Eliminar un producto del carrito: DELETE /api/carts/:cid/products/:pid
- **Método**: DELETE
- **URL**: `http://localhost:8080/api/carts/68dbed183e06bf9fc2c2d904/products/68db4923c0168666e6591444` (usar id prueba anterior)
- **Código**: 200 OK
- **Respuesta Esperada**: Array de productos contenidos en el carrito.
```json
{
    "status": "success",
    "cart": {
        "_id": "68dbed183e06bf9fc2c2d904",
        "products": [
            {
                "product": "68db4923c0168666e6591504",
                "quantity": 1
            }
        ],
        "__v": 1
    }
}
```



---

### 8. Eliminar todos los productos de un carrito: DELETE /api/carts/:cid
- **Método**: DELETE
- **URL**: `http://localhost:8080/api/carts/68dbed183e06bf9fc2c2d904` (usar id prueba anterior)
- **Código**: 200 OK
- **Respuesta Esperada**: Objeto carrito con array de productos vacío.
```json
{
    "status": "success",
    "cart": {
        "_id": "68dbed183e06bf9fc2c2d904",
        "products": [],
        "__v": 1
    }
}
```

## ENDPOINTS SESSIONS
---

### 1. Agregar un usuario: POST /api/sessions/register
- **Método**: POST
- **URL**: `http://localhost:8080/api/sessions/register`
- **Código**: 201 Created
- **Body**:
```json
{
    "first_name": "Nombre",
    "last_name": "Apellido",
    "email": "email@dominio.com",
    "age": 99, (opcional)
    "password": "password"
}
```



---

### 2. Login: POST /api/sessions/login
- **Método**: POST
- **URL**: `http://localhost:8080/api/sessions/login`
- **Código**: 200 OK
- **Body**:
```json
{
    "email": "email@dominio.com",
    "password": "password"
}
```



---

### 3. Actualizar usuario logueado: PUT /api/sessions/update
- **Método**: PUT
- **URL**: `http://localhost:8080/api/sessions/update`
- **Código**: 200 OK
- **Body**:
```json
{
    "first_name": "Nombre",
    "last_name": "Apellido",
    "age": 99,
    "password": "password",
    "cart": "68dbed183e06bf9fc2c2d904"
}
```



---

### 4. Eliminar usuario logueado: DELETE /api/sessions/delete
- **Método**: DELETE
- **URL**: `http://localhost:8080/api/sessions/delete`
- **Código**: 200 OK



---

### 5. Información usuario logueado: GET /api/sessions/current
- **Método**: GET
- **URL**: `http://localhost:8080/api/sessions/current`
- **Código**: 200 OK



---

### 6. Deslogueo usuario: GET /api/sessions/logout
- **Método**: GET
- **URL**: `http://localhost:8080/api/sessions/logout`
- **Código**: 200 OK