import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [isExpense, setIsExpense] = useState(true); // True for expenses, false for income

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/expenses');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addTransaction = async () => {
    if (!description || !amount || !date) {
      console.log('Please fill out all fields');
      return;
    }

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      console.log('Invalid amount');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/add-expense', {
        description,
        amount: isExpense ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
        date,
      });

      const newTransaction = {
        id: response.data.id,  // Ensure ID is included, or skip if not needed
        description: description,
        amount: isExpense ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
        date: date,
      };

      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

      setDescription('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete-expense/${id}`);
      setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const calculateTotals = () => {
    const totalIncome = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalExpenses = Math.abs(transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0));
    const balance = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, balance };
  };

  const { totalIncome, totalExpenses, balance } = calculateTotals();

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <div className="row mb-4">
        <div className="col text-center">
          <h4>Income: ${totalIncome.toFixed(2)}</h4>
          <h4>Expenses: ${totalExpenses.toFixed(2)}</h4>
          <h4>Balance: ${balance.toFixed(2)}</h4>
        </div>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
        <select className="form-select" onChange={(e) => setIsExpense(e.target.value === 'expense')}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button className="btn btn-primary" onClick={addTransaction}>Add</button>
      </div>

      <h3 className="mt-4">Your Transactions</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{new Date(transaction.date).toLocaleDateString('en-GB')}</td> {/* Format as dd/mm/yyyy */}
              <td style={{ color: transaction.amount < 0 ? 'red' : 'green' }}>
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTracker;
