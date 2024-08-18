import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { Box, Typography, Paper } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Charts = ({ expenses }) => {
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const categoryData = categories.map(
        category => expenses
            .filter(expense => expense.category === category)
            .reduce((acc, curr) => acc + curr.amount, 0)
    );

    const monthlyExpenses = expenses.reduce((acc, curr) => {
        const month = new Date(curr.date).getMonth();
        acc[month] = (acc[month] || 0) + curr.amount;
        return acc;
    }, new Array(12).fill(0));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Charts and Visualization
            </Typography>
            <Box sx={{
                display: 'flex',
                gap: 3,
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                <Paper elevation={4} sx={{ p: 3, flex: 1, minWidth: '300px', height: '400px', borderRadius: 2 }}>
                    <Typography variant="h6" component="h3" align="center" gutterBottom>
                        Expense by Category
                    </Typography>
                    <Box sx={{ height: 'calc(100% - 48px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Pie
                            data={{
                                labels: categories,
                                datasets: [{
                                    data: categoryData,
                                    backgroundColor: [
                                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                                    ],
                                    hoverBackgroundColor: [
                                        '#FF6384CC', '#36A2EBCC', '#FFCE56CC', '#4BC0C0CC', '#9966FFCC', '#FF9F40CC'
                                    ],
                                    borderWidth: 1,
                                }],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (tooltipItem) {
                                                return `${tooltipItem.label}: $${tooltipItem.raw}`;
                                            }
                                        }
                                    }
                                },
                            }}
                        />
                    </Box>
                </Paper>
                <Paper elevation={4} sx={{ p: 3, flex: 1, minWidth: '300px', height: '400px', borderRadius: 2 }}>
                    <Typography variant="h6" component="h3" align="center" gutterBottom>
                        Monthly Expenses
                    </Typography>
                    <Box sx={{ height: 'calc(100% - 48px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Line
                            data={{
                                labels: [...Array(12).keys()].map(month => `Month ${month + 1}`),
                                datasets: [{
                                    label: 'Monthly Expenses',
                                    data: monthlyExpenses,
                                    borderColor: '#FF6384',
                                    backgroundColor: 'rgba(255,99,132,0.2)',
                                    pointBackgroundColor: '#FF6384',
                                    fill: true,
                                    tension: 0.3,
                                }],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Month',
                                            font: { weight: 'bold' },
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Amount ($)',
                                            font: { weight: 'bold' },
                                        },
                                        beginAtZero: true,
                                    },
                                },
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'top',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (tooltipItem) {
                                                return `Month ${tooltipItem.label}: $${tooltipItem.raw}`;
                                            }
                                        }
                                    }
                                },
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Charts;
