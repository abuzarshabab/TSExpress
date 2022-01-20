import { ObjectId } from "mongodb";

export class Todo {
    constructor(public text: string, public isCompleted?: boolean, public _id?: ObjectId,) { };

}