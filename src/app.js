const express = require("express");
const db = require('./utils/database')

const Todos = require("./models/todos.models")
require('dotenv').config();

const PORT = process.env.PORT || 8000;
db.authenticate() // es uan funcion asincrona
    .then(()=> console.log('Base de dato conectada'))
    .catch((err) => console.log(err));

db.sync() // si la tabla no existe la crea
    .then(() => console.log('Base de datos sincronizada'))
    .catch((error)=> console.log(error))

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});
 // axios.post(title,description,completed)
app.post('/api/v1/todos', async (req,res) => {
    try {
        // extraemos el cuerpo de la peticion
        // {extraemos los campos title,description,completed}
        const newTodos = req.body;
        // INSERT INTO todos ()
        await Todos.create(newTodos);
        // respondemos con un 201 - created
        res.status(201).send();
    } catch (error) {
        // si algo sale mal respondemos con el error,
        res.status(400).json(error);
    }
});
// obtener todos los registros

// SELECT title FROM todos;

// {
//     attributes:['title']
// }
 app.get("/api/v1/todos", async (req,res)=> {
    try {
        const todos = await Todos.findAll({
            attributes:{
                exclude: ['id','createdAt','updatedAt'],
            },
        });
        res.json(todos)
    } catch (error) {
        res.status(400).json(error)
    }
 });

// get user by id

app.get("/api/v1/todos/:id", async (req,res)=> {
    try {
        // para recuperar el parametro de ruta
        // * req.params
        // ? es un objeto {aidi:5, id: 3, user:Ian}
        const { id } = req.params;

        const todos = await Todos.findByPk(id,{
            attributes:{
                exclude: ['id','createdAt','updatedAt'],
            },            
        });
        res.json(todos);
    } catch (error) {
        res.status(400).json(error)
    }
 });

// si quiero encontrar por otro campo
// encontrar una tarea por su description
app.get("/api/v1/todos/:title", async (req,res)=>{
    try {
        const { title } = req.params;    
        const todos = await Todos.findOne({
            where:{title} // {title: title} completed
        });
        res.json(todos);
    } catch (error) {
        res.status(400).json(error)
    }    
});

// Eliminar una tarea
// DELETE FROM todos WHERE id = 3

app.delete('/api/v1/todos/:id', async (req,res)=>{
    try {
        const { id } = req.params;    
        await Todos.destroy({
            where:{id} // {title: title} completed
        });
        res.status(204).send()
    } catch (error) {
        res.status(400).json(error)
    }
});

// Actualizar información de una todos
// UPDATE todos SET title = 'new tarea', description = 'detail tarea' WHERE id='123'

app.put("/api/v1/todos/:id", async (req,res)=> {
    try {
        const { id } = req.params;    
        const { title, description } = req.body;
        await Todos.update({title, description},{
            where:{id} // {title: title} completed
        });
        res.status(204).send()
    } catch (error) {
        res.status(400).json(error)
    }
});
// dejar escuchando a nuestr servidor en un puerto
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el pto ${PORT}`)
});