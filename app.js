const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const userRouter = require('./router/UserRouter');
const connectDB = require('./config/db');
const dummyRouter = require('./router/dummyRouter');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

/* The code snippet `app.use(express.json());`, `app.use(express.urlencoded({ extended: true }));`, and
`app.use(express.static('public'));` are middleware functions in an Express.js application. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB database
/* `connectDB();` is a function call that connects the Node.js application to a MongoDB database. This
function is likely defined in the `config/db.js` file and uses a library like Mongoose to establish
a connection to the MongoDB database specified in the application's configuration. This connection
allows the application to interact with the database to perform operations like querying, inserting,
updating, and deleting data. */
connectDB();

// Routes
app.use('/api/dummyuser', dummyRouter);
app.use('/api/users', userRouter);

// Home page route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// For clint error
app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

// For server error
/* This part of the code is a middleware function in Express that handles server errors. When an error
occurs in any of the previous middleware or route handlers, Express will pass the error to this
middleware function. */
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
