import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CssBaseline} from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Charts from './components/Charts';
import Summary from './components/Summary';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('https://expense-tracker-app-backend-mern.onrender.com/api/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <ExpenseForm setExpenses={setExpenses} />
      <Summary expenses={expenses} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      <Charts expenses={expenses} />
    </Container>
  );
};

export default App;
