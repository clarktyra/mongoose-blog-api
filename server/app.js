//Add some require statements at the top of app.js, 
//making sure to add mongoose for the database support

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Instruct mongoose to connect to your local MongoDB instance
mongoose.connect('mongodb://localhost/my-blog');
//Enable Promises for mongoose (for easier async operations)
mongoose.Promise = Promise;

//Add the necessary statements after these lines 
//to use the bodyParser to detect json, 
//setup a route and finally to export the app

const app = express();

app.use(bodyParser.json());



app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;