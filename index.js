// Pruebo funcionamiento
/* fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => console.log(data));
*/
//-------------------------------------------------------------------------------------------------------------------------
//ARMO LAS FUNCIONES A UTILIZAR: GET products, GET products by id, Add Product (POST), DELETE product
//--------------------------------------------------------------------------------------------------------------------------


async function getProducts(){
    
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        console.log(products);
    }
    catch (err) {
        console.error("No se pudieron obtener los productos"); }
}

async function getProductId(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`); //para que funcione el ID tiene que estar pasado como parámetro dinámico
    if (!response.ok) {
        console.log('Producto no encontrado');
        return;
      }
    
      const product = await response.json();
      console.log(product);
    } catch (err) {
      console.error('Error al obtener el producto seleccionado');
    }
  }

  async function addProduct(title, price, category) { // acá lo primero que hay que hacer es definir la variable producto que es invocada por la API luego del fetch
    const product = {
      title,
      price,
      category,
    };

    try {
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // copiar todo el fetch de la API para evitar errores de notación
          body: JSON.stringify(product), // stringify convierte objeto en cadena JSON
        }); 
        
        const newProduct = await response.json();
        console.log("Producto Agregado: ", newProduct);
    }
    catch (err) {
        console.error("No se pudo agregar el producto"); }
}

  
  async function deleteProduct(id) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      }); // para evitar errores de notación esta parte hay que copiarla de la API

      if (!response.ok) {
        console.log("No se pudo eliminar el producto");
        return;
      }
      const result = await response.json();
      
      //La API devuelve "Producto eliminado: null" cuando se ingresa un ID que no existe, en lugar de salir por el catch, porque la API no lanza un error http y por lo tanto fetch no lanza una excepción y por ende no entra en el catch, por eso hay que agregar una verificación adicional para los casos en que resultado API sea null

      if (result === null) {
        console.log("El producto no existe. No se pudo eliminar.");
        return;
      }

      console.log("Producto eliminado:", result);
    } catch (err) {
      console.error("Error al eliminar el producto");
    }
  }
//-----------------------------------------------------------------------------------------------------------------
//ARMO LOS COMANDOS PARA INGRESAR POR TERMINAL
//-----------------------------------------------------------------------------------------------------------------

const argumentos = process.argv.slice(2); //borra los dos primeros elementos del array que no sirven
const comandos = argumentos[0]; //Puede ser GET, POST o DELETE 
const items = argumentos[1]; // products, product/id

switch (comandos) {
  case "get":
    if (items === "products") {
      getProducts();
    } else {
      const partes = items.split("/");
      if (partes[0] === "products" && partes.length === 2) {
        const id = partes[1];
        getProductId(id);
      } else {
        console.log(
          "El comando ingresado no es válido. Opciones válidas: \n 1) 'npm run start get products'\n 2) 'npm run start get products/<id>'"
        );
      }
    }
    break;

  case "post":
    if (items === "products") {
      const [title, price, category] = argumentos.slice(2);
      if (!title || !price || !category) {
        console.log(
          "Faltan datos para añadir el producto. Debe ingresar título, precio y categoría del producto que desea añadir"
        );
      } else {
        addProduct(title, price, category);
      }
    } else {
      console.log(
        "El comando ingresado no es válido. Ejemplo de uso: 'npm run start post products Remera 1000 ropa'"
      );
    }
    break;

  case "delete":
    const partes = items.split("/");
  if (partes[0] === "products" && partes.length === 2) {
    const id = partes[1];
    deleteProduct(id);
  } else {
    console.log("El comando ingresado no es válido. Ejemplo de uso: 'npm run start delete products/<id>' ");
  }
  break;
  default:
    console.log("Comando no reconocido");
   
}
  
