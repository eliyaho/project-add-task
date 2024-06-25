const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
