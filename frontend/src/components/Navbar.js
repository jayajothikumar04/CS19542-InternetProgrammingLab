import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-item" to="/">Home</Link>
        <Link className="navbar-item" to="/add-entry">Add Journal Entry</Link>
        <Link className="navbar-item" to="/view-entries">View All Entries</Link>
        <Link className="navbar-item" to="/tasks">Tasks</Link>
      </div>
    </nav>
  );
}

export default Navbar;
