import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json({
    limit: "100mb"
}));
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  process.env.CORS_ORIGIN, 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, server requests

      if (!allowedOrigins.includes(origin)) {
        return callback(new Error('Not allowed by CORS'));
      }

      callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser()); // for parsing cookies

app.get('/', (req, res) => {
    res.send('Welcome to the Expense Tracker API');
})

import userRouter from './routes/user.route.js';
import expenseRouter from './routes/expense.route.js';
import budgetRouter from './routes/budget.route.js';
import incomeRouter from './routes/income.route.js';
import dashboardRouter from './routes/dashboard.route.js';

app.use('/api/v1/expense-tracker/users', userRouter) // User routes
app.use('/api/v1/expense-tracker/expenses', expenseRouter) // Expense routes
app.use('/api/v1/expense-tracker/budgets', budgetRouter) // Budget routes
app.use('/api/v1/expense-tracker/incomes', incomeRouter) // Income routes
app.use('/api/v1/expense-tracker/dashboard', dashboardRouter) // Dashboard routes

export default app