const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes Declaration

// create new todos
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)", [description]);
		res.status(201).json(newTodo.rows[0]);
	} catch(err) {
		console.error(err)
	}
})

// pull all todos
app.get('/todos', async(req, res) => {
	try {
		const allTodos = await pool.query("Select * from todo");
		res.status(200).json(allTodos.rows);
	} catch(error) {
		console.error(error);
	}
}); 

// get a single todo
app.get('/todos/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query("SELECT * FROM todo where todo_id = $1", [id]);
		res.status(200).json(todo.rows[0]);
	} catch(err) {
		console.error(err.message)
	}
})


// update existing todo
app.put('/todos/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const todo = await pool.query("UPDATE todo SET description=$1 where todo_id = $2", [description, id]);
		res.status(204).json('Todo was updated');
	} catch(err) {
		console.error(err.message)
	}
});

app.delete('/todos/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query("DELETE from todo where todo_id = $1", [id]);
		res.status(200).json("Todo was deleted");
	} catch(err) {
		console.error(err.message);
	}
})

app.listen(5001, () => {
	console.log('Work');
});