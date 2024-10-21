import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Home from './components/Home';
import JournalEntryForm from './components/JournalEntryForm';
import JournalEntries from './components/JournalEntries';
import ExpenseTracker from './components/ExpenseTracker'; // Import ExpenseTracker
import HabitTracker from './components/HabitTracker';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <div style={{ 
            backgroundColor: 'blue', 
            padding: '20px', 
            textAlign: 'center' 
        }}>
          <h1 style={{ 
              color: 'white', 
              margin: 0, 
              fontSize: '2.5rem' 
          }}>
              Digital Journal
          </h1>
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-entry" element={<JournalEntryForm />} />
          <Route path="/view-entries" element={<JournalEntries />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/expenses" element={<ExpenseTracker />} /> {/* Add Expense Tracker route */}
          <Route path="/habit-tracker" element={<HabitTracker />} /> {/* Add this */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
