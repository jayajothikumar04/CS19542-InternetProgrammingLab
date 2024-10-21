import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JournalEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/entries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete-entry/${id}`);
      fetchEntries(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  // Function to format date from "2024-10-20T18:30:00.000Z" to "2024-10-21"
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert to Date object
    date.setDate(date.getDate() + 1); // Add one day to the date
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <div className="container mt-4">
      <h2>Your Journal Entries</h2>
      <ul className="list-group">
        {entries.sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry) => (
          <li key={entry.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{entry.title}</h5>
              <p>{entry.content}</p>
              <small>{formatDate(entry.date)}</small> {/* Use the formatted date */}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => deleteEntry(entry.id)} // Call delete function on click
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JournalEntries;
