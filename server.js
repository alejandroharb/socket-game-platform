'use strict';
// Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
const port = process.env.PORT || 3000;
const sockets = require('./sockets.js').listen(port, app);
const MongoOplog = require('mongo-oplog');
const mongoWatch = require('mongo-oplog-watch');
const URI = process.env.MONGODB_URI || "mongodb://localhost/socket-game-platform";

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
mongoose.connect(URI);
const db = mongoose.connection;


// Database configuration with mongoose
// Show any mongoose errors
db.once("open", () => { console.log("Mongoose connection successful."); });
db.on("error", (error) => { console.log("Mongoose Error:", error); });

const oplog = MongoOplog(URI, { ns: 'socket-game-platform.games' });

// const watcher = mongoWatch(URI, { ns: 'socket-game-platform.games' });

// watcher.on('update', function (doc) {
//   doc = {
//     db: 'db name',
//     collection: 'collection name',
//     query: {
//       _id: 'Object Id'
//     },
//     object: {
//       set: {
//         field1: 'updated value',
//         field2: 'updated value'
//         // ...
//       }
//     }
//   }
// });
// oplog.tail().then(() => {
//   console.log('tailing started')
// }).catch(err => console.error(err))
// .then(() => {
//   console.log('oplog tailing started');
// }).catch(err => console.error(err));

// oplog.on('op', data => {
//   console.log(data);
// });

// Use morgan and body parser with our app
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

const routes = require('./routes');
for (let route in routes) {
  app.use(route, routes[route]);
}


//Server side react? Maybe.
// const React = require('react');