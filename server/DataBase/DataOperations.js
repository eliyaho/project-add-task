const Task = require('../Schema/Task');
const { v4: uuidv4 } = require('uuid');

const createTask = async (text, completed) => {
  const newTask = new Task({
    id: uuidv4(),
    text: text,
    completed: completed
  });

  try {
    await newTask.save();
    return newTask;
  } catch (error) {
    throw error;
  }
};

const updateTaskStatus = async (taskId, completed) => {
  try {
    const task = await Task.findOneAndUpdate(
      { id: taskId },
      { completed: completed },
      { new: true } 
    );
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const task = await Task.findOneAndDelete({ id: taskId });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async () => {
    try {
      const tasks = await Task.find({});
      return tasks;
    } catch (error) {
      throw error;
    }
  };
module.exports = {
  createTask,
  updateTaskStatus,
  deleteTask,
  getAllTasks
};
