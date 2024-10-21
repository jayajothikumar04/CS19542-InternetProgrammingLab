import React, { useState } from 'react';
import axios from 'axios';

function JournalEntryForm({ onEntryAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addEntry = () => {
    axios.post('http://localhost:3001/add-entry', {
      title,
      content,
      date: new Date().toISOString().split('T')[0]
    }).then(() => {
      alert('Entry added!');
      setTitle('');
      setContent('');
      //onEntryAdded(); // Trigger refetch of journal entries
    });
  };

  return (
    <div className="container">
      <h2>Add a Journal Entry</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="form-control" 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        className="form-control mt-2" 
      />
      <button className="btn btn-primary mt-2" onClick={addEntry}>
        Add Entry
      </button>
    </div>
  );
}

export default JournalEntryForm;
