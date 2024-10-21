import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('http://localhost:3001/habits');
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const addHabit = async () => {
    if (!habitName || !startDate || !endDate) {
      console.log('Please fill out all fields');
      return;
    }

    try {
      await axios.post('http://localhost:3001/add-habit', {
        habit_name: habitName,
        start_date: startDate,
        end_date: endDate,
      });

      // Clear input fields
      setHabitName('');
      setStartDate('');
      setEndDate('');

      // Refetch habits to display the new one
      fetchHabits();
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const updateHabitStatus = async (id, dailyStatus) => {
    try {
      await axios.put(`http://localhost:3001/update-habit-status/${id}`, {
        daily_status: dailyStatus,
      });
      fetchHabits(); // Refetch to update the status
    } catch (error) {
      console.error('Error updating habit status:', error);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete-habit/${id}`);
      fetchHabits(); // Refetch habits after deletion
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div className="container">
      <h2>Habit Tracker</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Habit Name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          className="form-control"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary" onClick={addHabit}>
          Add Habit
        </button>
      </div>

      <h3>Your Habits</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Habit</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td>{habit.habit_name}</td>
              <td>{new Date(habit.start_date).toLocaleDateString('en-GB')}</td>
              <td>{new Date(habit.end_date).toLocaleDateString('en-GB')}</td>
              <td>
                <input
                  type="checkbox"
                  checked={habit.daily_status}
                  onChange={() => updateHabitStatus(habit.id, !habit.daily_status)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteHabit(habit.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTracker;
