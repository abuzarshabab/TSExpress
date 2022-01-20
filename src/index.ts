
// const express = require('express')
import express, { Request, Response, NextFunction } from 'express'
import todoRoutes from './routes/todo';
import { json } from 'body-parser';
import { config } from 'dotenv'; config();


const app = express();
const PORT = process.env.EXPRESS_PORT || 3001;

app.use(json())

app.use('/todo', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json('Opps please go to the todo' + err);
    next();
})

app.listen(PORT, () => {
    console.log('Server is running on localhost:' + PORT);
})