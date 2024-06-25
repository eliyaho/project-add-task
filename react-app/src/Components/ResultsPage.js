import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResultsPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3003/tasks');
        setTasks(response.data); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();

  }, []);
  

  return (
    <div>
      <h1 style={{ color: 'black' }}>Results</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
      <div className="link-container">
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default ResultsPage;
