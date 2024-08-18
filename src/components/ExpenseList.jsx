import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { convertToCSV } from '../utils/csvUtils';
import { downloadCSV } from '../utils/fileUtils';
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ExpenseList = ({ expenses, setExpenses }) => {
    const [editingExpense, setEditingExpense] = useState(null);
    const [editAmount, setEditAmount] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const [sortBy, setSortBy] = useState('date');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterAmount, setFilterAmount] = useState('');

    const handleDelete = (id) => {
        axios.delete(`https://expense-tracker-app-backend-mern.onrender.com/api/expenses/${id}`)
            .then(() => {
                setExpenses(expenses.filter(expense => expense._id !== id));
                toast.success('Expense deleted successfully!');
            })
            .catch(error => {
                console.error("Error deleting expense:", error);
                toast.error('Error deleting expense. Please try again.');
            });
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense._id);
        setEditAmount(expense.amount);
        setEditCategory(expense.category);
        setEditDate(new Date(expense.date).toISOString().split('T')[0]);
        setEditDescription(expense.description);
    };

    const handleUpdate = () => {
        axios.put(`https://expense-tracker-app-backend-mern.onrender.com/api/expenses/${editingExpense}`, {
            amount: editAmount,
            category: editCategory,
            date: editDate,
            description: editDescription,
        })
            .then(response => {
                setExpenses(expenses.map(expense =>
                    expense._id === editingExpense ? response.data : expense
                ));
                setEditingExpense(null);
                toast.success('Expense updated successfully!');
            })
            .catch(error => {
                console.error("Error updating expense:", error);
                toast.error('Error updating expense. Please try again.');
            });
    };

    const handleExport = () => {
        const csvContent = convertToCSV(expenses);
        downloadCSV(csvContent, 'expenses.csv');
        toast.success('Expenses exported successfully!');
    };

    const handleSort = (criteria) => {
        setSortBy(criteria);
    };

    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (name === 'category') setFilterCategory(value);
        if (name === 'amount') setFilterAmount(value);
    };

    const filteredExpenses = expenses
        .filter(expense => {
            return (
                (filterCategory ? expense.category.includes(filterCategory) : true) &&
                (filterAmount ? expense.amount.toString().includes(filterAmount) : true)
            );
        })
        .sort((a, b) => {
            if (sortBy === 'amount') return b.amount - a.amount;
            if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'category') return a.category.localeCompare(b.category);
            return 0;
        });

    return (
        <Paper sx={{ p: 3, maxWidth: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom align="left">
                Expense List
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Filter by Category"
                            name="category"
                            value={filterCategory}
                            onChange={handleFilter}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            label="Filter by Amount"
                            name="amount"
                            type="number"
                            value={filterAmount}
                            onChange={handleFilter}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <Button
                                onClick={() => handleSort('date')}
                                variant="contained"
                                fullWidth
                            >
                                Sort by Date
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                onClick={() => handleSort('amount')}
                                variant="contained"
                                fullWidth
                            >
                                Sort by Amount
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                onClick={() => handleSort('category')}
                                variant="contained"
                                fullWidth
                            >
                                Sort by Category
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Button
                onClick={handleExport}
                variant="contained"
                color="secondary"
                sx={{ mb: 2 }}
                fullWidth
            >
                Export to CSV
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredExpenses.map(expense => (
                            <TableRow key={expense._id}>
                                <TableCell>
                                    {editingExpense === expense._id ? (
                                        <TextField
                                            value={editAmount}
                                            onChange={(e) => setEditAmount(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        expense.amount
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingExpense === expense._id ? (
                                        <TextField
                                            value={editCategory}
                                            onChange={(e) => setEditCategory(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        expense.category
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingExpense === expense._id ? (
                                        <TextField
                                            type="date"
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        new Date(expense.date).toLocaleDateString()
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingExpense === expense._id ? (
                                        <TextField
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        expense.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingExpense === expense._id ? (
                                        <Box>
                                            <IconButton onClick={handleUpdate} color="primary">
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton onClick={() => setEditingExpense(null)} color="secondary">
                                                <CancelIcon />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <IconButton onClick={() => handleEdit(expense)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(expense._id)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ExpenseList;
