import axios from 'axios';

export const Add_Task = async (text, completed) => {
  try {
    const response = await axios.post('http://localhost:3003/tasks', {
      text: text,
      completed: completed
    });
    return response.data;
  } catch (error) {
    console.error('Error sending task to server:', error);
    throw error;
  }
};

export const Completion = async (taskId, currentCompleted, tasks, setTasks) => {
  try {
    const updatedTask = await axios.put(`http://localhost:3003/tasks/${taskId}`, {
      completed: !currentCompleted
    });
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !currentCompleted } : task
    );
    setTasks(updatedTasks);
  } catch (error) {
    console.error('Error updating task completion status:', error);
  }
};

export const DeleteTask = async (taskId, tasks, setTasks) => {
  try {
    await axios.delete(`http://localhost:3003/tasks/${taskId}`);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
