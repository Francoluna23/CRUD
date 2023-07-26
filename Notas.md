# Proyecto CRUD - HTML, MongoDB, Node.js y JavaScript

Este es un proyecto de ejemplo que implementa un CRUD (Create, Read, Update, Delete) utilizando HTML, MongoDB, Node.js y JavaScript. El objetivo de este proyecto es mostrar cómo crear una aplicación sencilla para gestionar productos, permitiendo agregar, buscar, actualizar y eliminar productos en una base de datos MongoDB.

## Funciones principales

El proyecto cuenta con las siguientes funciones principales:
***
1. *Mostrar todos los productos:* Permite visualizar todos los productos almacenados en la base de datos MongoDB en una tabla.

2. *Buscar productos por nombre:* Permite buscar productos por su nombre y muestra los resultados coincidentes.

3. *Crear un nuevo producto:* Permite agregar un nuevo producto a la base de datos ingresando su nombre, descripción, precio y stock.

4. *Actualizar un producto:* Permite actualizar el precio y stock de un producto existente mediante su ID.

5. *Eliminar un producto:* Permite eliminar un producto de la base de datos mediante su ID.

## Requisitos

Para ejecutar este proyecto en tu máquina local, necesitarás tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org) (que incluye npm)
- [MongoDB](https://www.mongodb.com)

## Instalación

1. Clona este repositorio en tu máquina local:

```bash
  git clone https://github.com/tu_usuario/proyecto-crud.git
  cd proyecto-crud
```
2. Instala las dependencias del proyecto utilizando npm:

```bash
  npm install
```

3. Crea un archivo .env en el directorio raíz del proyecto y agrega la URL de conexión a tu base de datos MongoDB. Puedes usar el archivo .env.example como referencia:

`PORT=3000`

`MONGODB_URLSTRING=tu_url_de_conexion_mongodb`



# Uso

1. Inicia el servidor de Node.js:

```bash
  npm start
```
2. Accede a la aplicación en tu navegador web ingresando la siguiente URL: http://localhost:3000

- La página principal mostrará un menú de opciones donde puedes seleccionar las diferentes operaciones del CRUD

## Tecnologías utilizadas

- HTML: Para la estructura y contenido de la página web.
- CSS: Para el diseño y estilo de la página web.
- JavaScript: Para la lógica y funcionalidad del cliente.
- Node.js: Para crear el servidor backend.
- MongoDB: Como base de datos para almacenar los productos.
