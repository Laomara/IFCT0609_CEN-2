const preguntar = require('./prompt');

preguntar('¿Cual es tu nombre? > ')
  .then((nombre) => {
    console.log(`¡Hola, ${nombre}! ¿Qué tal?`);
  });
