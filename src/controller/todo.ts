import { match } from "assert";
import { RequestHandler } from "express";
import { Todo } from "../models/todo"
const TODOs: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const taskDescription: string = (req.body as { text: string }).text;
    const id = (Math.random() * 10000000000000000).toString();
    const task = new Todo(id, taskDescription, false);

    if (!taskDescription) {
        console.log();
        res.send('Task is null please add task');
        return;
    }
    TODOs.push(task);
    res.status(201).send({ message: 'Added into Todo', TODOs })
}

export const getTodo: RequestHandler = (req, res, next) => {
    res.status(200).send({ TODOs });
}

export const getTodoById: RequestHandler = (req, res, next) => {
    const reqId = req.params.id;
    const index = TODOs.findIndex(task => task.id === reqId);
    if (index < 0) {
        res.send({ message: "Search failed: task not found" }); return;
    }
    res.status(200).send({ task: TODOs[index] });
}

export const deleteTodo: RequestHandler = (req, res, next) => {
    const reqId: string = req.params.id;
    const index: number = TODOs.findIndex(task => task.id === reqId);

    if (index < 0) {
        res.send({ message: "Delete failed: task not found" }); return;
    }

    const deletedTask = TODOs.splice(index, 1);
    res.status(200).send({ deletedTask });

}

export const updateTodo: RequestHandler<{ id: string, text: string }> = (req, res, next) => {

    const todoId: string = req.params.id;
    const newText: string = req.body.text;
    const todoIndex: number = TODOs.findIndex(task => task.id === todoId)

    if (!newText) {
        res.send('Task description is empty: Pleas add text property');
        return;
    }

    if (todoIndex < 0) {
        res.send({ message: "Update failed task not found" });
        return;
    }

    TODOs[todoIndex].text = newText;  // Updating to new text
    res.send({ message: "Task updated", updatedTask: TODOs[todoIndex] })
    return;
}