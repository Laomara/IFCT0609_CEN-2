// Importamos el array de notas de nota.js
const { notas } = require("./nota"); // Con las llaves, es un array // SIN las llaves, es un obj { notas: [ notas... ] }

// getAll -> devuelve el array de notas
function getAll() {
  // TODO: opciones de filtrado
  return notas;
}
// getOne -> devuelve una nota concreta
function getOne(id) {
  console.log(notas); // arr
  return notas.find((nota) => nota.id == id);
}
exports.getAll = getAll;
exports.getOne = getOne;