import { MongoClient, Db } from 'mongodb';
import { config } from 'dotenv'; config();


const MONGO_URI = process.env.MONGODB_LOCAL_URI || 'mongodb//localhost:27017'
const client: MongoClient = new MongoClient(MONGO_URI);

let dbInstance: Db;

export const connectToDatabase = function () {
    console.log('Trying to connect')

    client.connect()
        .then(connection => {
            console.log('Database connection succeeded');
            dbInstance = connection.db();
        })

        .catch(err => {
            console.log('Connection failed' + err);
        })
}

export const db = () => dbInstance;

export const dbClose = () => {
    client.close();
}