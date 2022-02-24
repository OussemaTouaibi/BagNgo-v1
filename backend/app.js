const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/errors');

app.use(express.json());


// Middleware to handle eroors
app.use(errorMiddleware);

module.exports = app;