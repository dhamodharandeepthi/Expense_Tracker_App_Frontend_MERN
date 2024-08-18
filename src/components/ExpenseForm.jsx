import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, MenuItem, Button, InputLabel, Select, FormControl, Box, Typography, Card, CardContent } from '@mui/material';

const ExpenseForm = ({ setExpenses }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    const categories = ['Food', 'Transport', 'Entertainment', 'Other'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCategory = customCategory || category;

        axios.post('https://expense-tracker-app-backend-mern.onrender.com/api/expenses', {
            amount,
            category: selectedCategory,
            date,
            description,
        })
            .then(response => {
                setExpenses(prevExpenses => [...prevExpenses, response.data]);
                setAmount('');
                setCategory('Food');
                setDate(new Date().toISOString().split('T')[0]);
                setDescription('');
                setCustomCategory('');
                toast.success('Expense added successfully!');
            })
            .catch(error => {
                console.error("Error adding expense:", error);
                toast.error('Error adding expense. Please try again.');
            });
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Expense Tracker App
                    </Typography>
                    <Typography variant="h6" component="h2" align="center" gutterBottom>
                        Log Your Expense
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Select Category</InputLabel>
                            <Select
                                label="Select Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Custom Category"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Description (Optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5 }}>
                            Add Expense
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ExpenseForm;
