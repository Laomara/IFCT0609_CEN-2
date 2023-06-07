/*
  Ejemplo de NodeJS para crear unos todos:
  - Crear un servidor
    CRUD -> Create, Read, Update, Delete
    - Create: Crear una ruta para POST /todos (crear un todo)
    - Read: Crear una ruta para GET /todos (leer todos los todos)
    - Read: Crear una ruta para GET /todos/:id (leer un todo específico)
    - Update: Crear una ruta para PUT /todos/:id (editar un todo específico)
    - Delete: Crear una ruta para DELETE /todos/:id (eliminar un todo específico)

    Para hacer las peticiones a las rutas, se puede utilizar Postman o Insomnia
    -> https://www.postman.com/downloads/
    ¿Por qué Postman? Para no tener que hacer los formularios HTML por el momento
*/

// Importación de módulo http -> comunicación cliente-servidor
const http = require('http');

// Método para crear un servidor con NodeJS
// req == request -> petición del cliente
// res == response -> respuesta del servidor (esto lo determinamos nosotros)
http.createServer(function (req, res) {

  let url = req.url; // url después de localhost:8080 -> / o /api, /todos, etc...
  let method = req.method; // GET, POST, PUT, DELETE, etc...

  class Todo {
    static contadorTodos = 0; // Contador de todos que se actualiza en la creación de cada objeto Todo
    static todos = [];        // Array de todos que se actualiza en la creación de cada objeto Todo
    static MAX_TITULO = 255;
    static MAX_DESCRIPCION = 1000;
    constructor(id_ = ++Todo.contadorTodos, titulo_ = "", descripcion_ = "", completado_ = false) {
      this.id = id_;
      this.titulo = titulo_;
      this.descripcion = descripcion_;
      this.completado = completado_;
      // Añadimos el nuevo Todo al array static de la clase Todo (así siempre los tenemos disponibles):
      Todo.todos.push(this);
    }
    static seed() {
      let todos = [
        { id: 1, titulo: "Comprar pan", descripcion: "🍞🍞🍞", completado: false },
        { id: 2, titulo: "Tomar café", descripcion: "☕️☕️☕️", completado: false },
        { id: 3, titulo: "Estudiar NodeJS", descripcion: "📚📚📚", completado: false },
        { id: 4, titulo: "Estudiar Express", descripcion: "🤓🤓🤓", completado: false },
        { id: 5, titulo: "Estudiar MySQL", descripcion: "🤯🤯🤯", completado: false },
      ]
      for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        new Todo(
          undefined,
          todo.titulo,
          todo.descripcion,
          todo.completado
        )
      }
    }
    // Métodos para validar los campos de un Todo

    // GET
    /**
     * Devuelve el array actual de todos
     * @returns {Array} todos
     */
    static getAllTodos() {
      return Todo.todos;
    }
    static getTodo(id) {
      if (!id) {
        throw new Error("No se ha proporcionado un id")
      }
      if (!Todo.validarId(id)) {
        throw new Error("El id no es válido")
      }
      if (id > Todo.todos.length) {
        throw new Error("El id no existe en la lista de todos")
      }
      let todos = Todo.todos;
      for (let i = 0; i < todos.length; i++) {
        if (todos[i]?.id == id) {
          return todos[i];
        }
      }
      return null; // Si no encuentra el todo con ese id
      // Otra opción sería arrojar error
    }
    // Validaciones
    /**
     * Valida si el id es un número entero mayor que 0
     * @param {String} id que procede de la URL
     * @returns {Boolean}
     */
    static validarId(id) {
      //  Validamos que es entero, no es NaN, es mayor que 0 y es un número
      let esEntero = id == parseInt(id); // o podemos usar: Number.isInteger(Number(id))
      return !isNaN(id) && esEntero && id > 0 && id <= Todo.todos.length && id;
    }
    /**
     * Valida el tipo, longitud y contenido del título entre 1 y 255 caracteres
     * @param {String} titulo 
     * @returns {Boolean}
     */
    static validarTitulo(titulo) {
      return typeof titulo == "string" && titulo.length > 0 && titulo.length <= Todo.MAX_TITULO ? true : false;
    }
    /**
     * Valida el tipo, longitud y contenido de la descripción entre 1 y 1000 caracteres
     * @param {String} descripcion 
     * @returns {Boolean}
     */
    static validarDescripcion(descripcion) {
      return typeof descripcion == "string" && descripcion.length > 0 && descripcion.length <= Todo.MAX_DESCRIPCION ? true : false;
    }
    /**
     * Valida el tipo del campo completado que debe ser booleano
     * @param {Boolean} completado 
     * @returns {Boolean}
     */
    static validarCompletado(completado) {
      return typeof completado == "boolean" ? true : false;
    }
    // Helpers
    /**
     * Encuentra el índice del todo en el array de todos
     * @param {String} id 
     * @returns {Number} índice del todo en el array de todos
     */
    static getTodoIndex(id) {
      for (let i = 0; i < Todo.todos.length; i++) {
        if (Todo.todos[i].id == id) {
          return i;
        }
      }
    }
  }
  
  Todo.seed(); // Crear algunos todos de ejemplo
  const TODOS = Todo.getAllTodos(); // Obtener los todos creados
  // getAllTodos() equivale a Todo.todos

  // GET all y GET by id
  if (url.startsWith("/todos") && method == "GET") {
    // Usamos split para conseguir el id de la URL:
    let id = url.split("/")[2]; // /todos/1 -> id = 1
    let esIdValido = Todo.validarId(id)
    let esUrlValida = url.endsWith(id) || url.endsWith(id + "/") // permitimos /todos/1 o /todos/1/
    if (esIdValido && esUrlValida) {
      let todo = Todo.getTodo(id); // Devuelve el Todo o null si no existe
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
      console.log(JSON.stringify(todo, null, 2)) // Escribimos resultado en consola (DEV)
      res.end(JSON.stringify(todo ? todo : {}, null, 2));    // Convertir el único objeto a JSON -> se devuelve como string
    } else if (!id) {
      // Devolvemos todos los todos con statusCode 200 -> OK
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
      console.log(JSON.stringify(TODOS, null, 2)) // DEV
      res.end(JSON.stringify(TODOS, null, 2)); // Convertir el arreglo a JSON -> se devuelve como string
    }
    else {
      // El id no es válido -> Error 400 -> Bad Request (petición incorrecta)
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8' });
      console.log("Error 400. Bad request") // DEV
      res.end("Error 400. Bad request"); // Mensaje de error
    }
  } else if (url == "/todos" && method == "POST") {
    // lógica del método POST para crear nuevo todo

    // class Todo...
    // let todo = new Todo()
    // Recibir los campos que me envía la solicitud -> JSON
    // Validar esos campos de alguna forma
    // Crear un nuevo todo
    // Agregar el nuevo todo a la lista de todos

    res.end("POST /todos")
  } else if (url == "/todos" && method == "PUT") {
    // lógica del método PUT para editar un todo
    
    // Recibir los campos que me envía la solicitud -> JSON
    // Validar esos campos de alguna forma
    // Editar el todo con el id que me envían
    // Agregar el nuevo todo a la lista de todos

    res.end("PUT /todos")
  } else if (url.startsWith("/todos") && method == "DELETE") {
    let id = url.split("/")[2]; // /todos/1 -> id = 1
    let esIdValido = Todo.validarId(id)
    let esUrlValida = url.endsWith(id) || url.endsWith(id + "/") // permitimos /todos/1 o /todos/1/
    // Si no hay id, Bad Request
    if (!esIdValido || !esUrlValida) {
      // 400 -> Bad Request
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8' });
      console.log("Error 400. Bad request") // DEV
      res.end("Error 400. Bad request"); // Mensaje de error
    }
    // Si hay id, verificamos que exista ese id en la lista de todos -> borramos
    else {
      // Miramos si existe el id
      if (esIdValido) {
        let index = Todo.getTodoIndex(id); // Obtenemos el índice del todo con el id
        TODOS.splice(index, 1) // Eliminamos el todo con el id y devolvemos 200 -> OK
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
        console.log(`Se ha borrado el elemento con id ${id}\n\n`, JSON.stringify(TODOS))
        res.end(`Se ha borrado el elemento con id ${id}\n\n${JSON.stringify(TODOS, null, 2)}`); // Mensaje y array para comprobar que se ha borrado
      } 
      // else {
      //   // Si no existe, No Content -> 204
      //   res.writeHead(204, { 'Content-Type': 'text/plain; charset=UTF-8' });
      //   console.log(`El id ${id} no existe`)
      //   res.end(); // Mensaje vacío
      //   // TODO: revisar si conviene un error más adelante
      // }
    }
  }
  else {
    // 404 -> Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    console.error(`Error 404. Ruta ${url} o método ${req.method} incorrecto. Envia la petición a /todos`)
    res.end(`Error 404. Ruta ${url} o método ${req.method} incorrecto. Envia la petición a /todos`);
  }
}).listen(8080); // Se utiliza el puerto 8080 para el servidor
                 // localhost:8080 -> http://localhost:8080
                 // localhost -> 127.0.0.1