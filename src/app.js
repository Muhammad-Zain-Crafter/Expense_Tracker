import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json({
    limit: "100mb"
}));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
   
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser()); // for parsing cookies

import userRouter from './routes/user.route.js';

app.use('/api/v1/expense-tracker/users', userRouter) // User routes

export default app