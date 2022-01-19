
// import express from 'express'
const express = require('express')

const app = express();


const PORT = 3000;

console.log('Hello TS node');

app.listen(PORT, () => {
    console.log('Server is running on localhost:' + PORT)
})