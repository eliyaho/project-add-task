const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Task = require('./Schema/Task');
const { createTask, updateTaskStatus, deleteTask, getAllTasks } = require('./DataBase/DataOperations.js');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(cors());

const connectMongo = require('./DataBase/MongoConnect');
connectMongo();

app.post('/tasks', async (req, res) => {
  const { text, completed } = req.body;
  try {
    const newTask = await createTask(text, completed);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send('Error creating task');
  }
});

app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;

  try {
    const updatedTask = await updateTaskStatus(taskId, completed);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send('Error updating task status');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await deleteTask(taskId);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error fetching tasks');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
