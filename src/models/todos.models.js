const db = require('../utils/database')
const { DataTypes } = require('sequelize');

const Todos = db.define('todos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    completed:{
        type: DataTypes.BOOLEAN(false),
    }
});

module.exports = Todos;