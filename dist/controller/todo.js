"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodoById = exports.getTodo = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOs = [];
const createTodo = (req, res, next) => {
    const taskDescription = req.body.text;
    const id = (Math.random() * 10000000000000000).toString();
    const task = new todo_1.Todo(id, taskDescription, false);
    if (!taskDescription) {
        console.log();
        res.send('Task is null please add task');
        return;
    }
    TODOs.push(task);
    res.status(201).send({ message: 'Added into Todo', TODOs });
};
exports.createTodo = createTodo;
const getTodo = (req, res, next) => {
    res.status(200).send({ TODOs });
};
exports.getTodo = getTodo;
const getTodoById = (req, res, next) => {
    const reqId = req.params.id;
    const index = TODOs.findIndex(task => task.id === reqId);
    if (index < 0) {
        res.send({ message: "Search failed: task not found" });
        return;
    }
    res.status(200).send({ task: TODOs[index] });
};
exports.getTodoById = getTodoById;
const deleteTodo = (req, res, next) => {
    const reqId = req.params.id;
    const index = TODOs.findIndex(task => task.id === reqId);
    if (index < 0) {
        res.send({ message: "Delete failed: task not found" });
        return;
    }
    const deletedTask = TODOs.splice(index, 1);
    res.status(200).send({ deletedTask });
};
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const newText = req.body.text;
    const todoIndex = TODOs.findIndex(task => task.id === todoId);
    if (!newText) {
        res.send('Task description is empty: Pleas add text property');
        return;
    }
    if (todoIndex < 0) {
        res.send({ message: "Update failed task not found" });
        return;
    }
    TODOs[todoIndex].text = newText; // Updating to new text
    res.send({ message: "Task updated", updatedTask: TODOs[todoIndex] });
    return;
};
exports.updateTodo = updateTodo;
