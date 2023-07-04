const { Sequelize, DataTypes } = require ("sequelize");

require('dotenv').config() // <-- Hay que crear un archivo .env con los datos

const sequelize = new Sequelize(
 process.env.DB_NAME,
 process.env.DB_USER,
 process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      useUTC: false,
    },
    timezone: 'Europe/Madrid',
  },
);

const Book = sequelize.define("Books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500),
    defaultValue: "No hay una descripción disponible para este libro.",
  },
  release_date: {
    type: DataTypes.DATEONLY,
  },
  subject: {
    type: DataTypes.INTEGER,
  }
});

sequelize.sync().then(() => {
   console.log("Tabla 'Books' creada correctamente.");

Book.create({
    title: "Clean Code",
    author: "Robert Cecil Martin",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of porrly written code. But it doesn't hace to be that way.",
    release_date: "2021-12-14",
    subject: 3
}).then(res => {
    console.log(res) // resultado del query
}).catch((error) => {
   console.error('No se ha podido crear el nuevo libro: ', error);
});

}).catch((error) => {
    console.error('No se ha podido crear la tabla: ', error);
});