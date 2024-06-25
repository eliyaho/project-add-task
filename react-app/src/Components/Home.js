import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Add_Task, Completion, DeleteTask } from './SendToServer';
import './home.css';

const Home = () => {
  const [newTask, setNewTask] = useState('');
  const [completed, setCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3003/tasks');
      setTasks(response.data); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const AddTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const addedTask = await Add_Task(newTask, completed); 
        console.log('Task added successfully:', addedTask);
        setTasks([...tasks, addedTask]);
        setNewTask(''); 
        setCompleted(false); 
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <div className="task-container">
      <h1>Task List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={AddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => Completion(task.id, task.completed, tasks, setTasks)}
            />
            <span className={task.completed ? 'completed' : 'not-completed'}>
              {task.text}
            </span>
            <button className="delete-button" onClick={() => DeleteTask(task.id, tasks, setTasks)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="link-container">
        <Link to="/results">Go to Results</Link>
      </div>
    </div>
  );
};

export default Home;
