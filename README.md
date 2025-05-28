# PREENTREGA-2025
Preentrega Talento Tech 2025

Una herramienta básica en Node.js para interactuar con productos de una tienda online utilizando la FakeStore API, desde la terminal.


Ejecutá los comandos desde la terminal con: npm run start <comando>


Comandos Disponibles:

1) Consultar todos los productos: npm run start get products

2) Consultar un producto por ID: npm run start get products/<id>
    Ejemplo: npm run start get products/3

3) Agregar un producto nuevo: npm run start post products <title> <price> <category>
    Ejemplo: npm run start post products "Remera Negra" 1500 "indumentaria"

4) Eliminar un producto por ID: npm run start delete products/<id>
    Ejemplo: npm run start delete products/5


**Notas**

- Si el ID del producto no existe, la API devuelve `null`, por lo que hay una verificación extra en la función `deleteProduct`.
- La herramienta utiliza solo `fetch`, `async/await`, `try/catch`, `switch` y `process.argv`.



