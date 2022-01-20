
import { RequestHandler } from "express";
import { Todo } from "../models/todo"
import { db } from "../database/connection";
import { Document, InsertOneResult, ObjectId, Collection, WithId } from "mongodb";
import { text } from "body-parser";

const TODOs: Todo[] = [];
const tableName: string = 'Todo'

export const createTodo: RequestHandler = async (req, res, next) => {
    const taskDescription: string = (req.body as { text: string }).text;
    const task = new Todo(taskDescription, false);

    let data: InsertOneResult<Document>;

    if (!taskDescription) {
        console.log();
        res.send('Task is null please add task');
        return;
    }

    try {
        data = await db().collection(tableName).insertOne(task);
        task._id = data.insertedId;
        res.status(201).send({ task })
    } catch (err) {
        console.log(err);
        res.status(500).send({ err });
    }


}

export const getTodo: RequestHandler = async (req, res, next) => {
    let data;
    try {
        data = await db().collection(tableName).find({}).toArray();
        res.status(200).send({ data });
    } catch (err) {
        res.status(500).send({ err });
    }
}


export const getTodoById: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) { res.status(400).send({ error: 'Invalid objectId' }); return; }

    const _id = new ObjectId(id)
    try {
        const data = await db().collection(tableName).findOne({ _id });
        console.log(data);
        res.status(200).send({ data });
    }
    catch (err) {
        console.log('Error in getById ' + err);
        res.status(500).send({ err });
    }
}

export const deleteTodo: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) { res.status(400).send({ error: 'Invalid objectId' }); return; }

    const _id = new ObjectId(id)
    try {
        const deletedTask = await db().collection(tableName).deleteOne({ _id });
        console.log(deletedTask);
        res.status(200).send({ deletedTask });
        return
    }
    catch (err) {
        console.log('Error in Deleting Todo ' + err);
        res.status(500).send({ err });
    }
}

export const updateTodo: RequestHandler<{ id: string, text: string }> = async (req, res, next) => {

    const id = req.params.id;
    const newText = req.body.text;
    const isValidId = ObjectId.isValid(id);

    if (!isValidId) { res.status(400).send({ error: 'Invalid objectId' }); return; }
    if (!newText) { res.status(400).send({ error: 'Task description is empty: Pleas add text property' }); return; }

    const _id = new ObjectId(id)
    const updateQuery = {
        $set: {
            text: newText,
            id: '',
        }
    }

    const updatedTask = await db().collection(tableName).updateOne({ _id }, updateQuery)
    res.send({ message: "Task updated", updatedTask })

}