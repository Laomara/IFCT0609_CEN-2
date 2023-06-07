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
module.exports = Todo;