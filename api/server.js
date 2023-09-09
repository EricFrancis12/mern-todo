require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB');
    app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));
}).catch(err => console.error(err));

const Todo = require('./models/Todo');





app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});



app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});



app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id });

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
});



app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});