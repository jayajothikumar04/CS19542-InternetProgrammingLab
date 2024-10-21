const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'journal_db',
  port: 3307
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// Journal Entry Routes
app.post('/add-entry', (req, res) => {
  const { title, content, date } = req.body;
  const sql = 'INSERT INTO entries (title, content, date) VALUES (?, ?, ?)';
  db.query(sql, [title, content, date], (err, result) => {
    if (err) throw err;
    res.send('Entry added');
  });
});

app.delete('/delete-entry/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM entries WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Entry deleted');
  });
});

app.get('/entries', (req, res) => {
  const sql = 'SELECT * FROM entries ORDER BY date DESC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Task Routes
app.post('/add-task', (req, res) => {
  const { task, due_date, due_time } = req.body;
  const sql = 'INSERT INTO tasks (task, due_date, due_time) VALUES (?, ?, ?)';
  db.query(sql, [task, due_date, due_time], (err, result) => {
    if (err) throw err;
    res.send('Task added');
  });
});

app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks ORDER BY due_date ASC, due_time ASC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/complete-task/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE tasks SET is_completed = TRUE WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Task marked as completed');
  });
});

app.delete('/delete-completed-tasks', (req, res) => {
  const sql = 'DELETE FROM tasks WHERE is_completed = TRUE';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Completed tasks deleted');
  });
});

// Expense Tracker Routes
app.post('/add-expense', (req, res) => {
  const { description, amount, date } = req.body;
  const sql = 'INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)';
  db.query(sql, [description, amount, date], (err, result) => {
    if (err) throw err;
    res.send('Expense added');
  });
});

app.get('/expenses', (req, res) => {
  const sql = 'SELECT * FROM expenses ORDER BY date DESC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/delete-expense/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM expenses WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Expense deleted');
  });
});


// Route to add a new habit
app.post('/add-habit', (req, res) => {
  const { habit_name, start_date, end_date } = req.body;
  const sql = 'INSERT INTO habits (habit_name, start_date, end_date) VALUES (?, ?, ?)';
  db.query(sql, [habit_name, start_date, end_date], (err, result) => {
      if (err) throw err;
      res.send('Habit added');
  });
});

// Route to fetch all habits
app.get('/habits', (req, res) => {
  const sql = 'SELECT * FROM habits';
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Route to update daily status of a habit
app.put('/update-habit-status/:id', (req, res) => {
  const { id } = req.params;
  const { daily_status } = req.body;
  const sql = 'UPDATE habits SET daily_status = ? WHERE id = ?';
  db.query(sql, [daily_status, id], (err, result) => {
      if (err) throw err;
      res.send('Habit status updated');
  });
});

// Route to delete a habit
app.delete('/delete-habit/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM habits WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('Habit deleted');
  });
});



// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
