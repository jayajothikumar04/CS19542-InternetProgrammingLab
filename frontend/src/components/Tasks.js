import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks() {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend
  const fetchTasks = () => {
    axios.get('http://localhost:3001/tasks').then((response) => {
      // Sort tasks by due date and time
      const sortedTasks = response.data.sort((a, b) => {
        const aDateTime = new Date(`${a.due_date}T${a.due_time}`);
        const bDateTime = new Date(`${b.due_date}T${b.due_time}`);
        return aDateTime - bDateTime; // Ascending order
      });
      setTasks(sortedTasks);
    });
  };

  // Add a new task
  const addTask = () => {
    if (task.trim() !== '' && dueDate !== '' && dueTime !== '') {
      axios.post('http://localhost:3001/add-task', {
        task,
        due_date: dueDate,
        due_time: dueTime,
      }).then(() => {
        setTask('');
        setDueDate('');
        setDueTime('');
        fetchTasks(); // Refresh tasks after adding
      });
    }
  };

  // Mark task as completed
  const completeTask = (id) => {
    axios.put(`http://localhost:3001/complete-task/${id}`).then(() => {
      fetchTasks(); // Refresh tasks after completion
    });
  };

  // Delete all completed tasks
  const deleteCompletedTasks = () => {
    axios.delete('http://localhost:3001/delete-completed-tasks').then(() => {
      fetchTasks(); // Refresh tasks after deletion
    });
  };

  // Function to format date and time
  const formatDateTime = (date, time) => {
    const newDate = new Date(date); // Create a new Date object from the date string
    newDate.setDate(newDate.getDate()); // Add one day
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = newDate.toLocaleDateString('en-GB', options).split('/').reverse().join('-'); // Format the date to dd-mm-yyyy
    const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // Format time to hh:mm AM/PM
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="container">
      <h2>Tasks</h2>
      <div className="input-group mb-3">
        <input 
          type="text" 
          placeholder="Task" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          className="form-control" 
        />
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          className="form-control" 
        />
        <input 
          type="time" 
          value={dueTime} 
          onChange={(e) => setDueTime(e.target.value)} 
          className="form-control" 
        />
        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
      </div>

      <h3 className="mt-4">Pending Tasks</h3>
      <ul className="list-group">
        {tasks.filter(t => !t.is_completed).map((t) => (
          <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span style={{ flex: 1 }}>
              {t.task} {/* Normal font for task name */}
              <br />
              <span style={{ fontSize: '14px', color: 'grey' }}>
                {formatDateTime(t.due_date, t.due_time)} {/* Display formatted due date and time */}
              </span>
            </span>
            <input 
              type="checkbox" 
              onChange={() => completeTask(t.id)} 
            />
          </li>
        ))}
      </ul>

      <h3 className="mt-4 d-flex justify-content-between align-items-center">
        Completed Tasks
        <button className="btn btn-danger" onClick={deleteCompletedTasks}>Delete Completed Tasks</button>
      </h3>
      <ul className="list-group">
        {tasks.filter(t => t.is_completed).map((t) => (
          <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span style={{ flex: 1 }}>
              {t.task} {/* Normal font for task name */}
              <br />
              <span style={{ fontSize: '14px', color: 'grey' }}>
                {formatDateTime(t.due_date, t.due_time)} {/* Display formatted due date and time */}
              </span>
            </span>
            <input type="checkbox" checked={true} readOnly /> {/* Checkbox for completed tasks */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
