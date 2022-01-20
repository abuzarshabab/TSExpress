"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClose = exports.db = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MONGO_URI = process.env.MONGODB_LOCAL_URI || 'mongodb//localhost:27017';
const client = new mongodb_1.MongoClient(MONGO_URI);
let dbInstance;
const connectToDatabase = function () {
    console.log('Trying to connect');
    client.connect()
        .then(connection => {
        console.log('Database connection succeeded');
        dbInstance = connection.db();
    })
        .catch(err => {
        console.log('Connection failed' + err);
    });
};
exports.connectToDatabase = connectToDatabase;
const db = () => dbInstance;
exports.db = db;
const dbClose = () => {
    client.close();
};
exports.dbClose = dbClose;
