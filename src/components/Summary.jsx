import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const Summary = ({ expenses }) => {
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const expenseByCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    return (
        <Box sx={{ p: 2, mb: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Expense Summary
            </Typography>

            <Card sx={{ mb: 3, backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
                <CardContent>
                    <Typography variant="h6" component="h2" color="primary" gutterBottom>
                        Total Expenses
                    </Typography>
                    <Typography variant="h6" component="p" color="secondary">
                        ₹{totalExpenses.toFixed(2)}
                    </Typography>
                </CardContent>
            </Card>

            <Typography variant="h6" component="h2" gutterBottom>
                Expenses by Category
            </Typography>

            <Grid container spacing={2}>
                {Object.entries(expenseByCategory).map(([category, amount]) => (
                    <Grid item xs={12} sm={6} md={4} key={category}>
                        <Card sx={{ backgroundColor: '#e3f2fd', borderRadius: '10px' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" color="primary">
                                    {category}
                                </Typography>
                                <Typography variant="h6" component="p" color="textSecondary">
                                    ₹{amount.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Summary;
