// para gestionar la coneccion de la base de datos
// * importar sequelize
const { Sequelize } = require("sequelize");
const db = new Sequelize({
   host: "localhost",
   database: "todos_crud",
   port: 5432,
   username: 'postgres',
   password: "root",
   dialect: 'postgres'
});

module.exports = db;