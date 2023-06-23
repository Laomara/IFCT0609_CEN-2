class Nota {
    static nota = [];
    constructor(id, titulo, texto, prioridad, fecha){
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.prioridad = prioridad;
        this.fecha = fecha;
    }

static seed(){ 
   Nota.notas.push((1, "Compra pan", "Comprar pan en el supermercado", "", "2023-06-23")),
   Nota.notas.push((2, "Compra leche", "Comprar leche en el supermercado", "normal", "2023-06-23")),
   Nota.notas.push((3, "Compra huevos", "Comprar huevos en el suopermercado", "urgente", "2023-06-22"))
 }
}


//Exportamos el modulo
exports.Nota = Nota;
exports.notas = Nota.notas;