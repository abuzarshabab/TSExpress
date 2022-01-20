"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodoById = exports.getTodo = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const connection_1 = require("../database/connection");
const mongodb_1 = require("mongodb");
const TODOs = [];
const tableName = 'Todo';
const createTodo = async (req, res, next) => {
    const taskDescription = req.body.text;
    const task = new todo_1.Todo(taskDescription, false);
    let data;
    if (!taskDescription) {
        console.log();
        res.send('Task is null please add task');
        return;
    }
    try {
        data = await (0, connection_1.db)().collection(tableName).insertOne(task);
        task._id = data.insertedId;
        res.status(201).send({ task });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ err });
    }
};
exports.createTodo = createTodo;
const getTodo = async (req, res, next) => {
    let data;
    try {
        data = await (0, connection_1.db)().collection(tableName).find({}).toArray();
        res.status(200).send({ data });
    }
    catch (err) {
        res.status(500).send({ err });
    }
};
exports.getTodo = getTodo;
const getTodoById = async (req, res, next) => {
    const id = req.params.id;
    const isValidId = mongodb_1.ObjectId.isValid(id);
    if (!isValidId) {
        res.status(400).send({ error: 'Invalid objectId' });
        return;
    }
    const _id = new mongodb_1.ObjectId(id);
    try {
        const data = await (0, connection_1.db)().collection(tableName).findOne({ _id });
        console.log(data);
        res.status(200).send({ data });
    }
    catch (err) {
        console.log('Error in getById ' + err);
        res.status(500).send({ err });
    }
};
exports.getTodoById = getTodoById;
const deleteTodo = async (req, res, next) => {
    const id = req.params.id;
    const isValidId = mongodb_1.ObjectId.isValid(id);
    if (!isValidId) {
        res.status(400).send({ error: 'Invalid objectId' });
        return;
    }
    const _id = new mongodb_1.ObjectId(id);
    try {
        const deletedTask = await (0, connection_1.db)().collection(tableName).deleteOne({ _id });
        console.log(deletedTask);
        res.status(200).send({ deletedTask });
        return;
    }
    catch (err) {
        console.log('Error in Deleting Todo ' + err);
        res.status(500).send({ err });
    }
};
exports.deleteTodo = deleteTodo;
const updateTodo = async (req, res, next) => {
    const id = req.params.id;
    const newText = req.body.text;
    const isValidId = mongodb_1.ObjectId.isValid(id);
    if (!isValidId) {
        res.status(400).send({ error: 'Invalid objectId' });
        return;
    }
    if (!newText) {
        res.status(400).send({ error: 'Task description is empty: Pleas add text property' });
        return;
    }
    const _id = new mongodb_1.ObjectId(id);
    const updateQuery = {
        $set: {
            text: newText,
            id: '',
        }
    };
    const updatedTask = await (0, connection_1.db)().collection(tableName).updateOne({ _id }, updateQuery);
    res.send({ message: "Task updated", updatedTask });
};
exports.updateTodo = updateTodo;
