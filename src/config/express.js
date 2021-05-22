const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api/routes/v1');
const error = require('../api/middlewares/error');
const fileupload = require("express-fileupload");

/**
* Express instance
* @public
*/
const app = express();

// parse body params and attache them to req.body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(fileupload());

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
