"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./routes/todo"));
const body_parser_1 = require("body-parser");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connection_1 = require("./database/connection");
const app = (0, express_1.default)();
const PORT = process.env.EXPRESS_PORT || 3001;
app.use((0, body_parser_1.json)());
app.use('/todo', todo_1.default);
app.use((err, req, res, next) => {
    res.json('Opps please go to the todo' + err);
    next();
});
(0, connection_1.connectToDatabase)();
app.listen(PORT, () => {
    console.log('Server is running on localhost:' + PORT);
});
