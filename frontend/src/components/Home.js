import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported

const Home = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8"> {/* Center the content in a smaller column */}
          <h2 className="text-center">Welcome to Digital Journal</h2>
          <p className="text-center">Digital Journal is your all-in-one platform for personal productivity and self-improvement. Whether you're looking to record your thoughts, keep track of your habits, manage expenses, or organize tasks, Digital Journal helps you stay on top of everything seamlessly.</p>
          
          <h3>Features</h3>
          <ul>
            <li><strong>Journal Entries</strong> – Capture your daily thoughts, reflect on your experiences, and track your personal growth. Write, edit, and delete entries with ease.</li>
            <li><strong>Task Manager</strong> – Organize your to-dos and stay productive with our integrated task management system. Set deadlines, track progress, and mark tasks as completed.</li>
            <li><strong>Expense Tracker</strong> – Keep track of your finances by recording your income and expenses. View your balance in real-time and monitor your spending habits.</li>
            <li><strong>Habit Tracker</strong> – Build positive habits and track your progress over time. Whether it's exercising, reading, or meditating, Digital Journal helps you stay consistent with your goals.</li>
          </ul>

          <h3>Why Digital Journal?</h3>
          <p>
            <strong>Easy to Use:</strong> A simple and intuitive interface designed to make journaling, tracking habits, and managing tasks easy and accessible.<br />
            <strong>Productivity at Your Fingertips:</strong> Organize your life in one place, with a platform that encourages personal reflection and productivity.<br />
            <strong>Real-Time Updates:</strong> Experience real-time tracking for your tasks, habits, and finances, so you're always in control.
          </p>

          <h4 className="text-center mt-4">Start your journey with Digital Journal today!</h4>
          <p className="text-center">Take control of your life with tools designed to help you stay organized, productive, and reflective. Start journaling, tracking your expenses, and building better habits—all in one platform.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
